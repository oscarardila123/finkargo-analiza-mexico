import { PrismaClient } from "@/generated/prisma"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === "production" ? ["error"] : ["query", "error", "warn"],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  // Fix for Supabase/PostgreSQL prepared statement conflicts in production and staging
  ...((process.env.NODE_ENV === "production" || process.env.VERCEL_ENV) && process.env.DATABASE_URL?.includes('postgresql') && {
    datasources: {
      db: {
        url: process.env.DATABASE_URL + (process.env.DATABASE_URL?.includes('?') ? '&' : '?') + 'pgbouncer=true&connection_limit=1'
      }
    }
  })
})

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma