"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrandIcon } from "@/components/ui/brand-icon"
import { MainFooter } from "@/components/ui/main-footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MainHeader } from "@/components/ui/main-header"
import { CheckoutButton } from "@/components/ui/checkout-button"
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
  period: string
  priceUSD: number
  popular?: boolean
  features: string[]
  cta: string
  wompiPlanId?: string
  category: 'full' | 'sector'
  fractionsRange?: string
}

// Full Access Plans
const fullAccessPlans: PricingTier[] = [
  {
    id: "full-trimestral",
    name: "Trimestral",
    period: "3 meses",
    priceUSD: 1100,
    category: 'full',
    features: [
      "Acceso completo a toda la base de datos",
      "Todas las fracciones arancelarias",
      "Actualizaciones mensuales",
      "Descargas ilimitadas a Excel",
      "Consultas ilimitadas",
      "Soporte prioritario 24/7",
      "Capacitaciones incluidas"
    ],
    cta: "Comenzar Ahora",
    wompiPlanId: "full-trimestral"
  },
  {
    id: "full-semestral",
    name: "Semestral",
    period: "6 meses",
    priceUSD: 2000,
    category: 'full',
    features: [
      "Acceso completo a toda la base de datos",
      "Todas las fracciones arancelarias",
      "Actualizaciones mensuales",
      "Descargas ilimitadas a Excel",
      "Consultas ilimitadas",
      "Soporte prioritario 24/7",
      "Capacitaciones ilimitadas"
    ],
    cta: "Comenzar Ahora",
    wompiPlanId: "full-semestral"
  },
  {
    id: "full-anual",
    name: "Anual",
    period: "12 meses",
    priceUSD: 2900,
    category: 'full',
    popular: true,
    features: [
      "Acceso completo a toda la base de datos",
      "Todas las fracciones arancelarias",
      "Actualizaciones mensuales",
      "Descargas ilimitadas a Excel",
      "Consultas ilimitadas",
      "Soporte prioritario 24/7",
      "Capacitaciones ilimitadas",
      "Asesoría estratégica trimestral"
    ],
    cta: "Comenzar Ahora",
    wompiPlanId: "full-anual"
  }
]

// Sector Subscription Plans
const sectorPlans: PricingTier[] = [
  // 1-20 fracciones
  {
    id: "sector-1-20-trimestral",
    name: "Trimestral",
    period: "3 meses",
    priceUSD: 650,
    category: 'sector',
    fractionsRange: "1-20",
    features: [
      "1-20 fracciones arancelarias",
      "Actualizaciones mensuales",
      "Descargas a Excel",
      "Consultas ilimitadas",
      "Soporte en línea 24/7"
    ],
    cta: "Comenzar Ahora",
    wompiPlanId: "sector-1-20-trimestral"
  },
  {
    id: "sector-1-20-semestral",
    name: "Semestral",
    period: "6 meses",
    priceUSD: 1100,
    category: 'sector',
    fractionsRange: "1-20",
    features: [
      "1-20 fracciones arancelarias",
      "Actualizaciones mensuales",
      "Descargas a Excel",
      "Consultas ilimitadas",
      "Soporte en línea 24/7"
    ],
    cta: "Comenzar Ahora",
    wompiPlanId: "sector-1-20-semestral"
  },
  {
    id: "sector-1-20-anual",
    name: "Anual",
    period: "12 meses",
    priceUSD: 1500,
    category: 'sector',
    fractionsRange: "1-20",
    features: [
      "1-20 fracciones arancelarias",
      "Actualizaciones mensuales",
      "Descargas ilimitadas a Excel",
      "Consultas ilimitadas",
      "Soporte en línea 24/7",
      "Capacitaciones incluidas"
    ],
    cta: "Comenzar Ahora",
    wompiPlanId: "sector-1-20-anual"
  },
  // 21-40 fracciones
  {
    id: "sector-21-40-trimestral",
    name: "Trimestral",
    period: "3 meses",
    priceUSD: 800,
    category: 'sector',
    fractionsRange: "21-40",
    features: [
      "21-40 fracciones arancelarias",
      "Actualizaciones mensuales",
      "Descargas a Excel",
      "Consultas ilimitadas",
      "Soporte en línea 24/7"
    ],
    cta: "Comenzar Ahora",
    wompiPlanId: "sector-21-40-trimestral"
  },
  {
    id: "sector-21-40-semestral",
    name: "Semestral",
    period: "6 meses",
    priceUSD: 1550,
    category: 'sector',
    fractionsRange: "21-40",
    features: [
      "21-40 fracciones arancelarias",
      "Actualizaciones mensuales",
      "Descargas a Excel",
      "Consultas ilimitadas",
      "Soporte en línea 24/7"
    ],
    cta: "Comenzar Ahora",
    wompiPlanId: "sector-21-40-semestral"
  },
  {
    id: "sector-21-40-anual",
    name: "Anual",
    period: "12 meses",
    priceUSD: 1900,
    category: 'sector',
    fractionsRange: "21-40",
    features: [
      "21-40 fracciones arancelarias",
      "Actualizaciones mensuales",
      "Descargas ilimitadas a Excel",
      "Consultas ilimitadas",
      "Soporte en línea 24/7",
      "Capacitaciones incluidas"
    ],
    cta: "Comenzar Ahora",
    wompiPlanId: "sector-21-40-anual"
  },
  // 41-60 fracciones
  {
    id: "sector-41-60-trimestral",
    name: "Trimestral",
    period: "3 meses",
    priceUSD: 900,
    category: 'sector',
    fractionsRange: "41-60",
    features: [
      "41-60 fracciones arancelarias",
      "Actualizaciones mensuales",
      "Descargas a Excel",
      "Consultas ilimitadas",
      "Soporte en línea 24/7"
    ],
    cta: "Comenzar Ahora",
    wompiPlanId: "sector-41-60-trimestral"
  },
  {
    id: "sector-41-60-semestral",
    name: "Semestral",
    period: "6 meses",
    priceUSD: 1980,
    category: 'sector',
    fractionsRange: "41-60",
    features: [
      "41-60 fracciones arancelarias",
      "Actualizaciones mensuales",
      "Descargas a Excel",
      "Consultas ilimitadas",
      "Soporte en línea 24/7"
    ],
    cta: "Comenzar Ahora",
    wompiPlanId: "sector-41-60-semestral"
  },
  {
    id: "sector-41-60-anual",
    name: "Anual",
    period: "12 meses",
    priceUSD: 2500,
    category: 'sector',
    fractionsRange: "41-60",
    features: [
      "41-60 fracciones arancelarias",
      "Actualizaciones mensuales",
      "Descargas ilimitadas a Excel",
      "Consultas ilimitadas",
      "Soporte en línea 24/7",
      "Capacitaciones incluidas"
    ],
    cta: "Comenzar Ahora",
    wompiPlanId: "sector-41-60-anual"
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
    name: "OXXO",
    icon: Banknote,
    description: "Pago en efectivo en tiendas OXXO",
    available: true
  },
  {
    name: "SPEI",
    icon: Building2,
    description: "Transferencias bancarias mexicanas",
    available: true
  },
  {
    name: "Link",
    icon: Zap,
    description: "Pago rápido con Stripe Link",
    available: true
  }
]

const testimonials = [
  {
    name: "Gerente de Importaciones",
    company: "SUKARNE",
    role: "Equipo Comercial",
    content: "Identificamos proveedores internacionales que nos ayudaron a reducir costos de importación en 18%. La plataforma nos dio ventaja competitiva en el mercado.",
    rating: 5
  },
  {
    name: "Coordinadora de Logística",
    company: "SERVICIOS LOGÍSTICOS DYLO",
    role: "Departamento de Operaciones",
    content: "La integración con nuestros sistemas optimizó nuestros procesos de importación internacional significativamente. Los datos verificados son invaluables.",
    rating: 5
  },
  {
    name: "Director Comercial",
    company: "VALIA TRADING CORP",
    role: "Equipo Directivo",
    content: "Los datos verificados y el análisis de mercado nos dieron la información precisa que necesitábamos para tomar decisiones estratégicas acertadas.",
    rating: 5
  }
]

export default function PricingPage() {
  const [selectedCategory, setSelectedCategory] = useState<'full' | 'sector'>('full')

  const formatPrice = (priceUSD: number) => {
    return `$${priceUSD.toLocaleString('en-US')} USD`
  }

  return (
    <div className="min-h-screen bg-gradient-section overflow-x-hidden">
      <MainHeader />

      {/* Hero Section */}
      <section className="py-6 sm:py-8 lg:py-12 relative dots-decoration">
        <div className="container-responsive text-center">
          <div className="relative z-10">
            <Badge className="mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 bg-brand-coral/10 text-brand-coral border border-brand-coral/20 text-xs sm:text-sm">
              🎯 PLANES PARA EL MERCADO MEXICANO
            </Badge>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl text-gray-600 mb-4 font-bold leading-tight px-4">
              Elige el plan perfecto
              <br />
              <span className="text-brand-navy-dark font-bold">para tu negocio</span>
            </h1>
            <p className="body-lg text-gray-600 mb-4 max-w-4xl mx-auto leading-relaxed">
              Acceso completo o por sector. Precios en dólares,
              métodos de pago locales y soporte 100% en español.
            </p>

            {/* Category Selector */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => setSelectedCategory('full')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedCategory === 'full'
                    ? 'bg-brand-navy text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Crown className="w-5 h-5 inline mr-2" />
                Full Access
              </button>
              <button
                onClick={() => setSelectedCategory('sector')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedCategory === 'sector'
                    ? 'bg-brand-navy text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Target className="w-5 h-5 inline mr-2" />
                Por Sector
              </button>
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
          {/* Full Access Plans */}
          {selectedCategory === 'full' && (
            <>
              <h2 className="text-3xl font-bold text-center mb-8 text-brand-navy">
                Acceso Completo
              </h2>
              <div className="pricing-grid max-w-7xl mx-auto overflow-visible" style={{paddingTop: '2rem'}}>
                {fullAccessPlans.map((tier) => {
              
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
                      {tier.id === 'trimestral' && <Clock className="w-8 h-8 text-brand-navy-dark" />}
                      {tier.id === 'semestral' && <BarChart3 className="w-8 h-8 text-brand-coral" />}
                      {tier.id === 'anual' && <Award className="w-8 h-8 text-brand-navy-dark" />}
                    </div>
                    <CardTitle className="heading-md text-brand-navy mb-3 px-3 text-center font-bold">{tier.name}</CardTitle>
                    <CardDescription className="body-sm text-center px-3 min-h-[2rem] flex items-center justify-center leading-relaxed text-gray-600">
                      {tier.period}
                    </CardDescription>
                    
                    <div className="mt-8">
                      <div className="text-3xl lg:text-4xl font-bold text-brand-navy leading-tight">
                        <div className="break-words text-center px-2 text-brand-navy">
                          {formatPrice(tier.priceUSD)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col px-6 py-4">
                    <div className="space-y-4 flex-1">
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
                        <Link href="/auth/signup?from=/precios" className="block">
                          <Button className="w-full h-12 body-md font-medium bg-white border-2 border-gray-900 text-gray-600 hover:bg-gray-900 hover:text-white" variant="outline">
                            {tier.cta}
                          </Button>
                        </Link>
                      ) : (
                        <div>
                          <CheckoutButton
                            plan={tier.id}
                            amount={tier.priceUSD}
                            currency="USD"
                            className={`w-full h-12 body-md font-medium mb-3 ${tier.popular ? 'bg-brand-navy text-white hover:bg-brand-navy-dark' : 'bg-white border-2 border-gray-900 text-gray-600 hover:bg-gray-900 hover:text-white'}`}
                            variant={tier.popular ? "default" : "outline"}
                          >
                            {tier.cta}
                          </CheckoutButton>
                          <a href="https://calendar.app.google/6QLJ5NshhCNhaafz7" target="_blank" rel="noopener noreferrer" className="block w-full text-center py-2 px-4 border border-gray-900 rounded-lg text-gray-600 hover:bg-gray-900 hover:text-white text-sm transition-colors">
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
            </>
          )}

          {/* Sector Plans */}
          {selectedCategory === 'sector' && (
            <>
              <h2 className="text-3xl font-bold text-center mb-4 text-brand-navy">
                Suscripción por Sector
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Elige el rango de fracciones arancelarias que necesitas
              </p>

              {/* Agrupar por rango */}
              {['1-20', '21-40', '41-60'].map((range) => (
                <div key={range} className="mb-12">
                  <h3 className="text-2xl font-bold text-center mb-6 text-brand-coral">
                    {range} Fracciones Arancelarias
                  </h3>
                  <div className="pricing-grid max-w-7xl mx-auto overflow-visible">
                    {sectorPlans.filter(p => p.fractionsRange === range).map((tier) => (
                      <Card
                        key={tier.id}
                        className="relative pricing-card business-card interactive-card layout-stable hover:border-brand-cyan/30"
                      >
                        <CardHeader className="text-center pb-4 px-4" style={{paddingTop: '1rem'}}>
                          <div className="flex items-center justify-center mb-4">
                            {tier.name === 'Trimestral' && <Clock className="w-8 h-8 text-brand-navy-dark" />}
                            {tier.name === 'Semestral' && <BarChart3 className="w-8 h-8 text-brand-coral" />}
                            {tier.name === 'Anual' && <Award className="w-8 h-8 text-brand-navy-dark" />}
                          </div>
                          <CardTitle className="heading-md text-brand-navy mb-3 px-3 text-center font-bold">{tier.name}</CardTitle>
                          <CardDescription className="body-sm text-center px-3 min-h-[2rem] flex items-center justify-center leading-relaxed text-gray-600">
                            {tier.period}
                          </CardDescription>

                          <div className="mt-8">
                            <div className="text-3xl lg:text-4xl font-bold text-brand-navy leading-tight">
                              <div className="break-words text-center px-2 text-brand-navy">
                                {formatPrice(tier.priceUSD)}
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="flex-1 flex flex-col px-6 py-4">
                          <div className="space-y-4 flex-1">
                            <div className="space-y-4">
                              <h4 className="body-md font-semibold text-center text-gray-700 flex items-center justify-center gap-2">
                                ✨ Características incluidas:
                              </h4>
                              <div className="space-y-3">
                                {tier.features.map((feature, index) => (
                                  <div key={index} className="flex items-start body-sm bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                                    <span className="leading-relaxed text-left text-gray-700">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 pt-6 border-t border-gray-100">
                            <CheckoutButton
                              plan={tier.id}
                              amount={tier.priceUSD}
                              currency="USD"
                              className="w-full h-12 body-md font-medium mb-3 bg-white border-2 border-gray-900 text-gray-600 hover:bg-gray-900 hover:text-white"
                              variant="outline"
                            >
                              {tier.cta}
                            </CheckoutButton>
                            <a href="https://calendar.app.google/6QLJ5NshhCNhaafz7" target="_blank" rel="noopener noreferrer" className="block w-full text-center py-2 px-4 border border-gray-900 rounded-lg text-gray-600 hover:bg-gray-900 hover:text-white text-sm transition-colors">
                              📅 Agendar Demo Personalizada
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        
        {/* Promoción especial */}
        <div className="max-w-4xl mx-auto mt-12 px-4">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 rounded-2xl p-8 text-center shadow-lg">
            <p className="text-lg font-semibold text-gray-800">
              Si superaste tu uso con nuestro cupo de Finkargo en <span className="text-2xl font-bold text-purple-600">USD 80.000</span> tienes <span className="text-2xl font-bold text-green-600">50%</span> de descuento en tu activación anual
            </p>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <h2 className="heading-xl text-gray-600 mb-4">
              Métodos de pago mexicanos
            </h2>
            <p className="body-lg text-gray-700">
              Paga de la forma que prefieras con total seguridad
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {paymentMethods.map((method, index) => (
              <Card key={index} className="text-center business-card hover:border-brand-navy/30 transition-all hover:shadow-lg relative overflow-hidden group">
                {method.available && (
                  <div className="absolute top-3 right-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                      <CheckCircle className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>
                )}
                <CardContent className="pt-6 pb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-brand-navy/10 to-brand-navy/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <method.icon className="w-7 h-7 text-brand-navy" />
                  </div>
                  <h3 className="heading-sm mb-2 text-gray-900">{method.name}</h3>
                  <p className="body-sm text-gray-600">{method.description}</p>
                  {method.available && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="text-xs font-medium text-green-600 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                        Activo
                      </span>
                    </div>
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
                Powered by Stripe
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
              Lo que dicen las empresas mexicanas
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
                  <div>
                    <div className="heading-sm">{testimonial.name}</div>
                    <div className="body-sm text-gray-700">{testimonial.role}</div>
                    <div className="body-sm text-gray-700 font-semibold">{testimonial.company}</div>
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
                    Esta herramienta de inteligencia de mercado te ayuda a visualizar información actualizada y precisa sobre el mercado e industria de tu interés. Así podrás tomar decisiones informadas en cuanto a proveedores, clientes, estrategias de sourcing y gestión de riesgos.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    ¿Cómo funciona?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    Analiza convierte los datos verificados de comercio exterior en información valiosa a partir de tableros y gráficos personalizados e intuitivos que te permite identificar volúmenes de importaciones y/o exportaciones, mapear proveedores, precios de mercancía y costos asociados. Con esta información podrás tomar mejores decisiones y gestionar de manera ágil tus operaciones de importación.
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
                    Los precios mostrados no incluyen IVA. Para empresas mexicanas se aplicará el IVA correspondiente según la legislación vigente.
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
      <section className="py-16 hero-gradient-animated text-white relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-xl mb-6 font-bold" style={{color: '#ffffff'}}>
            ¿Listo para comenzar?
          </h2>
          <p className="body-lg mb-8 max-w-2xl mx-auto" style={{color: '#ffffff'}}>
            Únete a más de 160+ empresas mexicanas que ya transformaron su estrategia de importación y exportación
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup?from=/precios">
              <Button size="lg" className="px-8 py-4 body-lg bg-white text-gray-900 hover:bg-gray-100 font-bold">
                <Zap className="mr-2 h-5 w-5" />
                Comenzar Ahora
              </Button>
            </Link>
            <a href="https://calendar.app.google/6QLJ5NshhCNhaafz7" target="_blank" rel="noopener noreferrer">
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

      <MainFooter />
    </div>
  )
}