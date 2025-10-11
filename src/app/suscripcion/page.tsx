"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BrandIcon } from "@/components/ui/brand-icon"
import {
  Check,
  CreditCard,
  FileText,
  TrendingUp,
  Crown,
  Zap,
  Building,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  ArrowLeft,
  Calendar,
  Users,
  Download,
  HeadphonesIcon,
  BookOpen,
  Banknote,
  Smartphone,
  Star,
  Globe,
  Database,
  Shield,
  ChevronRight
} from "lucide-react"
import { toast } from "sonner"
import { MainFooter } from "@/components/ui/main-footer"

interface SubscriptionData {
  id: string
  plan: string
  status: string
  currentPeriodStart: string
  currentPeriodEnd: string
  billingCycle: string
  createdAt: string
  updatedAt: string
}

interface PricingPlan {
  id: string
  name: string
  period: string
  priceUSD: number
  features: string[]
  popular?: boolean
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  borderColor: string
}

const plans: PricingPlan[] = [
  {
    id: 'trimestral',
    name: 'Trimestral',
    period: '3 meses',
    priceUSD: 1100,
    features: [
      'Acceso completo a toda la base de datos',
      'Todas las fracciones arancelarias',
      'Actualizaciones mensuales',
      'Descargas ilimitadas a Excel',
      'Soporte prioritario 24/7',
      'Capacitaciones incluidas'
    ],
    icon: Calendar,
    gradient: 'from-green-500 to-emerald-600',
    borderColor: 'border-green-500'
  },
  {
    id: 'semestral',
    name: 'Semestral',
    period: '6 meses',
    priceUSD: 2000,
    features: [
      'Acceso completo a toda la base de datos',
      'Todas las fracciones arancelarias',
      'Actualizaciones mensuales',
      'Descargas ilimitadas a Excel',
      'Soporte prioritario 24/7',
      'Capacitaciones ilimitadas'
    ],
    icon: TrendingUp,
    gradient: 'from-purple-600 to-pink-600',
    borderColor: 'border-purple-600'
  },
  {
    id: 'anual',
    name: 'Anual',
    period: '12 meses',
    priceUSD: 2900,
    features: [
      'Acceso completo a toda la base de datos',
      'Todas las fracciones arancelarias',
      'Actualizaciones mensuales',
      'Descargas ilimitadas a Excel',
      'Soporte prioritario 24/7',
      'Capacitaciones ilimitadas',
      'Asesoría estratégica trimestral'
    ],
    popular: true,
    icon: Crown,
    gradient: 'from-blue-600 to-cyan-600',
    borderColor: 'border-blue-600'
  }
]

const paymentMethods = [
  {
    name: "Tarjetas de Crédito/Débito",
    icon: CreditCard,
    description: "Visa, Mastercard, American Express",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    name: "OXXO",
    icon: Banknote,
    description: "Pago en efectivo en tiendas OXXO",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    name: "SPEI",
    icon: Building,
    description: "Transferencias bancarias mexicanas",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    name: "Link",
    icon: Zap,
    description: "Pago rápido con Stripe Link",
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  }
]

export default function SuscripcionPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [currentSubscription, setCurrentSubscription] = useState<SubscriptionData | null>(null)
  const [loading, setLoading] = useState(true)

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?from=/suscripcion")
      return
    }
  }, [status, router])

  useEffect(() => {
    // Solo hacer fetch si está completamente autenticado
    if (status === "authenticated" && session) {
      fetchSubscription()
    } else if (status === "loading") {
      // Aún cargando la sesión, no hacer nada
      return
    } else {
      // No autenticado
      setLoading(false)
    }
  }, [session, status])

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/subscription')

      if (response.ok) {
        const data = await response.json()
        setCurrentSubscription(data.subscription)
      } else if (response.status === 401) {
        // No autorizado - simplemente no cargar la suscripción
        // No redirigir porque el usuario ya está en la página de suscripción
        console.log('No subscription found or not authorized')
      }
    } catch (error) {
      console.error('Error fetching subscription:', error)
      // No mostrar error al usuario si no hay suscripción
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async (planId: string) => {
    try {
      const selectedPlan = plans.find(p => p.id === planId)
      if (!selectedPlan) {
        toast.error('Plan no encontrado')
        return
      }
      const checkoutUrl = `/checkout-simple?plan=${planId}&amount=${selectedPlan.priceUSD}&currency=USD`
      window.location.href = checkoutUrl
    } catch (error) {
      console.error('Error upgrading subscription:', error)
      toast.error('Error al procesar el pago')
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { 
      label: string; 
      variant: 'default' | 'secondary' | 'destructive' | 'outline'; 
      icon: React.ComponentType<{ className?: string }>; 
      color: string;
      bgColor: string;
      borderColor: string;
    }> = {
      'TRIAL': { 
        label: 'Período de Prueba', 
        variant: 'default', 
        icon: Zap, 
        color: 'text-orange-700',
        bgColor: 'bg-orange-100',
        borderColor: 'border-orange-300'
      },
      'ACTIVE': { 
        label: 'Activo', 
        variant: 'default', 
        icon: CheckCircle, 
        color: 'text-green-700',
        bgColor: 'bg-green-100',
        borderColor: 'border-green-300'
      },
      'INACTIVE': { 
        label: 'Inactivo', 
        variant: 'destructive', 
        icon: XCircle, 
        color: 'text-red-700',
        bgColor: 'bg-red-100',
        borderColor: 'border-red-300'
      },
      'PAST_DUE': { 
        label: 'Vencido', 
        variant: 'destructive', 
        icon: AlertCircle, 
        color: 'text-red-700',
        bgColor: 'bg-red-100',
        borderColor: 'border-red-300'
      },
      'CANCELED': { 
        label: 'Cancelado', 
        variant: 'outline', 
        icon: XCircle, 
        color: 'text-gray-600',
        bgColor: 'bg-gray-100',
        borderColor: 'border-gray-300'
      },
    }
    
    const config = statusMap[status] || statusMap['INACTIVE']
    const IconComponent = config.icon
    
    return (
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm ${config.bgColor} ${config.color} border ${config.borderColor}`}>
        <IconComponent className="w-4 h-4" />
        {config.label}
      </div>
    )
  }

  const getPlanDisplayName = (plan: string) => {
    const planMap: Record<string, string> = {
      'TRIMESTRAL': 'Plan Trimestral',
      'trimestral': 'Plan Trimestral',
      'SEMESTRAL': 'Plan Semestral',
      'semestral': 'Plan Semestral',
      'ANUAL': 'Plan Anual',
      'anual': 'Plan Anual'
    }
    return planMap[plan] || plan
  }

  // Show loading while checking authentication
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <BrandIcon size="lg" />
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  // Don't render anything if redirecting
  if (status === "unauthenticated") {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3">
              <BrandIcon size="md" />
              <div>
                <span className="text-lg font-bold text-brand-navy">Analiza</span>
                <span className="text-sm text-brand-navy-dark font-medium ml-1">de Finkargo</span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al inicio
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Decorations */}
      <section className="relative py-16 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
        
        {/* Decorative Icons */}
        <div className="absolute top-20 right-20 text-6xl text-blue-500/10 transform rotate-12">
          <Database className="w-24 h-24" />
        </div>
        <div className="absolute bottom-20 left-20 text-6xl text-orange-500/10 transform -rotate-12">
          <Globe className="w-24 h-24" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 text-sm">
              💎 GESTIÓN DE SUSCRIPCIÓN
            </Badge>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
              Elige el Plan Perfecto para Tu Empresa
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Accede a datos verificados y confiables para optimizar tus importaciones con inteligencia de mercado
            </p>
          </div>


          {/* Current Subscription Status */}
          {currentSubscription && (
            <Card className="mb-12 shadow-xl border-0 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${
                currentSubscription.status === 'ACTIVE' 
                  ? 'from-green-500 to-emerald-500' 
                  : currentSubscription.status === 'TRIAL'
                  ? 'from-orange-500 to-yellow-500'
                  : 'from-red-500 to-pink-500'
              }`}></div>
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <Shield className="h-6 w-6 text-blue-600" />
                      {currentSubscription.status === 'TRIAL' 
                        ? 'Tu Período de Prueba'
                        : 'Tu Plan Actual'}
                    </CardTitle>
                    <p className="text-gray-600 mt-2">
                      {currentSubscription.status === 'TRIAL'
                        ? 'Explora todas las funcionalidades de Finkargo Analiza'
                        : getPlanDisplayName(currentSubscription.plan)}
                    </p>
                  </div>
                  {getStatusBadge(currentSubscription.status)}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                    <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-1">Fecha de Inicio</p>
                    <p className="text-lg font-semibold">
                      {new Date(currentSubscription.currentPeriodStart).toLocaleDateString('es-CO')}
                    </p>
                  </div>
                  <div className={`text-center p-6 rounded-2xl ${
                    currentSubscription.status === 'ACTIVE' 
                      ? 'bg-gradient-to-br from-green-50 to-emerald-50'
                      : currentSubscription.status === 'TRIAL'
                      ? 'bg-gradient-to-br from-orange-50 to-yellow-50'
                      : 'bg-gradient-to-br from-red-50 to-pink-50'
                  }`}>
                    {currentSubscription.status === 'ACTIVE' ? (
                      <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
                    ) : currentSubscription.status === 'TRIAL' ? (
                      <Zap className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                    ) : (
                      <XCircle className="h-8 w-8 text-red-600 mx-auto mb-3" />
                    )}
                    <p className="text-sm text-gray-600 mb-1">Estado del Plan</p>
                    <p className={`text-lg font-semibold ${
                      currentSubscription.status === 'ACTIVE' 
                        ? 'text-green-600'
                        : currentSubscription.status === 'TRIAL'
                        ? 'text-orange-600'
                        : 'text-red-600'
                    }`}>
                      {currentSubscription.status === 'ACTIVE' 
                        ? 'Activo' 
                        : currentSubscription.status === 'TRIAL'
                        ? 'En Prueba'
                        : 'Inactivo'}
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                    <Clock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-1">
                      {currentSubscription.status === 'TRIAL' 
                        ? 'Fin del Período de Prueba'
                        : 'Próxima Renovación'}
                    </p>
                    <p className="text-lg font-semibold">
                      {new Date(currentSubscription.currentPeriodEnd).toLocaleDateString('es-CO')}
                    </p>
                    {currentSubscription.status === 'TRIAL' && (
                      <p className="text-xs text-orange-600 mt-2 font-medium">
                        Activa tu plan para continuar
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Special CTA for Trial Users */}
                {currentSubscription.status === 'TRIAL' && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-orange-100 to-yellow-100 border-2 border-orange-300 rounded-xl">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <Zap className="h-8 w-8 text-orange-600" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            ¡Activa tu plan antes de que termine tu prueba!
                          </p>
                          <p className="text-sm text-gray-600">
                            No pierdas acceso a todas las funcionalidades premium
                          </p>
                        </div>
                      </div>
                      <Button 
                        onClick={() => {
                          const plansSection = document.getElementById('plans-section')
                          plansSection?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg"
                      >
                        Ver Planes Disponibles
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Plans Grid */}
          <div id="plans-section" className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => {
              const Icon = plan.icon
              const currentPlan = currentSubscription?.plan?.toLowerCase() === plan.id.toLowerCase()
              const price = plan.priceUSD

              return (
                <Card 
                  key={plan.id} 
                  className={`relative shadow-xl hover:shadow-2xl transition-all duration-300 border-2 ${
                    plan.popular ? plan.borderColor : 'border-gray-200'
                  } ${currentPlan ? 'ring-4 ring-green-400 ring-opacity-50' : ''} overflow-hidden`}
                >
                  {plan.popular && (
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.gradient}`}></div>
                  )}
                  
                  {plan.popular && (
                    <div className="absolute -top-1 -right-1">
                      <div className={`bg-gradient-to-r ${plan.gradient} text-white text-xs font-bold px-4 py-2 rounded-bl-xl shadow-lg`}>
                        MÁS POPULAR
                      </div>
                    </div>
                  )}
                  
                  {currentPlan && (
                    <div className="absolute -top-1 -left-1">
                      <div className="bg-green-500 text-white text-xs font-bold px-4 py-2 rounded-br-xl shadow-lg flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        ACTIVO
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4 pt-8">
                    <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg transform hover:scale-110 transition-transform`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <p className="text-sm text-gray-600 mb-4">{plan.period}</p>
                    <div className="space-y-1">
                      <p className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        {formatPrice(price)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Pago único por {plan.period.toLowerCase()}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6 pt-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className={`rounded-full p-1 bg-gradient-to-br ${plan.gradient} flex-shrink-0 mt-0.5`}>
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full py-6 text-base font-semibold ${
                        currentPlan 
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                          : `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg transform hover:scale-105 transition-all`
                      }`}
                      onClick={() => !currentPlan && handleUpgrade(plan.id)}
                      disabled={currentPlan}
                    >
                      {currentPlan ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Plan Actual
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Seleccionar Plan
                          <ChevronRight className="w-5 h-5" />
                        </span>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Payment Methods */}
          <Card className="shadow-xl border-0 mb-16">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-white">
              <CardTitle className="flex items-center text-2xl">
                <CreditCard className="w-6 h-6 mr-3 text-blue-600" />
                Métodos de Pago Disponibles
              </CardTitle>
              <CardDescription className="text-base">
                Procesamos pagos de forma segura a través de Stripe
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {paymentMethods.map((method, index) => {
                  const Icon = method.icon
                  return (
                    <div key={index} className="group hover:scale-105 transition-transform">
                      <div className={`${method.bgColor} rounded-2xl p-6 text-center h-full`}>
                        <Icon className={`w-12 h-12 ${method.color} mx-auto mb-4`} />
                        <h4 className="font-semibold text-gray-900 mb-2">{method.name}</h4>
                        <p className="text-xs text-gray-600">{method.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Trust Section with WhatsApp Support */}
          <div className="text-center py-12">
            <div className="flex items-center justify-center gap-8 flex-wrap mb-8">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Pagos 100% Seguros</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Datos Encriptados</span>
              </div>
              <div className="flex items-center gap-2">
                <HeadphonesIcon className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600">Soporte 24/7</span>
              </div>
            </div>
            
            {/* WhatsApp Support CTA */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  ¿Tienes preguntas sobre los planes?
                </h3>
                <p className="text-gray-600 mb-6">
                  Nuestro equipo de soporte está listo para ayudarte a elegir el mejor plan para tu empresa
                </p>
                <a
                  href="https://api.whatsapp.com/send?phone=573222235280&text=Hola%2C%20tengo%20una%20consulta%20espec%C3%ADfica%20sobre%20Finkargo%20Analiza.%20&utm_source=website&utm_medium=whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Contactar por WhatsApp
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <MainFooter />
    </div>
  )
}

// Add missing import
import { Lock } from "lucide-react"