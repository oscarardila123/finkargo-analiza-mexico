import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { wompiClient } from "@/lib/wompi"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-signature')
    const timestamp = request.headers.get('x-timestamp')

    if (!signature || !timestamp) {
      console.error('Missing webhook signature or timestamp')
      return NextResponse.json(
        { error: "Firma requerida" },
        { status: 400 }
      )
    }

    // Verify webhook signature
    const isValidSignature = wompiClient.verifyWebhookSignature(
      body,
      signature,
      timestamp
    )

    if (!isValidSignature) {
      console.error('Invalid webhook signature')
      return NextResponse.json(
        { error: "Firma inválida" },
        { status: 400 }
      )
    }

    const webhookData = JSON.parse(body)
    
    if (webhookData.event !== 'transaction.updated') {
      return NextResponse.json({ success: true })
    }

    const transaction = webhookData.data.transaction
    const wompiPaymentId = transaction.id

    // Find payment in our database
    const payment = await prisma.payment.findFirst({
      where: { providerPaymentId: wompiPaymentId },
      include: { company: true }
    })

    if (!payment) {
      console.error(`Payment not found for Wompi ID: ${wompiPaymentId}`)
      return NextResponse.json(
        { error: "Pago no encontrado" },
        { status: 404 }
      )
    }

    // Map Wompi status to our status
    let paymentStatus: string
    let shouldActivateSubscription = false

    switch (transaction.status) {
      case 'APPROVED':
        paymentStatus = 'COMPLETED'
        shouldActivateSubscription = true
        break
      case 'DECLINED':
      case 'ERROR':
        paymentStatus = 'FAILED'
        break
      case 'VOIDED':
        paymentStatus = 'CANCELED'
        break
      default:
        paymentStatus = 'PROCESSING'
    }

    // Update payment status
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: paymentStatus as 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED',
        paidAt: transaction.status === 'APPROVED' ? new Date(transaction.finalized_at!) : null,
        failedAt: ['DECLINED', 'ERROR'].includes(transaction.status) ? new Date() : null,
        failureReason: transaction.status_message || null,
        metadata: {
          ...(payment.metadata as Record<string, unknown>),
          webhookData: transaction,
          updatedAt: new Date().toISOString(),
        },
      },
    })

    // Handle successful payment
    if (shouldActivateSubscription) {
      const metadata = payment.metadata as any
      const plan = metadata.plan
      const billingCycle = metadata.billingCycle

      // Calculate subscription dates
      const now = new Date()
      const periodEnd = new Date(now)
      
      if (billingCycle === 'YEARLY') {
        periodEnd.setFullYear(periodEnd.getFullYear() + 1)
      } else {
        periodEnd.setMonth(periodEnd.getMonth() + 1)
      }

      // Update or create subscription
      const existingSubscription = await prisma.subscription.findUnique({
        where: { companyId: payment.companyId }
      })

      if (existingSubscription) {
        await prisma.subscription.update({
          where: { id: existingSubscription.id },
          data: {
            plan: plan,
            status: 'ACTIVE',
            currentPeriodStart: now,
            currentPeriodEnd: periodEnd,
            billingCycle: billingCycle,
            canceledAt: null,
            cancelAtPeriodEnd: false,
            reportsLimit: getReportsLimit(plan),
            priceMonthly: billingCycle === 'MONTHLY' ? payment.amount : null,
            priceYearly: billingCycle === 'YEARLY' ? payment.amount : null,
          },
        })
      } else {
        await prisma.subscription.create({
          data: {
            companyId: payment.companyId,
            plan: plan,
            status: 'ACTIVE',
            currentPeriodStart: now,
            currentPeriodEnd: periodEnd,
            billingCycle: billingCycle,
            reportsLimit: getReportsLimit(plan),
            priceMonthly: billingCycle === 'MONTHLY' ? payment.amount : null,
            priceYearly: billingCycle === 'YEARLY' ? payment.amount : null,
          },
        })
      }

      // Log successful payment
      await prisma.companyActivity.create({
        data: {
          companyId: payment.companyId,
          action: 'PAYMENT_COMPLETED',
          metadata: {
            paymentId: payment.id,
            amount: payment.amount,
            plan: plan,
            billingCycle: billingCycle,
            wompiPaymentId: wompiPaymentId,
          },
        },
      })
    } else if (paymentStatus === 'FAILED') {
      // Log failed payment
      await prisma.companyActivity.create({
        data: {
          companyId: payment.companyId,
          action: 'PAYMENT_FAILED',
          metadata: {
            paymentId: payment.id,
            amount: payment.amount,
            failureReason: transaction.status_message,
            wompiPaymentId: wompiPaymentId,
          },
        },
      })
    }

    // Link payment to subscription if exists
    const subscription = await prisma.subscription.findUnique({
      where: { companyId: payment.companyId }
    })

    if (subscription && !payment.subscriptionId) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { subscriptionId: subscription.id },
      })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}

function getReportsLimit(plan: string): number {
  const limits: Record<string, number> = {
    'BASIC': 10,
    'PROFESSIONAL': 50,
    'ENTERPRISE': 200,
  }
  return limits[plan] || 10
}