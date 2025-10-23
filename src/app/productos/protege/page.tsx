"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrandIcon } from "@/components/ui/brand-icon"
import { MainFooter } from "@/components/ui/main-footer"
import { MainHeader } from "@/components/ui/main-header"
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
  Package,
  FileText,
  DollarSign,
  AlertCircle,
  Globe,
  Zap,
  ChevronDown
} from "lucide-react"

export default function ProtegePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full">
      {/* Header */}
      <MainHeader />

      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden hero-gradient-animated">
        <div className="container-responsive relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
              Seguro de Carga
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6 font-bold leading-tight">
              Protege tu mercancía con pólizas flexibles
            </h1>
            <p className="text-xl text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed">
              Cobertura bodega a bodega para proteger tu mercancía en toda la cadena logística
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://app.finkargo.com.mx/insurances?buyinsurance=true&utm_source=web_principal&utm_medium=enlacemx" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-200">
                  <Zap className="mr-2 h-5 w-5" />
                  ¡Cotiza Aquí!
                </Button>
              </Link>
              <Link href="https://wa.link/abaj20" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-4 text-lg font-bold">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Hablemos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir Protege?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seguro de carga diseñado para el comercio internacional moderno
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Fácil y Digital</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Proceso 100% digital</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Cotización y pago rápido</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Sin papeleo complicado</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Sin Deducibles</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Cobertura completa sin costos iniciales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Sin gastos de bolsillo en reclamaciones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Protección total de tu inversión</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Plazos Flexibles</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Sin intereses adicionales si financias con Finkargo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Adaptable a tus necesidades operativas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Opciones de pago convenientes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Coverage Highlights */}
      <section className="py-16 lg:py-20">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Cobertura integral
            </h2>
            <p className="text-xl text-gray-600">
              Protección completa en toda la cadena de suministro
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Protección durante transporte</h3>
                      <p className="text-gray-600">Cobertura completa desde origen hasta destino, incluyendo transporte marítimo, aéreo y terrestre</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Cobertura especial en Zonas Francas</h3>
                      <p className="text-gray-600">Protección extendida para mercancía almacenada en zonas de comercio especiales</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Opciones para diversos tipos de carga</h3>
                      <p className="text-gray-600">Cobertura personalizada para mercancía usada, perecederos y cargas especiales</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Limitaciones geográficas por regulaciones</h3>
                      <p className="text-gray-600">Cobertura adaptada según restricciones regulatorias internacionales</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Límites y Ámbito */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-purple-50 to-blue-50 overflow-hidden">
        <div className="container-responsive">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Texto */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    Límites asegurados:
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Cantidad máxima que la aseguradora pagará según el tipo de cobertura y valor de la mercancía asegurada.
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    Ámbito Geográfico:
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Cobertura limitada por ubicación, excluyendo mercancías de países, organizaciones, personas sancionados o con restricciones regulatorias.
                  </p>
                </div>
              </div>

              {/* Imagen Animada */}
              <div className="relative w-full max-w-lg mx-auto lg:mx-0">
                <style dangerouslySetInnerHTML={{
                  __html: `
                    @keyframes floatSlow {
                      0%, 100% { transform: translateY(0px); }
                      50% { transform: translateY(-15px); }
                    }
                    @keyframes floatMedium {
                      0%, 100% { transform: translateY(0px); }
                      50% { transform: translateY(-20px); }
                    }
                    .protege-float-1 {
                      animation: floatSlow 4s ease-in-out infinite;
                    }
                    .protege-float-2 {
                      animation: floatMedium 5s ease-in-out infinite;
                      animation-delay: 1s;
                    }
                  `
                }} />

                {/* Imagen base */}
                <div className="relative w-full">
                  <img
                    src="https://www.finkargo.com/wp-content/uploads/2024/06/portege-grafica.png"
                    alt="Póliza de seguro de mercancía"
                    className="w-full h-auto"
                  />

                  {/* Popup flotante 1 - Valor $500,000 (superior derecha) */}
                  <div className="absolute top-0 right-0 w-[45%] protege-float-1 z-10" style={{transform: 'translate(10%, -15%)'}}>
                    <img
                      src="https://www.finkargo.com/wp-content/uploads/2024/06/portege-grafica-valor-marca.png"
                      alt="Valor de marca"
                      className="w-full h-auto drop-shadow-2xl"
                    />
                  </div>

                  {/* Popup flotante 2 - Valor $59,000 (inferior izquierda) */}
                  <div className="absolute bottom-0 left-0 w-[42%] protege-float-2 z-20" style={{transform: 'translate(-15%, 25%)'}}>
                    <img
                      src="https://www.finkargo.com/wp-content/uploads/2024/06/Valor-poliza.png"
                      alt="Valor de la póliza"
                      className="w-full h-auto drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container-responsive">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Más de 200 empresas confían en Protege
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Únete a las empresas líderes que protegen sus importaciones con Finkargo
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Cotización rápida</h3>
                  <p className="text-gray-600">Respuesta en menos de 72 horas</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Pólizas personalizables</h3>
                  <p className="text-gray-600">Adaptadas a tu tipo de carga</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20">
        <div className="container-responsive">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Preguntas frecuentes
              </h2>
            </div>

            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">¿Qué cubre exactamente el seguro?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Nuestro seguro cubre daños, pérdidas y robos durante todo el trayecto de tu mercancía, desde el almacén del proveedor hasta tu bodega o zona franca. Incluye transporte marítimo, aéreo, terrestre y almacenamiento temporal.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">¿Cuánto tiempo toma procesar una reclamación?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    El tiempo de procesamiento depende de la complejidad del caso, pero en promedio las reclamaciones se resuelven en 2-4 semanas. Nuestro equipo te acompaña en todo el proceso para hacerlo lo más ágil posible.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">¿Puedo asegurar cualquier tipo de mercancía?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Podemos asegurar la mayoría de tipos de carga, incluyendo mercancía usada y perecederos. Sin embargo, existen algunas restricciones para cargas especiales o peligrosas. Contáctanos para evaluar tu caso específico.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient-animated text-white relative overflow-hidden">
        <div className="container-responsive text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">
            Protege tu inversión hoy
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
            Obtén una cotización personalizada en menos de 72 horas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="https://app.finkargo.com.mx/insurances?buyinsurance=true&utm_source=web_principal&utm_medium=enlacemx" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-4 text-lg font-bold shadow-xl">
                ¡Cotiza Aquí!
              </Button>
            </Link>
            <Link href="https://wa.link/abaj20" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-4 text-lg font-bold">
                Hablar con un Asesor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  )
}
