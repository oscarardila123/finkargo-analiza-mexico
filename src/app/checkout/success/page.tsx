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
  ArrowLeft,
  Download,
  Calendar,
  CreditCard,
  Loader2,
  AlertCircle,
  XCircle
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
  
  const paymentId = searchParams.get("payment_id") || searchParams.get("id")
  const sessionId = searchParams.get("session_id") // Stripe session ID
  const isSimulation = searchParams.get("simulation") === "true"
  const reference = searchParams.get("reference")
  const paymentStatus = searchParams.get("status")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    } else if (status === "authenticated") {
      // Verificar si el pago realmente fue exitoso
      if (paymentStatus && ['DECLINED', 'FAILED', 'CANCELLED', 'ERROR'].includes(paymentStatus.toUpperCase())) {
        // Redirigir a página de fallo si el status indica fallo
        router.push(`/checkout/failed?reference=${reference}&error=${paymentStatus}&payment_id=${paymentId}`)
        return
      }

      if (isSimulation) {
        createSimulationPaymentDetails()
      } else if (sessionId) {
        // Stripe payment - use session_id
        fetchStripePaymentDetails()
      } else if (paymentId) {
        fetchPaymentDetails()
      }
    }
  }, [status, paymentId, sessionId, isSimulation, paymentStatus])

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

  const fetchStripePaymentDetails = async () => {
    try {
      console.log('💳 Fetching Stripe payment details for session:', sessionId)

      // Fetch session details from Stripe via API
      const response = await fetch(`/api/stripe/session/${sessionId}`)
      const data = await response.json()

      if (!response.ok) {
        // Session not found or expired - try to get from our database
        console.warn('⚠️ Could not fetch session from Stripe, trying database')

        if (paymentId) {
          // Try to fetch from our database
          try {
            const dbResponse = await fetch(`/api/payments/${paymentId}`)
            const dbData = await dbResponse.json()

            if (dbResponse.ok && dbData.payment) {
              setPayment(dbData.payment)
              setLoading(false)
              return
            }
          } catch (dbErr) {
            console.error('Could not fetch from database either:', dbErr)
          }
        }

        // Last resort: create basic fallback
        const fallbackPayment: PaymentDetails = {
          id: sessionId!,
          amount: parseFloat(searchParams.get('amount') || '0'),
          currency: 'USD',
          reference: searchParams.get('reference') || paymentId || 'PAGO_COMPLETADO',
          status: 'COMPLETED',
          plan: searchParams.get('plan') || 'Plan Suscripción',
          billingCycle: searchParams.get('period') || 'semestral',
          paymentMethod: 'card',
          createdAt: new Date().toISOString()
        }

        setPayment(fallbackPayment)
        setLoading(false)
        return
      }

      const session = data.session

      // Extract payment details from Stripe session
      const stripePayment: PaymentDetails = {
        id: session.id,
        amount: session.amount_total ? session.amount_total / 100 : 0, // Stripe returns cents
        currency: (session.currency || 'USD').toUpperCase(),
        reference: session.metadata?.reference || paymentId || 'STRIPE_' + Date.now(),
        status: 'COMPLETED',
        plan: session.metadata?.planName || 'Plan Suscripción',
        billingCycle: session.metadata?.period || 'semestral',
        paymentMethod: session.payment_method_types?.[0] || 'card',
        createdAt: new Date(session.created * 1000).toISOString()
      }

      setPayment(stripePayment)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching Stripe payment:', err)

      // Fallback to basic payment info
      const fallbackPayment: PaymentDetails = {
        id: sessionId!,
        amount: parseFloat(searchParams.get('amount') || '0'),
        currency: 'USD',
        reference: searchParams.get('reference') || 'PAGO_COMPLETADO',
        status: 'COMPLETED',
        plan: searchParams.get('plan') || 'Plan Suscripción',
        billingCycle: 'semestral',
        paymentMethod: 'card',
        createdAt: new Date().toISOString()
      }

      setPayment(fallbackPayment)
      setLoading(false)
    }
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
          <Card className="mb-8 border-2 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">🎉 ¡Tu pago ha sido confirmado!</CardTitle>
              <CardDescription className="text-green-700">
                Para activar tu cuenta y comenzar a usar Finkargo Analiza, necesitas contactarnos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center p-4 bg-white rounded-lg border border-green-200">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800">Contáctanos por WhatsApp</h4>
                    <p className="text-sm text-green-700">
                      Envía tu referencia de pago para activar tu cuenta inmediatamente
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-white rounded-lg border border-green-200">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800">Recibe tus credenciales</h4>
                    <p className="text-sm text-green-700">
                      Te enviaremos el acceso a la plataforma Finkargo Analiza
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-white rounded-lg border border-green-200">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-800">Comienza a analizar</h4>
                    <p className="text-sm text-green-700">
                      Inicia tu análisis de comercio exterior con tu plan {payment.plan}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Información importante */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">📋 Información para activación</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Referencia de pago:</span>
                    <span className="font-mono font-bold text-blue-900">{payment.reference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Plan adquirido:</span>
                    <span className="font-bold text-blue-900">{payment.plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Monto pagado:</span>
                    <span className="font-bold text-blue-900">{formatPrice(payment.amount, payment.currency)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <a 
                href={`https://api.whatsapp.com/send?phone=573222235280&text=¡Hola! Acabo de realizar el pago de mi suscripción a Finkargo Analiza.%0A%0A📋 *Detalles del pago:*%0A• Referencia: ${payment.reference}%0A• Plan: ${payment.plan}%0A• Monto: ${formatPrice(payment.amount, payment.currency)}%0A%0APor favor, activa mi cuenta para comenzar a usar la plataforma. ¡Gracias!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.886 3.488"/>
                  </svg>
                  Contactar por WhatsApp
                </Button>
              </a>
              <Link href="/" className="flex-1">
                <Button variant="outline" size="lg" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al Inicio
                </Button>
              </Link>
            </div>
            
            {/* Emergency Button for Failed Payments */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                ¿El pago fue rechazado o cancelado?
              </p>
              <Link 
                href={`/checkout/failed?reference=${payment.reference}&error=USER_REPORTED&payment_id=${payment.id}`}
                className="inline-block"
              >
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <XCircle className="mr-2 h-4 w-4" />
                  Mi pago falló, mostrar opciones
                </Button>
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="text-center mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800 mb-3 font-medium">
              💬 <strong>Activación inmediata por WhatsApp</strong>
            </p>
            <p className="text-xs text-green-700 mb-3">
              Para activar tu cuenta más rápido, contáctanos directamente por WhatsApp con tu referencia de pago
            </p>
            <div className="space-y-2">
              <a 
                href={`https://api.whatsapp.com/send?phone=573222235280&text=¡Hola! Necesito activar mi cuenta de Finkargo Analiza. Mi referencia de pago es: ${payment.reference}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
              >
                <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.886 3.488"/>
                </svg>
                WhatsApp: +57 (322) 223-5280
              </a>
              <br />
              <span className="text-gray-600">•</span>
              <a href="mailto:soporte@finkargo.com" className="text-gray-600 hover:text-gray-700 text-sm">
                soporte@finkargo.com
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