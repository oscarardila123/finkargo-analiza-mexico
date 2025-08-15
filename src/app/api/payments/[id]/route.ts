import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    const paymentId = params.id

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

    // Find payment belonging to user's company
    const payment = await prisma.payment.findFirst({
      where: {
        id: paymentId,
        companyId: user.company.id
      }
    })

    if (!payment) {
      return NextResponse.json(
        { error: "Pago no encontrado" },
        { status: 404 }
      )
    }

    // Format payment data for the frontend
    const metadata = payment.metadata as any || {}
    
    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        reference: metadata.reference || payment.id,
        status: payment.status,
        plan: metadata.planId || 'professional',
        billingCycle: metadata.billingCycle || 'monthly',
        paymentMethod: payment.paymentMethod,
        createdAt: payment.createdAt.toISOString(),
      }
    })

  } catch (error) {
    console.error('Payment fetch error:', error)
    return NextResponse.json(
      { error: "Error al obtener el pago" },
      { status: 500 }
    )
  }
}