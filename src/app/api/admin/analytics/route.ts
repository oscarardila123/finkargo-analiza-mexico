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

    // Calcular ingresos totales usando agregación
    const totalRevenueResult = await prisma.payment.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { amount: true }
    })
    const totalRevenue = totalRevenueResult._sum.amount || 0

    // Ingresos del período usando agregación
    const periodRevenueResult = await prisma.payment.aggregate({
      where: {
        status: 'COMPLETED',
        paidAt: { gte: startDate }
      },
      _sum: { amount: true }
    })
    const periodRevenue = periodRevenueResult._sum.amount || 0

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

    // Top empresas por ingresos - optimizado con agregación
    const topCompaniesByRevenue = await getTopCompaniesByRevenue()

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
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  // Obtener usuarios creados en el período
  const users = await prisma.user.findMany({
    where: { createdAt: { gte: startDate } },
    select: { createdAt: true },
    orderBy: { createdAt: 'asc' }
  })

  // Obtener total de usuarios existentes antes del período para calcular acumulado
  const usersBeforePeriod = await prisma.user.count({
    where: { createdAt: { lt: startDate } }
  })

  // Agrupar por fecha
  const dataMap = new Map<string, number>()
  users.forEach(user => {
    const date = user.createdAt.toISOString().split('T')[0]
    dataMap.set(date, (dataMap.get(date) || 0) + 1)
  })

  // Construir serie temporal completa
  const data: Array<{ date: string; count: number; cumulative: number }> = []
  let cumulative = usersBeforePeriod

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    const count = dataMap.get(dateStr) || 0
    cumulative += count
    data.push({ date: dateStr, count, cumulative })
  }

  return data
}

async function getCompanyGrowthData(days: number) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  // Obtener empresas creadas en el período
  const companies = await prisma.company.findMany({
    where: { createdAt: { gte: startDate } },
    select: { createdAt: true },
    orderBy: { createdAt: 'asc' }
  })

  // Obtener total de empresas existentes antes del período para calcular acumulado
  const companiesBeforePeriod = await prisma.company.count({
    where: { createdAt: { lt: startDate } }
  })

  // Agrupar por fecha
  const dataMap = new Map<string, number>()
  companies.forEach(company => {
    const date = company.createdAt.toISOString().split('T')[0]
    dataMap.set(date, (dataMap.get(date) || 0) + 1)
  })

  // Construir serie temporal completa
  const data: Array<{ date: string; count: number; cumulative: number }> = []
  let cumulative = companiesBeforePeriod

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    const count = dataMap.get(dateStr) || 0
    cumulative += count
    data.push({ date: dateStr, count, cumulative })
  }

  return data
}

async function getRevenueByDay(days: number) {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  // Obtener pagos completados en el período
  const payments = await prisma.payment.findMany({
    where: {
      status: 'COMPLETED',
      paidAt: { gte: startDate }
    },
    select: { amount: true, paidAt: true },
    orderBy: { paidAt: 'asc' }
  })

  // Obtener total de ingresos antes del período para calcular acumulado
  const revenueBeforePeriodResult = await prisma.payment.aggregate({
    where: {
      status: 'COMPLETED',
      paidAt: { lt: startDate }
    },
    _sum: { amount: true }
  })
  const revenueBeforePeriod = revenueBeforePeriodResult._sum.amount || 0

  // Agrupar por fecha
  const dataMap = new Map<string, number>()
  payments.forEach(payment => {
    if (payment.paidAt) {
      const date = payment.paidAt.toISOString().split('T')[0]
      dataMap.set(date, (dataMap.get(date) || 0) + payment.amount)
    }
  })

  // Construir serie temporal completa
  const data: Array<{ date: string; amount: number; cumulative: number }> = []
  let cumulative = revenueBeforePeriod

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    const amount = dataMap.get(dateStr) || 0
    cumulative += amount
    data.push({ date: dateStr, amount, cumulative })
  }

  return data
}

async function getReportsGeneratedByMonth(months: number) {
  const today = new Date()
  const startDate = new Date(today.getFullYear(), today.getMonth() - months + 1, 1)

  // Obtener todos los reportes en el período
  const reports = await prisma.report.findMany({
    where: { createdAt: { gte: startDate } },
    select: { createdAt: true },
    orderBy: { createdAt: 'asc' }
  })

  // Agrupar por mes
  const dataMap = new Map<string, number>()
  reports.forEach(report => {
    const monthKey = `${report.createdAt.getFullYear()}-${String(report.createdAt.getMonth() + 1).padStart(2, '0')}`
    dataMap.set(monthKey, (dataMap.get(monthKey) || 0) + 1)
  })

  // Construir serie temporal completa
  const data: Array<{ month: string; count: number }> = []
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const monthName = new Intl.DateTimeFormat('es-CO', { month: 'short', year: 'numeric' }).format(date)
    const count = dataMap.get(monthKey) || 0
    data.push({ month: monthName, count })
  }

  return data
}

async function getTopCompaniesByRevenue() {
  // Usar SQL raw para obtener top empresas por ingresos de forma eficiente
  const companiesRevenue = await prisma.$queryRaw<Array<{
    company_id: string
    total_revenue: number
  }>>`
    SELECT
      p."company_id",
      CAST(SUM(p.amount) AS FLOAT) as total_revenue
    FROM "payments" p
    WHERE p.status = 'COMPLETED'
    GROUP BY p."company_id"
    ORDER BY total_revenue DESC
    LIMIT 10
  `

  // Obtener datos de las empresas
  const companyIds = companiesRevenue.map(r => r.company_id)

  const companies = await prisma.company.findMany({
    where: { id: { in: companyIds } },
    include: {
      _count: {
        select: { users: true, reports: true }
      }
    }
  })

  // Combinar datos
  const companyMap = new Map(companies.map(c => [c.id, c]))

  return companiesRevenue
    .map(rev => {
      const company = companyMap.get(rev.company_id)
      if (!company) return null
      return {
        id: company.id,
        name: company.name,
        email: company.email,
        revenue: rev.total_revenue,
        userCount: company._count.users,
        reportCount: company._count.reports
      }
    })
    .filter(c => c !== null) as Array<{
      id: string
      name: string
      email: string
      revenue: number
      userCount: number
      reportCount: number
    }>
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
