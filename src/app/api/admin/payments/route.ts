import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    // Verificar que el usuario esté autenticado y sea admin
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // Obtener todos los pagos con información de empresa
    const payments = await prisma.payment.findMany({
      include: {
        company: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Formatear los datos
    const formattedPayments = payments.map(payment => ({
      id: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      provider: payment.provider,
      providerPaymentId: payment.providerPaymentId,
      paymentMethod: payment.paymentMethod,
      planType: payment.planType,
      customerEmail: payment.customerEmail,
      wompiReference: payment.wompiReference,
      description: payment.description,
      paidAt: payment.paidAt?.toISOString() || null,
      failedAt: payment.failedAt?.toISOString() || null,
      failureReason: payment.failureReason,
      createdAt: payment.createdAt.toISOString(),
      company: payment.company
    }))

    return NextResponse.json({
      success: true,
      payments: formattedPayments,
      total: formattedPayments.length
    })
  } catch (error) {
    console.error('Error fetching payments:', error)
    return NextResponse.json(
      { error: 'Error al obtener pagos' },
      { status: 500 }
    )
  }
}