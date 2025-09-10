import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { wompiClient } from "@/lib/wompi"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      amount,
      planId,
      currency,
      paymentMethod,
      customerData,
      period,
      cardToken
    } = body

    if (!amount || !planId || !currency || !paymentMethod) {
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

    // Calculate Colombian taxes if COP
    let totalAmount = parseFloat(amount)
    let ivaAmount = 0
    let ivaRate = 0
    
    if (currency === 'COP') {
      ivaRate = parseFloat(process.env.IVA_RATE || "0.19")
      ivaAmount = wompiClient.calculateIVA(totalAmount, ivaRate)
      totalAmount = wompiClient.calculateTotalWithIVA(totalAmount, ivaRate)
    }
    
    // Generate payment reference
    const reference = wompiClient.generateReference('FINKARGO_SUB')

    // Create payment record in database
    const payment = await prisma.payment.create({
      data: {
        companyId: user.company.id,
        amount: totalAmount,
        currency: currency,
        status: 'PENDING',
        provider: 'WOMPI',
        paymentMethod: paymentMethod,
        description: `Suscripción ${planId} - ${period || planId}`,
        metadata: {
          planId,
          period: period || planId,
          currency,
          subtotal: parseFloat(amount),
          ivaAmount,
          ivaRate,
          reference,
          customerData,
        },
      },
    })

    // Create Wompi payment data - Payment Link will be created
    const wompiPaymentData = {
      amount_in_cents: currency === 'COP' ? wompiClient.formatCOPAmount(totalAmount) : Math.round(totalAmount * 100),
      currency: 'COP' as const,
      customer_email: user.email,
      reference: reference,
      // No payment_method - let user choose in Wompi checkout
      customer_data: {
        full_name: customerData?.fullName || user.name || '',
        phone_number: customerData?.phoneNumber || user.company.phone || '',
      },
      redirect_url: `${process.env.NEXTAUTH_URL}/checkout/success?payment_id=${payment.id}`,
    }

    const wompiPayment = await wompiClient.createPayment(wompiPaymentData)

    // Update payment with Wompi ID
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        providerPaymentId: wompiPayment.id,
        metadata: {
          ...(payment.metadata as Record<string, unknown>),
          wompiPayment,
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
          period: period || planId,
        },
      },
    })

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        amount: totalAmount,
        currency: 'COP',
        reference,
        wompiPaymentId: wompiPayment.id,
        status: wompiPayment.status,
        paymentMethod: paymentMethod,
        checkoutUrl: wompiPayment.payment_link?.checkout_url || null,
      },
      wompiPayment,
    })

  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      { error: "Error al crear el pago" },
      { status: 500 }
    )
  }
}