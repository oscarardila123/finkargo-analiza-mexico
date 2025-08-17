import Link from "next/link"
import { BrandIcon } from "@/components/ui/brand-icon"
import { Shield, Target, DollarSign } from "lucide-react"
import { ScrollToTop } from "@/components/ui/scroll-to-top"

export function MainFooter() {
  return (
    <>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-700">
        <div className="container-responsive">
          <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <BrandIcon size="lg" />
                <div>
                  <span className="text-xl font-bold text-white">Finkargo</span>
                  <span className="text-lg text-brand-navy-dark font-semibold ml-2">Analiza</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                El aliado financiero, confiable y útil del importador colombiano desde 2022.
              </p>
              <p className="text-gray-600 font-medium">
                🇨🇴 100% Hecho en Colombia
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Pilares Finkargo</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-brand-navy-dark" />
                  <span className="text-gray-600 hover:text-white transition-colors duration-200 cursor-pointer">Confiable - Datos de Aduanas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-brand-coral" />
                  <span className="text-gray-600 hover:text-white transition-colors duration-200 cursor-pointer">Útil - Herramientas Prácticas</span>
                </li>
                <li className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-brand-navy" />
                  <span className="text-gray-600 hover:text-white transition-colors duration-200 cursor-pointer">Financiero - ROI Garantizado</span>
                </li>
                <li><Link href="/precios" className="text-gray-600 hover:text-white transition-colors duration-200 font-medium block mb-2">Ver Planes</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="/api/redirect/sobre-nosotros" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors duration-200 block mb-2">Sobre Nosotros</a></li>
                <li><a href="/api/redirect/blog" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors duration-200 block mb-2">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Soporte</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-white transition-colors duration-200 block mb-2">Centro de Ayuda</a></li>
                <li><a href="https://api.whatsapp.com/send?phone=573222235280&text=%C2%A1Hola!%20Somos%20Finkargo.%0A%0AEscribe%20tu%20mensaje.%20" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors duration-200 block mb-2">Contacto</a></li>
                <li><a href="/api/redirect/politicas-privacidad" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors duration-200 block mb-2">Políticas de Privacidad</a></li>
                <li><a href="/api/redirect/aviso-privacidad" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors duration-200 block mb-2">Aviso de Privacidad</a></li>
                <li><a href="/api/redirect/terminos-condiciones" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors duration-200 block mb-2">Términos y Condiciones</a></li>
                <li><a href="/api/redirect/datos-sensibles" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors duration-200 block mb-2">Datos Sensibles</a></li>
                <li><a href="/api/redirect/datos-personales" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors duration-200 block mb-2">Datos Personales</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-sm">
                &copy; 2024 Finkargo Analiza - El aliado financiero del importador colombiano
              </p>
              <div className="flex items-center gap-6 text-sm">
                <span className="text-brand-navy-dark font-medium">🇨🇴 Bogotá, Colombia</span>
                <span className="text-gray-600">|</span>
                <span className="text-gray-600 font-semibold">✅ 160+ Empresas Confían</span>
                <span className="text-gray-600">|</span>
                <span className="text-brand-coral font-medium">📊 Datos de Aduanas Oficiales</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      <ScrollToTop />
    </>
  )
}