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

    // Obtener estadísticas generales
    const [
      totalUsers,
      totalCompanies,
      activeSubscriptions,
      totalPayments,
      completedPayments,
      recentActivities
    ] = await Promise.all([
      // Total de usuarios
      prisma.user.count(),
      
      // Total de empresas
      prisma.company.count(),
      
      // Suscripciones activas
      prisma.subscription.count({
        where: {
          status: 'ACTIVE'
        }
      }),
      
      // Total de pagos
      prisma.payment.count(),
      
      // Pagos completados con su suma
      prisma.payment.aggregate({
        where: {
          status: 'COMPLETED'
        },
        _sum: {
          amount: true
        },
        _count: true
      }),
      
      // Actividades recientes
      prisma.userActivity.findMany({
        take: 10,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              company: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      })
    ])

    // Calcular ingresos del mes actual
    const currentMonth = new Date()
    currentMonth.setDate(1)
    currentMonth.setHours(0, 0, 0, 0)
    
    const monthlyRevenue = await prisma.payment.aggregate({
      where: {
        status: 'COMPLETED',
        createdAt: {
          gte: currentMonth
        }
      },
      _sum: {
        amount: true
      }
    })

    // Formatear actividades recientes
    const formattedActivities = recentActivities.map(activity => {
      let description = ''
      let type = 'general'
      
      switch (activity.action) {
        case 'USER_REGISTERED':
          description = `Nuevo usuario registrado: ${activity.user.email}`
          type = 'user_registered'
          break
        case 'USER_LOGIN':
          description = `${activity.user.name || activity.user.email} inició sesión`
          type = 'user_login'
          break
        case 'USER_LOGOUT':
          description = `${activity.user.name || activity.user.email} cerró sesión`
          type = 'user_logout'
          break
        case 'PAYMENT_CREATED':
          description = `Nuevo pago creado por ${activity.user.company?.name || 'Empresa'}`
          type = 'payment_created'
          break
        case 'SUBSCRIPTION_CREATED':
          description = `Nueva suscripción creada para ${activity.user.company?.name || 'Empresa'}`
          type = 'subscription_created'
          break
        default:
          description = `${activity.user.name || activity.user.email} - ${activity.action}`
          type = 'general'
      }
      
      return {
        id: activity.id,
        type,
        description,
        timestamp: activity.createdAt.toISOString(),
        metadata: activity.metadata
      }
    })

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalCompanies,
        activeSubscriptions,
        totalRevenue: completedPayments._sum.amount || 0,
        monthlyRevenue: monthlyRevenue._sum.amount || 0,
        totalPayments: completedPayments._count
      },
      recentActivity: formattedActivities
    })
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return NextResponse.json(
      { error: 'Error al obtener datos del dashboard' },
      { status: 500 }
    )
  }
}