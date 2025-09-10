"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Check,
  CreditCard,
  Calendar,
  Users,
  FileText,
  TrendingUp,
  Crown,
  Zap,
  Building,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

interface SubscriptionData {
  id: string
  plan: string
  status: string
  currentPeriodStart: string
  currentPeriodEnd: string
  billingCycle: string
  reportsLimit: number
  usersLimit: number
  reportsUsed: number
  cancelAtPeriodEnd?: boolean
  canceledAt?: string
  createdAt: string
  updatedAt: string
}

interface PaymentData {
  id: string
  amount: number
  currency: string
  status: string
  provider: string
  description: string
  planType: string
  customerEmail: string
  createdAt: string
  paidAt?: string
  failedAt?: string
  failureReason?: string
}

interface SubscriptionPlan {
  id: string
  name: string
  price: {
    monthly: number
    yearly: number
  }
  features: string[]
  reportsLimit: number
  usersLimit: number
  icon: React.ComponentType<{ className?: string }>
  popular?: boolean
}

const plans: SubscriptionPlan[] = [
  {
    id: 'TRIMESTRAL',
    name: 'Plan Trimestral',
    price: { monthly: 216667, yearly: 2600000 },
    features: [
      'Hasta 50 reportes mensuales',
      'Análisis de importaciones',
      'Búsqueda de proveedores',
      'Soporte por email',
      'Hasta 3 usuarios',
      'Duración: 3 meses',
    ],
    reportsLimit: 50,
    usersLimit: 3,
    icon: FileText,
  },
  {
    id: 'SEMESTRAL',
    name: 'Plan Semestral',
    price: { monthly: 208333, yearly: 5000000 },
    features: [
      'Hasta 100 reportes mensuales',
      'Análisis avanzado de competidores',
      'Alertas de mercado',
      'Reportes personalizados',
      'Hasta 5 usuarios',
      'Duración: 6 meses',
      'Soporte prioritario',
    ],
    reportsLimit: 100,
    usersLimit: 5,
    icon: TrendingUp,
    popular: true,
  },
  {
    id: 'ANUAL',
    name: 'Plan Anual',
    price: { monthly: 175000, yearly: 8400000 },
    features: [
      'Hasta 200 reportes mensuales',
      'Análisis predictivo con IA',
      'Dashboard ejecutivo',
      'API de acceso',
      'Soporte dedicado 24/7',
      'Hasta 10 usuarios',
      'Duración: 12 meses',
      'Onboarding personalizado',
    ],
    reportsLimit: 200,
    usersLimit: 10,
    icon: Crown,
  },
]

export default function SubscriptionPage() {
  const { data: session } = useSession()
  const [currentSubscription, setCurrentSubscription] = useState<SubscriptionData | null>(null)
  const [payments, setPayments] = useState<PaymentData[]>([])
  const [loading, setLoading] = useState(true)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  useEffect(() => {
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/subscription')
      if (response.ok) {
        const data = await response.json()
        setCurrentSubscription(data.subscription)
        setPayments(data.payments || [])
        console.log('📊 Dashboard data loaded:', {
          hasSubscription: !!data.subscription,
          plan: data.subscription?.plan,
          status: data.subscription?.status,
          paymentsCount: data.payments?.length || 0
        })
      } else {
        console.error('Error response:', response.status)
      }
    } catch (error) {
      console.error('Error fetching subscription:', error)
      toast.error('Error al cargar los datos de suscripción')
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async (planId: string) => {
    try {
      const plan = plans.find(p => p.id === planId)
      if (!plan) return

      // Redirigir a checkout con los parámetros del plan
      const planTypeMap: Record<string, string> = {
        'TRIMESTRAL': 'trimestral',
        'SEMESTRAL': 'semestral', 
        'ANUAL': 'anual'
      }
      
      const planType = planTypeMap[planId] || 'trimestral'
      const checkoutUrl = `/checkout-simple?plan=${planType}`
      
      window.location.href = checkoutUrl

    } catch (error) {
      console.error('Error upgrading subscription:', error)
      toast.error('Error al procesar el pago')
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ComponentType<{ className?: string }> }> = {
      'TRIAL': { label: 'Prueba', variant: 'secondary', icon: Clock },
      'ACTIVE': { label: 'Activo', variant: 'default', icon: CheckCircle },
      'PAST_DUE': { label: 'Vencido', variant: 'destructive', icon: AlertCircle },
      'CANCELED': { label: 'Cancelado', variant: 'outline', icon: XCircle },
    }
    
    const config = statusMap[status] || { label: status, variant: 'outline', icon: AlertCircle }
    const IconComponent = config.icon
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <IconComponent className="w-3 h-3" />
        {config.label}
      </Badge>
    )
  }

  const getPaymentStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      'PENDING': { label: 'Pendiente', variant: 'secondary' },
      'PROCESSING': { label: 'Procesando', variant: 'secondary' },
      'COMPLETED': { label: 'Completado', variant: 'default' },
      'FAILED': { label: 'Fallido', variant: 'destructive' },
      'CANCELED': { label: 'Cancelado', variant: 'outline' },
    }
    
    const config = statusMap[status] || { label: status, variant: 'outline' }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const getPlanDisplayName = (plan: string) => {
    const planMap: Record<string, string> = {
      'TRIMESTRAL': 'Plan Trimestral',
      'SEMESTRAL': 'Plan Semestral',
      'ANUAL': 'Plan Anual'
    }
    return planMap[plan] || plan
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Suscripción</h1>
        <p className="text-gray-700">
          Gestiona tu plan y facturación
        </p>
      </div>

      {/* Current Subscription Status */}
      {currentSubscription && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Plan Actual
              {getStatusBadge(currentSubscription.status)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2">Plan</h4>
                <p className="text-2xl font-bold">{currentSubscription.plan}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Próximo Pago</h4>
                <p className="text-sm text-gray-700">
                  {new Date(currentSubscription.currentPeriodEnd).toLocaleDateString('es-CO')}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Reportes Utilizados</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{currentSubscription.reportsUsed} / {currentSubscription.reportsLimit}</span>
                    <span>
                      {Math.round((currentSubscription.reportsUsed / currentSubscription.reportsLimit) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(currentSubscription.reportsUsed / currentSubscription.reportsLimit) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Billing Cycle Toggle */}
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-4 bg-muted p-1 rounded-lg">
          <Button
            variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBillingCycle('monthly')}
          >
            Mensual
          </Button>
          <Button
            variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBillingCycle('yearly')}
          >
            Anual
            <Badge variant="secondary" className="ml-2 text-xs">
              Ahorra 17%
            </Badge>
          </Button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const Icon = plan.icon
          const currentPlan = currentSubscription?.plan === plan.id
          const price = billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly
          const monthlyPrice = billingCycle === 'yearly' ? plan.price.yearly / 12 : plan.price.monthly

          return (
            <Card key={plan.id} className={`relative ${plan.popular ? 'border-primary' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary">Más Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{plan.name}</CardTitle>
                <div className="space-y-1">
                  <p className="text-3xl font-bold">{formatPrice(monthlyPrice)}</p>
                  <p className="text-sm text-gray-700">
                    {billingCycle === 'yearly' ? 'por mes, facturado anualmente' : 'por mes'}
                  </p>
                  {billingCycle === 'yearly' && (
                    <p className="text-sm text-primary font-medium">
                      Total: {formatPrice(price)}
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={currentPlan ? 'outline' : 'default'}
                  onClick={() => !currentPlan && handleUpgrade(plan.id)}
                  disabled={currentPlan}
                >
                  {currentPlan ? 'Plan Actual' : 'Seleccionar Plan'}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Métodos de Pago
          </CardTitle>
          <CardDescription>
            Métodos de pago disponibles en Colombia
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <CreditCard className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-medium">Tarjetas</p>
                <p className="text-sm text-gray-700">Visa, MasterCard</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Building className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-medium">PSE</p>
                <p className="text-sm text-gray-700">Pagos Seguros en Línea</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <Zap className="w-8 h-8 text-purple-600" />
              <div>
                <p className="font-medium">Nequi</p>
                <p className="text-sm text-gray-700">Pago móvil</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}