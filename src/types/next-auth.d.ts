import { UserRole } from "@/generated/prisma"
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: UserRole
      companyId: string
      companyName: string
    }
  }

  interface User {
    role: UserRole
    companyId: string
    companyName: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole
    companyId: string
    companyName: string
  }
}