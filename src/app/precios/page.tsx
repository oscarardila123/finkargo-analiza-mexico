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
  priceCOP: number
  priceUSD: number
  popular?: boolean
  features: string[]
  cta: string
  wompiPlanId?: string
}

const pricingTiers: PricingTier[] = [
  {
    id: "trimestral",
    name: "Trimestral",
    period: "3 meses",
    priceCOP: 650000,
    priceUSD: 163,
    features: [
      "Acceso a actualizaciones mensuales durante 3 meses",
      "Una descarga a Excel por mes y consultas ilimitadas",
      "Tour guiado",
      "Soporte en línea 24/7",
      "Un usuario"
    ],
    cta: "Comenzar Ahora",
    wompiPlanId: "trimestral"
  },
  {
    id: "anual",
    name: "Anual",
    period: "12 meses",
    priceCOP: 1000000,
    priceUSD: 250,
    popular: true,
    features: [
      "Acceso a actualizaciones mensuales durante 12 meses",
      "Descargas a Excel y consultas ilimitadas",
      "Capacitaciones ilimitadas",
      "Soporte en línea 24/7",
      "Hasta tres usuarios"
    ],
    cta: "Comenzar Ahora",
    wompiPlanId: "anual"
  },
  {
    id: "semestral",
    name: "Semestral",
    period: "6 meses",
    priceCOP: 800000,
    priceUSD: 200,
    features: [
      "Acceso a actualizaciones mensuales durante 6 meses",
      "Dos descargas a Excel por mes y consultas ilimitadas",
      "Tour guiado",
      "Tres capacitaciones de la plataforma",
      "Soporte en línea 24/7",
      "Un usuario"
    ],
    cta: "Comenzar Ahora",
    wompiPlanId: "semestral"
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
    name: "Gerente de Importaciones",
    company: "SSANGYONG MOTOR COLOMBIA SA",
    role: "Equipo Comercial",
    content: "Con el plan Professional identificamos proveedores de autopartes en Asia que nos ayudaron a reducir costos de importación en 18%. El retorno fue rápido.",
    rating: 5,
    plan: "Professional"
  },
  {
    name: "Coordinadora de Compras",
    company: "ARGESA SAS",
    role: "Departamento de Compras",
    content: "La integración con nuestros sistemas mediante la API del plan Enterprise optimizó nuestros procesos de compras internacionales significativamente.",
    rating: 5,
    plan: "Enterprise"
  },
  {
    name: "Director Comercial",
    company: "NEW AGE COLOMBIA",
    role: "Equipo Directivo",
    content: "Iniciamos con el plan Starter y rápidamente escalamos a Professional. Los datos de Aduanas nos dieron ventaja competitiva.",
    rating: 5,
    plan: "Starter → Professional"
  }
]

export default function PricingPage() {
  // Moneda fija en pesos colombianos

  const formatPrice = (price: number, curr: 'COP' | 'USD') => {
    if (price === 0) return 'Gratis'
    
    if (curr === 'COP') {
      return `$${price.toLocaleString('es-CO')}`
    } else {
      return `$${price.toLocaleString('en-US')}`
    }
  }

  const getPrice = (tier: PricingTier) => {
    return tier.priceCOP
  }

  return (
    <div className="min-h-screen bg-gradient-section overflow-x-hidden">
      <MainHeader />

      {/* Hero Section */}
      <section className="py-6 sm:py-8 lg:py-12 relative dots-decoration">
        <div className="container-responsive text-center">
          <div className="relative z-10">
            <Badge className="mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 bg-brand-coral/10 text-brand-coral border border-brand-coral/20 text-xs sm:text-sm">
              🎯 PLANES PARA EL MERCADO COLOMBIANO
            </Badge>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl text-gray-600 mb-4 font-bold leading-tight px-4">
              Elige el plan perfecto
              <br />
              <span className="text-brand-navy-dark font-bold">para tu negocio</span>
            </h1>
            <p className="body-lg text-gray-600 mb-4 max-w-4xl mx-auto leading-relaxed">
              Diseñado específicamente para empresas colombianas. Precios en pesos colombianos, 
              métodos de pago locales (PSE, Efecty, Bancolombia) y soporte 100% en español.
            </p>
            
            {/* Colombian Currency Indicator */}
            <div className="flex items-center justify-center mb-6 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 bg-brand-coral/10 rounded-full">
                <div className="w-2 h-2 bg-brand-coral rounded-full animate-pulse" />
                <span className="text-brand-coral font-medium">
                  🇨🇴 Precios en Pesos Colombianos
                </span>
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
                          {formatPrice(price, 'COP')}
                        </div>
                        <span className="body-md font-normal text-gray-700 block mt-2 text-center">
                          COP
                        </span>
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
                        <Link href="/auth/signup" className="block">
                          <Button className="w-full h-12 body-md font-medium bg-white border-2 border-gray-900 text-gray-600 hover:bg-gray-900 hover:text-white" variant="outline">
                            {tier.cta}
                          </Button>
                        </Link>
                      ) : (
                        <div>
                          <CheckoutButton
                            plan={tier.id}
                            amount={price}
                            currency="COP"
                            className={`w-full h-12 body-md font-medium mb-3 ${tier.popular ? 'bg-brand-navy text-white hover:bg-brand-navy-dark' : 'bg-white border-2 border-gray-900 text-gray-600 hover:bg-gray-900 hover:text-white'}`}
                            variant={tier.popular ? "default" : "outline"}
                          >
                            {tier.cta}
                          </CheckoutButton>
                          <a href="https://calendar.app.google/TB83Ve6pahwVP9Jo9" target="_blank" rel="noopener noreferrer" className="block w-full text-center py-2 px-4 border border-gray-900 rounded-lg text-gray-600 hover:bg-gray-900 hover:text-white text-sm transition-colors">
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
            Únete a más de 160+ empresas colombianas que ya transformaron su estrategia de importación y exportación
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup">
              <Button size="lg" className="px-8 py-4 body-lg bg-white text-gray-900 hover:bg-gray-100 font-bold">
                <Zap className="mr-2 h-5 w-5" />
                Comenzar Gratis
              </Button>
            </Link>
            <a href="https://calendar.app.google/TB83Ve6pahwVP9Jo9" target="_blank" rel="noopener noreferrer">
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