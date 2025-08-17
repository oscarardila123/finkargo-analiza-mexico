"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrandIcon } from "@/components/ui/brand-icon"
import { ScrollToTop } from "@/components/ui/scroll-to-top"
import { ResponsiveHeader } from "@/components/ui/responsive-header"
import {
  Calendar,
  Users,
  Clock,
  CheckCircle,
  BarChart3,
  TrendingUp,
  Search,
  FileText,
  Eye,
  Zap,
  Database,
  Target,
  Globe
} from "lucide-react"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <ResponsiveHeader currentPage="demo" />

      {/* Hero Section */}
      <section className="py-16 lg:py-16 relative dots-decoration safe-area-padding">
        <div className="container-responsive text-center">
          <div className="relative z-10 layout-stable">
            <Badge className="mb-6 px-4 py-2 bg-brand-coral/10 text-brand-coral border border-brand-coral/20">
              🎥 DEMO EN VIVO - 2 MINUTOS
            </Badge>
            <h1 className="heading-display text-gray-600 mb-6 px-4">
              Ve Finkargo Analiza
              <br />
              <span className="text-brand-navy-dark">en acción</span>
            </h1>
            <p className="body-lg text-gray-700 mb-8 max-w-3xl mx-auto px-4">
              Descubre cómo empresas colombianas transforman su estrategia de comercio exterior 
              analizando a su competencia y los movimientos de sus proveedores.
            </p>
          
            {/* Interactive Demo */}
            <div className="max-w-7xl mx-auto mb-12 px-4">
              <div className="relative group">
                {/* Enhanced container with modern design */}
                <div className="relative bg-white p-4 sm:p-6 lg:p-8 rounded-3xl shadow-2xl border border-gray-200/50 backdrop-blur-sm bg-white/95">
                  {/* Gradient overlay for modern look */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-green-500/5 to-cyan-500/5 rounded-3xl"></div>
                  
                  <div className="relative z-10 text-center mb-6 sm:mb-8">
                    <Badge className="mb-4 sm:mb-6 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-100 to-blue-100 text-green-800 border border-green-200 shadow-lg">
                      🚀 Demo Interactivo - Pruébalo Ahora
                    </Badge>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                      Explora <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Finkargo Analiza</span> en Acción
                    </h3>
                    <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                      Interactúa con nuestra plataforma real. Descubre cómo empresas como AVIANCA 
                      optimizaron su cadena de suministro y mejoraron eficiencia operativa en 25%.
                    </p>
                  </div>
                  
                  {/* Improved demo container with better aspect ratio */}
                  <div className="relative z-10 bg-black rounded-2xl overflow-hidden shadow-inner" style={{aspectRatio: '16/10', minHeight: '500px'}}>
                    <div 
                      className="w-full h-full"
                      dangerouslySetInnerHTML={{
                        __html: `<iframe
                          src="https://finkargo.storylane.io/share/ypfww7pp2fs4"
                          class="w-full h-full border-0"
                          allow="fullscreen; autoplay; encrypted-media"
                          loading="lazy"
                          title="Finkargo Analiza - Demo Interactivo"
                          style="border: none; min-height: 500px;">
                        </iframe>`
                      }}
                    />
                  </div>
                  
                  {/* Enhanced features and guide section */}
                  <div className="relative z-10 mt-6 sm:mt-8">
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600 mb-6">
                      <div className="flex items-center justify-center bg-white px-3 py-2 rounded-full shadow-sm border border-gray-100">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                        <span>Sin registro requerido</span>
                      </div>
                      <div className="flex items-center justify-center bg-white px-3 py-2 rounded-full shadow-sm border border-gray-100">
                        <Clock className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                        <span>5 minutos de exploración</span>
                      </div>
                      <div className="flex items-center justify-center bg-white px-3 py-2 rounded-full shadow-sm border border-gray-100">
                        <Eye className="w-4 h-4 mr-2 text-purple-500 flex-shrink-0" />
                        <span>Datos reales anonimizados</span>
                      </div>
                    </div>
                    
                    {/* Enhanced Progressive Guide */}
                    <div className="bg-gradient-to-r from-blue-50 via-green-50 to-purple-50 rounded-2xl p-4 sm:p-6 border border-blue-100/50">
                      <h4 className="font-semibold text-gray-900 mb-4 sm:mb-6 text-center text-base sm:text-lg">🎯 Guía del Demo Interactivo</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        <div className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-sm border border-blue-100/50 hover:shadow-md transition-shadow">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm sm:text-base font-bold shadow-lg">1</div>
                          <div className="font-semibold text-gray-800 text-sm sm:text-base mb-2">Explorar Dashboard</div>
                          <div className="text-gray-600 text-xs sm:text-sm">Conoce la interfaz principal</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-sm border border-green-100/50 hover:shadow-md transition-shadow">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm sm:text-base font-bold shadow-lg">2</div>
                          <div className="font-semibold text-gray-800 text-sm sm:text-base mb-2">Buscar Proveedores</div>
                          <div className="text-gray-600 text-xs sm:text-sm">Prueba la búsqueda inteligente</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 sm:p-6 text-center shadow-sm border border-purple-100/50 hover:shadow-md transition-shadow">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm sm:text-base font-bold shadow-lg">3</div>
                          <div className="font-semibold text-gray-800 text-sm sm:text-base mb-2">Analizar Competencia</div>
                          <div className="text-gray-600 text-xs sm:text-sm">Ve reportes en tiempo real</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-green-400/10 to-purple-400/10 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500 -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Demo Experience */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 px-6 py-3 bg-green-100 text-green-800 border border-green-200">
              🎉 ¿Te gustó el demo?
            </Badge>
            <h2 className="heading-xl text-gray-900 mb-6">
              ¡Increíble! Ahora da el <span className="text-brand-navy-dark font-bold">siguiente paso</span>
            </h2>
            <p className="body-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Has visto el poder de Finkargo Analiza. Únete a las 160+ empresas colombianas 
              que ya transformaron su estrategia comercial.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Comenzar Gratis</h3>
                <p className="text-gray-600 mb-6">
                  Empieza hoy mismo con 100 consultas gratuitas. No requiere tarjeta de crédito.
                </p>
                <Link href="/auth/signup">
                  <Button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold">
                    Crear Cuenta Gratis
                  </Button>
                </Link>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Demo Personalizada</h3>
                <p className="text-gray-600 mb-6">
                  Agenda una sesión de 30 minutos adaptada a tu industria específica.
                </p>
                <a href="https://meetings.hubspot.com/karol-rubio1?uuid=44d82d7b-eb62-49c0-9e52-813fdc8511a6&utm_source=website&utm_medium=cta&utm_campaign=demo_request" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full py-3 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-bold">
                    Agendar Demo VIP
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Sin compromiso
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-blue-500" />
                  +160 empresas confían
                </div>
                <div className="flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2 text-purple-500" />
                  ROI promedio 300%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Features */}
      <section className="py-16 bg-white relative overflow-hidden">
        {/* Decorative vectors */}
        <div className="absolute top-16 right-20 opacity-4 pointer-events-none">
          <Database className="w-16 h-16 text-blue-600" />
        </div>
        <div className="absolute bottom-20 left-16 opacity-3 pointer-events-none">
          <Target className="w-14 h-14 text-purple-500" />
        </div>
        <div className="absolute top-1/3 left-1/4 opacity-2 pointer-events-none">
          <BrandIcon size="lg" />
        </div>
        <div className="absolute top-12 left-12 opacity-4 pointer-events-none">
          <svg className="w-16 h-16" viewBox="0 0 124 112" fill="none">
            <path d="M86.7734 0.00767596H37.2266C32.7789 0.00767596 28.6652 2.41025 26.4413 6.30964L1.66788 49.7019C-0.55596 53.6013 -0.55596 58.3987 1.66788 62.2981L26.4413 105.698C28.6652 109.597 32.7789 112 37.2266 112H86.7734C91.2211 112 95.3348 109.597 97.5587 105.698L122.332 62.2981C124.556 58.3987 124.556 53.6013 122.332 49.7019L97.5587 6.30197C95.3348 2.40258 91.2211 0 86.7734 0" fill="#5479F7"/>
          </svg>
        </div>
        <div className="absolute bottom-16 right-1/4 opacity-4 pointer-events-none">
          <svg className="w-12 h-12" viewBox="0 0 218 218" fill="none">
            <path d="M109 0L109 218" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M218 109L0 109" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M190.917 27.0833L27.0834 190.917" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M190.917 190.917L27.0833 27.0833" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M54.1667 13.5417L163.833 204.458" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M163.833 13.5417L54.1667 204.458" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
          </svg>
        </div>
        
        <div className="container-responsive relative z-10">
          <div className="section-header">
            <h2 className="heading-xl text-gray-600 mb-4 px-4">
              Lo que verás
              <br />
              <span className="text-brand-navy-dark">en la demostración</span>
            </h2>
            <p className="body-lg text-gray-700 max-w-2xl mx-auto px-4">
              Un recorrido completo por las funcionalidades más importantes de Finkargo Analiza
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            <Card className="business-card-secondary interactive-card">
              <CardHeader className="px-4">
                <div className="w-12 h-12 bg-brand-cyan/10 rounded-xl flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-brand-navy-dark" />
                </div>
                <CardTitle className="heading-md text-brand-navy-dark">Búsqueda Inteligente</CardTitle>
              </CardHeader>
              <CardContent className="px-4">
                <p className="body-md text-gray-700 mb-6">
                  Ve cómo buscar proveedores por producto, país y rango de precios usando nuestra IA.
                </p>
                <ul className="space-y-3 body-sm">
                  <li className="flex items-center bg-brand-cyan/5 rounded-lg p-2">
                    <CheckCircle className="h-4 w-4 text-brand-navy-dark mr-3 flex-shrink-0" />
                    <span>Filtros avanzados</span>
                  </li>
                  <li className="flex items-center bg-brand-cyan/5 rounded-lg p-2">
                    <CheckCircle className="h-4 w-4 text-brand-navy-dark mr-3 flex-shrink-0" />
                    <span>Sugerencias automáticas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="business-card-coral interactive-card">
              <CardHeader className="px-4">
                <div className="w-12 h-12 bg-brand-coral/10 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-brand-coral" />
                </div>
                <CardTitle className="heading-md text-brand-coral">Análisis de Competidores</CardTitle>
              </CardHeader>
              <CardContent className="px-4">
                <p className="body-md text-gray-700 mb-6">
                  Descubre qué importan tus competidores y identifica oportunidades de mercado.
                </p>
                <ul className="space-y-3 body-sm">
                  <li className="flex items-center bg-brand-coral/5 rounded-lg p-2">
                    <CheckCircle className="h-4 w-4 text-brand-coral mr-3 flex-shrink-0" />
                    <span>Comparativas visuales</span>
                  </li>
                  <li className="flex items-center bg-brand-coral/5 rounded-lg p-2">
                    <CheckCircle className="h-4 w-4 text-brand-coral mr-3 flex-shrink-0" />
                    <span>Alertas automáticas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="business-card-primary interactive-card md:col-span-2 lg:col-span-1">
              <CardHeader className="px-4">
                <div className="w-12 h-12 bg-brand-navy/10 rounded-xl flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-brand-navy" />
                </div>
                <CardTitle className="heading-md text-brand-navy">Reportes Automáticos</CardTitle>
              </CardHeader>
              <CardContent className="px-4">
                <p className="body-md text-gray-700 mb-6">
                  Genera reportes profesionales con insights accionables en segundos.
                </p>
                <ul className="space-y-3 body-sm">
                  <li className="flex items-center bg-brand-navy/5 rounded-lg p-2">
                    <CheckCircle className="h-4 w-4 text-brand-navy mr-3 flex-shrink-0" />
                    <span>Exportación múltiple</span>
                  </li>
                  <li className="flex items-center bg-brand-navy/5 rounded-lg p-2">
                    <CheckCircle className="h-4 w-4 text-brand-navy mr-3 flex-shrink-0" />
                    <span>Branding personalizado</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Schedule */}
      <section className="py-16 bg-gradient-blue-subtle dots-decoration-corner">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="heading-xl text-gray-600 mb-6">
              ¿Prefieres una
              <br />
              <span className="text-brand-navy-dark">demo personalizada?</span>
            </h2>
            <p className="body-lg text-gray-700 mb-8">
              Agenda una sesión de 30 minutos con nuestros expertos y ve cómo Finkargo Analiza puede transformar tu negocio específico
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-brand-navy-dark" />
                </div>
                <h3 className="heading-sm mb-2 text-gray-600">Agenda Flexible</h3>
                <p className="body-sm text-gray-700">Disponible de lunes a viernes, 9AM - 6PM</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-brand-coral" />
                </div>
                <h3 className="heading-sm mb-2 text-gray-600">Expertos Locales</h3>
                <p className="body-sm text-gray-700">Equipo especializado en comercio exterior colombiano</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-brand-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-brand-navy-dark" />
                </div>
                <h3 className="heading-sm mb-2 text-gray-600">Demo Personalizada</h3>
                <p className="body-sm text-gray-700">Adaptada a tu industria y necesidades específicas</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-center">
                <a href="https://meetings.hubspot.com/karol-rubio1?uuid=44d82d7b-eb62-49c0-9e52-813fdc8511a6&utm_source=website&utm_medium=cta&utm_campaign=demo_request" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="px-8 py-4 body-lg bg-brand-coral text-white hover:bg-brand-coral/90">
                    <span className="mr-2">📅</span>
                    Agendar Demo Personalizada
                  </Button>
                </a>
                <p className="text-sm text-gray-600 mt-2">Demo de 30 min con Karol Rubio, especialista comercial</p>
              </div>
              <div className="text-center">
                <a href="https://api.whatsapp.com/send?phone=573222235280&text=Hola%2C%20tengo%20una%20consulta%20específica%20sobre%20Finkargo%20Analiza.%20&utm_source=website&utm_medium=whatsapp" target="_blank" rel="noopener noreferrer">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="px-8 py-4 body-lg border-brand-cyan text-brand-navy-dark hover:bg-brand-cyan hover:text-white"
                  >
                    <span className="mr-2">💬</span>
                    Contactar Ahora
                  </Button>
                </a>
                <p className="text-sm text-gray-600 mt-2">Respuesta inmediata para consultas específicas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Preview */}
      <section className="py-16 bg-white dots-pattern-light relative overflow-hidden">
        {/* Decorative vectors */}
        <div className="absolute top-12 left-12 opacity-3 pointer-events-none">
          <Globe className="w-16 h-16 text-green-600" />
        </div>
        <div className="absolute bottom-16 right-16 opacity-4 pointer-events-none">
          <TrendingUp className="w-14 h-14 text-blue-500" />
        </div>
        <div className="absolute top-1/4 right-12 opacity-4 pointer-events-none">
          <svg className="w-14 h-14" viewBox="0 0 124 112" fill="none">
            <path d="M86.7734 0.00767596H37.2266C32.7789 0.00767596 28.6652 2.41025 26.4413 6.30964L1.66788 49.7019C-0.55596 53.6013 -0.55596 58.3987 1.66788 62.2981L26.4413 105.698C28.6652 109.597 32.7789 112 37.2266 112H86.7734C91.2211 112 95.3348 109.597 97.5587 105.698L122.332 62.2981C124.556 58.3987 124.556 53.6013 122.332 49.7019L97.5587 6.30197C95.3348 2.40258 91.2211 0 86.7734 0" fill="#5479F7"/>
          </svg>
        </div>
        <div className="absolute bottom-24 left-20 opacity-4 pointer-events-none">
          <svg className="w-10 h-10" viewBox="0 0 218 218" fill="none">
            <path d="M109 0L109 218" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M218 109L0 109" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M190.917 27.0833L27.0834 190.917" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M190.917 190.917L27.0833 27.0833" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M54.1667 13.5417L163.833 204.458" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M163.833 13.5417L54.1667 204.458" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="section-header">
            <h2 className="heading-xl text-gray-600 mb-4">
              Caso de éxito
              <br />
              <span className="text-brand-navy-dark">destacado</span>
            </h2>
            <p className="body-lg text-gray-700">
              Ve cómo AVIANCA optimizó sus importaciones internacionales
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="business-card-elevated">
              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 bg-brand-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-brand-coral" />
                </div>
                <CardTitle className="heading-lg text-brand-navy">AVIANCA</CardTitle>
                <p className="body-md text-gray-700">Aerolínea colombiana líder en Latinoamérica - Bogotá</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-brand-coral mb-2">25%</div>
                    <p className="body-md text-gray-700">Mejora en eficiencia operativa</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-brand-navy-dark mb-2">12</div>
                    <p className="body-md text-gray-700">Proveedores optimizados</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-brand-navy mb-2">3</div>
                    <p className="body-md text-gray-700">Semanas para implementar</p>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="body-md text-gray-700 italic text-center">
                    "Finkargo Analiza nos permitió optimizar nuestras importaciones de componentes y repuestos aeronáuticos. Mejoramos visibilidad del mercado internacional."
                  </p>
                  <p className="text-center mt-4 heading-sm text-brand-navy">- Directora de Compras, AVIANCA</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="heading-xl mb-6 font-bold" style={{color: '#ffffff'}}>
            ¿Listo para
            <br />
            <span style={{color: '#ff6b6b'}}>comenzar?</span>
          </h2>
          <p className="body-lg mb-8 max-w-2xl mx-auto" style={{color: '#ffffff'}}>
            No esperes más. Comienza tu transformación digital hoy mismo con una cuenta gratuita
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup">
              <Button size="lg" className="px-8 py-4 body-lg bg-white text-gray-900 hover:bg-gray-100 font-bold">
                <Zap className="mr-2 h-5 w-5" />
                Comenzar Gratis
              </Button>
            </Link>
            <a href="https://meetings.hubspot.com/karol-rubio1?uuid=44d82d7b-eb62-49c0-9e52-813fdc8511a6&utm_source=website&utm_medium=cta&utm_campaign=demo_request" target="_blank" rel="noopener noreferrer">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 body-lg border-white bg-transparent text-white hover:bg-white hover:text-brand-navy"
              >
                <span className="mr-2">📅</span>
                Agendar Demo
              </Button>
            </a>
          </div>
          
          <div className="flex items-center justify-center space-x-8 body-sm text-white/70 mt-8">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Sin tarjeta de crédito
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Configuración en 2 minutos
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Soporte en español
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
            <div>
              <Link href="/" className="flex items-center space-x-3 mb-4">
                <BrandIcon size="md" />
                <div>
                  <span className="heading-sm text-white">Analiza</span>
                  <span className="body-sm text-brand-navy-dark font-medium ml-1">de Finkargo</span>
                </div>
              </Link>
              <p className="text-gray-600 body-sm">
                La plataforma de inteligencia comercial más avanzada de Colombia.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Producto</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="hover:text-white transition-colors">Características</Link></li>
                <li><Link href="/precios" className="hover:text-white transition-colors">Precios</Link></li>
                <li><Link href="/demo" className="hover:text-white transition-colors">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="https://www.finkargo.com/nosotros/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
                <li><a href="https://devsite.finkargo.com/blog/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Soporte</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Centro de Ayuda</a></li>
                <li><a href="https://api.whatsapp.com/send?phone=573222235280&text=%C2%A1Hola!%20Somos%20Finkargo.%0A%0AEscribe%20tu%20mensaje.%20" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="https://devsite.finkargo.com/terminos-condiciones-servicios-analiza/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Términos</a></li>
                <li><a href="https://www.finkargo.com/politicas_privacidad/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Políticas de Privacidad</a></li>
                <li><a href="https://www.finkargo.com/aviso_privacidad/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Aviso de Privacidad</a></li>
                <li><a href="https://www.finkargo.com/tratamiento_datos_sensibles/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Datos Sensibles</a></li>
                <li><a href="https://www.finkargo.com/tratamiento_datos_personales/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Datos Personales</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center body-sm text-gray-600">
            <p>&copy; 2024 Finkargo Analiza. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
      
      <ScrollToTop />
    </div>
  )
}