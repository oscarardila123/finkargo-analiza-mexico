import { PrismaClient } from "@/generated/prisma"

// Log temporal para depuración en Amplify (sin exponer toda la URL)
if (process.env.NODE_ENV !== "production") {
    const masked = process.env.DATABASE_URL
        ? `${process.env.DATABASE_URL.substring(0, 20)}...`
        : "undefined"
    // eslint-disable-next-line no-console
    console.log("DATABASE_URL:", masked)
}

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

const datasourceUrl = process.env.DATABASE_URL
const baseOptions: any = {
    log: process.env.NODE_ENV === "production" ? ["error"] : ["query", "error", "warn"],
}

// Solo pasamos datasources si la URL está definida; de lo contrario
// Prisma tomará la URL desde schema.prisma (env("DATABASE_URL"))
if (datasourceUrl) {
    baseOptions.datasources = { db: { url: datasourceUrl } }
} else if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn("Prisma: DATABASE_URL no está definida. Usando configuración por defecto del schema. Asegúrate de definirla en .env.local o en las variables del entorno.")
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient(baseOptions)

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma