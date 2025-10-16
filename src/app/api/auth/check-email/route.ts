import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        { error: 'El correo electrónico es requerido' },
        { status: 400 }
      )
    }

    // Check if user exists with this email
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    })

    if (existingUser) {
      return NextResponse.json(
        {
          exists: true,
          message: 'Este correo electrónico ya está registrado. Por favor inicia sesión o usa otro correo.'
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { exists: false },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error checking email:', error)
    return NextResponse.json(
      { error: 'Error al verificar el correo electrónico' },
      { status: 500 }
    )
  }
}
