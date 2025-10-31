import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { CompanySize } from "@/generated/prisma"
import { sendWelcomeEmail } from "@/lib/email"
import { createHubSpotRegistration } from "@/lib/hubspot"

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      password,
      companyName,
      companyEmail,
      nit,
      address,
      city,
      phone,
      website,
      industryType,
      companySize,
      annualImportValue,
      isComceMember,
      comceMemberNumber,
    } = body

    // Validaciones estrictas de campos requeridos
    if (
      typeof name !== 'string' || !name.trim() ||
      typeof email !== 'string' || !email.trim() ||
      typeof password !== 'string' || !password.trim() ||
      typeof companyName !== 'string' || !companyName.trim() ||
      typeof companyEmail !== 'string' || !companyEmail.trim()
    ) {
      return NextResponse.json(
        { message: "Faltan campos obligatorios o son inválidos" },
        { status: 400 }
      )
    }
    if (!isValidEmail(email) || !isValidEmail(companyEmail)) {
      return NextResponse.json(
        { message: "Formato de correo electrónico inválido" },
        { status: 400 }
      )
    }
    if (password.length < 8) {
      return NextResponse.json(
        { message: "La contraseña debe tener al menos 8 caracteres" },
        { status: 400 }
      )
    }

    // Normalizar emails para evitar duplicados
    const normalizedEmail = email.trim().toLowerCase()
    const normalizedCompanyEmail = companyEmail.trim().toLowerCase()

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    })
    if (existingUser) {
      return NextResponse.json(
        { message: "Ya existe un usuario con este correo electrónico" },
        { status: 400 }
      )
    }
    const existingCompany = await prisma.company.findUnique({
      where: { email: normalizedCompanyEmail }
    })
    if (existingCompany) {
      return NextResponse.json(
        { message: "Ya existe una empresa con este correo electrónico" },
        { status: 400 }
      )
    }
    if (nit && typeof nit === 'string' && nit.trim()) {
      const existingNit = await prisma.company.findUnique({
        where: { nit: nit.trim() }
      })
      if (existingNit) {
        return NextResponse.json(
          { message: "Ya existe una empresa con este NIT" },
          { status: 400 }
        )
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const trialEndDate = new Date()
    trialEndDate.setDate(trialEndDate.getDate() + 14)

    const result = await prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          name: companyName.trim(),
          email: normalizedCompanyEmail,
          nit: nit && typeof nit === 'string' ? nit.trim() : null,
          address: address && typeof address === 'string' ? address.trim() : null,
          city: city && typeof city === 'string' ? city.trim() : null,
          country: "México", // País para plataforma México
          phone: phone && typeof phone === 'string' ? phone.trim() : null,
          website: website && typeof website === 'string' ? website.trim() : null,
          industryType: industryType && typeof industryType === 'string' ? industryType.trim() : null,
          companySize: companySize ? (companySize as CompanySize) : null,
          annualImportValue: annualImportValue ? parseFloat(annualImportValue) : null,
          isComceMember: Boolean(isComceMember),
          comceMemberNumber: comceMemberNumber && typeof comceMemberNumber === 'string' ? comceMemberNumber.trim() : null,
        },
      })
      const subscription = await tx.subscription.create({
        data: {
          companyId: company.id,
          plan: "BASIC",
          status: "TRIAL",
          currentPeriodStart: new Date(),
          currentPeriodEnd: trialEndDate,
          trialEndsAt: trialEndDate,
          reportsLimit: 5,
        },
      })
      await tx.company.update({
        where: { id: company.id },
        data: { subscriptionId: subscription.id },
      })
      const user = await tx.user.create({
        data: {
          name: name.trim(),
          email: normalizedEmail,
          password: hashedPassword,
          role: "VIEWER",
          companyId: company.id,
        },
      })
      await tx.companyActivity.create({
        data: {
          companyId: company.id,
          action: "COMPANY_CREATED",
          metadata: {
            plan: "BASIC",
            trialDays: 14,
          },
        },
      })
      await tx.userActivity.create({
        data: {
          userId: user.id,
          action: "USER_REGISTERED",
          metadata: {
            role: "VIEWER",
            registrationMethod: "email",
          },
        },
      })
      return { user, company, subscription }
    })

    // Enviar email de bienvenida de forma asíncrona
    const includeComceInfo = result.company.isComceMember && result.company.comceMemberNumber
    sendWelcomeEmail(
      result.user.email,
      result.user.name || '',
      includeComceInfo
    ).catch((error) => {
      console.error('Failed to send welcome email:', error)
    })

    // Create contact and company in HubSpot for lead tracking
    // This is non-blocking - registration will succeed even if HubSpot fails
    try {
      console.log('📤 Creating HubSpot registration for:', result.user.email)
      const hubspotResult = await createHubSpotRegistration({
        name: result.user.name || '',
        email: result.user.email,
        phone: phone || undefined,
        companyName: result.company.name,
        companyEmail: result.company.email,
        nit: result.company.nit || undefined,
        city: result.company.city || undefined,
        website: result.company.website || undefined,
        country: result.company.country || 'México',
      })

      if (hubspotResult.contactId) {
        console.log('✅ HubSpot contact created:', hubspotResult.contactId)
      }
      if (hubspotResult.companyId) {
        console.log('✅ HubSpot company created:', hubspotResult.companyId)
      }
    } catch (hubspotError) {
      // IMPORTANT: Do not fail registration if HubSpot fails
      console.error('❌ Error creating HubSpot registration:', hubspotError)
    }

    return NextResponse.json({
      message: "Cuenta creada exitosamente",
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    )
  }
}