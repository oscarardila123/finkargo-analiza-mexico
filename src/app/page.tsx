"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrandIcon } from "@/components/ui/brand-icon"
import { MainFooter } from "@/components/ui/main-footer"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart3,
  TrendingUp,
  Globe,
  Shield,
  Clock,
  Users,
  DollarSign,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Building2,
  Target,
  Zap,
  Database,
  Eye,
  Award,
  Menu,
  X,
  User,
  ChevronDown,
  LogOut,
  CreditCard as SubscriptionIcon,
  Settings
} from "lucide-react"

interface PricingTier {
  id: string
  name: string
  period: string
  priceUSD: number
  popular?: boolean
  features: string[]
}

const pricingTiers: PricingTier[] = [
  {
    id: "trimestral",
    name: "Trimestral",
    period: "3 meses",
    priceUSD: 1100,
    features: [
      "Acceso completo a toda la base de datos",
      "Todas las fracciones arancelarias",
      "Actualizaciones mensuales",
      "Descargas ilimitadas a Excel",
      "Soporte prioritario 24/7"
    ]
  },
  {
    id: "semestral",
    name: "Semestral",
    period: "6 meses",
    priceUSD: 2000,
    features: [
      "Todo lo del plan Trimestral",
      "Capacitaciones ilimitadas",
      "Análisis de mercado avanzado",
      "Reportes personalizados",
      "Soporte prioritario WhatsApp"
    ]
  },
  {
    id: "anual",
    name: "Anual",
    period: "12 meses",
    priceUSD: 2900,
    popular: true,
    features: [
      "Todo lo del plan Semestral",
      "Asesoría estratégica trimestral",
      "Análisis predictivo",
      "Consultas ilimitadas",
      "Descuentos especiales"
    ]
  }
]

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full">
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
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/features" className="body-md text-secondary hover:text-brand-navy-dark transition-colors">
              Beneficios
            </Link>
            <Link href="/precios" className="body-md text-secondary hover:text-brand-navy-dark transition-colors">
              Precios
            </Link>
            <Link href="/demo" className="body-md text-secondary hover:text-brand-navy-dark transition-colors">
              Demo
            </Link>
          </nav>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border border-blue-200 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                      <AvatarImage src={session.user?.image || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-semibold">
                        {session.user?.name?.charAt(0)?.toUpperCase() || session.user?.email?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden xl:block text-left">
                      <p className="text-sm font-semibold text-gray-900">{session.user?.name || 'Usuario'}</p>
                      <p className="text-xs text-gray-600">{session.user?.email}</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-600 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 shadow-xl border border-gray-100">
                  <DropdownMenuLabel className="px-3 py-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-gray-200">
                        <AvatarImage src={session.user?.image || undefined} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-semibold">
                          {session.user?.name?.charAt(0)?.toUpperCase() || session.user?.email?.charAt(0)?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold text-gray-900">{session.user?.name || 'Usuario'}</p>
                        <p className="text-xs text-gray-600">{session.user?.email}</p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/suscripcion" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <SubscriptionIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">Suscripción</span>
                        <span className="text-xs text-gray-500">Gestiona tu plan</span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  {(session?.user as any)?.role === 'ADMIN' && (
                    <>
                      <DropdownMenuSeparator className="my-2" />
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-purple-50 transition-colors">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Shield className="h-4 w-4 text-purple-600" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">Panel Admin</span>
                            <span className="text-xs text-gray-500">Gestión del sistema</span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem 
                    onClick={() => signOut()} 
                    className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-50 text-red-600 transition-colors"
                  >
                    <div className="p-2 bg-red-100 rounded-lg">
                      <LogOut className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">Cerrar Sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" className="text-secondary hover:bg-cyan-50 hover:text-brand-navy-dark transition-all">Iniciar Sesión</Button>
                </Link>
                <Link href="/auth/signup?from=/precios">
                  <Button className="btn-primary-gradient text-white">Comenzar Ahora</Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-brand-navy-dark" />
              ) : (
                <Menu className="h-6 w-6 text-brand-navy-dark" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="container-responsive py-4 space-y-4">
              <Link 
                href="/features" 
                className="block py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-brand-navy-dark rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Beneficios
              </Link>
              <Link 
                href="/precios" 
                className="block py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-brand-navy-dark rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Precios
              </Link>
              <Link 
                href="/demo" 
                className="block py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-brand-navy-dark rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Demo
              </Link>
              <div className="border-t border-gray-200 pt-4 space-y-2">
                {session ? (
                  <>
                    <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg mx-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                          <AvatarImage src={session.user?.image || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-semibold text-lg">
                            {session.user?.name?.charAt(0)?.toUpperCase() || session.user?.email?.charAt(0)?.toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-900">{session.user?.name || 'Usuario'}</p>
                          <p className="text-sm text-gray-600">{session.user?.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-2 space-y-1">
                      <Link href="/suscripcion" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start gap-3 py-3 hover:bg-blue-50">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <SubscriptionIcon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium">Suscripción</p>
                            <p className="text-xs text-gray-500">Gestiona tu plan</p>
                          </div>
                        </Button>
                      </Link>
                      {(session?.user as any)?.role === 'ADMIN' && (
                        <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start gap-3 py-3 hover:bg-purple-50">
                            <div className="p-2 bg-purple-100 rounded-lg">
                              <Shield className="h-4 w-4 text-purple-600" />
                            </div>
                            <div className="text-left">
                              <p className="font-medium">Panel Admin</p>
                              <p className="text-xs text-gray-500">Gestión del sistema</p>
                            </div>
                          </Button>
                        </Link>
                      )}
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 py-3 hover:bg-red-50 text-red-600"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          signOut()
                        }}
                      >
                        <div className="p-2 bg-red-100 rounded-lg">
                          <LogOut className="h-4 w-4" />
                        </div>
                        <span className="font-medium">Cerrar Sesión</span>
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-secondary hover:bg-cyan-50 hover:text-brand-navy-dark">
                        Iniciar Sesión
                      </Button>
                    </Link>
                    <Link href="/auth/signup?from=/precios" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full btn-primary-gradient text-white">
                        Comenzar Ahora
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-section dots-decoration">
        <div className="container-responsive">
          <div className="text-center relative z-10 layout-stable">
            {/* Main Badge with Dark Text */}
            <Badge className="mb-6 sm:mb-8 px-4 sm:px-8 py-2 sm:py-3 bg-white border border-gray-800 text-gray-600 font-bold tracking-wide shadow-lg text-xs sm:text-sm">
              🇲🇽 FINKARGO ANALIZA - TU ALIADO FINANCIERO
            </Badge>
            
            {/* Main Heading with Strong Contrast */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-gray-600 mb-6 px-4 max-w-5xl mx-auto font-bold leading-tight">
              El aliado financiero,
              <br />
              <span className="text-gray-600 font-black">confiable y útil</span>
              <br />
              <span className="text-gray-600 font-black">del importador mexicano</span>
            </h1>
            
            {/* Description with Dark Text */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 max-w-4xl mx-auto px-4 leading-relaxed font-medium">
              Transforma tu estrategia de importación con inteligencia comercial avanzada.
              Analiza competidores, encuentra proveedores confiables y toma decisiones financieras inteligentes
              con datos verificados y confiables.
            </p>
            
            {/* Feature Badges with Dark Text */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 mb-8 sm:mb-12 px-4">
              <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full border border-gray-200 shadow-sm w-full sm:w-auto justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm font-bold text-gray-600">Datos Verificados y Confiables</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full border border-gray-200 shadow-sm w-full sm:w-auto justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="text-xs sm:text-sm font-bold text-gray-600">Soporte 100% México</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full border border-gray-200 shadow-sm w-full sm:w-auto justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-bold text-gray-600">160+ Empresas Confían</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-16 px-4">
              <Link href="/auth/signup?from=/precios" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto btn-primary-gradient text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold">
                  <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Comenzar Ahora
                </Button>
              </Link>
              <Link href="/demo" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg border-2 border-gray-900 bg-white text-gray-600 hover:bg-gray-900 hover:text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Ver Demo en Vivo (2 min)</span>
                  <span className="sm:hidden">Ver Demo (2 min)</span>
                </Button>
              </Link>
            </div>
            
            {/* Trust Indicators with Dark Text */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 px-4">
              <div className="flex items-center bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm w-full sm:w-auto justify-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-gray-600">Acepta tarjetas de crédito</span>
              </div>
              <div className="flex items-center bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm w-full sm:w-auto justify-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-gray-600">Configuración en 2 minutos</span>
              </div>
              <div className="flex items-center bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm w-full sm:w-auto justify-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-gray-600">Soporte en español</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gradient-to-r from-white via-gray-50 to-white">
        <div className="container-responsive text-center">
          <div className="mb-12">
            <Badge className="mb-6 px-6 py-3 bg-brand-navy/10 text-brand-navy border border-brand-navy/20 mx-auto">
              📈 MÁS DE 160 EMPRESAS CONFÍAN
            </Badge>
            <h3 className="heading-lg text-gray-600 mb-4">
              El aliado financiero preferido por <span className="text-brand-navy-dark font-bold">empresas líderes</span>
            </h3>
            <p className="text-gray-600">Desde startups hasta corporaciones, somos el aliado confiable para importaciones inteligentes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: "I-DEAL SOURCING & TRADING", city: "San Francisco del Rincón", industry: "Comercio Internacional", icon: "🌐" },
              { name: "LDR SOLUTIONS SA DE CV", city: "Zapopan", industry: "Vehículos Automotores", icon: "🚗" },
              { name: "SUKARNE", city: "Culiacán", industry: "Industria Alimentaria", icon: "🥩" },
              { name: "SERVICIOS LOGÍSTICOS DYLO", city: "Monterrey", industry: "Logística Internacional", icon: "📦" },
              { name: "MAQUINARIA INTERTORITO", city: "Tlalnepantla", industry: "Maquinaria Pesada", icon: "🏗️" },
              { name: "AVIANCA", city: "Ciudad de México", industry: "Aviación", icon: "✈️" }
            ].map((company, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-brand-navy-dark/30">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{company.icon}</span>
                  <Badge className="bg-green-100 text-green-700 text-xs">ACTIVO</Badge>
                </div>
                <h4 className="font-semibold text-gray-600 mb-1">{company.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{company.industry}</p>
                <div className="flex items-center gap-1 text-xs text-brand-navy-dark">
                  <span>🇲🇽</span>
                  <span className="font-medium">{company.city}, México</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-gradient-to-r from-brand-cyan/10 via-white to-brand-coral/10 rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-brand-navy-dark mb-2">160+</div>
                <p className="text-sm text-gray-600">Empresas Activas</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-coral mb-2">$2.5B</div>
                <p className="text-sm text-gray-600">COP Ahorrados</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-navy mb-2">98%</div>
                <p className="text-sm text-gray-600">Satisfacción</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">5</div>
                <p className="text-sm text-gray-600">Años Líder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview Video */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        {/* Modern decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
        <div className="absolute top-10 right-10 opacity-20 pointer-events-none">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-10 left-10 opacity-20 pointer-events-none">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container-responsive relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <Badge className="mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 border border-purple-200 mx-auto shadow-lg">
              🎥 CONOCE LA PLATAFORMA EN ACCIÓN
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-gray-900 mb-4 sm:mb-6 font-bold leading-tight px-4">
              Ve cómo <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Finkargo Analiza</span>
              <br />transforma tu estrategia comercial
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
              Descubre en 2 minutos cómo empresas líderes optimizan sus importaciones
              con inteligencia comercial avanzada y datos verificados.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto px-4">
            <div className="relative group">
              {/* Modern video container with better shadows and gradients */}
              <div className="relative bg-white p-3 sm:p-6 lg:p-8 rounded-3xl shadow-2xl border border-gray-200/50 backdrop-blur-sm bg-white/90">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 rounded-3xl"></div>
                
                {/* Video with improved aspect ratio and no cutting */}
                <div className="relative z-10 bg-black rounded-2xl overflow-hidden shadow-inner" style={{aspectRatio: '16/10'}}>
                  <iframe
                    src="https://drive.google.com/file/d/1lGML28-DKFsj0ked0hYkAJV-yX2C4Qcw/preview?usp=embed_facebook"
                    className="w-full h-full"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                    title="Finkargo Analiza - Plataforma de Business Intelligence para Comercio Internacional"
                  ></iframe>
                </div>
                
                {/* Enhanced stats section */}
                <div className="relative z-10 mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-cyan-50 rounded-2xl border border-blue-100/50">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
                    <div className="group hover:scale-105 transition-transform duration-200">
                      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">70%</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Mejores Decisiones con BI</div>
                    </div>
                    <div className="group hover:scale-105 transition-transform duration-200">
                      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">2 min</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Overview Completo</div>
                    </div>
                    <div className="group hover:scale-105 transition-transform duration-200">
                      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">160+</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium mt-1">Empresas Confían</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 -z-10"></div>
            </div>
            
            <div className="text-center mt-8 sm:mt-12">
              <Link href="/demo">
                <Button size="lg" className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                  <span className="mr-2">🚀</span>
                  Prueba el Demo Interactivo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section id="benefits" className="py-12 bg-gradient-section relative overflow-hidden">
        {/* Decorative vectors */}
        <div className="absolute top-16 right-16 opacity-4 pointer-events-none">
          <svg className="w-20 h-20" viewBox="0 0 124 112" fill="none">
            <path d="M86.7734 0.00767596H37.2266C32.7789 0.00767596 28.6652 2.41025 26.4413 6.30964L1.66788 49.7019C-0.55596 53.6013 -0.55596 58.3987 1.66788 62.2981L26.4413 105.698C28.6652 109.597 32.7789 112 37.2266 112H86.7734C91.2211 112 95.3348 109.597 97.5587 105.698L122.332 62.2981C124.556 58.3987 124.556 53.6013 122.332 49.7019L97.5587 6.30197C95.3348 2.40258 91.2211 0 86.7734 0" fill="#5479F7"/>
          </svg>
        </div>
        <div className="absolute bottom-20 left-12 opacity-4 pointer-events-none">
          <svg className="w-16 h-16" viewBox="0 0 218 218" fill="none">
            <path d="M109 0L109 218" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M218 109L0 109" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M190.917 27.0833L27.0834 190.917" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M190.917 190.917L27.0833 27.0833" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M54.1667 13.5417L163.833 204.458" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M163.833 13.5417L54.1667 204.458" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="absolute top-1/3 left-1/4 opacity-3 pointer-events-none">
          <BrandIcon size="lg" />
        </div>
        <div className="absolute bottom-32 right-1/3 opacity-4 pointer-events-none">
          <Database className="w-14 h-14 text-blue-500" />
        </div>
        
        <div className="container-responsive relative z-10">
          <div className="section-header">
            <Badge className="mb-6 px-6 py-3 bg-brand-coral/10 text-brand-coral border border-brand-coral/20 mx-auto">
              📊 LOS TRES PILARES DE FINKARGO
            </Badge>
            <h2 className="heading-xl text-gray-600 mb-6 px-4">
              Tu aliado <span className="text-brand-navy-dark font-bold">confiable</span>, <span className="text-brand-coral font-bold">útil</span> y <span className="text-brand-navy font-bold">financiero</span>
            </h2>
            <p className="body-lg text-gray-600 max-w-4xl mx-auto px-4 leading-relaxed">
              Finkargo Analiza combina datos verificados de comercio exterior, inteligencia artificial avanzada
              y experiencia local para ser el compañero ideal en cada decisión de importación que tomes.
            </p>
          </div>
          
          <div className="feature-grid mb-16">
            {/* PILAR 1: CONFIABLE */}
            <Card className="business-card-elevated interactive-card border-l-4 border-l-brand-navy-dark">
              <CardHeader className="pb-6 px-6">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-cyan/20 to-brand-cyan/10 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-brand-navy-dark" />
                </div>
                <CardTitle className="heading-lg text-brand-navy-dark mb-3">🔒 CONFIABLE</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Tu aliado de confianza con datos 100% verificados y confiables
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-brand-cyan/5 rounded-xl">
                    <div className="w-12 h-12 bg-brand-cyan/20 rounded-xl flex items-center justify-center">
                      <Database className="h-6 w-6 text-brand-navy-dark" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600">2M+ Registros Oficiales</p>
                      <p className="text-sm text-gray-600">Base de datos verificada y confiable</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-brand-cyan/5 rounded-xl">
                    <div className="w-12 h-12 bg-brand-cyan/20 rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-brand-navy-dark" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600">Actualización 24/7</p>
                      <p className="text-sm text-gray-600">Datos siempre al día</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* PILAR 2: ÚTIL */}
            <Card className="business-card-elevated interactive-card border-l-4 border-l-brand-coral">
              <CardHeader className="pb-6 px-6">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-coral/20 to-brand-coral/10 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-brand-coral" />
                </div>
                <CardTitle className="heading-lg text-brand-coral mb-3">⚡ ÚTIL</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Herramientas prácticas que transforman datos en decisiones rentables
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-brand-coral/5 rounded-xl">
                    <div className="w-12 h-12 bg-brand-coral/20 rounded-xl flex items-center justify-center">
                      <Eye className="h-6 w-6 text-brand-coral" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600">Análisis Competitivo</p>
                      <p className="text-sm text-gray-600">Identifica oportunidades</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-brand-coral/5 rounded-xl">
                    <div className="w-12 h-12 bg-brand-coral/20 rounded-xl flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-brand-coral" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600">Alertas Inteligentes</p>
                      <p className="text-sm text-gray-600">No te pierdas ningún movimiento</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-brand-coral/10 to-brand-coral/5 rounded-xl text-center">
                  <div className="text-2xl font-bold text-brand-coral mb-1">40%</div>
                  <p className="text-sm text-gray-600">Reducción promedio en tiempo de investigación</p>
                </div>
              </CardContent>
            </Card>

            {/* PILAR 3: FINANCIERO */}
            <Card className="business-card-elevated interactive-card border-l-4 border-l-brand-navy">
              <CardHeader className="pb-6 px-6">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-navy/20 to-brand-navy/10 rounded-2xl flex items-center justify-center mb-6">
                  <DollarSign className="h-8 w-8 text-brand-navy" />
                </div>
                <CardTitle className="heading-lg text-brand-navy mb-3">💰 FINANCIERO</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Optimiza costos, encuentra mejores precios y maximiza tu rentabilidad
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-brand-navy/5 rounded-xl">
                    <div className="w-12 h-12 bg-brand-navy/20 rounded-xl flex items-center justify-center">
                      <Globe className="h-6 w-6 text-brand-navy" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600">50K+ Proveedores</p>
                      <p className="text-sm text-gray-600">Encuentra mejores precios</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-brand-navy/5 rounded-xl">
                    <div className="w-12 h-12 bg-brand-navy/20 rounded-xl flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-brand-navy" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600">Comparación de Costos</p>
                      <p className="text-sm text-gray-600">Optimiza tu cadena de suministro</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gradient-to-r from-brand-navy/10 to-brand-navy/5 rounded-xl text-center">
                  <div className="text-2xl font-bold text-brand-navy mb-1">35%</div>
                  <p className="text-sm text-gray-600">Ahorro promedio en costos de importación</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Benefits - Data Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <div className="business-card text-center p-6 interactive-card">
              <div className="text-4xl font-bold text-brand-navy-dark mb-2">80%</div>
              <p className="body-sm text-gray-700 font-medium">Ahorro de Tiempo</p>
            </div>
            <div className="business-card text-center p-6 interactive-card">
              <div className="text-4xl font-bold text-brand-coral mb-2">45%</div>
              <p className="body-sm text-gray-700 font-medium">Reducción de Costos</p>
            </div>
            <div className="business-card text-center p-6 interactive-card">
              <div className="text-4xl font-bold text-brand-navy-dark mb-2">60%</div>
              <p className="body-sm text-gray-700 font-medium">Aumento en Ventas</p>
            </div>
            <div className="business-card text-center p-6 interactive-card">
              <div className="text-4xl font-bold text-brand-navy mb-2">24/7</div>
              <p className="body-sm text-gray-700 font-medium">Monitoreo Continuo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Colombian Market Benefits */}
      <section className="py-12 bg-gradient-blue-subtle">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 px-6 py-3 bg-gradient-to-r from-brand-coral/10 to-brand-cyan/10 text-brand-coral border border-brand-coral/20 font-semibold">
                🇲🇽 100% DISEÑADO PARA MÉXICO
              </Badge>
              <h2 className="heading-xl text-gray-600 mb-8">
                Diseñado específicamente
                <br />para el <span className="text-brand-navy-dark">mercado mexicano</span>
              </h2>
              <p className="body-lg text-gray-700 font-medium mb-8 text-justify">
                No somos una herramienta genérica. Finkargo Analiza está construida desde cero 
                para entender las particularidades del comercio exterior mexicano.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-navy/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <BarChart3 className="h-5 w-5 text-brand-navy" />
                  </div>
                  <div>
                    <h3 className="heading-sm mb-2">Análisis de Mercado y Competencia</h3>
                    <p className="body-md text-gray-700 text-justify">
                      Conoce tu participación en el mercado, ranking de competencia entre importadores
                      y tendencias por proveedor, país de origen y posición arancelaria.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-navy/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe className="h-5 w-5 text-brand-navy" />
                  </div>
                  <div>
                    <h3 className="heading-sm mb-2">Búsqueda de Proveedores Globales</h3>
                    <p className="body-md text-gray-700 text-justify">
                      Encuentra proveedores del exterior con información detallada de precios, productos,
                      valores FOB y CIF, modalidad de transporte y agentes de aduana.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-navy/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="h-5 w-5 text-brand-navy" />
                  </div>
                  <div>
                    <h3 className="heading-sm mb-2">Apertura de Mercado Estratégica</h3>
                    <p className="body-md text-gray-700 text-justify">
                      Herramienta comercial para identificar nuevos prospectos y analizar costos
                      operativos incluyendo fletes, seguros y gastos tributarios.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="business-card-elevated p-8">
              <div className="relative z-10">
                <h3 className="heading-lg mb-8 text-center text-brand-navy">Resultados Comprobados</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2 text-brand-navy-dark">160+</div>
                    <div className="body-sm text-gray-700 font-medium">Empresas Activas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2 text-brand-coral">$2.3B</div>
                    <div className="body-sm text-gray-700 font-medium">Volumen Analizado</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2 text-brand-navy-dark">45%</div>
                    <div className="body-sm text-gray-700 font-medium">Reducción Costos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2 text-brand-coral">60%</div>
                    <div className="body-sm text-gray-700 font-medium">Crecimiento Promedio</div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                  <BrandIcon size="lg" className="mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-6 px-6 py-3 bg-brand-navy-dark/10 text-brand-navy-dark border border-brand-navy-dark/20 mx-auto">
              🇲🇽 CASOS DE ÉXITO MÉXICO
            </Badge>
            <h2 className="heading-xl text-gray-600 mb-6">
              Tu aliado <span className="text-brand-navy-dark font-bold">confiable</span> desde 2022
            </h2>
            <p className="body-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Más de 160 empresas colombianas confían en Finkargo como su aliado financiero para importaciones inteligentes
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="business-card-elevated hover:shadow-xl transition-all duration-300 border-l-4 border-l-brand-navy-dark">
              <CardContent className="pt-8 px-6">
                <div className="flex items-center mb-6">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <Badge className="ml-3 bg-brand-navy-dark/10 text-brand-navy-dark text-xs">CONFIABLE</Badge>
                </div>
                <blockquote className="text-gray-700 mb-6 leading-relaxed italic text-justify">
                  "Lo que más me ha gustado de la plataforma son las tablas que te ayudan a sacar conclusiones de manera fácil y rápida. <span className="font-semibold text-brand-navy-dark">Nos ha reducido la segregación de datos</span>, con esta plataforma podemos revisar información de manera fácil y rápida. 100% es una plataforma muy práctica y todos los importadores deben tenerla."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-cyan/20 to-brand-cyan/10 rounded-xl flex items-center justify-center mr-4">
                    <span className="font-bold text-brand-navy-dark">ID</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-600">Gerente de Compras</div>
                    <div className="text-sm text-gray-600">I-DEAL SOURCING & TRADING</div>
                    <div className="text-xs text-brand-navy-dark font-medium">San Francisco del Rincón, Guanajuato</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="business-card-elevated hover:shadow-xl transition-all duration-300 border-l-4 border-l-brand-coral">
              <CardContent className="pt-8 px-6">
                <div className="flex items-center mb-6">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <Badge className="ml-3 bg-brand-coral/10 text-brand-coral text-xs">ÚTIL</Badge>
                </div>
                <blockquote className="text-gray-700 mb-6 leading-relaxed italic text-justify">
                  "Finkargo Analiza nos permite monitorear el mercado automotriz en tiempo real. Identificamos oportunidades de importación que <span className="font-semibold text-brand-coral">mejoraron nuestra competitividad 40%</span>. El soporte es excelente."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-coral/20 to-brand-coral/10 rounded-xl flex items-center justify-center mr-4">
                    <span className="font-bold text-brand-coral">LDR</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-600">Gerente de Importaciones</div>
                    <div className="text-sm text-gray-600">LDR SOLUTIONS SA DE CV</div>
                    <div className="text-xs text-brand-coral font-medium">Zapopan, Jalisco</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="business-card-elevated hover:shadow-xl transition-all duration-300 border-l-4 border-l-brand-navy">
              <CardContent className="pt-8 px-6">
                <div className="flex items-center mb-6">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <Badge className="ml-3 bg-brand-navy/10 text-brand-navy text-xs">FINANCIERO</Badge>
                </div>
                <blockquote className="text-gray-700 mb-6 leading-relaxed italic text-justify">
                  "La plataforma nos da visibilidad completa del mercado de distribución. Optimizamos compras internacionales y <span className="font-semibold text-brand-navy">mejoramos márgenes 22%</span>. ROI muy positivo."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-navy/20 to-brand-navy/10 rounded-xl flex items-center justify-center mr-4">
                    <span className="font-bold text-brand-navy">SD</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-600">Gerente Financiero</div>
                    <div className="text-sm text-gray-600">SEPULVEDA DISTRIBUIDORES</div>
                    <div className="text-xs text-brand-navy font-medium">Apodaca, Nuevo León</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="py-12 bg-gradient-section">
        <div className="container-responsive">
          <div className="section-header">
            <Badge className="mb-6 px-6 py-3 bg-white border border-gray-900 text-gray-600 font-bold mx-auto shadow-lg">
              💰 PRECIOS ESPECIALES MÉXICO
            </Badge>
            
            <h2 className="heading-xl text-gray-600 mb-6 font-bold">Tu aliado financiero a medida</h2>
            
            <p className="body-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
              Planes diseñados para empresas mexicanas. Precios en USD, pagos con tarjeta, soporte en español.
            </p>
            
            <div className="bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-50 border border-orange-200 rounded-2xl p-8 max-w-5xl mx-auto mb-12 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-300/20 to-yellow-300/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-300/20 to-orange-300/20 rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">🚀</span>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-orange-800 mb-1">Oferta Especial de Lanzamiento</h3>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-orange-600 uppercase tracking-wide">Tiempo Limitado</span>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-orange-700 text-lg leading-relaxed">
                    Si superaste tu uso con nuestro <span className="font-bold text-orange-800">cupo de Finkargo en USD $80.000</span>
                  </p>
                  <div className="mt-4 p-4 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl border border-orange-200">
                    <p className="text-2xl font-bold text-orange-800 mb-2">💰 50% DE DESCUENTO</p>
                    <p className="text-orange-700 font-medium">En tu activación anual</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pricing-grid max-w-7xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={tier.id}
                className={`business-card-elevated interactive-card hover:shadow-2xl transition-all duration-500 relative overflow-hidden group ${
                  tier.popular 
                    ? 'border-2 border-brand-cyan shadow-2xl transform lg:scale-105 bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/30' 
                    : 'border border-gray-200 hover:border-brand-navy/30'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100/50 to-transparent rounded-full blur-xl group-hover:scale-110 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-cyan-100/50 to-transparent rounded-full blur-lg group-hover:scale-110 transition-transform duration-500"></div>
                
                <CardHeader className="text-center pb-6 px-6 pt-8 relative z-10">
                  {tier.popular && (
                    <div className="bg-gradient-to-r from-brand-cyan via-blue-500 to-brand-coral text-white text-sm font-bold px-4 py-2 rounded-full mb-6 inline-block shadow-lg animate-pulse">
                      ⭐ Más Popular
                    </div>
                  )}
                  
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 ${
                    tier.popular 
                      ? 'bg-gradient-to-br from-brand-cyan via-blue-500 to-brand-cyan shadow-cyan-200'
                      : tier.id === 'trimestral'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-blue-200'
                        : 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-200'
                  }`}>
                    {tier.id === 'trimestral' && <Clock className="h-10 w-10 text-white" />}
                    {tier.id === 'anual' && <Shield className="h-10 w-10 text-white" />}
                    {tier.id === 'semestral' && <Target className="h-10 w-10 text-white" />}
                  </div>
                  
                  <CardTitle className={`text-3xl font-bold mb-3 ${
                    tier.popular ? 'text-brand-cyan' : 'text-brand-navy-dark'
                  }`}>
                    {tier.name}
                  </CardTitle>
                  
                  <CardDescription className="text-gray-600 text-lg font-medium mb-6 bg-gray-50 px-4 py-2 rounded-full">
                    📅 {tier.period}
                  </CardDescription>
                  
                  <div className="space-y-3">
                    <div className={`text-5xl font-black mb-2 ${
                      tier.popular ? 'text-brand-cyan' : 'text-brand-navy-dark'
                    }`}>
                      ${tier.priceUSD.toLocaleString('en-US')} USD
                    </div>
                    <div className="text-base font-semibold text-gray-600 bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-2 rounded-full">
                      por {tier.period}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="px-6 relative z-10">
                  <div className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex} 
                        className="flex items-start gap-4 p-3 bg-gradient-to-r from-green-50 to-transparent rounded-xl hover:from-green-100 transition-colors duration-200"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-sm text-gray-700 font-medium leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href={`/precios`}>
                    <Button 
                      className={`w-full h-14 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                        tier.popular 
                          ? 'bg-gradient-to-r from-brand-cyan via-blue-500 to-brand-cyan hover:from-brand-cyan hover:to-blue-600 text-white border-0'
                          : 'bg-white border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white'
                      }`}
                    >
                      {tier.popular ? (
                        <><Star className="mr-2 h-5 w-5" />Elegir Plan Popular</>
                      ) : (
                        <><ArrowRight className="mr-2 h-5 w-5" />Ver Detalles Completos</>
                      )}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-20">
            <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 rounded-3xl p-10 max-w-6xl mx-auto border border-blue-200 shadow-xl relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-300/20 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-cyan-300/20 to-transparent rounded-full blur-xl"></div>
              
              <div className="relative z-10">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">🎯 Todos los planes incluyen</h3>
                  <p className="text-gray-600 text-lg">Beneficios garantizados sin importar el plan que elijas</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="group">
                    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-green-100">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Shield className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-center">
                        <h4 className="font-bold text-gray-800 mb-2">🔒 Datos Certificados</h4>
                        <p className="text-sm text-gray-600">Información 100% verificada, confiable y segura</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-100">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-center">
                        <h4 className="font-bold text-gray-800 mb-2">🇲🇽 Soporte Local</h4>
                        <p className="text-sm text-gray-600">Atención en español con expertos mexicanos</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-purple-100">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-center">
                        <h4 className="font-bold text-gray-800 mb-2">✨ Sin Compromisos</h4>
                        <p className="text-sm text-gray-600">Cancela cuando quieras, sin penalizaciones</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16">
              <Link href="/precios">
                <Button size="lg" className="px-12 py-6 text-xl bg-gradient-to-r from-brand-navy via-blue-600 to-brand-navy hover:from-brand-navy-dark hover:to-blue-700 text-white hover:shadow-2xl transition-all duration-500 border-0 shadow-xl font-bold transform hover:scale-105 rounded-2xl">
                  <Eye className="mr-3 h-6 w-6" />
                  Ver Comparación Detallada
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Strong CTA Section */}
      <section className="py-12 bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
        <div className="container-responsive text-center relative z-10">
          <Badge className="mb-8 px-8 py-4 bg-white/10 text-white border border-white/20 mx-auto">
            🚀 TU ALIADO FINANCIERO TE ESPERA
          </Badge>
          <h2 className="heading-xl mb-6">
            ¿Listo para tener el <span className="text-orange-400 font-bold">aliado financiero</span>
            <br />más <span className="text-white font-bold">confiable y útil</span> de México?
          </h2>
          <p className="body-lg mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed">
            Únete a las 160+ empresas mexicanas que transformaron su estrategia de importación 
            con Finkargo Analiza. Tu éxito financiero comienza hoy.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Link href="/auth/signup?from=/precios">
              <Button size="lg" className="px-10 py-5 text-lg bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-300 font-semibold">
                <Zap className="mr-3 h-6 w-6" />
                Ser Mi Aliado
              </Button>
            </Link>
            <a href="https://api.whatsapp.com/send?phone=573222235280&text=Hola%2C%20me%20interesa%20la%20herramienta%20de%20mercado.%20&utm_source=website&utm_medium=whatsapp" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="px-10 py-5 text-lg border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold shadow-xl">
                <span className="mr-3">💬</span>
                <span className="text-white font-bold">Contactar Ahora</span>
              </Button>
            </a>
          </div>
          
          {/* Dual Channel Strategy */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a href="https://calendar.app.google/6QLJ5NshhCNhaafz7" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-300">
              <span className="text-xl">📅</span>
              <span className="font-medium">Agendar Demo (30 min)</span>
            </a>
            <a href="https://api.whatsapp.com/send?phone=573222235280&text=Hola%2C%20tengo%20una%20consulta%20específica%20sobre%20Finkargo%20Analiza.%20&utm_source=website&utm_medium=whatsapp" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-300">
              <span className="text-xl">💬</span>
              <span className="font-medium">Contactar por WhatsApp</span>
            </a>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center text-sm text-white/80 mb-12">
            <p className="text-center">📋 Demo personalizada con Carlos Ospina, especialista comercial</p>
            <p className="text-center">⚡ Respuesta inmediata para consultas específicas</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-6 text-white">Garantía Finkargo - Tu Aliado Confiable:</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <span className="font-medium">14 días de prueba gratuita</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <span className="font-medium">Soporte WhatsApp inmediato</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <span className="font-medium">ROI garantizado en 30 días</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  )
}
