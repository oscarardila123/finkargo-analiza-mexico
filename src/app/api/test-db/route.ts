import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Try a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`
    
    // Convert BigInt to string for JSON serialization
    const serializedResult = JSON.parse(JSON.stringify(result, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ))
    
    return NextResponse.json({
      status: "success",
      message: "Database connection successful",
      result: serializedResult,
      env: {
        DATABASE_URL: process.env.DATABASE_URL ? "Set" : "Not set",
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "Set" : "Not set",
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      }
    })
  } catch (error) {
    console.error("Database test error:", error)
    return NextResponse.json(
      { 
        status: "error", 
        message: error instanceof Error ? error.message : "Unknown error",
        env: {
          DATABASE_URL: process.env.DATABASE_URL ? "Set" : "Not set",
          NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "Set" : "Not set",
          NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        }
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}