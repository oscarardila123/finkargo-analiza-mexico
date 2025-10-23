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

    // Obtener configuración del sistema
    // Siempre debe haber solo un registro de configuración
    let settings = await prisma.systemSettings.findFirst()

    // Si no existe, crear con valores por defecto
    if (!settings) {
      settings = await prisma.systemSettings.create({
        data: {
          updatedBy: session.user.id
        }
      })
    }

    return NextResponse.json({
      success: true,
      settings: {
        // General Settings
        siteName: settings.siteName,
        siteDescription: settings.siteDescription,
        maintenanceMode: settings.maintenanceMode,
        registrationEnabled: settings.registrationEnabled,

        // Authentication Settings
        requireEmailVerification: settings.requireEmailVerification,
        minPasswordLength: settings.minPasswordLength,
        sessionTimeoutHours: settings.sessionTimeoutHours,
        maxLoginAttempts: settings.maxLoginAttempts,
        lockoutDurationMinutes: settings.lockoutDurationMinutes,

        // Subscription Settings
        trialPeriodDays: settings.trialPeriodDays,
        maxUsersPerCompany: settings.maxUsersPerCompany,
        defaultReportsLimit: settings.defaultReportsLimit,

        // Payment Settings
        wompiSandboxMode: settings.wompiSandboxMode,
        paymentRetryAttempts: settings.paymentRetryAttempts,

        // Email Settings
        emailProvider: settings.emailProvider,
        emailFromName: settings.emailFromName,
        emailFromAddress: settings.emailFromAddress,

        // Metadata
        updatedAt: settings.updatedAt.toISOString(),
        updatedBy: settings.updatedBy
      }
    })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Error al obtener configuración' },
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

    // Validar que haya campos para actualizar
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: 'No hay datos para actualizar' },
        { status: 400 }
      )
    }

    // Obtener configuración existente o crear una nueva
    let settings = await prisma.systemSettings.findFirst()

    if (!settings) {
      // Crear nueva configuración con los datos proporcionados
      settings = await prisma.systemSettings.create({
        data: {
          ...body,
          updatedBy: session.user.id
        }
      })
    } else {
      // Actualizar configuración existente
      settings = await prisma.systemSettings.update({
        where: { id: settings.id },
        data: {
          // General Settings
          ...(body.siteName !== undefined && { siteName: body.siteName }),
          ...(body.siteDescription !== undefined && { siteDescription: body.siteDescription }),
          ...(body.maintenanceMode !== undefined && { maintenanceMode: body.maintenanceMode }),
          ...(body.registrationEnabled !== undefined && { registrationEnabled: body.registrationEnabled }),

          // Authentication Settings
          ...(body.requireEmailVerification !== undefined && { requireEmailVerification: body.requireEmailVerification }),
          ...(body.minPasswordLength !== undefined && { minPasswordLength: body.minPasswordLength }),
          ...(body.sessionTimeoutHours !== undefined && { sessionTimeoutHours: body.sessionTimeoutHours }),
          ...(body.maxLoginAttempts !== undefined && { maxLoginAttempts: body.maxLoginAttempts }),
          ...(body.lockoutDurationMinutes !== undefined && { lockoutDurationMinutes: body.lockoutDurationMinutes }),

          // Subscription Settings
          ...(body.trialPeriodDays !== undefined && { trialPeriodDays: body.trialPeriodDays }),
          ...(body.maxUsersPerCompany !== undefined && { maxUsersPerCompany: body.maxUsersPerCompany }),
          ...(body.defaultReportsLimit !== undefined && { defaultReportsLimit: body.defaultReportsLimit }),

          // Payment Settings
          ...(body.wompiSandboxMode !== undefined && { wompiSandboxMode: body.wompiSandboxMode }),
          ...(body.paymentRetryAttempts !== undefined && { paymentRetryAttempts: body.paymentRetryAttempts }),

          // Email Settings
          ...(body.emailProvider !== undefined && { emailProvider: body.emailProvider }),
          ...(body.emailFromName !== undefined && { emailFromName: body.emailFromName }),
          ...(body.emailFromAddress !== undefined && { emailFromAddress: body.emailFromAddress }),

          updatedBy: session.user.id
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Configuración actualizada correctamente',
      settings: {
        siteName: settings.siteName,
        siteDescription: settings.siteDescription,
        maintenanceMode: settings.maintenanceMode,
        registrationEnabled: settings.registrationEnabled,
        requireEmailVerification: settings.requireEmailVerification,
        minPasswordLength: settings.minPasswordLength,
        sessionTimeoutHours: settings.sessionTimeoutHours,
        maxLoginAttempts: settings.maxLoginAttempts,
        lockoutDurationMinutes: settings.lockoutDurationMinutes,
        trialPeriodDays: settings.trialPeriodDays,
        maxUsersPerCompany: settings.maxUsersPerCompany,
        defaultReportsLimit: settings.defaultReportsLimit,
        wompiSandboxMode: settings.wompiSandboxMode,
        paymentRetryAttempts: settings.paymentRetryAttempts,
        emailProvider: settings.emailProvider,
        emailFromName: settings.emailFromName,
        emailFromAddress: settings.emailFromAddress,
        updatedAt: settings.updatedAt.toISOString(),
        updatedBy: settings.updatedBy
      }
    })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json(
      { error: 'Error al actualizar configuración' },
      { status: 500 }
    )
  }
}
