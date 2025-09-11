'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { BrandIcon } from '@/components/ui/brand-icon'
import { 
  CheckCircle, 
  CreditCard, 
  ArrowRight, 
  ArrowLeft,
  Loader2, 
  Shield,
  Clock,
  Crown,
  Target,
  BarChart3,
  Award,
  Globe,
  Smartphone,
  Banknote,
  AlertCircle
} from 'lucide-react'

interface PlanDetails {
  id: string
  name: string
  period: string
  priceCOP: number
  priceUSD: number
  features: string[]
  icon: any
  description: string
  popular?: boolean
}

const plans: Record<string, PlanDetails> = {
  trimestral: {
    id: "trimestral",
    name: "Plan Trimestral",
    period: "3 meses",
    priceCOP: 650000,
    priceUSD: 163,
    icon: Clock,
    description: "Perfecto para proyectos a corto plazo",
    features: [
      "Acceso completo a la plataforma durante 3 meses",
      "Una descarga a Excel por mes",
      "Consultas ilimitadas",
      "Tour guiado personalizado",
      "Soporte en línea 24/7",
      "Un usuario autorizado"
    ]
  },
  anual: {
    id: "anual",
    name: "Plan Anual",
    period: "12 meses",
    priceCOP: 1000000,
    priceUSD: 250,
    icon: Award,
    description: "La mejor opción para empresas",
    popular: true,
    features: [
      "Acceso completo durante 12 meses",
      "Descargas a Excel ilimitadas",
      "Consultas ilimitadas",
      "Capacitaciones ilimitadas",
      "Soporte prioritario 24/7",
      "Hasta tres usuarios",
      "Account manager dedicado"
    ]
  },
  semestral: {
    id: "semestral",
    name: "Plan Semestral",
    period: "6 meses",
    priceCOP: 800000,
    priceUSD: 200,
    icon: BarChart3,
    description: "Equilibrio perfecto entre tiempo y valor",
    features: [
      "Acceso completo durante 6 meses",
      "Dos descargas a Excel por mes",
      "Consultas ilimitadas",
      "Tour guiado y tres capacitaciones",
      "Soporte técnico especializado",
      "Un usuario autorizado"
    ]
  }
}

const paymentMethods = [
  {
    id: "credit_card",
    name: "Tarjeta de Crédito/Débito",
    icon: CreditCard,
    description: "Visa, Mastercard, American Express"
  },
  {
    id: "pse",
    name: "PSE",
    icon: Banknote,
    description: "Pago Seguro en Línea"
  },
  {
    id: "cash",
    name: "Efectivo",
    icon: Smartphone,
    description: "Efecty, Baloto, PagaTodo"
  }
]

function CheckoutSimpleContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Get URL parameters with defaults
  const planId = searchParams.get("plan") || "trimestral"
  const currency = (searchParams.get("currency") as "COP" | "USD") || "COP"
  const amount = Number(searchParams.get("amount")) || plans[planId]?.priceCOP || 650000

  const selectedPlan = plans[planId]

  useEffect(() => {
    if (status === "unauthenticated") {
      const currentUrl = `${window.location.pathname}${window.location.search}`
      router.push(`/auth/signin?from=${encodeURIComponent(currentUrl)}`)
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!selectedPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-600 mb-2">Plan no encontrado</h1>
          <p className="text-gray-600 mb-4">El plan seleccionado no existe.</p>
          <Link href="/precios">
            <Button>Ver Planes</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handlePayment = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/wompi/create-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          plan_name: selectedPlan.name,
          customer_email: session?.user?.email || 'cliente@ejemplo.com'
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al crear el link de pago')
      }

      const data = await response.json()

      if (data.checkout_url) {
        window.location.href = data.checkout_url
      } else {
        throw new Error('No se recibió URL de pago')
      }
    } catch (err) {
      console.error('Error en el pago:', err)
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (price: number) => {
    if (currency === 'COP') {
      return `$${price.toLocaleString('es-CO')} COP`
    } else {
      return `$${price.toLocaleString('en-US')} USD`
    }
  }

  const PlanIcon = selectedPlan.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BrandIcon size="md" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Checkout Seguro</h1>
                <p className="text-gray-600">Finaliza tu suscripción a Finkargo Analiza</p>
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
        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          
          {/* Plan Information */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center pb-4">
                {selectedPlan.popular && (
                  <div className="mb-4">
                    <Badge className="px-4 py-2 bg-orange-500 text-white shadow-lg font-bold">
                      <Crown className="w-4 h-4 mr-1" />
                      MÁS POPULAR
                    </Badge>
                  </div>
                )}
                <div className="flex items-center justify-center mb-4">
                  <PlanIcon className="w-12 h-12 text-blue-600" />
                </div>
                <CardTitle className="text-3xl text-gray-900 mb-2">
                  {selectedPlan.name}
                </CardTitle>
                <CardDescription className="text-lg">
                  {selectedPlan.description}
                </CardDescription>
                <div className="mt-6">
                  <div className="text-5xl font-bold text-blue-600 mb-2">
                    {formatCurrency(amount)}
                  </div>
                  <p className="text-gray-600">
                    Facturación por {selectedPlan.period}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <Separator />
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    ✨ Características incluidas:
                  </h3>
                  <div className="space-y-3">
                    {selectedPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Próxima facturación</h4>
                  <p className="text-sm text-gray-600">
                    Tu suscripción se renovará automáticamente cada {selectedPlan.period}
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    Puedes cancelar en cualquier momento desde tu dashboard
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Section */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Información de pago</CardTitle>
                <CardDescription>
                  Selecciona tu método de pago preferido
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Payment Methods */}
                <div>
                  <h3 className="font-semibold mb-4">Métodos de pago disponibles</h3>
                  <div className="grid gap-3">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center p-4 border rounded-lg bg-gray-50">
                        <method.icon className="h-6 w-6 text-gray-600 mr-3" />
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-gray-600">{method.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Customer Information */}
                <div>
                  <h3 className="font-semibold mb-4">Información del cliente</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{session?.user?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nombre:</span>
                      <span className="font-medium">{session?.user?.name || 'Usuario'}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Security Notice */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-900">
                      Pago 100% seguro
                    </span>
                  </div>
                  <p className="text-sm text-green-700">
                    Tus datos están protegidos con encriptación de grado militar. 
                    Procesado por Wompi, certificado PCI DSS Level 1.
                  </p>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium text-red-900">Error en el pago</span>
                    </div>
                    <p className="text-red-800 text-sm mt-1">{error}</p>
                  </div>
                )}

                {/* Payment Button */}
                <Button
                  onClick={handlePayment}
                  disabled={isLoading}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      Creando pago seguro...
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5 mr-2" />
                      Completar pago - {formatCurrency(amount)}
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </Button>

                {/* Environment Note - Only show in local development */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="text-center bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-xs text-blue-800">
                      <strong>🔧 Modo Testing (Desarrollo Local)</strong><br />
                      Ambiente de desarrollo con funciones de testing
                    </p>
                    <div className="mt-2 flex justify-center gap-2">
                      <Link href="/test-cards" target="_blank">
                        <Button variant="ghost" size="sm" className="text-xs">
                          💳 Ver tarjetas de prueba
                        </Button>
                      </Link>
                      <Link href="/checkout/success?reference=TEST_SUCCESS&simulation=false&id=TEST_ID" target="_blank">
                        <Button variant="ghost" size="sm" className="text-xs">
                          ✅ Ver página de éxito
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center p-3">
                <Shield className="h-6 w-6 text-green-500 mb-2" />
                <span className="text-xs text-gray-600">SSL Seguro</span>
              </div>
              <div className="flex flex-col items-center p-3">
                <Globe className="h-6 w-6 text-blue-500 mb-2" />
                <span className="text-xs text-gray-600">Wompi Certified</span>
              </div>
              <div className="flex flex-col items-center p-3">
                <Crown className="h-6 w-6 text-orange-500 mb-2" />
                <span className="text-xs text-gray-600">PCI DSS Level 1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSimplePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <CheckoutSimpleContent />
    </Suspense>
  )
}