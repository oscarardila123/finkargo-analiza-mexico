import { ResponsiveHeader } from "@/components/ui/responsive-header"
import { MainFooter } from "@/components/ui/main-footer"
import { Users, Target, TrendingUp, Shield, Award } from "lucide-react"

export default function SobreNosotrosPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <ResponsiveHeader />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container-responsive text-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-600 mb-6">
            Sobre Nosotros
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
            Somos apasionados por crear oportunidades de crecimiento para nuestra región.
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Entendimos que el comercio exterior en América Latina tiene brechas que es necesario cerrar para consolidar el crecimiento de las pymes, que son el motor de nuestra economía.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container-responsive text-center">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 lg:p-12 rounded-2xl text-white">
            <h2 className="text-2xl lg:text-4xl font-bold mb-6">
              Fundamos Finkargo,
            </h2>
            <p className="text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto">
              la primera plataforma de financiamiento para operaciones de comercio exterior en América Latina.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-responsive">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-600 mb-12">
            Nuestra Historia
          </h2>
          
          {/* 2021 */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <span className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full text-2xl font-bold">
                2021
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg border border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700">Marzo</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Levantamos <strong>USD $7,5 millones</strong> en capital semilla para impulsar el crecimiento de PYMEs
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700">Julio</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Iniciamos operación en <strong>México</strong>
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-lg border border-purple-100">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700">Noviembre</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Logramos una nueva inyección de capital por <strong>USD $75 millones</strong>
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg border border-orange-100">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 p-3 rounded-full mr-4">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700">Logro 2021</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Alcanzamos los primeros <strong>USD $100 millones</strong> en mercancía financiada con más de <strong>140 clientes</strong>
                </p>
              </div>
            </div>
          </div>

          {/* 2023 */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <span className="inline-block bg-cyan-600 text-white px-6 py-3 rounded-full text-2xl font-bold">
                2023
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg border border-blue-100">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700">Marzo</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Lanzamos <strong>Protege</strong>, un nuevo producto para asegurar tu mercancía en cada paso de tu operación de importación
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-lg border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700">Septiembre</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Superamos los <strong>USD $200 millones</strong> en mercancía financiada con más de <strong>240 clientes</strong>
                </p>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-lg text-white text-center">
                <h3 className="text-xl font-bold mb-3">Consolidación Estratégica</h3>
                <p className="text-lg leading-relaxed">
                  Nos consolidamos como tu aliado estratégico al centralizar todas tus operaciones de comercio exterior al agregar dos nuevos productos: <strong>Verifica</strong> y <strong>Analiza</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-600 mb-4">
              Nuestros valores
            </h2>
            <p className="text-xl text-gray-600">
              y por qué nos importa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Long live the customer</h3>
              <p className="text-gray-700 leading-relaxed">
                Existimos por nuestros clientes. Trabajamos todos los días para que logren cumplir sus metas, y lo hacemos ofreciendo la mejor experiencia posible.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-xl font-bold text-green-800 mb-4">Get Shit Done</h3>
              <p className="text-gray-700 leading-relaxed">
                Nos ganamos la confianza de nuestros clientes y compañeros cumpliendo, no hablando. Las ideas son increíbles, pero solo se miden por nuestra capacidad de ejecutarlas.
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-xl font-bold text-purple-800 mb-4">Growth mindset</h3>
              <p className="text-gray-700 leading-relaxed">
                Nos embarcamos en nuevos retos y oportunidades en busca de nuevos caminos inexplorados. Buscamos incomodarnos y aprender para ser mejores cada día.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <h3 className="text-xl font-bold text-orange-800 mb-4">Team First</h3>
              <p className="text-gray-700 leading-relaxed">
                Trabajar solos puede llevarnos a un progreso mas rápido, trabajar en equipo nos permite lograr un mayor éxito y tener un impacto más significativo a largo plazo.
              </p>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200 md:col-span-2 lg:col-span-1">
              <h3 className="text-xl font-bold text-red-800 mb-4">Extreme ownership</h3>
              <p className="text-gray-700 leading-relaxed">
                Somos responsables de TODO. Protagonistas de nuestras decisiones y no víctimas de las excusas. No somos lo que decimos… somos lo que hacemos!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-600">
              Este es nuestro equipo de liderazgo en Finkargo
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Santiago Molina</h3>
              <p className="text-blue-600 font-medium">Visionary / CEO</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Tomás Shuk</h3>
              <p className="text-green-600 font-medium">Chief Revenue Officer</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Target className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Andres Ferrer</h3>
              <p className="text-purple-600 font-medium">Integrator / President</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Daniel Restrepo</h3>
              <p className="text-orange-600 font-medium">Chief of Staff</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-20 h-20 bg-cyan-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-10 w-10 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Juan Pablo Gonzalez</h3>
              <p className="text-cyan-600 font-medium">Lending Financial Ops</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-20 h-20 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Target className="h-10 w-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Andres Ortiz</h3>
              <p className="text-indigo-600 font-medium">VP of Finance</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">David Echeverri</h3>
              <p className="text-blue-600 font-medium">VP of Tech and Analytics</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Maria Garrido</h3>
              <p className="text-green-600 font-medium">VP of Legal</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-20 h-20 bg-pink-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-10 w-10 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Ana Maria Garcia</h3>
              <p className="text-pink-600 font-medium">VP of People</p>
            </div>
          </div>
        </div>
      </section>

      {/* Investors Section */}
      <section className="py-16">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-600">
              Estos inversionistas
            </h2>
            <p className="text-3xl lg:text-4xl font-bold text-blue-600 mt-2">
              de talla mundial nos apoyan
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {/* Latitud Finance */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full h-24 flex items-center justify-center hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="font-bold text-green-600 text-lg mb-1">△ Latitud</div>
                <div className="text-green-500 text-sm font-medium">FINANCE</div>
              </div>
            </div>

            {/* Angel Ventures */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full h-24 flex items-center justify-center hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="font-bold text-orange-600 text-lg mb-1">△Angel</div>
                <div className="text-gray-600 text-sm">Ventures</div>
              </div>
            </div>

            {/* Maya Capital */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full h-24 flex items-center justify-center hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="font-bold text-blue-600 text-xl mb-1">MAYA</div>
                <div className="text-orange-500 text-sm font-medium">CAPITAL</div>
              </div>
            </div>

            {/* OneVC */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full h-24 flex items-center justify-center hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="font-bold text-black text-xl border-2 border-black px-3 py-1">
                  ONEVC
                </div>
              </div>
            </div>

            {/* Flybridge */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full h-24 flex items-center justify-center hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="font-bold text-black text-lg">
                  FLYBRIDGE
                </div>
              </div>
            </div>

            {/* Quona */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full h-24 flex items-center justify-center hover:shadow-xl transition-shadow">
              <div className="text-center">
                <div className="font-bold text-black text-xl">
                  QUONA
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-600">
              ¿Desde donde operamos?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-blue-100">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🇨🇴</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-600 mb-2">Bogotá, Colombia</h3>
              </div>
              <div className="text-gray-700 space-y-1">
                <p>Cl. 81 #11-08,</p>
                <p>Localidad de Chapinero,</p>
                <p>Bogotá, Cundinamarca</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg border border-green-100">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🇲🇽</span>
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Ciudad de México, México</h3>
              </div>
              <div className="text-gray-700 space-y-1">
                <p>Calle Montes Urales 424,</p>
                <p>Lomas – Virreyes, Lomas de Chapultepec</p>
                <p>V Secc., Miguel Hidalgo</p>
                <p>Ciudad de México</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  )
}