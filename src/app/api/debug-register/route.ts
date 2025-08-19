import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Debug register - received data:", body)
    
    // Test database connection
    await prisma.$connect()
    console.log("Database connection successful")
    
    // Test if tables exist
    const companies = await prisma.company.findFirst()
    console.log("Companies table accessible:", companies !== undefined)
    
    const users = await prisma.user.findFirst()
    console.log("Users table accessible:", users !== undefined)
    
    const subscriptions = await prisma.subscription.findFirst()
    console.log("Subscriptions table accessible:", subscriptions !== undefined)
    
    return NextResponse.json({
      status: "debug_success",
      message: "All database checks passed",
      receivedData: {
        companyName: body.companyName,
        email: body.email,
        hasPassword: !!body.password
      },
      database: {
        connected: true,
        tablesAccessible: true
      },
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error("Debug register error:", error)
    return NextResponse.json({
      status: "debug_error",
      message: "Debug failed",
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}