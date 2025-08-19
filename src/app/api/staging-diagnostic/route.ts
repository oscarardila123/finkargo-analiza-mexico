import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Only run in production/staging environments
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({
        status: "skipped",
        message: "Staging diagnostic skipped in development",
        environment: process.env.NODE_ENV
      })
    }

    console.log("Starting staging diagnostic...")
    
    // Use direct PostgreSQL connection to avoid Prisma issues
    const { Client } = require('pg')
    
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        status: "error",
        message: "DATABASE_URL not configured"
      }, { status: 500 })
    }
    
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    })
    
    await client.connect()
    console.log("Direct PostgreSQL connection successful")
    
    // Check if tables exist
    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('companies', 'users', 'subscriptions', 'accounts', 'sessions')
      ORDER BY table_name
    `
    
    const tablesResult = await client.query(tablesQuery)
    const existingTables = tablesResult.rows.map(row => row.table_name)
    
    // Check table structures if they exist
    let tableStructures = {}
    
    for (const tableName of existingTables) {
      try {
        const columnsQuery = `
          SELECT column_name, data_type, is_nullable, column_default
          FROM information_schema.columns 
          WHERE table_schema = 'public' 
          AND table_name = $1
          ORDER BY ordinal_position
        `
        const columnsResult = await client.query(columnsQuery, [tableName])
        tableStructures[tableName] = columnsResult.rows
      } catch (error) {
        tableStructures[tableName] = { error: error.message }
      }
    }
    
    // Check if there are any records in existing tables
    let recordCounts = {}
    
    for (const tableName of existingTables) {
      try {
        const countResult = await client.query(`SELECT COUNT(*) as count FROM ${tableName}`)
        recordCounts[tableName] = parseInt(countResult.rows[0].count)
      } catch (error) {
        recordCounts[tableName] = { error: error.message }
      }
    }
    
    // Check database version and settings
    const versionResult = await client.query('SELECT version()')
    const dbVersion = versionResult.rows[0].version
    
    await client.end()
    
    return NextResponse.json({
      status: "diagnostic_complete",
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL_ENV: process.env.VERCEL_ENV
      },
      database: {
        connection: "successful",
        version: dbVersion,
        url_prefix: process.env.DATABASE_URL?.substring(0, 30) + "..."
      },
      tables: {
        expected: ["companies", "users", "subscriptions", "accounts", "sessions"],
        existing: existingTables,
        missing: ["companies", "users", "subscriptions", "accounts", "sessions"].filter(t => !existingTables.includes(t)),
        structures: tableStructures,
        record_counts: recordCounts
      },
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error("Staging diagnostic error:", error)
    return NextResponse.json({
      status: "diagnostic_error",
      message: "Diagnostic failed",
      error: error instanceof Error ? error.message : "Unknown error",
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL_ENV: process.env.VERCEL_ENV
      },
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}