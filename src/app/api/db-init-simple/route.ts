import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Use direct PostgreSQL connection instead of Prisma
    const { Client } = require('pg')
    
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        status: "error",
        message: "DATABASE_URL not configured"
      }, { status: 500 })
    }
    
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    })
    
    await client.connect()
    console.log("Direct PostgreSQL connection successful")
    
    // Create tables using direct SQL
    await client.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        nit TEXT UNIQUE,
        address TEXT,
        city TEXT,
        country TEXT NOT NULL DEFAULT 'Colombia',
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
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
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
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
      )
    `)
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS accounts (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        type TEXT NOT NULL,
        provider TEXT NOT NULL,
        provider_account_id TEXT NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at INTEGER,
        token_type TEXT,
        scope TEXT,
        id_token TEXT,
        session_state TEXT,
        UNIQUE(provider, provider_account_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `)
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        session_token TEXT NOT NULL UNIQUE,
        user_id TEXT NOT NULL,
        expires TIMESTAMP NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `)
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS verificationtokens (
        identifier TEXT NOT NULL,
        token TEXT NOT NULL UNIQUE,
        expires TIMESTAMP NOT NULL,
        UNIQUE(identifier, token)
      )
    `)
    
    await client.end()
    console.log("Database tables created successfully")
    
    return NextResponse.json({
      status: "success", 
      message: "Database initialized successfully with direct PostgreSQL connection",
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error("Database init error:", error)
    return NextResponse.json({
      status: "error",
      message: "Database initialization failed",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}