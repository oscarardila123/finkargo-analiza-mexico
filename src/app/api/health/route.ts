import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Client } from "pg"
import { isProduction, getEnvSnapshot } from "@/lib/runtime-env"

export async function GET() {
  // If query param setup=true, try to create tables first
  try {
    const url = new URL('http://localhost:3000')
    const searchParams = new URLSearchParams(url.search)
    
    if (searchParams.get('setup') === 'true' && process.env.NODE_ENV === 'production') {
      console.log('Attempting to create tables...')
      
      const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
      })
      await client.connect()
      await client.query(`
        CREATE TABLE IF NOT EXISTS companies (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          nit TEXT UNIQUE,
          address TEXT,
          city TEXT,
          country TEXT NOT NULL DEFAULT 'México',
          phone TEXT,
          website TEXT,
          industry_type TEXT,
          company_size TEXT NOT NULL DEFAULT 'SMALL',
          annual_import_value REAL,
          subscription_id TEXT UNIQUE,
          is_active BOOLEAN NOT NULL DEFAULT true,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `)
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          name TEXT,
          email TEXT NOT NULL UNIQUE,
          email_verified TIMESTAMP,
          image TEXT,
          password TEXT,
          role TEXT NOT NULL DEFAULT 'VIEWER',
          company_id TEXT NOT NULL,
          is_active BOOLEAN NOT NULL DEFAULT true,
          last_login_at TIMESTAMP,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `)
      await client.query(`
        CREATE TABLE IF NOT EXISTS subscriptions (
          id TEXT PRIMARY KEY,
          company_id TEXT NOT NULL UNIQUE,
          plan TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'TRIAL',
          current_period_start TIMESTAMP NOT NULL,
          current_period_end TIMESTAMP NOT NULL,
          trial_ends_at TIMESTAMP,
          canceled_at TIMESTAMP,
          cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
          price_monthly REAL,
          price_yearly REAL,
          billing_cycle TEXT NOT NULL DEFAULT 'MONTHLY',
          reports_used INTEGER NOT NULL DEFAULT 0,
          reports_limit INTEGER NOT NULL DEFAULT 10,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `)
      await client.end()
      console.log('Tables created successfully')
    }
  } catch (setupError) {
    console.log('Setup failed, continuing with health check:', setupError)
  }
  try {
    const dbUrl = process.env.DATABASE_URL
    await prisma.$connect()
    const result = await prisma.$queryRaw`SELECT 1 as test`
    const serializedResult = JSON.parse(JSON.stringify(result, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ))
    const tablesStatus: Record<string, string> = {}
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
        query_result: serializedResult,
        tables: tablesStatus
      },
      auth: {
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "Set" : "Not set",
        NEXTAUTH_URL: process.env.NEXTAUTH_URL
      },
      environment: process.env.NODE_ENV,
      env: getEnvSnapshot(),
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