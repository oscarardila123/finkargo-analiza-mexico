import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrandIcon } from "@/components/ui/brand-icon"
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
  CheckCircle
} from "lucide-react"
import { ScrollToTop } from "@/components/ui/scroll-to-top"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
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
            <Link href="/features" className="body-md text-brand-navy-dark font-semibold">
              Beneficios
            </Link>
            <Link href="/precios" className="body-md text-secondary hover:text-brand-navy-dark transition-colors">
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
      <section className="py-16 lg:py-12">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            ⚡ La plataforma más avanzada de Colombia
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-600 mb-6">
            ¿Por qué elegir 
            <span className="text-gray-600 bg-clip-text bg-gradient-to-r from-primary to-secondary"> Finkargo Analiza?</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            La única plataforma que combina inteligencia artificial con datos oficiales de Aduanas para darte ventaja competitiva real
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-16 bg-white relative overflow-hidden">
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
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Datos Oficiales de Aduanas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
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
                    Histórico de 5+ años
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
                <p className="text-gray-600 mb-4">
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
                <p className="text-gray-600 mb-4">
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

          {/* Predictive Analytics Feature */}
          <div className="mt-16 mb-16">
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-50 to-purple-50">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl">Predice la Demanda</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
                    Utiliza la información consolidada de los reportes para planificar tus importaciones aprovechando temporadas como Navidad, Año Nuevo Chino, Black Friday y otras fechas comerciales y logísticas.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>Planificación de temporadas altas</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>Análisis de tendencias estacionales</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>Optimización de inventarios</span>
                      </li>
                    </ul>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>Predicción de demanda por producto</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>Alertas de fechas comerciales clave</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>Reportes consolidados históricos</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Ahorra 80% del Tiempo</h3>
              <p className="text-gray-600 text-sm">Lo que antes tomaba semanas, ahora toma minutos</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Reduce Costos 45%</h3>
              <p className="text-gray-600 text-sm">Encuentra mejores precios y optimiza tu cadena</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Aumenta Ventas 60%</h3>
              <p className="text-gray-600 text-sm">Identifica oportunidades que otros no ven</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Seguro</h3>
              <p className="text-gray-600 text-sm">Datos encriptados y cumplimiento normativo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Colombian Focus */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">🇨🇴 Especializado en Colombia</Badge>
              <h2 className="text-4xl font-bold text-gray-600 mb-6">
                Diseñado específicamente para el mercado colombiano
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                No somos una herramienta genérica. Finkargo Analiza está construida desde cero para entender las particularidades del comercio exterior colombiano.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Integración Aduanas Nativa</h3>
                    <p className="text-gray-600">
                      Única plataforma con acceso directo y autorizado a los sistemas de Aduanas. Datos 100% oficiales y verificados.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Soporte Local Experto</h3>
                    <p className="text-gray-600">
                      Equipo especializado en Bogotá que entiende tu negocio, regulaciones locales y particularidades del mercado colombiano.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Resultados Comprobados</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-white opacity-90">Empresas Activas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">$2.3B</div>
                  <div className="text-white opacity-90">Volumen Analizado</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">45%</div>
                  <div className="text-white opacity-90">Reducción Costos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">60%</div>
                  <div className="text-white opacity-90">Crecimiento Promedio</div>
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
            Únete a más de 500+ empresas colombianas que ya optimizan su comercio exterior con Finkargo Analiza
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <div>
                  <span className="text-xl font-bold">Finkargo</span>
                  <span className="text-sm text-primary ml-1">Analiza</span>
                </div>
              </Link>
              <p className="text-gray-600 text-sm">
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
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2024 Finkargo Analiza. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
      
      <ScrollToTop />
    </div>
  )
}