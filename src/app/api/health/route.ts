import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const dbUrl = process.env.DATABASE_URL
    
    // Try to connect to the database
    await prisma.$connect()
    
    // Try a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`
    
    // Test if tables exist
    let tablesStatus = {}
    
    try {
      await prisma.company.findFirst()
      tablesStatus.companies = "accessible"
    } catch (error) {
      tablesStatus.companies = error instanceof Error ? error.message : "error"
    }
    
    try {
      await prisma.user.findFirst()
      tablesStatus.users = "accessible"
    } catch (error) {
      tablesStatus.users = error instanceof Error ? error.message : "error"
    }
    
    try {
      await prisma.subscription.findFirst()
      tablesStatus.subscriptions = "accessible"
    } catch (error) {
      tablesStatus.subscriptions = error instanceof Error ? error.message : "error"
    }
    
    return NextResponse.json({
      status: "healthy",
      database: {
        url: dbUrl ? `${dbUrl.substring(0, 20)}...` : "undefined",
        connection: "successful",
        query_result: result,
        tables: tablesStatus
      },
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error("Health check error:", error)
    return NextResponse.json({
      status: "unhealthy",
      database: {
        url: process.env.DATABASE_URL ? `${process.env.DATABASE_URL.substring(0, 20)}...` : "undefined",
        connection: "failed",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}