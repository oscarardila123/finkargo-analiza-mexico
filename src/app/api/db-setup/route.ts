import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    console.log("Setting up database schema...")
    
    // Test connection first
    await prisma.$connect()
    console.log("Database connection successful")
    
    // Check if we're in production/staging environment
    const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'preview'
    
    if (!isProd) {
      return NextResponse.json({
        status: "skipped",
        message: "Database setup skipped in development environment",
        environment: process.env.NODE_ENV,
        vercel_env: process.env.VERCEL_ENV
      })
    }
    
    // Try to use Prisma's push command programmatically
    try {
      // First let's try to just create the tables manually using raw SQL
      // This is safer than spawning processes in serverless environment
      
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "accounts" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "user_id" TEXT NOT NULL,
          "type" TEXT NOT NULL,
          "provider" TEXT NOT NULL,
          "provider_account_id" TEXT NOT NULL,
          "refresh_token" TEXT,
          "access_token" TEXT,
          "expires_at" INTEGER,
          "token_type" TEXT,
          "scope" TEXT,
          "id_token" TEXT,
          "session_state" TEXT,
          UNIQUE("provider", "provider_account_id")
        )
      `
      
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "sessions" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "session_token" TEXT NOT NULL UNIQUE,
          "user_id" TEXT NOT NULL,
          "expires" TIMESTAMP NOT NULL
        )
      `
      
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "companies" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "name" TEXT NOT NULL,
          "email" TEXT NOT NULL UNIQUE,
          "nit" TEXT UNIQUE,
          "address" TEXT,
          "city" TEXT,
          "country" TEXT NOT NULL DEFAULT 'Colombia',
          "phone" TEXT,
          "website" TEXT,
          "industry_type" TEXT,
          "company_size" TEXT NOT NULL DEFAULT 'SMALL',
          "annual_import_value" REAL,
          "subscription_id" TEXT UNIQUE,
          "is_active" BOOLEAN NOT NULL DEFAULT true,
          "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `
      
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "users" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "name" TEXT,
          "email" TEXT NOT NULL UNIQUE,
          "email_verified" TIMESTAMP,
          "image" TEXT,
          "password" TEXT,
          "role" TEXT NOT NULL DEFAULT 'VIEWER',
          "company_id" TEXT NOT NULL,
          "is_active" BOOLEAN NOT NULL DEFAULT true,
          "last_login_at" TIMESTAMP,
          "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `
      
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "subscriptions" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "company_id" TEXT NOT NULL UNIQUE,
          "plan" TEXT NOT NULL,
          "status" TEXT NOT NULL DEFAULT 'TRIAL',
          "current_period_start" TIMESTAMP NOT NULL,
          "current_period_end" TIMESTAMP NOT NULL,
          "trial_ends_at" TIMESTAMP,
          "canceled_at" TIMESTAMP,
          "cancel_at_period_end" BOOLEAN NOT NULL DEFAULT false,
          "price_monthly" REAL,
          "price_yearly" REAL,
          "billing_cycle" TEXT NOT NULL DEFAULT 'MONTHLY',
          "reports_used" INTEGER NOT NULL DEFAULT 0,
          "reports_limit" INTEGER NOT NULL DEFAULT 10,
          "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
      `
      
      // Test if tables are now accessible
      await prisma.company.findFirst()
      await prisma.user.findFirst()  
      await prisma.subscription.findFirst()
      
      return NextResponse.json({
        status: "success",
        message: "Database schema created successfully",
        environment: process.env.NODE_ENV,
        vercel_env: process.env.VERCEL_ENV,
        timestamp: new Date().toISOString()
      })
      
    } catch (error) {
      console.error("Database setup error:", error)
      return NextResponse.json({
        status: "error", 
        message: "Database setup failed",
        error: error instanceof Error ? error.message : "Unknown error",
        environment: process.env.NODE_ENV,
        vercel_env: process.env.VERCEL_ENV,
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }

  } catch (error) {
    console.error("Database setup connection error:", error)
    return NextResponse.json({
      status: "error",
      message: "Database connection failed", 
      error: error instanceof Error ? error.message : "Unknown error",
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}