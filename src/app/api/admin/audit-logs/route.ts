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
    const limit = parseInt(searchParams.get('limit') || '50')
    const search = searchParams.get('search') || ''
    const actionFilter = searchParams.get('action') || 'all'
    const typeFilter = searchParams.get('type') || 'all' // user, company, all
    const dateFilter = searchParams.get('dateFilter') || 'all' // today, week, month, all

    // Construir filtros de fecha
    const dateWhere: any = {}
    const now = new Date()

    if (dateFilter === 'today') {
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      dateWhere.createdAt = { gte: startOfDay }
    } else if (dateFilter === 'week') {
      const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      dateWhere.createdAt = { gte: startOfWeek }
    } else if (dateFilter === 'month') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      dateWhere.createdAt = { gte: startOfMonth }
    }

    // Obtener actividades de usuarios
    let userActivities: any[] = []
    let userActivitiesCount = 0

    if (typeFilter === 'all' || typeFilter === 'user') {
      const userWhere: any = { ...dateWhere }

      if (search) {
        userWhere.OR = [
          { action: { contains: search, mode: 'insensitive' } },
          { resource: { contains: search, mode: 'insensitive' } },
          { user: { name: { contains: search, mode: 'insensitive' } } },
          { user: { email: { contains: search, mode: 'insensitive' } } }
        ]
      }

      if (actionFilter !== 'all') {
        userWhere.action = { contains: actionFilter, mode: 'insensitive' }
      }

      userActivitiesCount = await prisma.userActivity.count({ where: userWhere })

      userActivities = await prisma.userActivity.findMany({
        where: userWhere,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              company: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip: typeFilter === 'user' ? (page - 1) * limit : 0,
        take: typeFilter === 'user' ? limit : Math.ceil(limit / 2)
      })
    }

    // Obtener actividades de empresas
    let companyActivities: any[] = []
    let companyActivitiesCount = 0

    if (typeFilter === 'all' || typeFilter === 'company') {
      const companyWhere: any = { ...dateWhere }

      if (search) {
        companyWhere.OR = [
          { action: { contains: search, mode: 'insensitive' } },
          { resource: { contains: search, mode: 'insensitive' } },
          { company: { name: { contains: search, mode: 'insensitive' } } }
        ]
      }

      if (actionFilter !== 'all') {
        companyWhere.action = { contains: actionFilter, mode: 'insensitive' }
      }

      companyActivitiesCount = await prisma.companyActivity.count({ where: companyWhere })

      companyActivities = await prisma.companyActivity.findMany({
        where: companyWhere,
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
        },
        skip: typeFilter === 'company' ? (page - 1) * limit : 0,
        take: typeFilter === 'company' ? limit : Math.ceil(limit / 2)
      })
    }

    // Combinar y formatear actividades
    const allActivities = [
      ...userActivities.map(activity => ({
        id: activity.id,
        type: 'user' as const,
        action: activity.action,
        resource: activity.resource,
        metadata: activity.metadata,
        ipAddress: activity.ipAddress,
        userAgent: activity.userAgent,
        createdAt: activity.createdAt.toISOString(),
        user: activity.user ? {
          id: activity.user.id,
          name: activity.user.name,
          email: activity.user.email,
          role: activity.user.role,
          company: activity.user.company
        } : null,
        company: null
      })),
      ...companyActivities.map(activity => ({
        id: activity.id,
        type: 'company' as const,
        action: activity.action,
        resource: activity.resource,
        metadata: activity.metadata,
        ipAddress: null,
        userAgent: null,
        createdAt: activity.createdAt.toISOString(),
        user: null,
        company: activity.company
      }))
    ]

    // Ordenar por fecha
    allActivities.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    // Limitar resultados
    const paginatedActivities = typeFilter === 'all'
      ? allActivities.slice((page - 1) * limit, page * limit)
      : allActivities.slice(0, limit)

    const totalActivities = typeFilter === 'all'
      ? userActivitiesCount + companyActivitiesCount
      : typeFilter === 'user'
        ? userActivitiesCount
        : companyActivitiesCount

    // Obtener estadísticas
    const stats = {
      totalLogs: totalActivities,
      userLogs: userActivitiesCount,
      companyLogs: companyActivitiesCount,
      todayLogs: await getTodayLogsCount(),
      topActions: await getTopActions()
    }

    return NextResponse.json({
      success: true,
      activities: paginatedActivities,
      pagination: {
        total: totalActivities,
        page,
        limit,
        totalPages: Math.ceil(totalActivities / limit)
      },
      stats
    })
  } catch (error) {
    console.error('Error fetching audit logs:', error)
    return NextResponse.json(
      { error: 'Error al obtener registros de auditoría' },
      { status: 500 }
    )
  }
}

async function getTodayLogsCount(): Promise<number> {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const [userCount, companyCount] = await Promise.all([
    prisma.userActivity.count({
      where: { createdAt: { gte: startOfDay } }
    }),
    prisma.companyActivity.count({
      where: { createdAt: { gte: startOfDay } }
    })
  ])

  return userCount + companyCount
}

async function getTopActions(): Promise<Array<{ action: string, count: number }>> {
  const [userActions, companyActions] = await Promise.all([
    prisma.userActivity.groupBy({
      by: ['action'],
      _count: { action: true },
      orderBy: { _count: { action: 'desc' } },
      take: 5
    }),
    prisma.companyActivity.groupBy({
      by: ['action'],
      _count: { action: true },
      orderBy: { _count: { action: 'desc' } },
      take: 5
    })
  ])

  // Combinar y ordenar
  const actionMap = new Map<string, number>()

  userActions.forEach(item => {
    actionMap.set(item.action, (actionMap.get(item.action) || 0) + item._count.action)
  })

  companyActions.forEach(item => {
    actionMap.set(item.action, (actionMap.get(item.action) || 0) + item._count.action)
  })

  const topActions = Array.from(actionMap.entries())
    .map(([action, count]) => ({ action, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return topActions
}
