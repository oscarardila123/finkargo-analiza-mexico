"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"

// Force dynamic rendering to avoid prerender issues with useSearchParams
export const dynamic = 'force-dynamic'

function VerifyRequestContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
      
      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <Card className="w-full max-w-md mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <BrandIcon size="md" />
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Revisa tu correo electrónico
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              {email ? (
                <>
                  Te hemos enviado un enlace de recuperación de contraseña a{" "}
                  <span className="font-semibold text-gray-900">{email}</span>
                </>
              ) : (
                "Te hemos enviado un enlace de recuperación de contraseña"
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Próximos pasos:</p>
                  <ul className="space-y-1 text-blue-700">
                    <li>• Revisa tu bandeja de entrada</li>
                    <li>• Busca un email de Finkargo Analiza</li>
                    <li>• Haz clic en el enlace de recuperación</li>
                    <li>• El enlace expira en 24 horas</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-600">
              <p>¿No recibiste el correo? Revisa tu carpeta de spam o</p>
              <Link 
                href="/auth/signin" 
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                intenta nuevamente
              </Link>
            </div>

            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/signin">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al inicio de sesión
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function VerifyRequestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyRequestContent />
    </Suspense>
  )
}