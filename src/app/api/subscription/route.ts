import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        company: {
          include: {
            subscription: true,
            payments: {
              orderBy: { createdAt: 'desc' },
              take: 5,
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

    return NextResponse.json({
      subscription: user.company.subscription,
      payments: user.company.payments,
      company: {
        id: user.company.id,
        name: user.company.name,
        email: user.company.email,
      },
    })

  } catch (error) {
    console.error('Subscription fetch error:', error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
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