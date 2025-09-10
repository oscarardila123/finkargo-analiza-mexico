"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  XCircle,
  AlertCircle,
  ArrowLeft,
  RefreshCw,
  Loader2,
  CreditCard,
  Home
} from "lucide-react"

// Force dynamic rendering to avoid prerender issues with useSearchParams
export const dynamic = 'force-dynamic'

function PaymentFailedContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  
  const [loading, setLoading] = useState(true)
  
  const reference = searchParams.get("reference")
  const errorCode = searchParams.get("error") || "UNKNOWN"
  const paymentId = searchParams.get("payment_id") || searchParams.get("id")

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  const getErrorMessage = (code: string) => {
    switch (code.toUpperCase()) {
      case 'DECLINED':
        return 'Tu tarjeta fue rechazada por el banco emisor'
      case 'INSUFFICIENT_FUNDS':
        return 'Fondos insuficientes en tu cuenta'
      case 'INVALID_CARD':
        return 'Los datos de la tarjeta son inválidos'
      case 'EXPIRED_CARD':
        return 'Tu tarjeta ha expirado'
      case 'TIMEOUT':
        return 'El pago excedió el tiempo límite'
      case 'CANCELLED':
        return 'El pago fue cancelado'
      default:
        return 'Ocurrió un error durante el procesamiento del pago'
    }
  }

  const getErrorSuggestion = (code: string) => {
    switch (code.toUpperCase()) {
      case 'DECLINED':
        return 'Contacta a tu banco para verificar el estado de tu tarjeta'
      case 'INSUFFICIENT_FUNDS':
        return 'Verifica el saldo disponible en tu cuenta'
      case 'INVALID_CARD':
        return 'Revisa que los datos de la tarjeta sean correctos'
      case 'EXPIRED_CARD':
        return 'Usa una tarjeta con fecha de vencimiento válida'
      case 'TIMEOUT':
        return 'Intenta nuevamente con una conexión estable'
      case 'CANCELLED':
        return 'Puedes intentar el pago nuevamente'
      default:
        return 'Intenta nuevamente o contacta a soporte'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Pago No Completado</h1>
                <p className="text-gray-600">Hubo un problema procesando tu pago</p>
              </div>
            </div>
            <Link href="/precios">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a planes
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          
          {/* Error Card */}
          <Card className="mb-8 border-2 border-red-200 bg-red-50">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-2xl text-red-800 mb-2">
                Pago no completado
              </CardTitle>
              <CardDescription className="text-red-700 text-lg">
                {getErrorMessage(errorCode)}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Error Details */}
              {reference && (
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-2">📋 Detalles del intento</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-red-700">Referencia:</span>
                      <span className="font-mono font-bold text-red-900">{reference}</span>
                    </div>
                    {paymentId && (
                      <div className="flex justify-between">
                        <span className="text-red-700">ID de transacción:</span>
                        <span className="font-mono text-red-900">{paymentId}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-red-700">Código de error:</span>
                      <span className="font-bold text-red-900">{errorCode}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Suggestion */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">¿Qué puedes hacer?</h4>
                    <p className="text-sm text-blue-800">{getErrorSuggestion(errorCode)}</p>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Opciones disponibles:</h3>
                <div className="space-y-3">
                  <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Intentar nuevamente</h4>
                      <p className="text-sm text-gray-600">
                        Regresa a la página de pago y intenta con otro método
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Contactar soporte</h4>
                      <p className="text-sm text-gray-600">
                        Si el problema persiste, contáctanos por WhatsApp
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <Link href="/checkout-simple" className="flex-1">
              <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                <RefreshCw className="mr-2 h-4 w-4" />
                Intentar Nuevamente
              </Button>
            </Link>
            <a 
              href={`https://api.whatsapp.com/send?phone=573222235280&text=¡Hola! Tuve un problema con el pago de mi suscripción a Finkargo Analiza.%0A%0A📋 *Detalles del error:*%0A• Referencia: ${reference || 'No disponible'}%0A• Código de error: ${errorCode}%0A• ID de transacción: ${paymentId || 'No disponible'}%0A%0APor favor, ayúdame a resolver este problema. ¡Gracias!`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="outline" size="lg" className="w-full">
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.886 3.488"/>
                </svg>
                Contactar Soporte
              </Button>
            </a>
          </div>

          {/* Additional Support */}
          <div className="text-center mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-3">
              💡 <strong>¿Necesitas ayuda inmediata?</strong>
            </p>
            <div className="space-y-2">
              <div className="flex justify-center items-center gap-4 text-sm">
                <a 
                  href={`https://api.whatsapp.com/send?phone=573222235280&text=Necesito ayuda con un problema de pago en Finkargo Analiza`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  WhatsApp: +57 (322) 223-5280
                </a>
                <span className="text-gray-600">•</span>
                <a href="mailto:soporte@finkargo.com" className="text-gray-600 hover:text-gray-700">
                  soporte@finkargo.com
                </a>
              </div>
              <Link href="/" className="inline-block">
                <Button variant="ghost" size="sm">
                  <Home className="mr-2 h-4 w-4" />
                  Volver al Inicio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <PaymentFailedContent />
    </Suspense>
  )
}