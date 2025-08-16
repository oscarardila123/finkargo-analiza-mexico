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
} from "lucide-react"
import { toast } from "sonner"

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
    id: 'BASIC',
    name: 'Básico',
    price: { monthly: 149000, yearly: 1490000 },
    features: [
      'Hasta 10 reportes mensuales',
      'Análisis básico de importaciones',
      'Búsqueda de proveedores',
      'Soporte por email',
      '1 usuario incluido',
    ],
    reportsLimit: 10,
    usersLimit: 1,
    icon: FileText,
  },
  {
    id: 'PROFESSIONAL',
    name: 'Profesional',
    price: { monthly: 349000, yearly: 3490000 },
    features: [
      'Hasta 50 reportes mensuales',
      'Análisis avanzado de competidores',
      'Alertas de mercado',
      'Reportes personalizados',
      'API de acceso',
      'Hasta 5 usuarios',
      'Soporte prioritario',
    ],
    reportsLimit: 50,
    usersLimit: 5,
    icon: TrendingUp,
    popular: true,
  },
  {
    id: 'ENTERPRISE',
    name: 'Empresarial',
    price: { monthly: 799000, yearly: 7990000 },
    features: [
      'Reportes ilimitados',
      'Análisis predictivo con IA',
      'Dashboard ejecutivo',
      'Integración personalizada',
      'Soporte dedicado 24/7',
      'Usuarios ilimitados',
      'Onboarding personalizado',
    ],
    reportsLimit: 999,
    usersLimit: 999,
    icon: Crown,
  },
]

export default function SubscriptionPage() {
  const { data: session } = useSession()
  const [currentSubscription, setCurrentSubscription] = useState<any>(null)
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
      }
    } catch (error) {
      console.error('Error fetching subscription:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async (planId: string) => {
    try {
      const plan = plans.find(p => p.id === planId)
      if (!plan) return

      const amount = billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly
      
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          plan: planId,
          billingCycle: billingCycle.toUpperCase(),
          paymentMethod: {
            type: 'CARD',
          },
          customerData: {
            fullName: session?.user?.name,
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Error al crear el pago')
      }

      const data = await response.json()
      
      // Redirect to Wompi payment page or show payment form
      if (data.wompiPayment?.id) {
        // In a real implementation, you would redirect to Wompi's payment page
        // or show an embedded payment form
        toast.success('Redirigiendo a la pasarela de pago...')
        
        // For demo purposes, we'll show a success message
        setTimeout(() => {
          toast.success('¡Suscripción actualizada exitosamente!')
          fetchSubscription()
        }, 2000)
      }

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
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      'TRIAL': { label: 'Prueba', variant: 'secondary' },
      'ACTIVE': { label: 'Activo', variant: 'default' },
      'PAST_DUE': { label: 'Vencido', variant: 'destructive' },
      'CANCELED': { label: 'Cancelado', variant: 'outline' },
    }
    
    const config = statusMap[status] || { label: status, variant: 'outline' }
    return <Badge variant={config.variant}>{config.label}</Badge>
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