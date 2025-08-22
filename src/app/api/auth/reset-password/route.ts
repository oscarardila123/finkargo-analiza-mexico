import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { token, email: rawEmail, password } = await request.json()
    
    // Decode email in case it's URL encoded
    const email = rawEmail ? decodeURIComponent(rawEmail) : null

    if (!token || !email || !password) {
      return NextResponse.json({ message: "Token, email, and password are required" }, { status: 400 })
    }
    
    console.log('🔧 Reset password attempt:', { email, token: token.substring(0, 16) + '...' })

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 })
    }

    // First, let's see what tokens exist for this email
    const allTokensForEmail = await prisma.verificationToken.findMany({
      where: { identifier: email },
      select: { token: true, expires: true, identifier: true }
    })
    console.log('🔍 Tokens existentes para email:', allTokensForEmail.map(t => ({ 
      token: t.token.substring(0, 16) + '...', 
      expires: t.expires,
      identifier: t.identifier
    })))
    
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

    if (!verificationToken) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 })
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

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Update user password
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    })

    // Delete the used token
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token: token,
        },
      },
    })

    // Log the password reset activity
    await prisma.userActivity.create({
      data: {
        userId: user.id,
        action: "PASSWORD_RESET",
        metadata: {
          method: "email_reset",
          timestamp: new Date(),
        },
      },
    })

    return NextResponse.json({ message: "Password reset successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error resetting password:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}