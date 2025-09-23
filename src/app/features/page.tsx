import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrandIcon } from "@/components/ui/brand-icon"
import { MainHeader } from "@/components/ui/main-header"
import {
  Database,
  Target,
  Globe,
  Clock,
  DollarSign,
  TrendingUp,
  Shield,
  Award,
  Users,
  CheckCircle,
  BarChart3,
  Route,
  MapPin,
  Calendar,
  Expand
} from "lucide-react"
import { MainFooter } from "@/components/ui/main-footer"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <MainHeader />

      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container-responsive text-center">
          <Badge variant="secondary" className="mb-4 sm:mb-6 px-3 sm:px-4 py-2 text-xs sm:text-sm">
            ⚡ La plataforma más avanzada de Colombia
          </Badge>
          <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold text-gray-600 mb-4 sm:mb-6 px-4 leading-tight">
            ¿Por qué elegir 
            <span className="text-gray-600 bg-clip-text bg-gradient-to-r from-primary to-secondary"> Finkargo Analiza?</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4 leading-relaxed">
            La única plataforma que combina inteligencia artificial con datos oficiales de Aduanas para darte ventaja competitiva real
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="pt-4 pb-16 bg-white relative overflow-hidden">
        {/* Decorative vectors */}
        <div className="absolute top-12 right-16 opacity-4 pointer-events-none">
          <Database className="w-16 h-16 text-blue-600" />
        </div>
        <div className="absolute bottom-16 left-12 opacity-3 pointer-events-none">
          <Target className="w-14 h-14 text-purple-500" />
        </div>
        <div className="absolute top-1/2 right-1/3 opacity-2 pointer-events-none transform -translate-y-1/2">
          <BrandIcon size="lg" />
        </div>
        <div className="absolute bottom-32 right-20 opacity-3 pointer-events-none">
          <Globe className="w-12 h-12 text-green-600" />
        </div>
        <div className="absolute top-20 left-20 opacity-4 pointer-events-none">
          <svg className="w-18 h-18" viewBox="0 0 124 112" fill="none">
            <path d="M86.7734 0.00767596H37.2266C32.7789 0.00767596 28.6652 2.41025 26.4413 6.30964L1.66788 49.7019C-0.55596 53.6013 -0.55596 58.3987 1.66788 62.2981L26.4413 105.698C28.6652 109.597 32.7789 112 37.2266 112H86.7734C91.2211 112 95.3348 109.597 97.5587 105.698L122.332 62.2981C124.556 58.3987 124.556 53.6013 122.332 49.7019L97.5587 6.30197C95.3348 2.40258 91.2211 0 86.7734 0" fill="#5479F7"/>
          </svg>
        </div>
        <div className="absolute bottom-24 right-1/4 opacity-4 pointer-events-none">
          <svg className="w-14 h-14" viewBox="0 0 218 218" fill="none">
            <path d="M109 0L109 218" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M218 109L0 109" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M190.917 27.0833L27.0834 190.917" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M190.917 190.917L27.0833 27.0833" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M54.1667 13.5417L163.833 204.458" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M163.833 13.5417L54.1667 204.458" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
          </svg>
        </div>
        
        <div className="container-responsive relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Datos Oficiales de Aduanas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-justify">
                  Acceso exclusivo a la base de datos más completa de importaciones y exportaciones de Colombia, actualizada mensualmente.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    +2M registros de comercio exterior
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Actualización mensual automática
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Histórico de 2+ años
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Analiza tu Competencia</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-justify">
                  Visualiza las importaciones, precios, fletes, entre otros, que pagan tus competidores y toma decisiones para reducir costos.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Precios y fletes de competidores
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Reportes personalizados detallados
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Decisiones basadas en datos reales
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Obtén Insights de Alto Impacto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 text-justify">
                  Identifica tu porcentaje de participación en tu sector y nuevas oportunidades en el mercado al evaluar a tus proveedores potenciales.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Participación de mercado en tiempo real
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Identificación de oportunidades
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Evaluación de proveedores potenciales
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Additional Features */}
          <div className="mt-20 mb-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Características Avanzadas</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Herramientas adicionales que potencian tu análisis de comercio exterior
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Clock className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-gray-800">Predice la Demanda</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">
                      Planifica importaciones aprovechando temporadas como Navidad, Año Nuevo Chino y Black Friday.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Database className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-gray-800">Datos Oficiales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">
                      Acceso directo a información verificada de Aduanas con actualizaciones automáticas.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-gray-800">Análisis Predictivo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">
                      IA avanzada para identificar tendencias y oportunidades antes que tu competencia.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl">
                <Clock className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">80%</h3>
              <h4 className="text-lg font-semibold mb-2 text-gray-700">Ahorro de Tiempo</h4>
              <p className="text-gray-600 text-sm">Lo que antes tomaba semanas, ahora toma minutos</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl">
                <DollarSign className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">45%</h3>
              <h4 className="text-lg font-semibold mb-2 text-gray-700">Reducción de Costos</h4>
              <p className="text-gray-600 text-sm">Encuentra mejores precios y optimiza tu cadena</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">60%</h3>
              <h4 className="text-lg font-semibold mb-2 text-gray-700">Aumento en Ventas</h4>
              <p className="text-gray-600 text-sm">Identifica oportunidades que otros no ven</p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">100%</h3>
              <h4 className="text-lg font-semibold mb-2 text-gray-700">Seguro</h4>
              <p className="text-gray-600 text-sm">Datos encriptados y cumplimiento normativo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Finkargo Analiza Focus */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-300/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-28 h-28 bg-gradient-to-tl from-cyan-300/20 to-transparent rounded-full blur-xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Header Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm font-bold shadow-lg inline-block">
              🔥 FINKARGO ANALIZA
            </Badge>
            <h1 className="text-5xl font-black text-blue-700 mb-3">
              ANALIZA
            </h1>
            <p className="text-xl font-bold text-gray-800 mb-4">Descubre. Compara. Decide.</p>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Diseñado específicamente para el mercado colombiano
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              No somos una herramienta genérica. Finkargo Analiza está construida desde cero para entender las particularidades del comercio exterior colombiano.
            </p>
          </div>
          
          {/* Main Grid Layout */}
          <div className="grid lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto">
            {/* Left Column - First 3 Features */}
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Benchmark competitivo */}
                <div className="group hover:bg-white p-5 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg bg-white/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-blue-700 mb-1">Benchmark competitivo</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Descubre qué pagan tus competidores por productos idénticos. Negocia mejores precios.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Rutas optimizadas */}
                <div className="group hover:bg-white p-5 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg bg-white/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Route className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-blue-700 mb-1">Rutas optimizadas</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Identifica rutas logísticas más eficientes y proveedores alternativos con mejores condiciones.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Nuevos mercados */}
                <div className="group hover:bg-white p-5 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg bg-white/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-blue-700 mb-1">Nuevos mercados</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Detecta oportunidades emergentes y productos con potencial antes que tu competencia.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Planificación estratégica */}
                <div className="group hover:bg-white p-5 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg bg-white/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-blue-700 mb-1">Planificación estratégica</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Anticipa cuellos de botella logísticos. Optimiza importaciones para fechas clave.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Expansión regional - Full Width */}
                <div className="md:col-span-2 group hover:bg-white p-5 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg bg-white/50">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <Expand className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-blue-700 mb-1">Expansión regional</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Compara mercados en Colombia y México. Replica estrategias exitosas en múltiples países.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Results Card */}
            <div>
              <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-10 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold mb-4">Resultados Comprobados</h3>
                  <div className="w-16 h-1 bg-white/30 mx-auto rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center group">
                    <div className="text-5xl font-black mb-3 bg-gradient-to-br from-white to-blue-100 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                      160+
                    </div>
                    <div className="text-white/90 font-semibold text-lg">Empresas Activas</div>
                  </div>
                  
                  <div className="text-center group">
                    <div className="text-5xl font-black mb-3 bg-gradient-to-br from-white to-blue-100 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                      $2.3B
                    </div>
                    <div className="text-white/90 font-semibold text-lg">Volumen Analizado</div>
                  </div>
                  
                  <div className="text-center group">
                    <div className="text-5xl font-black mb-3 bg-gradient-to-br from-white to-blue-100 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                      45%
                    </div>
                    <div className="text-white/90 font-semibold text-lg">Reducción Costos</div>
                  </div>
                  
                  <div className="text-center group">
                    <div className="text-5xl font-black mb-3 bg-gradient-to-br from-white to-blue-100 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                      60%
                    </div>
                    <div className="text-white/90 font-semibold text-lg">Crecimiento Promedio</div>
                  </div>
                </div>
                
                {/* Brand Icon at bottom */}
                <div className="mt-10 text-center opacity-70">
                  <BrandIcon size="lg" className="mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Únete a más de 160+ empresas colombianas que ya optimizan su comercio exterior con Finkargo Analiza
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup">
              <Button size="lg" className="px-8 py-4 text-lg bg-white text-primary hover:bg-gray-100">
                Comenzar Gratis
              </Button>
            </Link>
            <Link href="/precios">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg border-white bg-transparent text-white hover:bg-white hover:text-primary"
              >
                Ver Precios
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  )
}