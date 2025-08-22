import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { prisma } from "@/lib/prisma"
import { sendPasswordResetEmail } from "@/lib/email"
import bcrypt from "bcryptjs"
import { UserRole } from "@/generated/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    EmailProvider({
      server: "resend",
      from: process.env.EMAIL_FROM || "Finkargo Analiza <noreply@finkargo.com>",
      maxAge: 24 * 60 * 60, // 24 hours
      async sendVerificationRequest({ identifier: email, url, provider }) {
        console.log('📧 Creando token para:', email)
        console.log('📧 URL original:', url.substring(0, 100) + '...')
        
        // Extract token from original URL
        const urlParams = new URLSearchParams(url.split('?')[1])
        const originalToken = urlParams.get('token')
        console.log('📧 Token original extraído:', originalToken?.substring(0, 16) + '...')
        
        const resetUrl = url.replace('/api/auth/callback/email', '/auth/reset-password')
        console.log('📧 URL reset:', resetUrl.substring(0, 100) + '...')
        
        // Extract token from reset URL to verify
        const resetParams = new URLSearchParams(resetUrl.split('?')[1])
        const resetToken = resetParams.get('token')
        console.log('📧 Token en reset URL:', resetToken?.substring(0, 16) + '...')
        
        await sendPasswordResetEmail(email, resetUrl)
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
          include: {
            company: true
          }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        if (!user.isActive || !user.company.isActive) {
          return null
        }

        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() }
        })

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
          companyId: user.companyId,
          companyName: user.company.name,
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role
        token.companyId = user.companyId
        token.companyName = user.companyName
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as UserRole
        session.user.companyId = token.companyId as string
        session.user.companyName = token.companyName as string
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        if (!profile?.email) {
          return false
        }

        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: profile.email },
            include: { company: true }
          })

          if (existingUser) {
            if (!existingUser.isActive || !existingUser.company.isActive) {
              return false
            }
            
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { lastLoginAt: new Date() }
            })
            
            return true
          }

          return "/auth/complete-profile?email=" + encodeURIComponent(profile.email)
        } catch (error) {
          console.error("Error during Google sign in:", error)
          return false
        }
      }

      return true
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      if (user.id) {
        await prisma.userActivity.create({
          data: {
            userId: user.id,
            action: "SIGN_IN",
            metadata: {
              provider: account?.provider,
              isNewUser,
            },
          },
        })
      }
    },
    async signOut({ session, token }) {
      if (token?.sub) {
        await prisma.userActivity.create({
          data: {
            userId: token.sub,
            action: "SIGN_OUT",
          },
        })
      }
    },
  },
}