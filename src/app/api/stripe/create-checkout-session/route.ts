import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { stripeClient } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    console.log('🔵 Stripe checkout session - Start')
    const session = await getServerSession(authOptions)
    console.log('🔵 Session:', session?.user?.email)

    if (!session?.user?.id) {
      console.log('❌ No session found')
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    const body = await request.json()
    console.log('🔵 Request body:', body)
    const {
      amount,
      planId,
      currency = 'mxn',
      planName,
      period,
    } = body

    if (!amount || !planId || !planName) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      )
    }

    // Get user's company
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { company: true }
    })

    if (!user?.company) {
      return NextResponse.json(
        { error: "Empresa no encontrada" },
        { status: 404 }
      )
    }

    // Calculate taxes if applicable (Mexico IVA is 16%)
    let totalAmount = parseFloat(amount)
    let ivaAmount = 0
    let ivaRate = 0

    if (currency === 'mxn') {
      ivaRate = parseFloat(process.env.IVA_RATE_MX || "0.16")
      ivaAmount = stripeClient.calculateIVA(totalAmount, ivaRate)
      totalAmount = stripeClient.calculateTotalWithIVA(totalAmount, ivaRate)
    }

    // Generate payment reference
    const reference = stripeClient.generateReference('FINKARGO_SUB')

    // Create payment record in database
    const payment = await prisma.payment.create({
      data: {
        companyId: user.company.id,
        amount: totalAmount,
        currency: currency.toUpperCase(),
        status: 'PENDING',
        provider: 'STRIPE',
        paymentMethod: 'card',
        description: `Suscripción ${planName} - ${period || planId}`,
        metadata: {
          planId,
          planName,
          period: period || planId,
          currency,
          subtotal: parseFloat(amount),
          ivaAmount,
          ivaRate,
          reference,
        },
      },
    })

    // Create Stripe Checkout Session
    const checkoutSession = await stripeClient.createCheckoutSession({
      amount: totalAmount,
      currency: currency as 'mxn' | 'usd',
      customerEmail: user.email,
      reference: reference,
      planId: planId,
      planName: planName,
      successUrl: `${process.env.NEXTAUTH_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&payment_id=${payment.id}`,
      cancelUrl: `${process.env.NEXTAUTH_URL}/precios?canceled=true`,
      metadata: {
        paymentId: payment.id,
        companyId: user.company.id,
        userId: user.id,
        planName: planName,
        period: period || planId,
      },
    })

    // Update payment with Stripe session ID
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        providerPaymentId: checkoutSession.id,
        metadata: {
          ...(payment.metadata as Record<string, unknown>),
          stripeSessionId: checkoutSession.id,
          stripeCheckoutUrl: checkoutSession.url,
        },
      },
    })

    // Log payment activity
    await prisma.companyActivity.create({
      data: {
        companyId: user.company.id,
        action: 'PAYMENT_INITIATED',
        metadata: {
          paymentId: payment.id,
          amount: totalAmount,
          planId,
          planName,
          period: period || planId,
          provider: 'STRIPE',
        },
      },
    })

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        amount: totalAmount,
        currency: currency.toUpperCase(),
        reference,
        stripeSessionId: checkoutSession.id,
        status: 'PENDING',
        checkoutUrl: checkoutSession.url,
      },
      checkoutSession,
    })

  } catch (error) {
    console.error('Stripe checkout session creation error:', error)
    return NextResponse.json(
      { error: "Error al crear la sesión de pago" },
      { status: 500 }
    )
  }
}
