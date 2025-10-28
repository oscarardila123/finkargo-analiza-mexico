import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  // Only allow this in production/staging
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.json({
      status: "skipped",
      message: "Production init skipped in development"
    })
  }

  try {
    console.log("Initializing production database...")
    
    // Test connection
    await prisma.$connect()
    console.log("Database connection successful")
    
    // Use db push to sync schema without migrations
    // This is safe for existing data
    const { spawn } = require('child_process')
    
    return new Promise((resolve) => {
      const pushProcess = spawn('npx', ['prisma', 'db', 'push'], {
        env: { ...process.env },
        cwd: process.cwd()
      })

      let output = ''
      let errorOutput = ''

      pushProcess.stdout.on('data', (data: Buffer) => {
        output += data.toString()
        console.log(data.toString())
      })

      pushProcess.stderr.on('data', (data: Buffer) => {
        errorOutput += data.toString()
        console.error(data.toString())
      })

      pushProcess.on('close', (code: number) => {
        if (code === 0) {
          resolve(NextResponse.json({
            status: "success",
            message: "Database schema synchronized successfully",
            output: output,
            timestamp: new Date().toISOString()
          }))
        } else {
          resolve(NextResponse.json({
            status: "error",
            message: "Database schema synchronization failed",
            error: errorOutput,
            output: output,
            timestamp: new Date().toISOString()
          }, { status: 500 }))
        }
      })
    })

  } catch (error) {
    console.error("Production init error:", error)
    return NextResponse.json({
      status: "error",
      message: "Production initialization failed",
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}