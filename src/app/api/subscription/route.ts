import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    // Buscar usuario por email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        company: {
          include: {
            subscription: true,
            payments: {
              orderBy: { createdAt: 'desc' },
              take: 10,
            },
          },
        },
      },
    })

    if (!user?.company) {
      return NextResponse.json(
        { error: "Empresa no encontrada" },
        { status: 404 }
      )
    }

    // Si no tiene suscripción, devolver datos básicos
    let subscriptionData = null
    if (user.company.subscription) {
      const subscription = user.company.subscription
      
      // Calcular límites según el plan
      const planLimits = getPlanLimits(subscription.plan)
      
      // Simular uso de reportes (en el futuro esto vendrá de una tabla de uso real)
      const reportsUsed = Math.floor(Math.random() * planLimits.reportsLimit * 0.7)

      subscriptionData = {
        id: subscription.id,
        plan: subscription.plan,
        status: subscription.status,
        currentPeriodStart: subscription.currentPeriodStart,
        currentPeriodEnd: subscription.currentPeriodEnd,
        billingCycle: subscription.billingCycle,
        reportsLimit: planLimits.reportsLimit,
        usersLimit: planLimits.usersLimit,
        reportsUsed: reportsUsed,
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
        canceledAt: subscription.canceledAt,
        createdAt: subscription.createdAt,
        updatedAt: subscription.updatedAt
      }
    }

    console.log('📊 Subscription data retrieved:', {
      companyId: user.company.id,
      hasSubscription: !!user.company.subscription,
      plan: user.company.subscription?.plan || 'none',
      status: user.company.subscription?.status || 'none'
    })

    return NextResponse.json({
      subscription: subscriptionData,
      payments: user.company.payments,
      company: {
        id: user.company.id,
        name: user.company.name,
        email: user.company.email,
      },
    })

  } catch (error) {
    console.error('❌ Subscription fetch error:', error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}

/**
 * Obtiene los límites según el plan de suscripción
 */
function getPlanLimits(plan: string) {
  switch (plan) {
    case 'TRIMESTRAL':
      return {
        reportsLimit: 50,
        usersLimit: 3
      }
    case 'SEMESTRAL':
      return {
        reportsLimit: 100,
        usersLimit: 5
      }
    case 'ANUAL':
      return {
        reportsLimit: 200,
        usersLimit: 10
      }
    default:
      return {
        reportsLimit: 10,
        usersLimit: 1
      }
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    if (session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "Permisos insuficientes" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { action } = body

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { company: { include: { subscription: true } } },
    })

    if (!user?.company?.subscription) {
      return NextResponse.json(
        { error: "Suscripción no encontrada" },
        { status: 404 }
      )
    }

    if (action === 'cancel') {
      const updatedSubscription = await prisma.subscription.update({
        where: { id: user.company.subscription.id },
        data: {
          cancelAtPeriodEnd: true,
          canceledAt: new Date(),
        },
      })

      await prisma.companyActivity.create({
        data: {
          companyId: user.company.id,
          action: 'SUBSCRIPTION_CANCELLED',
          metadata: {
            subscriptionId: updatedSubscription.id,
            cancelledAt: new Date().toISOString(),
          },
        },
      })

      return NextResponse.json({
        subscription: updatedSubscription,
        message: "Suscripción cancelada. Se mantendrá activa hasta el final del período actual.",
      })
    }

    if (action === 'reactivate') {
      const updatedSubscription = await prisma.subscription.update({
        where: { id: user.company.subscription.id },
        data: {
          cancelAtPeriodEnd: false,
          canceledAt: null,
        },
      })

      await prisma.companyActivity.create({
        data: {
          companyId: user.company.id,
          action: 'SUBSCRIPTION_REACTIVATED',
          metadata: {
            subscriptionId: updatedSubscription.id,
            reactivatedAt: new Date().toISOString(),
          },
        },
      })

      return NextResponse.json({
        subscription: updatedSubscription,
        message: "Suscripción reactivada exitosamente.",
      })
    }

    return NextResponse.json(
      { error: "Acción no válida" },
      { status: 400 }
    )

  } catch (error) {
    console.error('Subscription update error:', error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}