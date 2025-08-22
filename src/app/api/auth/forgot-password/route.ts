import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendPasswordResetEmail } from "@/lib/email"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({ message: "If the email exists, a reset link has been sent" }, { status: 200 })
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Delete any existing tokens for this email
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    })

    // Create new verification token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: token,
        expires: expires,
      },
    })

    // Create reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}&email=${encodeURIComponent(email)}`
    
    console.log('🔧 Manual reset - Email:', email)
    console.log('🔧 Manual reset - Token:', token.substring(0, 16) + '...')
    console.log('🔧 Manual reset - URL:', resetUrl.substring(0, 100) + '...')

    // Send email
    await sendPasswordResetEmail(email, resetUrl)

    return NextResponse.json({ message: "If the email exists, a reset link has been sent" }, { status: 200 })
  } catch (error) {
    console.error("Error in forgot password:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}