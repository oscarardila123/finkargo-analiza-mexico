import { MainHeader } from "@/components/ui/main-header"
import { MainFooter } from "@/components/ui/main-footer"
import { Calendar, Tag, ArrowRight } from "lucide-react"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Simplifica tu Importación: guía Completa para aprovechar los TLC de México",
      date: "04 Aug",
      category: "Comercio Internacional",
      image: "/blog/simplifica-importacion.jpg",
      excerpt: "Descubre cómo maximizar los beneficios de los Tratados de Libre Comercio de México para optimizar tus procesos de importación.",
      tags: ["TLC", "Importaciones", "México"]
    },
    {
      id: 2,
      title: "Simplifica tu operación: el paso que separa al comprador ocupado del estratega internacional",
      date: "16 Jul",
      category: "Optimización de operaciones",
      image: "/blog/estratega-internacional.jpg",
      excerpt: "Transforma tu enfoque de compras internacionales y conviértete en un estratega que maximiza oportunidades globales.",
      tags: ["Estrategia", "Compras", "Optimización"]
    },
    {
      id: 3,
      title: "¿Cómo mejorar tu estrategia de importación en México usando datos?",
      date: "10 Feb",
      category: "Tecnología y logística",
      image: "/blog/datos-importacion.jpg",
      excerpt: "Aprende a utilizar datos verificados y analytics para tomar decisiones más inteligentes en tus operaciones de importación.",
      tags: ["Datos", "Analytics", "Importaciones"]
    },
    {
      id: 4,
      title: "Señales de alerta al tratar con proveedores extranjeros",
      date: "03 Feb",
      category: "Compras internacionales",
      image: "/blog/proveedores-extranjeros.jpg",
      excerpt: "Identifica las principales red flags al evaluar y trabajar con proveedores internacionales para evitar riesgos innecesarios.",
      tags: ["Proveedores", "Riesgos", "Evaluación"]
    },
    {
      id: 5,
      title: "El Año Nuevo Chino no tiene que ser un dolor de cabeza: estrategias clave para importadores mexicanos",
      date: "21 Ene",
      category: "Logística y transporte",
      image: "/blog/ano-nuevo-chino.jpg",
      excerpt: "Planifica tus importaciones considerando el Año Nuevo Chino y evita interrupciones en tu cadena de suministro.",
      tags: ["China", "Planificación", "Cadena de Suministro"]
    }
  ]

  const categories = [
    "Comercio Internacional",
    "Compras internacionales",
    "Financiamiento y negocios",
    "Importaciones",
    "Logística y transporte",
    "Optimización de operaciones",
    "Tecnología y logística"
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <MainHeader />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container-responsive text-center">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-600 mb-6">
            Blog Finkargo
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
            Insights, estrategias y conocimientos para optimizar tus operaciones de comercio internacional
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Mantente actualizado con las últimas tendencias, mejores prácticas y consejos expertos para importadores mexicanos y de América Latina.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container-responsive">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Featured Post */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                <div className="h-64 bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <div className="text-center text-white p-6">
                    <h3 className="text-2xl font-bold mb-2">Artículo Destacado</h3>
                    <p className="text-blue-100">Contenido premium para importadores</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Comercio Internacional
                    </span>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Calendar className="h-4 w-4" />
                      04 Aug
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Simplifica tu Importación: guía Completa para aprovechar los TLC de Colombia
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Descubre cómo maximizar los beneficios de los Tratados de Libre Comercio de Colombia para optimizar tus procesos de importación y reducir costos significativamente.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">TLC</span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">Importaciones</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                      Leer más <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Posts Sidebar */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Artículos Recientes</h3>
              <div className="space-y-6">
                {blogPosts.slice(1).map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow border border-gray-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-600 text-sm font-medium">{post.category}</span>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2 text-sm leading-tight">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center gap-1">
                        Leer <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* All Posts Grid */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Todos los Artículos</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Tag className="h-8 w-8" />
                      </div>
                      <p className="text-sm font-medium">{post.category}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-500 text-sm">{post.date}</span>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-3 text-lg leading-tight">
                      {post.title}
                    </h4>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium flex items-center justify-center gap-2 transition-colors">
                      Leer Artículo Completo
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="container-responsive text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Mantente Actualizado
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Suscríbete a nuestro newsletter y recibe los últimos insights sobre comercio internacional directamente en tu bandeja de entrada.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Suscribirse
            </button>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  )
}