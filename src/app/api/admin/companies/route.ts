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
    const comceFilter = searchParams.get('comce') || 'all'

    // Construir el filtro where
    const where: any = {}

    // Filtro de búsqueda
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { nit: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Filtro por estado activo/inactivo
    if (statusFilter !== 'all') {
      where.isActive = statusFilter === 'active'
    }

    // Filtro por membresía COMCE
    if (comceFilter !== 'all') {
      where.isComceMember = comceFilter === 'member'
    }

    // Contar total de registros
    const totalCompanies = await prisma.company.count({ where })

    // Calcular skip
    const skip = (page - 1) * limit

    // Obtener empresas paginadas
    const companies = await prisma.company.findMany({
      where,
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
            lastLoginAt: true
          }
        },
        subscription: {
          select: {
            id: true,
            plan: true,
            status: true,
            currentPeriodEnd: true,
            billingCycle: true
          }
        },
        _count: {
          select: {
            users: true,
            payments: true,
            reports: true
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
    const formattedCompanies = companies.map(company => ({
      id: company.id,
      name: company.name,
      email: company.email,
      nit: company.nit,
      address: company.address,
      city: company.city,
      country: company.country,
      phone: company.phone,
      website: company.website,
      industryType: company.industryType,
      companySize: company.companySize,
      annualImportValue: company.annualImportValue,
      isActive: company.isActive,
      isComceMember: company.isComceMember,
      comceMemberNumber: company.comceMemberNumber,
      createdAt: company.createdAt.toISOString(),
      updatedAt: company.updatedAt.toISOString(),
      users: company.users.map(user => ({
        ...user,
        lastLoginAt: user.lastLoginAt?.toISOString() || null
      })),
      subscription: company.subscription ? {
        ...company.subscription,
        currentPeriodEnd: company.subscription.currentPeriodEnd.toISOString()
      } : null,
      stats: {
        totalUsers: company._count.users,
        totalPayments: company._count.payments,
        totalReports: company._count.reports
      }
    }))

    return NextResponse.json({
      success: true,
      companies: formattedCompanies,
      pagination: {
        total: totalCompanies,
        page,
        limit,
        totalPages: Math.ceil(totalCompanies / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json(
      { error: 'Error al obtener empresas' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Verificar que el usuario esté autenticado y sea admin
    const session = await getServerSession(authOptions)

    if (!session || (session.user as any)?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { companyId, ...updateData } = body

    if (!companyId) {
      return NextResponse.json(
        { error: 'ID de empresa requerido' },
        { status: 400 }
      )
    }

    // Actualizar la empresa
    const updatedCompany = await prisma.company.update({
      where: { id: companyId },
      data: updateData,
      include: {
        users: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        },
        subscription: true
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Empresa actualizada correctamente',
      company: {
        id: updatedCompany.id,
        name: updatedCompany.name,
        email: updatedCompany.email,
        isActive: updatedCompany.isActive,
        users: updatedCompany.users,
        subscription: updatedCompany.subscription
      }
    })
  } catch (error) {
    console.error('Error updating company:', error)
    return NextResponse.json(
      { error: 'Error al actualizar empresa' },
      { status: 500 }
    )
  }
}
