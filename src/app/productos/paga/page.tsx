"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrandIcon } from "@/components/ui/brand-icon"
import { MainFooter } from "@/components/ui/main-footer"
import { useState, useEffect } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  CheckCircle,
  ArrowRight,
  DollarSign,
  TrendingUp,
  Shield,
  Clock,
  Menu,
  X,
  Users,
  Target,
  Zap,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

export default function PagaPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  // Close video modal on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showVideo) {
        setShowVideo(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [showVideo])

  const testimonials = [
    {
      name: "Jorge Elizondo",
      position: "Director de Operaciones",
      company: "Flamas Orientales",
      quote: "Fikargo ha sido un socio clave en nuestra evolución, proporcionando financiamiento ágil que nos ha permitido innovar y mantenernos competitivos en el mercado global.",
      videoUrl: "https://drive.google.com/file/d/1kZ2mN56WbJkIU7NQfr-qSqpZtYnZQNYU/preview",
      image: "https://www.finkargo.com/wp-content/uploads/2024/04/Jesus_Gutierrez.png"
    },
    {
      name: "Jesús Gutiérrez",
      position: "Director",
      company: "Chrismo",
      quote: "Finkargo ha simplificado nuestro proceso de importación, permitiéndonos concentrarnos en nuestro crecimiento sin preocuparnos por los detalles logísticos, y gracias a ello, hemos podido expandir nuestras operaciones de importación de manera rápida y eficiente, llevando nuestros productos a nuevos mercados con éxito.",
      videoUrl: "https://drive.google.com/file/d/1jdkaSbF_DHqnP1qqi_nf9gdvsKP44t-Q/preview",
      image: "https://www.finkargo.com/wp-content/uploads/2024/04/Jorge_Elizondo.png"
    }
  ]

  const nextTestimonial = () => {
    setShowVideo(false)
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setShowVideo(false)
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="container-responsive h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <BrandIcon size="md" />
            <div>
              <span className="heading-sm text-brand-navy">Finkargo</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="body-md text-secondary hover:text-brand-navy-dark transition-colors">
              Inicio
            </Link>
            <Link href="/features" className="body-md text-secondary hover:text-brand-navy-dark transition-colors">
              Beneficios
            </Link>
            <Link href="/precios" className="body-md text-secondary hover:text-brand-navy-dark transition-colors">
              Precios
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="body-md text-secondary hover:text-brand-navy-dark transition-colors flex items-center gap-1 outline-none">
                Otros productos
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80 p-3 shadow-xl border border-gray-100">
                <DropdownMenuItem asChild className="cursor-pointer p-0 focus:bg-transparent">
                  <Link href="/productos/paga" className="flex flex-col gap-1 px-3 py-3 rounded-md hover:bg-blue-50 transition-colors">
                    <span className="text-sm font-semibold text-gray-900">Paga</span>
                    <span className="text-xs text-gray-600">Adelanto a proveedores</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer p-0 focus:bg-transparent">
                  <Link href="/productos/integra" className="flex flex-col gap-1 px-3 py-3 rounded-md hover:bg-blue-50 transition-colors">
                    <span className="text-sm font-semibold text-gray-900">Integra</span>
                    <span className="text-xs text-gray-600">Logística Internacional</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer p-0 focus:bg-transparent">
                  <Link href="/productos/protege" className="flex flex-col gap-1 px-3 py-3 rounded-md hover:bg-blue-50 transition-colors">
                    <span className="text-sm font-semibold text-gray-900">Protege</span>
                    <span className="text-xs text-gray-600">Seguro de carga</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer p-0 focus:bg-transparent">
                  <Link href="/productos/verifica" className="flex flex-col gap-1 px-3 py-3 rounded-md hover:bg-blue-50 transition-colors">
                    <span className="text-sm font-semibold text-gray-900">Verifica</span>
                    <span className="text-xs text-gray-600">Verificación de proveedores</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost" className="text-secondary hover:bg-cyan-50 hover:text-brand-navy-dark transition-all">Iniciar Sesión</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="btn-primary-gradient text-white">Comenzar Ahora</Button>
            </Link>
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
                href="/"
                className="block py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-brand-navy-dark rounded-lg transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Inicio
              </Link>
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
              <div className="border-t border-gray-200 pt-4 pb-4">
                <div className="px-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Otros productos
                </div>
                <div className="space-y-1">
                  <Link
                    href="/productos/paga"
                    className="block py-3 px-4 rounded-lg transition-all hover:bg-blue-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="font-semibold text-gray-900">Paga</div>
                    <div className="text-xs text-gray-600">Adelanto a proveedores</div>
                  </Link>
                  <Link
                    href="/productos/integra"
                    className="block py-3 px-4 rounded-lg transition-all hover:bg-blue-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="font-semibold text-gray-900">Integra</div>
                    <div className="text-xs text-gray-600">Logística Internacional</div>
                  </Link>
                  <Link
                    href="/productos/protege"
                    className="block py-3 px-4 rounded-lg transition-all hover:bg-blue-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="font-semibold text-gray-900">Protege</div>
                    <div className="text-xs text-gray-600">Seguro de carga</div>
                  </Link>
                  <Link
                    href="/productos/verifica"
                    className="block py-3 px-4 rounded-lg transition-all hover:bg-blue-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="font-semibold text-gray-900">Verifica</div>
                    <div className="text-xs text-gray-600">Verificación de proveedores</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden hero-gradient-animated">
        <div className="container-responsive relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              Financiamiento para Importadores
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6 font-bold leading-tight">
              Financiamiento flexible para importadores que se atreven
            </h1>
            <p className="text-xl text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed">
              Cupo rotativo hasta USD $2.7 millones para pagar hasta el 70% de facturas internacionales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://app.finkargo.com.mx/auth/signup?utm_source=web_principal&utm_medium=enlacemx" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-200">
                  <Zap className="mr-2 h-5 w-5" />
                  Solicitar Crédito
                </Button>
              </Link>
              <Link href="https://wa.me/5215610381586?text=%C2%A1Hola!%20Finkargo%2C%20estoy%20interesad%40%20en%20financiamiento%20alternativo%20para%20comercio%20exterior." target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-4 text-lg font-bold">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Hablar con Asesor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir Paga?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Incrementa tu capacidad de importación con financiamiento diseñado para tu negocio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Incrementa tu Capital</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Obtén capital de trabajo para pagar proveedores y hacer crecer tu negocio con importaciones estratégicas
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Negocia Mejores Precios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Paga a tus proveedores en efectivo y optimiza los costos de tu cadena de suministro
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Carga como Garantía</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Tu mercancía importada sirve como garantía del préstamo. Recomendamos seguro de carga
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 lg:py-20">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Características clave
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Línea de crédito rotativa</h3>
                <p className="text-gray-600">Usa tu cupo las veces que necesites durante el periodo contratado</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Hasta 150 días de plazo</h3>
                <p className="text-gray-600">Plazos flexibles que se adaptan a tu ciclo de negocio</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Respuesta en 72 horas</h3>
                <p className="text-gray-600">Proceso rápido de aprobación para no perder oportunidades</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Sin afectar endeudamiento bancario</h3>
                <p className="text-gray-600">Mantén tus líneas de crédito bancarias disponibles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container-responsive">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Requisitos para aplicar
              </h2>
              <p className="text-xl text-gray-600">
                Solicita tu cupo si cumples con estos requisitos básicos
              </p>
            </div>

            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-lg">Empresa legalmente constituida</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-lg">Mínimo 2 años de operación</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-lg">Promedio anual de importación de $70,000+ USD</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-lg">Importar 3-8 veces al año</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 lg:py-20">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-xl text-gray-600">
              Proceso simple y transparente en 4 pasos
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Solicita tu cupo",
                description: "Completa el formulario en nuestra plataforma"
              },
              {
                step: "2",
                title: "Revisión de documentos",
                description: "Respuesta en 48 horas máximo"
              },
              {
                step: "3",
                title: "Usa tu línea de crédito",
                description: "Para tus importaciones cuando lo necesites"
              },
              {
                step: "4",
                title: "Proveedores pagados",
                description: "En 24 horas desde la aprobación"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container-responsive">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              ¿Por qué Finkargo Paga es diferente?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Rápido y flexible</h3>
                  <p className="text-sm text-gray-600">Financiamiento ágil cuando lo necesitas</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Costos transparentes</h3>
                  <p className="text-sm text-gray-600">Sin comisiones ocultas</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Shield className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Sin garantías inmobiliarias</h3>
                  <p className="text-sm text-gray-600">Tu carga es la garantía</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Testimonios
            </h2>
          </div>

          <div className="max-w-6xl mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Testimonial Content */}
              <div className="bg-gradient-to-br from-green-100 to-cyan-100 rounded-3xl p-8 lg:p-12 shadow-lg relative">
                <div className="absolute top-8 left-8 text-6xl text-gray-300 font-serif">"</div>
                <div className="relative z-10">
                  <p className="text-lg lg:text-xl text-gray-800 italic mb-8 leading-relaxed">
                    {testimonials[currentTestimonial].quote}
                  </p>
                  <button
                    onClick={() => setShowVideo(true)}
                    className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    Ver vídeo
                  </button>
                </div>
              </div>

              {/* Profile Card */}
              <div className="flex justify-center lg:justify-end">
                <div className="bg-gradient-to-br from-cyan-100 to-teal-100 rounded-3xl p-8 shadow-lg relative">
                  {/* Decorative elements */}
                  <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500 rounded-full opacity-20"></div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32">
                    <svg viewBox="0 0 218 218" fill="none" className="w-full h-full">
                      <path d="M109 0L109 218" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
                      <path d="M218 109L0 109" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
                      <path d="M190.917 27.0833L27.0834 190.917" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
                      <path d="M190.917 190.917L27.0833 27.0833" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
                      <path d="M54.1667 13.5417L163.833 204.458" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
                      <path d="M163.833 13.5417L54.1667 204.458" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
                    </svg>
                  </div>

                  <div className="relative z-10 text-center">
                    <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-xl">
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt={testimonials[currentTestimonial].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {testimonials[currentTestimonial].name}
                    </h3>
                    <p className="text-gray-700 font-medium mb-1">
                      {testimonials[currentTestimonial].position}
                    </p>
                    <p className="text-gray-600">
                      {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:bg-gray-50"
                aria-label="Anterior testimonio"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>

              {/* Indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentTestimonial(index)
                      setShowVideo(false)
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentTestimonial
                        ? 'bg-blue-900 w-8'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Ir a testimonio ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center hover:bg-gray-50"
                aria-label="Siguiente testimonio"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient-animated text-white relative overflow-hidden">
        <div className="container-responsive text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para impulsar tus importaciones?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
            Solicita tu línea de crédito hoy y obtén financiamiento flexible para hacer crecer tu negocio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.finkargo.com.mx/auth/signup?utm_source=web_principal&utm_medium=enlacemx" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 text-lg font-bold shadow-xl">
                Solicitar Crédito Ahora
              </Button>
            </Link>
            <Link href="https://wa.me/5215610381586?text=%C2%A1Hola!%20Finkargo%2C%20estoy%20interesad%40%20en%20financiamiento%20alternativo%20para%20comercio%20exterior." target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-4 text-lg font-bold">
                Hablar con un Asesor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              aria-label="Cerrar video"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src={testimonials[currentTestimonial].videoUrl}
                title="Testimonio de Cliente Finkargo"
                frameBorder="0"
                allow="autoplay"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <MainFooter />
    </div>
  )
}
