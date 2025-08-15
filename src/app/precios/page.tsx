"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BrandIcon } from "@/components/ui/brand-icon"
import { ScrollToTop } from "@/components/ui/scroll-to-top"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  CheckCircle,
  X,
  Zap,
  Crown,
  Building2,
  CreditCard,
  Smartphone,
  Banknote,
  Shield,
  Users,
  BarChart3,
  Globe,
  Target,
  Database,
  Clock,
  Award,
  ArrowRight,
  Star
} from "lucide-react"

interface PricingTier {
  id: string
  name: string
  description: string
  monthlyPriceCOP: number
  annualPriceCOP: number
  monthlyPriceUSD: number
  annualPriceUSD: number
  popular?: boolean
  features: string[]
  limits: {
    queries: string
    users: string
    exports: string
    support: string
  }
  cta: string
  wompiPlanId?: string
}

const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfecto para emprendedores y pequeñas empresas",
    monthlyPriceCOP: 0,
    annualPriceCOP: 0,
    monthlyPriceUSD: 0,
    annualPriceUSD: 0,
    features: [
      "100 consultas mensuales",
      "Búsqueda básica de proveedores",
      "Análisis básico de competidores",
      "Reportes estándar",
      "Exportación a PDF",
      "Soporte por email"
    ],
    limits: {
      queries: "100/mes",
      users: "1 usuario",
      exports: "5/mes",
      support: "Email"
    },
    cta: "Comenzar Gratis"
  },
  {
    id: "basic",
    name: "Basic",
    description: "Ideal para pequeñas empresas que necesitan más datos",
    monthlyPriceCOP: 149000,
    annualPriceCOP: 1341000, // 25% descuento anual
    monthlyPriceUSD: 37,
    annualPriceUSD: 333, // 25% descuento anual
    features: [
      "1,000 consultas mensuales",
      "Búsqueda avanzada de proveedores",
      "Análisis de competidores con alertas",
      "Reportes personalizables",
      "Exportación a Excel y PDF",
      "Soporte por chat y email",
      "Dashboard básico"
    ],
    limits: {
      queries: "1,000/mes",
      users: "2 usuarios",
      exports: "50/mes",
      support: "Chat + Email"
    },
    cta: "Comenzar Prueba Gratis",
    wompiPlanId: "basic-monthly"
  },
  {
    id: "professional",
    name: "Professional", 
    description: "Para empresas en crecimiento que necesitan más datos",
    monthlyPriceCOP: 349000,
    annualPriceCOP: 3141000, // 25% descuento anual
    monthlyPriceUSD: 87,
    annualPriceUSD: 785, // 25% descuento anual
    popular: true,
    features: [
      "5,000 consultas mensuales",
      "Base completa de proveedores (50K+)",
      "Análisis avanzado de competidores",
      "Alertas en tiempo real",
      "Reportes personalizados",
      "Exportación avanzada (Excel, API)",
      "Análisis de tendencias",
      "Dashboard ejecutivo",
      "Soporte prioritario"
    ],
    limits: {
      queries: "5,000/mes",
      users: "5 usuarios",
      exports: "Ilimitado",
      support: "Chat + Email"
    },
    cta: "Comenzar Prueba Gratis",
    wompiPlanId: "professional-monthly"
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Para grandes empresas con necesidades avanzadas", 
    monthlyPriceCOP: 799000,
    annualPriceCOP: 7192000, // 25% descuento anual
    monthlyPriceUSD: 199,
    annualPriceUSD: 1791, // 25% descuento anual
    features: [
      "Consultas ilimitadas",
      "IA predictiva avanzada",
      "Integraciones personalizadas",
      "Análisis multi-empresa",
      "API completa",
      "Reportes white-label",
      "Dashboard ejecutivo personalizado",
      "Account manager dedicado",
      "Soporte 24/7",
      "Capacitación personalizada",
      "SLA garantizado"
    ],
    limits: {
      queries: "Ilimitado",
      users: "Ilimitado",
      exports: "Ilimitado",
      support: "24/7 + Phone"
    },
    cta: "Contactar Ventas",
    wompiPlanId: "enterprise-monthly"
  }
]

const paymentMethods = [
  {
    name: "Tarjetas de Crédito/Débito",
    icon: CreditCard,
    description: "Visa, Mastercard, American Express",
    available: true
  },
  {
    name: "PSE",
    icon: Banknote,
    description: "Pago Seguro en Línea - Bancos colombianos",
    available: true
  },
  {
    name: "Efectivo",
    icon: Smartphone,
    description: "Efecty, Baloto, PagaTodo",
    available: true
  },
  {
    name: "Bancolombia QR",
    icon: Smartphone,
    description: "Pago rápido con código QR",
    available: true
  }
]

const testimonials = [
  {
    name: "Carlos Mejía",
    company: "ImportColombia SAS",
    role: "Gerente General",
    content: "El plan Professional nos ayudó a identificar 15 nuevos proveedores en Asia que redujeron nuestros costos en 35%. El ROI fue inmediato.",
    rating: 5,
    plan: "Professional"
  },
  {
    name: "Ana Rodríguez",
    company: "TechSolutions Ltda",
    role: "Directora de Compras",
    content: "La integración con nuestra ERP a través de la API del plan Enterprise nos ahorró 20 horas semanales en análisis manual.",
    rating: 5,
    plan: "Enterprise"
  },
  {
    name: "Luis Herrera",
    company: "StartupColombia",
    role: "Fundador",
    content: "Comenzamos con el plan gratuito y en 3 meses ya habíamos escalado a Professional. Los datos de Aduanas son increíbles.",
    rating: 5,
    plan: "Starter → Professional"
  }
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')
  const [currency, setCurrency] = useState<'COP' | 'USD'>('COP')

  const formatPrice = (price: number, curr: 'COP' | 'USD') => {
    if (price === 0) return 'Gratis'
    
    if (curr === 'COP') {
      return `$${price.toLocaleString('es-CO')}`
    } else {
      return `$${price.toLocaleString('en-US')}`
    }
  }

  const getPrice = (tier: PricingTier) => {
    if (billingCycle === 'monthly') {
      return currency === 'COP' ? tier.monthlyPriceCOP : tier.monthlyPriceUSD
    } else {
      return currency === 'COP' ? tier.annualPriceCOP : tier.annualPriceUSD
    }
  }

  const getSavings = (tier: PricingTier) => {
    if (tier.monthlyPriceCOP === 0) return 0
    const monthlyTotal = currency === 'COP' ? tier.monthlyPriceCOP * 12 : tier.monthlyPriceUSD * 12
    const annualPrice = currency === 'COP' ? tier.annualPriceCOP : tier.annualPriceUSD
    return Math.round(((monthlyTotal - annualPrice) / monthlyTotal) * 100)
  }

  return (
    <div className="min-h-screen bg-gradient-section">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="container-responsive h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <BrandIcon size="md" />
            <div>
              <span className="heading-sm text-brand-navy">Analiza</span>
              <span className="body-sm text-brand-navy-dark font-medium ml-1">de Finkargo</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="body-md text-secondary hover:text-brand-navy-dark transition-colors">
              Beneficios
            </Link>
            <Link href="/precios" className="body-md text-brand-navy-dark font-semibold">
              Precios
            </Link>
            <Link href="/demo" className="body-md text-secondary hover:text-brand-navy-dark transition-colors">
              Demo
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost" className="text-secondary hover:bg-cyan-50 hover:text-brand-navy-dark transition-all">Iniciar Sesión</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="btn-primary-gradient text-white">Comenzar Gratis</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-4 lg:py-6 relative dots-decoration">
        <div className="container mx-auto px-4 text-center">
          <div className="relative z-10">
            <Badge className="mb-4 px-6 py-3 bg-brand-coral/10 text-brand-coral border border-brand-coral/20">
              🎯 PLANES PARA EL MERCADO COLOMBIANO
            </Badge>
            <h1 className="heading-display text-gray-600 mb-4">
              Elige el plan perfecto
              <br />
              <span className="text-brand-navy-dark font-bold">para tu negocio</span>
            </h1>
            <p className="body-lg text-gray-600 mb-4 max-w-4xl mx-auto leading-relaxed">
              Diseñado específicamente para empresas colombianas. Precios en pesos colombianos, 
              métodos de pago locales (PSE, Efecty, Bancolombia) y soporte 100% en español.
            </p>
            
            {/* Live State Indicator */}
            <div className="flex items-center justify-center gap-6 mb-6 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-brand-navy-dark/10 rounded-full">
                <div className="w-2 h-2 bg-brand-navy-dark rounded-full animate-pulse" />
                <span className="text-brand-navy-dark font-medium">
                  {billingCycle === 'monthly' ? 'Pago Mensual' : 'Pago Anual (-25%)'}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-brand-coral/10 rounded-full">
                <div className="w-2 h-2 bg-brand-coral rounded-full animate-pulse" />
                <span className="text-brand-coral font-medium">
                  {currency === 'COP' ? 'Pesos Colombianos' : 'Dólares USD'}
                </span>
              </div>
            </div>
          
            {/* Billing Toggle */}
            {/* Enhanced Billing & Currency Toggle */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-4">
              <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
                <div className="flex items-center bg-gray-50 rounded-xl p-1">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-8 py-4 body-md font-semibold rounded-xl transition-all duration-300 relative ${
                      billingCycle === 'monthly'
                        ? 'bg-white text-brand-navy-dark shadow-lg transform scale-[1.02] border border-brand-navy-dark/20'
                        : 'text-gray-700 hover:text-brand-navy-dark hover:bg-white/50'
                    }`}
                  >
                    💳 Mensual
                    {billingCycle === 'monthly' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-navy-dark rounded-full animate-pulse" />
                    )}
                  </button>
                  <button
                    onClick={() => setBillingCycle('annual')}
                    className={`px-8 py-4 body-md font-semibold rounded-xl transition-all duration-300 relative ${
                      billingCycle === 'annual'
                        ? 'bg-white text-brand-navy-dark shadow-lg transform scale-[1.02] border border-brand-navy-dark/20'
                        : 'text-gray-700 hover:text-brand-navy-dark hover:bg-white/50'
                    }`}
                  >
                    📅 Anual
                    {billingCycle === 'annual' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-navy-dark rounded-full animate-pulse" />
                    )}
                    <Badge className="ml-3 text-xs bg-gradient-to-r from-green-500 to-green-600 text-white font-bold animate-bounce">
                      -25% 💰
                    </Badge>
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
                <div className="flex items-center bg-gray-50 rounded-xl p-1">
                  <button
                    onClick={() => setCurrency('COP')}
                    className={`px-6 py-4 body-md font-semibold rounded-xl transition-all duration-300 relative ${
                      currency === 'COP'
                        ? 'bg-white text-brand-coral shadow-lg transform scale-[1.02] border border-brand-coral/20'
                        : 'text-gray-700 hover:text-brand-coral hover:bg-white/50'
                    }`}
                  >
                    🇨🇴 Pesos
                    {currency === 'COP' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-coral rounded-full animate-pulse" />
                    )}
                  </button>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`px-6 py-4 body-md font-semibold rounded-xl transition-all duration-300 relative ${
                      currency === 'USD'
                        ? 'bg-white text-brand-coral shadow-lg transform scale-[1.02] border border-brand-coral/20'
                        : 'text-gray-700 hover:text-brand-coral hover:bg-white/50'
                    }`}
                  >
                    💵 Dólares
                    {currency === 'USD' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-coral rounded-full animate-pulse" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pt-16 pb-6 bg-white relative overflow-hidden">
        {/* Decorative vectors */}
        <div className="absolute top-20 right-10 opacity-4 pointer-events-none">
          <Target className="w-14 h-14 text-purple-500" />
        </div>
        <div className="absolute bottom-10 left-8 opacity-3 pointer-events-none">
          <BarChart3 className="w-16 h-16 text-blue-400" />
        </div>
        <div className="absolute top-1/2 right-1/4 opacity-2 pointer-events-none transform -translate-y-1/2">
          <BrandIcon size="lg" />
        </div>
        <div className="absolute top-32 left-20 opacity-3 pointer-events-none">
          <Zap className="w-12 h-12 text-yellow-500" />
        </div>
        
        <div className="container-responsive overflow-visible relative z-10">
          <div className="pricing-grid max-w-7xl mx-auto overflow-visible" style={{paddingTop: '2rem'}}>
            {pricingTiers.map((tier) => {
              const price = getPrice(tier)
              const savings = getSavings(tier)
              
              return (
                <Card 
                  key={tier.id}
                  className={`relative pricing-card business-card interactive-card layout-stable ${
                    tier.popular 
                      ? 'business-card-primary border-2 border-brand-cyan/20 shadow-xl lg:scale-[1.02]' 
                      : 'hover:border-brand-cyan/30'
                  }`}
                >
                  <CardHeader className="text-center pb-4 px-4" style={{paddingTop: tier.popular ? '3rem' : '1rem'}}>
                    {tier.popular && (
                      <div className="mb-4 -mt-8">
                        <Badge className="px-4 py-2 bg-orange-500 text-white shadow-lg font-bold text-sm">
                          <Crown className="w-4 h-4 mr-1" />
                          MÁS POPULAR
                        </Badge>
                      </div>
                    )}
                    <div className="flex items-center justify-center mb-4">
                      {tier.id === 'starter' && <Zap className="w-8 h-8 text-brand-navy-dark" />}
                      {tier.id === 'basic' && <BarChart3 className="w-8 h-8 text-brand-coral" />}
                      {tier.id === 'professional' && <Target className="w-8 h-8 text-brand-navy-dark" />}
                      {tier.id === 'enterprise' && <Crown className="w-8 h-8 text-brand-coral" />}
                    </div>
                    <CardTitle className="heading-md text-brand-navy mb-3 px-3 text-center font-bold">{tier.name}</CardTitle>
                    <CardDescription className="body-sm text-center px-3 min-h-[3.5rem] flex items-center justify-center leading-relaxed text-gray-600">
                      {tier.description}
                    </CardDescription>
                    
                    <div className="mt-8">
                      <div className="text-3xl lg:text-4xl font-bold text-brand-navy leading-tight">
                        <div className="break-words text-center px-2 text-brand-navy">
                          {formatPrice(price, currency)}
                        </div>
                        {price > 0 && (
                          <span className="body-md font-normal text-gray-700 block mt-2 text-center">
                            /{billingCycle === 'monthly' ? 'mes' : 'año'}
                          </span>
                        )}
                      </div>
                      
                      {billingCycle === 'annual' && savings > 0 && (
                        <div className="mt-3 text-center">
                          <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm animate-pulse">
                            💰 Ahorras {savings}% anual
                          </Badge>
                        </div>
                      )}
                      
                      {billingCycle === 'annual' && price > 0 && (
                        <p className="body-sm text-gray-700 mt-3 text-center px-3 bg-gray-50 rounded-lg py-2 mx-2">
                          📅 {formatPrice(
                            Math.round(price / 12), 
                            currency
                          )}/mes facturado anualmente
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col px-6 py-4">
                    <div className="space-y-4 flex-1">
                      {/* Limits */}
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border">
                        <h4 className="body-md font-semibold mb-4 text-center text-gray-700 flex items-center justify-center gap-2">
                          📊 Límites del Plan
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="body-sm text-gray-700">Consultas:</span>
                            <span className="body-sm font-medium text-right">{tier.limits.queries}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="body-sm text-gray-700">Usuarios:</span>
                            <span className="body-sm font-medium text-right">{tier.limits.users}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="body-sm text-gray-700">Exportes:</span>
                            <span className="body-sm font-medium text-right">{tier.limits.exports}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="body-sm text-gray-700">Soporte:</span>
                            <span className="body-sm font-medium text-right">{tier.limits.support}</span>
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-4">
                        <h4 className="body-md font-semibold text-center text-gray-700 flex items-center justify-center gap-2">
                          ✨ Características incluidas:
                        </h4>
                        <div className="space-y-3">
                          {tier.features.slice(0, 6).map((feature, index) => (
                            <div key={index} className="flex items-start body-sm bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                              <span className="leading-relaxed text-left text-gray-700">{feature}</span>
                            </div>
                          ))}
                          {tier.features.length > 6 && (
                            <div className="text-center">
                              <span className="body-sm text-gray-700">+{tier.features.length - 6} características más</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* CTA Button - Always at bottom */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      {tier.id === 'starter' ? (
                        <Link href="/auth/signup" className="block">
                          <Button className="w-full h-12 body-md font-medium bg-white border-2 border-gray-900 text-gray-600 hover:bg-gray-900 hover:text-white" variant="outline">
                            {tier.cta}
                          </Button>
                        </Link>
                      ) : tier.id === 'enterprise' ? (
                        <div>
                          <a href="https://meetings.hubspot.com/karol-rubio1?uuid=44d82d7b-eb62-49c0-9e52-813fdc8511a6&utm_source=website&utm_medium=cta&utm_campaign=enterprise_sales" target="_blank" rel="noopener noreferrer">
                            <Button className="w-full h-12 body-md font-medium mb-3 bg-white border-2 border-gray-900 text-gray-600 hover:bg-gray-900 hover:text-white" variant="outline">
                              📅 {tier.cta}
                            </Button>
                          </a>
                          <a href="https://api.whatsapp.com/send?phone=573222235280&text=Hola%2C%20me%20interesa%20el%20plan%20Enterprise%20de%20Finkargo%20Analiza.%20Me%20gustar%C3%ADa%20hablar%20con%20ventas%20para%20conocer%20m%C3%A1s%20detalles.%20&utm_source=website&utm_medium=whatsapp" target="_blank" rel="noopener noreferrer" className="block w-full text-center py-2 px-4 border border-gray-900 rounded-lg text-gray-600 hover:bg-gray-900 hover:text-white text-sm transition-colors">
                            💬 Consulta Rápida por WhatsApp
                          </a>
                        </div>
                      ) : (
                        <div>
                          <Link href={`/checkout?plan=${tier.id}&billing=${billingCycle}&currency=${currency}`} className="block mb-3">
                            <Button className={`w-full h-12 body-md font-medium ${tier.popular ? 'bg-brand-navy text-white hover:bg-brand-navy-dark' : 'bg-white border-2 border-gray-900 text-gray-600 hover:bg-gray-900 hover:text-white'}`} variant={tier.popular ? "default" : "outline"}>
                              {tier.cta}
                            </Button>
                          </Link>
                          <a href="https://meetings.hubspot.com/karol-rubio1?uuid=44d82d7b-eb62-49c0-9e52-813fdc8511a6&utm_source=website&utm_medium=cta&utm_campaign=demo_request" target="_blank" rel="noopener noreferrer" className="block w-full text-center py-2 px-4 border border-gray-900 rounded-lg text-gray-600 hover:bg-gray-900 hover:text-white text-sm transition-colors">
                            📅 Agendar Demo Personalizada
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <h2 className="heading-xl text-gray-600 mb-4">
              Métodos de pago colombianos
            </h2>
            <p className="body-lg text-gray-700">
              Paga de la forma que prefieras con total seguridad
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {paymentMethods.map((method, index) => (
              <Card key={index} className="text-center business-card hover:border-brand-navy/30 transition-colors">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-brand-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-6 h-6 text-brand-navy" />
                  </div>
                  <h3 className="heading-sm mb-2">{method.name}</h3>
                  <p className="body-sm text-gray-700">{method.description}</p>
                  {method.available && (
                    <Badge variant="secondary" className="mt-3 text-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Disponible
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="flex items-center justify-center space-x-6 body-sm text-gray-700">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-green-500" />
                Pagos 100% seguros
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2 text-gray-600" />
                Certificación PCI DSS
              </div>
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2 text-purple-500" />
                Powered by Wompi
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-blue-subtle">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <h2 className="heading-xl text-gray-600 mb-4">
              Lo que dicen las empresas colombianas
            </h2>
            <p className="body-lg text-gray-700">
              Importadores, exportadores y traders que optimizan su comercio exterior con Finkargo
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="business-card-elevated">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="body-md text-gray-700 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="heading-sm">{testimonial.name}</div>
                      <div className="body-sm text-gray-700">{testimonial.role}</div>
                      <div className="body-sm text-gray-700">{testimonial.company}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {testimonial.plan}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Decorative vectors */}
        <div className="absolute top-8 left-8 opacity-3 pointer-events-none">
          <BrandIcon size="lg" />
        </div>
        <div className="absolute top-12 right-1/4 opacity-4 pointer-events-none">
          <Database className="w-14 h-14 text-blue-600" />
        </div>
        <div className="absolute top-1/3 right-8 opacity-4 pointer-events-none">
          <svg className="w-14 h-14" viewBox="0 0 124 112" fill="none">
            <path d="M86.7734 0.00767596H37.2266C32.7789 0.00767596 28.6652 2.41025 26.4413 6.30964L1.66788 49.7019C-0.55596 53.6013 -0.55596 58.3987 1.66788 62.2981L26.4413 105.698C28.6652 109.597 32.7789 112 37.2266 112H86.7734C91.2211 112 95.3348 109.597 97.5587 105.698L122.332 62.2981C124.556 58.3987 124.556 53.6013 122.332 49.7019L97.5587 6.30197C95.3348 2.40258 91.2211 0 86.7734 0" fill="#5479F7"/>
          </svg>
        </div>
        <div className="absolute bottom-1/3 left-8 opacity-4 pointer-events-none">
          <svg className="w-12 h-12" viewBox="0 0 218 218" fill="none">
            <path d="M109 0L109 218" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M218 109L0 109" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M190.917 27.0833L27.0834 190.917" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M190.917 190.917L27.0833 27.0833" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M54.1667 13.5417L163.833 204.458" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M163.833 13.5417L54.1667 204.458" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="absolute bottom-8 right-8 opacity-3 pointer-events-none">
          <Globe className="w-16 h-16 text-green-600" />
        </div>
        <div className="absolute bottom-16 right-16 opacity-5 pointer-events-none">
          <BrandIcon size="lg" />
        </div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="section-header">
            <h2 className="heading-xl text-gray-600 mb-4">
              Preguntas frecuentes
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Primera columna */}
            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    ¿Para qué sirve Analiza?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Esta herramienta de inteligencia de mercado te ayuda a visualizar información actualizada y precisa sobre el mercado e industria de tu interés. Así podrás tomar decisiones informadas en cuanto a proveedores, estrategias de sourcing y gestión de riesgos.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    ¿Cómo funciona?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Analiza convierte los datos de comercio exterior que provienen de las aduanas en información valiosa a partir de tableros y gráficos personalizados e intuitivos que te permite identificar volúmenes de importaciones y/o exportaciones, mapear proveedores, precios de mercancía y costos asociados. Con esta información podrás tomar mejores decisiones y gestionar de manera ágil tus operaciones de importación.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    ¿Puedo cambiar de plan en cualquier momento?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Sí, puedes actualizar o degradar tu plan en cualquier momento desde tu dashboard. Los cambios se aplican inmediatamente.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    ¿Hay permanencia mínima?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    No hay contratos ni permanencia mínima. Puedes cancelar tu suscripción cuando quieras sin penalizaciones.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            {/* Segunda columna */}
            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    ¿Los precios incluyen IVA?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Los precios mostrados no incluyen IVA. Para empresas colombianas se aplicará el IVA correspondiente según la legislación vigente.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    ¿Qué pasa si supero mis límites?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Te notificaremos cuando te acerques al límite. Puedes actualizar tu plan o comprar paquetes adicionales.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    ¿Ofrecen descuentos para startups?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Sí, tenemos descuentos especiales para startups y ONGs. Contáctanos para conocer los requisitos y beneficios.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    ¿Hay soporte técnico incluido?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Todos los planes incluyen soporte técnico. El nivel y canales varían según el plan elegido (email, chat, teléfono).
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-xl mb-6 font-bold" style={{color: '#ffffff'}}>
            ¿Listo para comenzar?
          </h2>
          <p className="body-lg mb-8 max-w-2xl mx-auto" style={{color: '#ffffff'}}>
            Únete a más de 500+ empresas colombianas que ya transformaron su estrategia de importación y exportación
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup">
              <Button size="lg" className="px-8 py-4 body-lg bg-white text-gray-900 hover:bg-gray-100 font-bold">
                <Zap className="mr-2 h-5 w-5" />
                Comenzar Gratis
              </Button>
            </Link>
            <a href="https://meetings.hubspot.com/karol-rubio1?uuid=44d82d7b-eb62-49c0-9e52-813fdc8511a6&utm_source=website&utm_medium=cta&utm_campaign=sales_meeting" target="_blank" rel="noopener noreferrer">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 body-lg border-white bg-transparent text-white hover:bg-white hover:text-brand-navy"
              >
                <span className="mr-2">📅</span>
                Agendar Reunión Comercial
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-brand-navy rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <div>
                  <span className="heading-sm">Finkargo</span>
                  <span className="body-sm text-brand-navy-dark ml-1">Analiza</span>
                </div>
              </Link>
              <p className="text-gray-300 body-sm">
                La plataforma de inteligencia comercial más avanzada de Colombia.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Producto</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-300 hover:text-white transition-colors duration-200 block mb-2">Características</Link></li>
                <li><Link href="/precios" className="text-gray-300 hover:text-white transition-colors duration-200 block mb-2">Precios</Link></li>
                <li><Link href="/demo" className="text-gray-300 hover:text-white transition-colors duration-200 block mb-2">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="https://www.finkargo.com/nosotros/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200 block mb-2">Sobre Nosotros</a></li>
                <li><a href="https://devsite.finkargo.com/blog/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200 block mb-2">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Soporte</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 block mb-2">Centro de Ayuda</a></li>
                <li><a href="https://api.whatsapp.com/send?phone=573222235280&text=%C2%A1Hola!%20Somos%20Finkargo.%0A%0AEscribe%20tu%20mensaje.%20" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200 block mb-2">Contacto</a></li>
                <li><a href="https://devsite.finkargo.com/terminos-condiciones-servicios-analiza/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200 block mb-2">Términos</a></li>
                <li><a href="https://www.finkargo.com/politicas_privacidad/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200 block mb-2">Políticas de Privacidad</a></li>
                <li><a href="https://www.finkargo.com/aviso_privacidad/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200 block mb-2">Aviso de Privacidad</a></li>
                <li><a href="https://www.finkargo.com/tratamiento_datos_sensibles/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200 block mb-2">Datos Sensibles</a></li>
                <li><a href="https://www.finkargo.com/tratamiento_datos_personales/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200 block mb-2">Datos Personales</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center body-sm text-gray-300">
            <p>&copy; 2024 Finkargo Analiza. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
      
      <ScrollToTop />
    </div>
  )
}