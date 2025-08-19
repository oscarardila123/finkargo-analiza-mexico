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
    let tablesAccessible = true
    let tableErrors = []
    
    try {
      const companies = await prisma.company.findFirst()
      console.log("Companies table accessible:", true)
    } catch (error) {
      console.log("Companies table accessible:", false, error.message)
      tablesAccessible = false
      tableErrors.push("companies: " + error.message)
    }
    
    try {
      const users = await prisma.user.findFirst()
      console.log("Users table accessible:", true)
    } catch (error) {
      console.log("Users table accessible:", false, error.message)
      tablesAccessible = false
      tableErrors.push("users: " + error.message)
    }
    
    try {
      const subscriptions = await prisma.subscription.findFirst()
      console.log("Subscriptions table accessible:", true)
    } catch (error) {
      console.log("Subscriptions table accessible:", false, error.message)
      tablesAccessible = false
      tableErrors.push("subscriptions: " + error.message)
    }
    
    return NextResponse.json({
      status: tablesAccessible ? "debug_success" : "debug_partial",
      message: tablesAccessible ? "All database checks passed" : "Database connected but tables have issues",
      receivedData: {
        companyName: body.companyName,
        email: body.email,
        hasPassword: !!body.password
      },
      database: {
        connected: true,
        tablesAccessible: tablesAccessible,
        tableErrors: tableErrors
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