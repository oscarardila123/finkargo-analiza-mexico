"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrandIcon } from "@/components/ui/brand-icon"
import { MainFooter } from "@/components/ui/main-footer"
import { useState } from "react"
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
  Package,
  Globe,
  Truck,
  Target,
  Zap,
  ChevronDown
} from "lucide-react"

export default function IntegraPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
              Logística Internacional
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6 font-bold leading-tight">
              Importa más, crece mejor, usa menos capital de trabajo
            </h1>
            <p className="text-xl text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed">
              Cubrimos el 100% de tu operación de importación con plazos de pago hasta 150 días
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://app.finkargo.com.mx/auth/signup?utm_source=web_principal&utm_medium=enlacemx" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-200">
                  <Zap className="mr-2 h-5 w-5" />
                  Solicitar Cotización
                </Button>
              </Link>
              <Link href="https://wa.me/5215657538725?text=%C2%A1Hola!%20Finkargo%2C%20estoy%20interesad%40%20en%20tu%20servicio%20de%20log%C3%ADstica%20y%20financiamiento." target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-4 text-lg font-bold">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Hablar con Asesor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              ¿Cómo funciona Integra?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proceso simple en 5 pasos para importar sin complicaciones
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              {
                step: "1",
                title: "Envía tu cotización EXW/FOB",
                description: "Comparte los detalles de tu importación"
              },
              {
                step: "2",
                title: "Solicita y obtén crédito operativo",
                description: "Aprobación en 48 horas"
              },
              {
                step: "3",
                title: "Recibe cotización DAP completa",
                description: "Todo incluido en un solo precio"
              },
              {
                step: "4",
                title: "Finkargo gestiona la operación",
                description: "Verificación de calidad y flete"
              },
              {
                step: "5",
                title: "Paga hasta 150 días después",
                description: "Flexibilidad para tu flujo de caja"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 lg:py-20">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Beneficios principales
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Control de Flujo de Caja</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Plazos de pago flexibles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Sin pagos adelantados a proveedores</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Operaciones Simplificadas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Gestión integral de logística</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Rastreo de mercancía en tiempo real</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Crecimiento Acelerado</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Libera capital de trabajo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Crédito flexible para importar</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Coverage */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Cobertura del servicio
              </h2>
              <p className="text-xl text-gray-600">
                Servicio integral de puerta a puerta
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <Globe className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Cobertura 100%</h3>
                  <p className="text-gray-600 mb-4">
                    Cubrimos toda tu operación de importación desde el proveedor hasta tu almacén o zona franca
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Pago a proveedores internacionales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Flete internacional</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Gestión aduanera</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <Truck className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Entregas Especializadas</h3>
                  <p className="text-gray-600 mb-4">
                    Entrega en zona franca o tu ubicación preferida con seguimiento completo
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Entrega a zona franca</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Soporte especializado en comercio internacional</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Rastreo en tiempo real</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Selling Points */}
      <section className="py-16 lg:py-20">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir Integra?
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Rápido</h3>
                <p className="text-sm text-gray-600">Comienza a importar en 48 horas</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Completo</h3>
                <p className="text-sm text-gray-600">Todo en un solo servicio</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Seguro</h3>
                <p className="text-sm text-gray-600">Verificación de calidad incluida</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Flexible</h3>
                <p className="text-sm text-gray-600">Paga hasta 150 días después</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Growth Strategy */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container-responsive">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Estrategia de crecimiento personalizada
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              No solo gestionamos tu logística, te ayudamos a planificar tu estrategia de crecimiento en importaciones
            </p>
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Consultoría incluida</h3>
                      <p className="text-gray-600">Evaluamos tu potencial de crecimiento con Integra</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Optimización de capital</h3>
                      <p className="text-gray-600">Maximiza tu capacidad de importación sin afectar liquidez</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Acompañamiento continuo</h3>
                      <p className="text-gray-600">Equipo dedicado para resolver cualquier duda</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient-animated text-white relative overflow-hidden">
        <div className="container-responsive text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para simplificar tus importaciones?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
            Solicita una cotización DAP completa hoy y libera tu capital de trabajo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.finkargo.com.mx/auth/signup?utm_source=web_principal&utm_medium=enlacemx" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 text-lg font-bold shadow-xl">
                Solicitar Cotización
              </Button>
            </Link>
            <Link href="https://wa.me/5215657538725?text=%C2%A1Hola!%20Finkargo%2C%20estoy%20interesad%40%20en%20tu%20servicio%20de%20log%C3%ADstica%20y%20financiamiento." target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-4 text-lg font-bold">
                Evaluar Potencial de Crecimiento
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  )
}
