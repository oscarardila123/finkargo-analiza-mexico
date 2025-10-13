import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { CompanySize } from "@/generated/prisma"
import { sendWelcomeEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    console.log('🔧 Registration attempt started')
    const body = await request.json()
    console.log('🔧 Request body received')
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
    } = body

    if (!name || !email || !password || !companyName || !companyEmail) {
      return NextResponse.json(
        { message: "Faltan campos obligatorios" },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: "Ya existe un usuario con este correo electrónico" },
        { status: 400 }
      )
    }

    const existingCompany = await prisma.company.findUnique({
      where: { email: companyEmail }
    })

    if (existingCompany) {
      return NextResponse.json(
        { message: "Ya existe una empresa con este correo electrónico" },
        { status: 400 }
      )
    }

    if (nit) {
      const existingNit = await prisma.company.findUnique({
        where: { nit }
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
    trialEndDate.setDate(trialEndDate.getDate() + 14) // 14 days trial

    const result = await prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          name: companyName,
          email: companyEmail,
          nit: nit || null,
          address: address || null,
          city: city || null,
          phone: phone || null,
          website: website || null,
          industryType: industryType || null,
          companySize: (companySize as CompanySize) || "SMALL",
          annualImportValue: annualImportValue ? parseFloat(annualImportValue) : null,
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
          reportsLimit: 5, // Trial limit
        },
      })

      await tx.company.update({
        where: { id: company.id },
        data: { subscriptionId: subscription.id },
      })

      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "VIEWER", // New users start as VIEWER, only admin can upgrade
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

    // Send welcome email asynchronously (don't block the response)
    sendWelcomeEmail(result.user.email, result.user.name).catch((error) => {
      console.error('Failed to send welcome email:', error)
      // Don't fail the registration if email fails
    })

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