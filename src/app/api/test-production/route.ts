import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    console.log('🔍 Testing production database connection...')
    
    // Test basic connection
    await prisma.$connect()
    console.log('✅ Database connected')
    
    // Test users table
    const userCount = await prisma.user.count()
    console.log(`👥 Users in database: ${userCount}`)
    
    // Test companies table
    const companyCount = await prisma.company.count()
    console.log(`🏢 Companies in database: ${companyCount}`)
    
    // Test verificationtokens table
    const tokenCount = await prisma.verificationToken.count()
    console.log(`🎫 Verification tokens: ${tokenCount}`)
    
    // Test if we can find a specific user
    const testUser = await prisma.user.findFirst({
      include: { company: true }
    })
    console.log('🔍 Sample user found:', testUser ? 'YES' : 'NO')
    
    // Test environment variables
    const envStatus = {
      DATABASE_URL: !!process.env.DATABASE_URL,
      NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      EMAIL_FROM: process.env.EMAIL_FROM,
    }
    console.log('🔧 Environment variables:', envStatus)
    
    return NextResponse.json({
      status: 'OK',
      database: {
        connected: true,
        users: userCount,
        companies: companyCount,
        tokens: tokenCount,
        sampleUser: !!testUser
      },
      environment: envStatus,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('❌ Production test error:', error)
    return NextResponse.json({
      status: 'ERROR',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}