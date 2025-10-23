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
    const dateFilter = searchParams.get('dateFilter') || 'all'

    // Construir el filtro where
    const where: any = {}

    // Filtro de búsqueda
    if (search) {
      where.OR = [
        { company: { name: { contains: search, mode: 'insensitive' } } },
        { customerEmail: { contains: search, mode: 'insensitive' } },
        { wompiReference: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Filtro por estado
    if (statusFilter !== 'all') {
      where.status = statusFilter
    }

    // Filtro por fecha
    if (dateFilter !== 'all') {
      const now = new Date()
      switch (dateFilter) {
        case 'today':
          where.createdAt = {
            gte: new Date(now.setHours(0, 0, 0, 0))
          }
          break
        case 'week':
          const weekAgo = new Date()
          weekAgo.setDate(weekAgo.getDate() - 7)
          where.createdAt = { gte: weekAgo }
          break
        case 'month':
          const monthAgo = new Date()
          monthAgo.setMonth(monthAgo.getMonth() - 1)
          where.createdAt = { gte: monthAgo }
          break
      }
    }

    // Contar total de registros
    const totalPayments = await prisma.payment.count({ where })

    // Calcular skip
    const skip = (page - 1) * limit

    // Obtener pagos paginados
    const payments = await prisma.payment.findMany({
      where,
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
      skip,
      take: limit
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
      pagination: {
        total: totalPayments,
        page,
        limit,
        totalPages: Math.ceil(totalPayments / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching payments:', error)
    return NextResponse.json(
      { error: 'Error al obtener pagos' },
      { status: 500 }
    )
  }
}