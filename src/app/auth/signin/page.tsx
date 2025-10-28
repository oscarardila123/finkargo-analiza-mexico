"use client"

import { useState, Suspense } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mail, Sparkles, Shield, Check, ArrowRight, Eye, EyeOff } from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"

// Force dynamic rendering to avoid prerender issues with useSearchParams
export const dynamic = 'force-dynamic'

function SignInContent() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get("from") || "/precios"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Credenciales inválidas")
      } else {
        router.push(from)
        router.refresh()
      }
    } catch {
      setError("Error al iniciar sesión")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { callbackUrl: from })
    } catch {
      setError("Error al iniciar sesión con Google")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
      
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4 z-20">
        <Link href="/">
          <Button 
            variant="ghost" 
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg"
          >
            <Home className="h-5 w-5" />
            <span className="hidden sm:inline font-medium">Volver al inicio</span>
            <span className="sm:hidden font-medium">Inicio</span>
          </Button>
        </Link>
      </div>
      
      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Branding */}
          <div className="hidden lg:block text-white space-y-8">
            <div className="flex items-center space-x-3 mb-8">
              <BrandIcon size="lg" />
              <div>
                <span className="text-2xl font-bold">Finkargo</span>
                <span className="text-xl font-semibold ml-2 text-orange-300">Analiza</span>
              </div>
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight">
                La plataforma que te entrega<br />
                <span className="text-orange-300">datos del comercio exterior</span><br />
                para tomar <span className="text-cyan-300">mejores decisiones</span>
              </h1>
              <p className="text-xl opacity-90 leading-relaxed text-justify">
                Una plataforma diseñada a la medida, para quienes no temen ir más allá, para quienes buscan dominar el juego del comercio internacional.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span>Datos 100% confiables y reales</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span>Acceso a datos para mejorar la planificación de compras internacionales</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span>Soporte especializado con expertos en data y comercio exterior</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Form */}
          <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center">
              <div className="lg:hidden flex items-center justify-center mb-4">
                <BrandIcon size="md" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">
                Bienvenido a Finkargo
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Ingresa a tu cuenta para acceder a la plataforma de inteligencia comercial
              </CardDescription>
            </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@empresa.com"
                className="placeholder:text-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Tu contraseña"
                  className="placeholder:text-gray-400 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            {error && (
              <p className="text-sm text-destructive mb-4">{error}</p>
            )}
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all mt-6" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                <>
                  Iniciar sesión
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-gray-700">
                O continúa con
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            type="button"
            className="w-full border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all py-3"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <Mail className="mr-2 h-4 w-4" />
            Continuar con Google
          </Button>

          <div className="text-center">
            <span className="text-gray-600">¿No tienes cuenta? </span>
            <Link href="/auth/signup?from=/precios" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Regístrate aquí
            </Link>
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  )
}