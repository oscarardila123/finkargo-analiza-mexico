"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  CreditCard,
  Smartphone,
  Banknote,
  Shield,
  Clock,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Crown,
  Target,
  BarChart3,
  Globe,
  Users
} from "lucide-react"

interface PlanDetails {
  id: string
  name: string
  period: string
  priceCOP: number
  priceUSD: number
  features: string[]
}

const plans: Record<string, PlanDetails> = {
  trimestral: {
    id: "trimestral",
    name: "Trimestral",
    period: "3 meses",
    priceCOP: 650000,
    priceUSD: 163,
    features: [
      "Acceso completo a la plataforma",
      "Análisis de importaciones y exportaciones",
      "Búsqueda avanzada de empresas",
      "Reportes personalizables",
      "Soporte técnico especializado",
      "Actualizaciones en tiempo real"
    ]
  },
  anual: {
    id: "anual",
    name: "Anual",
    period: "12 meses",
    priceCOP: 1000000,
    priceUSD: 250,
    features: [
      "Todo lo del plan trimestral",
      "Análisis predictivo avanzado",
      "Integraciones API personalizadas",
      "Account manager dedicado",
      "Capacitación especializada",
      "Soporte prioritario 24/7",
      "Reportes ejecutivos mensuales"
    ]
  },
  semestral: {
    id: "semestral",
    name: "Semestral",
    period: "6 meses",
    priceCOP: 800000,
    priceUSD: 200,
    features: [
      "Todo lo del plan trimestral",
      "Alertas personalizadas",
      "Dashboard ejecutivo",
      "Exportación de datos ilimitada",
      "Soporte técnico preferencial",
      "Análisis competitivo avanzado"
    ]
  }
}

// Force dynamic rendering to avoid prerender issues with useSearchParams
export const dynamic = 'force-dynamic'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("credit_card")
  const [wompiEnvironment, setWompiEnvironment] = useState("🎭 Simulación Local")
  const [cardToken, setCardToken] = useState("")
  
  // Get URL parameters
  const planId = searchParams.get("plan") || "trimestral"
  const currency = (searchParams.get("currency") as "COP" | "USD") || "COP"
  
  const selectedPlan = plans[planId]
  
  useEffect(() => {
    if (status === "unauthenticated") {
      const currentUrl = `${window.location.pathname}${window.location.search}`
      router.push(`/auth/signin?from=${encodeURIComponent(currentUrl)}`)
    }
  }, [status, router])

  useEffect(() => {
    // Fetch Wompi environment from API
    fetch('/api/wompi/environment')
      .then(res => res.json())
      .then(data => {
        setWompiEnvironment(data.label)
      })
      .catch(error => {
        console.error('Error fetching Wompi environment:', error)
      })
  }, [])


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

  const getPrice = () => {
    return currency === "COP" ? selectedPlan.priceCOP : selectedPlan.priceUSD
  }

  const formatPrice = (price: number) => {
    if (currency === "COP") {
      return `$${price.toLocaleString('es-CO')} COP`
    } else {
      return `$${price.toLocaleString('en-US')} USD`
    }
  }

  const getSavings = () => {
    // Calculate savings based on plan type compared to monthly equivalent
    if (planId === "trimestral") {
      const monthlyEquivalent = currency === "COP" ? 250000 * 3 : 63 * 3
      const currentPrice = currency === "COP" ? selectedPlan.priceCOP : selectedPlan.priceUSD
      return monthlyEquivalent - currentPrice
    }
    if (planId === "anual") {
      const monthlyEquivalent = currency === "COP" ? 250000 * 12 : 63 * 12
      const currentPrice = currency === "COP" ? selectedPlan.priceCOP : selectedPlan.priceUSD
      return monthlyEquivalent - currentPrice
    }
    if (planId === "semestral") {
      const monthlyEquivalent = currency === "COP" ? 250000 * 6 : 63 * 6
      const currentPrice = currency === "COP" ? selectedPlan.priceCOP : selectedPlan.priceUSD
      return monthlyEquivalent - currentPrice
    }
    return 0
  }

  const handlePayment = async () => {
    setLoading(true)
    setError("")
    
    try {
      // Create payment on server and get checkout URL
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId,
          currency,
          paymentMethod,
          amount: getPrice(),
          period: selectedPlan.period,
          customerData: {
            fullName: session?.user?.name || "",
            phoneNumber: "3163336666"
          }
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Error al crear el pago")
      }

      // Redirect to Wompi checkout or success page (simulation)
      const checkoutUrl = data.payment?.checkoutUrl || data.checkoutUrl
      if (checkoutUrl) {
        window.location.href = checkoutUrl
      } else {
        throw new Error("No se pudo generar el checkout")
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
      
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20 relative z-10">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link href="/precios">
            <Button 
              variant="ghost" 
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg font-medium hover:shadow-xl"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Volver a planes</span>
              <span className="sm:hidden">Planes</span>
            </Button>
          </Link>
          <div className="flex-1 text-center">
            <span className="text-lg font-semibold text-white">Checkout Seguro</span>
            {/* Wompi Environment Indicator */}
            <div className="mt-1">
              <span className="text-xs text-white/70 bg-white/10 px-2 py-1 rounded-full">
                {wompiEnvironment}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-green-400" />
            <span className="text-sm text-white/90">256-bit SSL</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {selectedPlan.id === 'trimestral' && <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />}
                    {selectedPlan.id === 'anual' && <Crown className="w-5 h-5 mr-2 text-purple-600" />}
                    {selectedPlan.id === 'semestral' && <Target className="w-5 h-5 mr-2 text-primary" />}
                    Plan {selectedPlan.name}
                  </CardTitle>
                  <CardDescription>
                    Periodo: {selectedPlan.period}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Plan Features */}
                  <div className="space-y-2">
                    {selectedPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Pricing Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Plan {selectedPlan.name}</span>
                      <span>{formatPrice(getPrice())}</span>
                    </div>
                    
                    {getSavings() > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Descuento por periodo extendido</span>
                        <span>-{formatPrice(getSavings())}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Impuestos</span>
                      <span>Calculados en el siguiente paso</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatPrice(getPrice())}</span>
                  </div>

                  {getSavings() > 0 && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center text-green-800">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">
                          Ahorras {formatPrice(getSavings())} con el plan {selectedPlan.name.toLowerCase()}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Trust Signals */}
              <div className="bg-green-50/80 backdrop-blur-sm p-4 rounded-lg border border-green-200/50">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-900">Pago 100% seguro</h3>
                    <p className="text-sm text-gray-700">
                      Tus datos están protegidos con encriptación de grado militar. 
                      Procesado por Wompi, certificado PCI DSS Level 1.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-6">
              <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle>Información de pago</CardTitle>
                  <CardDescription>
                    Selecciona tu método de pago preferido
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="credit_card" className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4" />
                        <span className="hidden sm:inline">Tarjeta</span>
                      </TabsTrigger>
                      <TabsTrigger value="pse" className="flex items-center space-x-2">
                        <Banknote className="h-4 w-4" />
                        <span className="hidden sm:inline">PSE</span>
                      </TabsTrigger>
                      <TabsTrigger value="cash" className="flex items-center space-x-2">
                        <Smartphone className="h-4 w-4" />
                        <span className="hidden sm:inline">Efectivo</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="credit_card" className="space-y-4 mt-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="email">Email de facturación</Label>
                          <Input
                            id="email"
                            type="email"
                            value={session?.user?.email || ""}
                            disabled
                            className="bg-gray-50 placeholder:text-gray-400"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="cardNumber">Número de tarjeta</Label>
                          <input
                            id="cardNumber"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono placeholder:text-gray-400"
                          />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="cardExpMonth">Mes</Label>
                            <input
                              id="cardExpMonth"
                              type="text"
                              placeholder="MM"
                              maxLength={2}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono placeholder:text-gray-400"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardExpYear">Año</Label>
                            <input
                              id="cardExpYear"
                              type="text"
                              placeholder="AA"
                              maxLength={2}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono placeholder:text-gray-400"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cardCvc">CVV</Label>
                            <input
                              id="cardCvc"
                              type="text"
                              placeholder="123"
                              maxLength={4}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono placeholder:text-gray-400"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="cardHolder">Nombre en la tarjeta</Label>
                          <input
                            id="cardHolder"
                            type="text"
                            placeholder="Nombre completo"
                            defaultValue={session?.user?.name || ""}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-400"
                          />
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Shield className="h-4 w-4" />
                          <span>Aceptamos Visa, Mastercard, American Express</span>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="pse" className="space-y-4 mt-6">
                      <div className="text-center py-8">
                        <Banknote className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">Pago Seguro en Línea (PSE)</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Serás redirigido al portal de tu banco para completar el pago de forma segura
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
                          <span>Bancolombia</span> • <span>Banco de Bogotá</span> • <span>BBVA</span> • <span>Davivienda</span>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="cash" className="space-y-4 mt-6">
                      <div className="text-center py-8">
                        <Smartphone className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">Pago en efectivo</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Recibirás un código para pagar en efectivo en puntos autorizados
                        </p>
                        <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
                          <span>Efecty</span> • <span>Baloto</span> • <span>PagaTodo</span> • <span>Gana</span>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg mt-4">
                          <div className="flex items-center justify-center text-yellow-800">
                            <Clock className="h-4 w-4 mr-2" />
                            <span className="text-sm">El pago puede tardar hasta 2 horas en procesarse</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {error && (
                <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-lg p-4">
                  <div className="flex items-center text-red-800">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">{error}</span>
                  </div>
                </div>
              )}

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={loading}
                className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Completar pago - {formatPrice(getPrice())}
                  </>
                )}
              </Button>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="text-center text-xs text-gray-700 space-y-2">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">Cancelación sin compromiso</span>
                  </div>
                  <p>
                    Al hacer clic en "Completar pago", aceptas nuestros{" "}
                    <a href="/terminos-condiciones" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium hover:text-primary/80 transition-colors">Términos de Servicio</a> y{" "}
                    <a href="/politicas-privacidad" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium hover:text-primary/80 transition-colors">Política de Privacidad</a>
                  </p>
                  <p className="text-gray-600">
                    ✅ Sin permanencia mínima • ✅ Cancela cuando quieras • ✅ Soporte en español
                  </p>
                </div>
              </div>

              {/* Security badges */}
              <div className="flex items-center justify-center space-x-6 pt-4">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Shield className="h-4 w-4" />
                  <span>SSL Seguro</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <CheckCircle className="h-4 w-4" />
                  <span>PCI Compliant</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span className="font-semibold">Wompi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}