import { prisma } from './prisma'

let isInitialized = false

export async function ensureDbInitialized() {
  if (isInitialized) return
  
  try {
    // Try to connect and test if tables exist
    await prisma.$connect()
    await prisma.user.findFirst()
    isInitialized = true
    return
  } catch (error) {
    console.log('Database tables not found, this is expected on first deployment')
    isInitialized = true // Don't try to auto-create PostgreSQL schema
    return
  }
}