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
  Shield,
  Clock,
  Menu,
  X,
  Search,
  FileCheck,
  AlertCircle,
  Globe,
  Building2,
  Target,
  Zap,
  ChevronDown
} from "lucide-react"

export default function VerificaPage() {
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
              Verificación de Proveedores
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6 font-bold leading-tight">
              Somos tu aliado con contactos en China
            </h1>
            <p className="text-xl text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprueba fácil y rápido la veracidad de la información de tus proveedores en China
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://wa.link/x9s5yp" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-200">
                  <Zap className="mr-2 h-5 w-5" />
                  Hablemos
                </Button>
              </Link>
              <Link href="https://wa.link/x9s5yp" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-4 text-lg font-bold">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Agenda una Simulación
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nuestros servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Verificación integral para importadores seguros
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Verificación de Proveedores</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Certifica la legitimidad y existencia de tus proveedores en China
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Minimiza riesgos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Optimiza gastos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Apto para todos los importadores</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <FileCheck className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Inspección de Calidad</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Valida las especificaciones y calidad de tu mercancía
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Asegura calidad del producto</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Previene gastos innecesarios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Garantiza cumplimiento normativo</span>
                  </li>
                </ul>
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
              Proceso de verificación detallado y confiable
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Solicita el servicio",
                description: "Proporciona los datos del proveedor a verificar"
              },
              {
                step: "2",
                title: "Visita física",
                description: "Nuestro equipo en China visita las instalaciones"
              },
              {
                step: "3",
                title: "Reporte detallado",
                description: "Recibes un informe completo con evidencias"
              },
              {
                step: "4",
                title: "Recomendación",
                description: "Toma decisiones informadas con nuestra asesoría"
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

      {/* Unique Selling Points */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                ¿Por qué elegir Verifica?
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Search className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Verificación detallada</h3>
                  <p className="text-gray-600">Proceso de verificación minucioso con visitas físicas y reportes completos</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Clock className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Rápido y eficiente</h3>
                  <p className="text-gray-600">Obtén resultados en tiempo récord sin comprometer la calidad</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Globe className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Expertos en China</h3>
                  <p className="text-gray-600">Conocimiento profundo del mercado chino y sus prácticas comerciales</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 lg:py-20">
        <div className="container-responsive">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                ¿Para quién es Verifica?
              </h2>
              <p className="text-xl text-gray-600">
                Ideal para importadores de todos los niveles
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <Target className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Importadores novatos</h3>
                  <p className="text-gray-600">
                    Si es tu primera importación desde China, te ayudamos a verificar que tu proveedor sea legítimo y confiable, evitando fraudes y problemas comunes.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <Shield className="h-10 w-10 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Importadores experimentados</h3>
                  <p className="text-gray-600">
                    Si buscas nuevos proveedores o quieres validar la calidad antes de realizar pedidos grandes, nuestro servicio te da la seguridad que necesitas.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Mitigation */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Minimiza riesgos en tus importaciones
              </h2>
              <p className="text-xl text-gray-600">
                Evita los problemas más comunes al importar desde China
              </p>
            </div>

            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-red-900">Proveedores fantasma</h3>
                      <p className="text-gray-600">Verifica que tu proveedor realmente existe y opera en la dirección indicada</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-red-900">Productos de baja calidad</h3>
                      <p className="text-gray-600">Inspecciona la mercancía antes del envío para asegurar que cumple especificaciones</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-red-900">Certificaciones falsas</h3>
                      <p className="text-gray-600">Valida que las certificaciones y licencias del proveedor sean auténticas</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-red-900">Incumplimiento de plazos</h3>
                      <p className="text-gray-600">Evalúa la capacidad de producción real del proveedor para evitar retrasos</p>
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
            Importa con confianza desde China
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
            Solicita una verificación de proveedor hoy y asegura tu inversión
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://wa.link/x9s5yp" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 text-lg font-bold shadow-xl">
                Hablemos
              </Button>
            </Link>
            <Link href="https://wa.link/x9s5yp" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-4 text-lg font-bold">
                Agenda una Simulación
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  )
}
