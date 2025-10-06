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

    // Obtener todas las suscripciones con información de empresa y pagos
    const subscriptions = await prisma.subscription.findMany({
      include: {
        company: {
          include: {
            users: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true
              }
            }
          }
        },
        payments: {
          where: {
            status: 'COMPLETED'
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 5
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Formatear los datos
    const formattedSubscriptions = subscriptions.map(sub => ({
      id: sub.id,
      plan: sub.plan,
      status: sub.status,
      currentPeriodStart: sub.currentPeriodStart.toISOString(),
      currentPeriodEnd: sub.currentPeriodEnd.toISOString(),
      trialEndsAt: sub.trialEndsAt?.toISOString() || null,
      billingCycle: sub.billingCycle,
      company: {
        id: sub.company.id,
        name: sub.company.name,
        email: sub.company.email,
        users: sub.company.users
      },
      payments: sub.payments.map(payment => ({
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
        createdAt: payment.createdAt.toISOString()
      }))
    }))

    return NextResponse.json({
      success: true,
      subscriptions: formattedSubscriptions,
      total: formattedSubscriptions.length
    })
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(
      { error: 'Error al obtener suscripciones' },
      { status: 500 }
    )
  }
}