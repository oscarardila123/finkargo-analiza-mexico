"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ArrowRight, Home, Sparkles, Shield, Check } from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"

export default function RegistroExitosoPage() {
  const router = useRouter()
  const { status } = useSession()
  const [countdown, setCountdown] = useState(3)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  // Efecto para manejar la redirección (separado del countdown para evitar error de React)
  useEffect(() => {
    if (shouldRedirect) {
      router.push("/")
    }
  }, [shouldRedirect, router])

  // Efecto para protección de sesión
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  // Efecto para el countdown
  useEffect(() => {
    if (status !== "authenticated") return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setShouldRedirect(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [status])

  const handleContinue = () => {
    router.push("/")
  }

  // Mostrar loading mientras se verifica la sesión
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Cargando...</div>
      </div>
    )
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
                Bienvenido a la<br />
                <span className="text-orange-300">comunidad Finkargo</span><br />
                <span className="text-cyan-300">Analiza</span>
              </h1>
              <p className="text-xl opacity-90 leading-relaxed">
                Tu cuenta ha sido creada exitosamente. Ahora tienes acceso a la plataforma de inteligencia comercial.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span>14 días de prueba gratuita activados</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span>Acceso completo a datos verificados</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span>Soporte especializado disponible</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Success Card */}
          <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center pb-2">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">
                ¡Muchas gracias por crear tu cuenta!
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 mt-2">
                Tu registro ha sido exitoso. Estás listo para comenzar a explorar.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              {/* Countdown indicator */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-2xl font-bold shadow-lg">
                  {countdown}
                </div>
                <p className="text-gray-500 mt-3 text-sm">
                  Serás redirigido automáticamente en {countdown} segundo{countdown !== 1 ? 's' : ''}...
                </p>
              </div>

              {/* Manual continue button */}
              <Button
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all"
              >
                Comenzar ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              {/* Info text */}
              <div className="text-center text-sm text-gray-500 space-y-2">
                <p>
                  Hemos enviado un correo de bienvenida a tu email con información importante.
                </p>
                <p className="text-xs">
                  Si eres socio COMCE, revisa tu correo para obtener tu código de descuento exclusivo.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
