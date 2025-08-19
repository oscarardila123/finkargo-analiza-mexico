import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    // Initialize the database by running a simple query
    // This will create the database file if it doesn't exist
    await prisma.$connect()
    
    // Try to create tables if they don't exist
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT,
        "email" TEXT NOT NULL UNIQUE,
        "email_verified" DATETIME,
        "image" TEXT,
        "password" TEXT,
        "role" TEXT NOT NULL DEFAULT 'VIEWER',
        "company_id" TEXT NOT NULL,
        "is_active" BOOLEAN NOT NULL DEFAULT true,
        "last_login_at" DATETIME,
        "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
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
        "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `
    
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "subscriptions" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "company_id" TEXT NOT NULL UNIQUE,
        "plan" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'TRIAL',
        "current_period_start" DATETIME NOT NULL,
        "current_period_end" DATETIME NOT NULL,
        "trial_ends_at" DATETIME,
        "canceled_at" DATETIME,
        "cancel_at_period_end" BOOLEAN NOT NULL DEFAULT false,
        "price_monthly" REAL,
        "price_yearly" REAL,
        "billing_cycle" TEXT NOT NULL DEFAULT 'MONTHLY',
        "reports_used" INTEGER NOT NULL DEFAULT 0,
        "reports_limit" INTEGER NOT NULL DEFAULT 10,
        "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "user_activities" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "user_id" TEXT NOT NULL,
        "action" TEXT NOT NULL,
        "resource" TEXT,
        "metadata" TEXT,
        "ip_address" TEXT,
        "user_agent" TEXT,
        "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "company_activities" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "company_id" TEXT NOT NULL,
        "action" TEXT NOT NULL,
        "resource" TEXT,
        "metadata" TEXT,
        "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `

    return NextResponse.json({ 
      message: "Database initialized successfully",
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error("Database initialization error:", error)
    return NextResponse.json(
      { 
        message: "Database initialization failed", 
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}