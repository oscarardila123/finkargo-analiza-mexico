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

    // Obtener parámetros de paginación y filtrado
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const search = searchParams.get('search') || ''
    const statusFilter = searchParams.get('status') || 'all'
    const planFilter = searchParams.get('plan') || 'all'

    // Construir el filtro where
    const where: any = {}

    // Filtro de búsqueda
    if (search) {
      where.OR = [
        { company: { name: { contains: search, mode: 'insensitive' } } },
        { company: { email: { contains: search, mode: 'insensitive' } } },
        { company: { users: { some: { email: { contains: search, mode: 'insensitive' } } } } }
      ]
    }

    // Filtro por estado
    if (statusFilter !== 'all') {
      where.status = statusFilter
    }

    // Filtro por plan
    if (planFilter !== 'all') {
      where.plan = planFilter
    }

    // Contar total de registros
    const totalSubscriptions = await prisma.subscription.count({ where })

    // Calcular skip
    const skip = (page - 1) * limit

    // Obtener suscripciones paginadas
    const subscriptions = await prisma.subscription.findMany({
      where,
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
      },
      skip,
      take: limit
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
      pagination: {
        total: totalSubscriptions,
        page,
        limit,
        totalPages: Math.ceil(totalSubscriptions / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(
      { error: 'Error al obtener suscripciones' },
      { status: 500 }
    )
  }
}