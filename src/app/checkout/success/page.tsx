"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Crown,
  Target,
  Zap,
  ArrowRight,
  Download,
  Calendar,
  CreditCard,
  Loader2,
  AlertCircle
} from "lucide-react"

interface PaymentDetails {
  id: string
  amount: number
  currency: string
  reference: string
  status: string
  plan: string
  billingCycle: string
  paymentMethod: string
  createdAt: string
}

// Force dynamic rendering to avoid prerender issues with useSearchParams
export const dynamic = 'force-dynamic'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { status } = useSession()
  
  const [loading, setLoading] = useState(true)
  const [payment, setPayment] = useState<PaymentDetails | null>(null)
  const [error, setError] = useState("")
  
  const paymentId = searchParams.get("payment_id")
  const isSimulation = searchParams.get("simulation") === "true"
  const reference = searchParams.get("reference")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    } else if (status === "authenticated") {
      if (isSimulation) {
        createSimulationPaymentDetails()
      } else if (paymentId) {
        fetchPaymentDetails()
      }
    }
  }, [status, paymentId, isSimulation])

  const createSimulationPaymentDetails = () => {
    console.log('🎭 Creating simulation payment details')
    const simulatedPayment: PaymentDetails = {
      id: 'simulation_' + Date.now(),
      amount: 1341000, // Plan Basic annual
      currency: 'COP',
      reference: reference || 'FINKARGO_SUB_SIMULATION',
      status: 'APPROVED',
      plan: 'Basic',
      billingCycle: 'annual',
      paymentMethod: 'credit_card',
      createdAt: new Date().toISOString()
    }
    setPayment(simulatedPayment)
    setLoading(false)
  }

  const fetchPaymentDetails = async () => {
    try {
      const response = await fetch(`/api/payments/${paymentId}`)
      const data = await response.json()
      
      if (response.ok) {
        setPayment(data.payment)
      } else {
        setError(data.error || "Error al cargar los detalles del pago")
      }
    } catch (err) {
      setError("Error al cargar los detalles del pago")
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (amount: number, currency: string) => {
    if (currency === "COP") {
      return `$${amount.toLocaleString('es-CO')} COP`
    } else {
      return `$${amount.toLocaleString('en-US')} USD`
    }
  }

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'professional': return Target
      case 'enterprise': return Crown
      default: return Zap
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error || !payment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-600 mb-2">Error</h1>
          <p className="text-gray-600 mb-4">{error || "Pago no encontrado"}</p>
          <Link href="/precios">
            <Button>Ver Planes</Button>
          </Link>
        </div>
      </div>
    )
  }

  const PlanIcon = getPlanIcon(payment.plan)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Simulation Banner */}
      {isSimulation && (
        <div className="bg-yellow-50 border-b border-yellow-200">
          <div className="container mx-auto px-4 py-3">
            <div className="text-center">
              <span className="text-yellow-800 font-medium">
                🎭 Modo Simulación - Este es un pago de prueba, no se procesó dinero real
              </span>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-600 mb-2">
              ¡Pago exitoso! 🎉
            </h1>
            <p className="text-lg text-gray-600">
              Tu suscripción ha sido activada correctamente
            </p>
          </div>

          {/* Payment Details Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <PlanIcon className="w-6 h-6 mr-2 text-primary" />
                  Plan {payment.plan}
                </div>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Activo
                </Badge>
              </CardTitle>
              <CardDescription>
                Facturación {payment.billingCycle === 'annual' ? 'anual' : 'mensual'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Monto pagado:</span>
                  <div className="text-lg font-semibold">
                    {formatPrice(payment.amount, payment.currency)}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Método de pago:</span>
                  <div className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-1" />
                    <span className="capitalize">{payment.paymentMethod}</span>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Referencia:</span>
                  <div className="font-mono text-sm">{payment.reference}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Fecha:</span>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{new Date(payment.createdAt).toLocaleDateString('es-CO')}</span>
                  </div>
                </div>
              </div>

              {/* Next billing info */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Próxima facturación</h4>
                <p className="text-sm text-gray-600">
                  {payment.billingCycle === 'annual' 
                    ? 'Tu suscripción se renovará automáticamente en 1 año'
                    : 'Tu suscripción se renovará automáticamente el próximo mes'
                  }
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  Puedes cancelar en cualquier momento desde tu dashboard
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>¿Qué sigue ahora?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Accede a tu dashboard</h4>
                    <p className="text-sm text-gray-600">
                      Explora todas las funcionalidades de tu plan {payment.plan}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Configura tu primera búsqueda</h4>
                    <p className="text-sm text-gray-600">
                      Comienza analizando a tus competidores o buscando proveedores
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Obtén soporte premium</h4>
                    <p className="text-sm text-gray-600">
                      Contáctanos si necesitas ayuda para configurar tu cuenta
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full" size="lg">
                <ArrowRight className="mr-2 h-4 w-4" />
                Ir al Dashboard
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Descargar Factura
            </Button>
          </div>

          {/* Support */}
          <div className="text-center mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              ¿Necesitas ayuda para comenzar?
            </p>
            <div className="space-x-4">
              <a href="mailto:soporte@finkargo.com" className="text-primary hover:underline text-sm">
                soporte@finkargo.com
              </a>
              <span className="text-gray-600">•</span>
              <a href="tel:+5712345678" className="text-primary hover:underline text-sm">
                +57 (1) 234-5678
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}