import { prisma } from './prisma'

let isInitialized = false

export async function ensureDbInitialized() {
  if (isInitialized) return
  
  try {
    // Try a simple query to test the connection
    await prisma.$queryRaw`SELECT 1`
    isInitialized = true
  } catch (error) {
    console.log('Database not initialized, attempting to create schema...')
    
    try {
      // Push the schema to create all tables
      await prisma.$executeRaw`PRAGMA foreign_keys = OFF;`
      
      // Create essential tables manually
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "companies" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "name" TEXT NOT NULL,
          "email" TEXT NOT NULL,
          "nit" TEXT,
          "address" TEXT,
          "city" TEXT,
          "country" TEXT NOT NULL DEFAULT 'Colombia',
          "phone" TEXT,
          "website" TEXT,
          "industry_type" TEXT,
          "company_size" TEXT NOT NULL DEFAULT 'SMALL',
          "annual_import_value" REAL,
          "subscription_id" TEXT,
          "is_active" BOOLEAN NOT NULL DEFAULT 1,
          "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `
      
      await prisma.$executeRaw`
        CREATE UNIQUE INDEX IF NOT EXISTS "companies_email_key" ON "companies"("email");
      `
      
      await prisma.$executeRaw`
        CREATE UNIQUE INDEX IF NOT EXISTS "companies_nit_key" ON "companies"("nit");
      `

      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "subscriptions" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "company_id" TEXT NOT NULL,
          "plan" TEXT NOT NULL,
          "status" TEXT NOT NULL DEFAULT 'TRIAL',
          "current_period_start" DATETIME NOT NULL,
          "current_period_end" DATETIME NOT NULL,
          "trial_ends_at" DATETIME,
          "canceled_at" DATETIME,
          "cancel_at_period_end" BOOLEAN NOT NULL DEFAULT 0,
          "price_monthly" REAL,
          "price_yearly" REAL,
          "billing_cycle" TEXT NOT NULL DEFAULT 'MONTHLY',
          "reports_used" INTEGER NOT NULL DEFAULT 0,
          "reports_limit" INTEGER NOT NULL DEFAULT 10,
          "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("company_id") REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE
        );
      `
      
      await prisma.$executeRaw`
        CREATE UNIQUE INDEX IF NOT EXISTS "subscriptions_company_id_key" ON "subscriptions"("company_id");
      `

      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "users" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "name" TEXT,
          "email" TEXT NOT NULL,
          "email_verified" DATETIME,
          "image" TEXT,
          "password" TEXT,
          "role" TEXT NOT NULL DEFAULT 'VIEWER',
          "company_id" TEXT NOT NULL,
          "is_active" BOOLEAN NOT NULL DEFAULT 1,
          "last_login_at" DATETIME,
          "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("company_id") REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE
        );
      `
      
      await prisma.$executeRaw`
        CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");
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
          "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
        );
      `

      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "company_activities" (
          "id" TEXT NOT NULL PRIMARY KEY,
          "company_id" TEXT NOT NULL,
          "action" TEXT NOT NULL,
          "resource" TEXT,
          "metadata" TEXT,
          "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("company_id") REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE
        );
      `

      await prisma.$executeRaw`PRAGMA foreign_keys = ON;`
      
      console.log('Database schema created successfully')
      isInitialized = true
    } catch (initError) {
      console.error('Failed to initialize database:', initError)
      throw initError
    }
  }
}