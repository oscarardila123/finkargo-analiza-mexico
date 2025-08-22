import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")
  const email = searchParams.get("email") ? decodeURIComponent(searchParams.get("email")!) : null

  if (!token || !email) {
    return NextResponse.json({ message: "Token and email are required" }, { status: 400 })
  }

  try {
    console.log('🔍 Verificando token:', { email, token: token.substring(0, 16) + '...' })
    
    // First, let's see what tokens exist for this email
    const allTokensForEmail = await prisma.verificationToken.findMany({
      where: { identifier: email },
      select: { token: true, expires: true, identifier: true }
    })
    console.log('🔍 Tokens existentes para email:', allTokensForEmail.map(t => ({ 
      token: t.token, 
      expires: t.expires,
      identifier: t.identifier
    })))
    
    console.log('🔍 Buscando token exacto:', token)
    
    // Find the verification token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: email,
          token: token,
        },
      },
    })
    
    console.log('🔍 Token encontrado:', verificationToken ? 'SÍ' : 'NO')
    if (verificationToken) {
      console.log('🔍 Token details:', { expires: verificationToken.expires, now: new Date() })
    }

    if (!verificationToken) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 })
    }

    // Check if token is expired
    if (verificationToken.expires < new Date()) {
      // Delete expired token
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: email,
            token: token,
          },
        },
      })
      return NextResponse.json({ message: "Token expired" }, { status: 400 })
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Token is valid" }, { status: 200 })
  } catch (error) {
    console.error("Error verifying reset token:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}