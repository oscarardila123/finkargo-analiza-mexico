import { PrismaClient } from "@/generated/prisma"

// Log temporal para depuración en Amplify
if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("DATABASE_URL:", process.env.DATABASE_URL)
}

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === "production" ? ["error"] : ["query", "error", "warn"],
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
})

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma