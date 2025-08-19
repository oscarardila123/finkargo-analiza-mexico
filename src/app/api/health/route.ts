import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const dbUrl = process.env.DATABASE_URL
    
    // Try to connect to the database
    await prisma.$connect()
    
    // Try a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`
    
    return NextResponse.json({
      status: "healthy",
      database: {
        url: dbUrl ? `${dbUrl.substring(0, 20)}...` : "undefined",
        connection: "successful",
        query_result: result
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