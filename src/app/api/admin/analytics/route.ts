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

    // Obtener parámetros
    const searchParams = request.nextUrl.searchParams
    const period = searchParams.get('period') || '30' // days

    const periodDays = parseInt(period)
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - periodDays)

    // Obtener métricas generales
    const [
      totalCompanies,
      activeCompanies,
      totalUsers,
      activeUsers,
      totalSubscriptions,
      activeSubscriptions,
      totalPayments,
      completedPayments,
      totalReports
    ] = await Promise.all([
      prisma.company.count(),
      prisma.company.count({ where: { isActive: true } }),
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.subscription.count(),
      prisma.subscription.count({ where: { status: 'ACTIVE' } }),
      prisma.payment.count(),
      prisma.payment.count({ where: { status: 'COMPLETED' } }),
      prisma.report.count()
    ])

    // Calcular ingresos totales
    const paymentsData = await prisma.payment.findMany({
      where: { status: 'COMPLETED' },
      select: { amount: true }
    })
    const totalRevenue = paymentsData.reduce((sum, payment) => sum + payment.amount, 0)

    // Ingresos del período
    const periodPayments = await prisma.payment.findMany({
      where: {
        status: 'COMPLETED',
        paidAt: { gte: startDate }
      },
      select: { amount: true }
    })
    const periodRevenue = periodPayments.reduce((sum, payment) => sum + payment.amount, 0)

    // Crecimiento de usuarios por día
    const userGrowth = await getUserGrowthData(periodDays)

    // Crecimiento de empresas por día
    const companyGrowth = await getCompanyGrowthData(periodDays)

    // Ingresos por día
    const revenueByDay = await getRevenueByDay(periodDays)

    // Distribución de suscripciones por plan
    const subscriptionsByPlan = await prisma.subscription.groupBy({
      by: ['plan'],
      _count: { plan: true },
      where: { status: 'ACTIVE' }
    })

    // Distribución de suscripciones por estado
    const subscriptionsByStatus = await prisma.subscription.groupBy({
      by: ['status'],
      _count: { status: true }
    })

    // Top empresas por número de usuarios
    const topCompaniesByUsers = await prisma.company.findMany({
      include: {
        _count: {
          select: { users: true, reports: true, payments: true }
        }
      },
      orderBy: {
        users: {
          _count: 'desc'
        }
      },
      take: 10
    })

    // Top empresas por ingresos
    const companiesWithRevenue = await prisma.company.findMany({
      include: {
        payments: {
          where: { status: 'COMPLETED' },
          select: { amount: true }
        },
        _count: {
          select: { users: true, reports: true }
        }
      }
    })

    const topCompaniesByRevenue = companiesWithRevenue
      .map(company => ({
        id: company.id,
        name: company.name,
        email: company.email,
        revenue: company.payments.reduce((sum, p) => sum + p.amount, 0),
        userCount: company._count.users,
        reportCount: company._count.reports
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10)

    // Reportes generados por mes
    const reportsGenerated = await getReportsGeneratedByMonth(6) // últimos 6 meses

    // Tasa de conversión de trial a pago
    const trialSubscriptions = await prisma.subscription.count({
      where: { status: 'TRIAL' }
    })
    const paidSubscriptions = activeSubscriptions
    const conversionRate = totalSubscriptions > 0
      ? ((paidSubscriptions / totalSubscriptions) * 100).toFixed(2)
      : '0'

    // Actividad reciente
    const recentActivity = await getRecentActivity()

    // Churn rate (últimos 30 días)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const canceledSubscriptions = await prisma.subscription.count({
      where: {
        status: 'CANCELED',
        canceledAt: { gte: thirtyDaysAgo }
      }
    })

    const churnRate = totalSubscriptions > 0
      ? ((canceledSubscriptions / totalSubscriptions) * 100).toFixed(2)
      : '0'

    // MRR (Monthly Recurring Revenue) - estimación basada en suscripciones activas
    const activeSubscriptionsWithPrices = await prisma.subscription.findMany({
      where: { status: 'ACTIVE' },
      select: { priceMonthly: true, priceYearly: true, billingCycle: true }
    })

    const mrr = activeSubscriptionsWithPrices.reduce((sum, sub) => {
      if (sub.billingCycle === 'MONTHLY' && sub.priceMonthly) {
        return sum + sub.priceMonthly
      } else if (sub.billingCycle === 'YEARLY' && sub.priceYearly) {
        return sum + (sub.priceYearly / 12)
      }
      return sum
    }, 0)

    // Tasa de éxito de pagos
    const paymentSuccessRate = totalPayments > 0
      ? ((completedPayments / totalPayments) * 100).toFixed(2)
      : '0'

    // Distribución de tamaños de empresa
    const companySizeDistribution = await prisma.company.groupBy({
      by: ['companySize'],
      _count: { companySize: true }
    })

    // Membresía COMCE
    const comceMembers = await prisma.company.count({
      where: { isComceMember: true }
    })

    return NextResponse.json({
      success: true,
      analytics: {
        overview: {
          totalCompanies,
          activeCompanies,
          totalUsers,
          activeUsers,
          totalSubscriptions,
          activeSubscriptions,
          trialSubscriptions,
          totalPayments,
          completedPayments,
          totalReports,
          totalRevenue,
          periodRevenue,
          mrr,
          conversionRate: parseFloat(conversionRate),
          churnRate: parseFloat(churnRate),
          paymentSuccessRate: parseFloat(paymentSuccessRate),
          comceMembers
        },
        growth: {
          userGrowth,
          companyGrowth,
          revenueByDay
        },
        distribution: {
          subscriptionsByPlan: subscriptionsByPlan.map(item => ({
            plan: item.plan,
            count: item._count.plan
          })),
          subscriptionsByStatus: subscriptionsByStatus.map(item => ({
            status: item.status,
            count: item._count.status
          })),
          companySizeDistribution: companySizeDistribution.map(item => ({
            size: item.companySize,
            count: item._count.companySize
          }))
        },
        topPerformers: {
          topCompaniesByUsers: topCompaniesByUsers.map(company => ({
            id: company.id,
            name: company.name,
            email: company.email,
            userCount: company._count.users,
            reportCount: company._count.reports,
            paymentCount: company._count.payments,
            isComceMember: company.isComceMember
          })),
          topCompaniesByRevenue
        },
        reports: {
          reportsGenerated
        },
        recentActivity
      }
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Error al obtener analíticas' },
      { status: 500 }
    )
  }
}

async function getUserGrowthData(days: number) {
  const data: Array<{ date: string; count: number; cumulative: number }> = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)

    const count = await prisma.user.count({
      where: {
        createdAt: {
          gte: startOfDay,
          lt: endOfDay
        }
      }
    })

    const cumulative = await prisma.user.count({
      where: {
        createdAt: { lte: endOfDay }
      }
    })

    data.push({
      date: startOfDay.toISOString().split('T')[0],
      count,
      cumulative
    })
  }

  return data
}

async function getCompanyGrowthData(days: number) {
  const data: Array<{ date: string; count: number; cumulative: number }> = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)

    const count = await prisma.company.count({
      where: {
        createdAt: {
          gte: startOfDay,
          lt: endOfDay
        }
      }
    })

    const cumulative = await prisma.company.count({
      where: {
        createdAt: { lte: endOfDay }
      }
    })

    data.push({
      date: startOfDay.toISOString().split('T')[0],
      count,
      cumulative
    })
  }

  return data
}

async function getRevenueByDay(days: number) {
  const data: Array<{ date: string; amount: number; cumulative: number }> = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)

    const payments = await prisma.payment.findMany({
      where: {
        status: 'COMPLETED',
        paidAt: {
          gte: startOfDay,
          lt: endOfDay
        }
      },
      select: { amount: true }
    })

    const amount = payments.reduce((sum, p) => sum + p.amount, 0)

    const cumulativePayments = await prisma.payment.findMany({
      where: {
        status: 'COMPLETED',
        paidAt: { lte: endOfDay }
      },
      select: { amount: true }
    })

    const cumulative = cumulativePayments.reduce((sum, p) => sum + p.amount, 0)

    data.push({
      date: startOfDay.toISOString().split('T')[0],
      amount,
      cumulative
    })
  }

  return data
}

async function getReportsGeneratedByMonth(months: number) {
  const data: Array<{ month: string; count: number }> = []
  const today = new Date()

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1)

    const count = await prisma.report.count({
      where: {
        createdAt: {
          gte: startOfMonth,
          lt: endOfMonth
        }
      }
    })

    const monthName = new Intl.DateTimeFormat('es-CO', { month: 'short', year: 'numeric' }).format(date)

    data.push({
      month: monthName,
      count
    })
  }

  return data
}

async function getRecentActivity() {
  const [recentUsers, recentCompanies, recentPayments, recentReports] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        company: { select: { name: true } }
      }
    }),
    prisma.company.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    }),
    prisma.payment.findMany({
      where: { status: 'COMPLETED' },
      orderBy: { paidAt: 'desc' },
      take: 5,
      select: {
        id: true,
        amount: true,
        paidAt: true,
        company: { select: { name: true } }
      }
    }),
    prisma.report.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        type: true,
        createdAt: true,
        company: { select: { name: true } },
        user: { select: { name: true, email: true } }
      }
    })
  ])

  return {
    recentUsers: recentUsers.map(user => ({
      ...user,
      createdAt: user.createdAt.toISOString()
    })),
    recentCompanies: recentCompanies.map(company => ({
      ...company,
      createdAt: company.createdAt.toISOString()
    })),
    recentPayments: recentPayments.map(payment => ({
      ...payment,
      paidAt: payment.paidAt?.toISOString() || null
    })),
    recentReports: recentReports.map(report => ({
      ...report,
      createdAt: report.createdAt.toISOString()
    }))
  }
}
