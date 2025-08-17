"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BrandIcon } from "@/components/ui/brand-icon"
import { Menu, X } from "lucide-react"

interface ResponsiveHeaderProps {
  currentPage?: 'home' | 'features' | 'precios' | 'demo'
}

export function ResponsiveHeader({ currentPage = 'home' }: ResponsiveHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActivePage = (page: string) => currentPage === page

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container-responsive h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <BrandIcon size="md" />
          <div>
            <span className="heading-sm text-brand-navy">Analiza</span>
            <span className="body-sm text-brand-navy-dark font-medium ml-1">de Finkargo</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link 
            href="/features" 
            className={`body-md transition-colors ${
              isActivePage('features') 
                ? 'text-brand-navy-dark font-semibold' 
                : 'text-secondary hover:text-brand-navy-dark'
            }`}
          >
            Beneficios
          </Link>
          <Link 
            href="/precios" 
            className={`body-md transition-colors ${
              isActivePage('precios') 
                ? 'text-brand-navy-dark font-semibold' 
                : 'text-secondary hover:text-brand-navy-dark'
            }`}
          >
            Precios
          </Link>
          <Link 
            href="/demo" 
            className={`body-md transition-colors ${
              isActivePage('demo') 
                ? 'text-brand-navy-dark font-semibold' 
                : 'text-secondary hover:text-brand-navy-dark'
            }`}
          >
            Demo
          </Link>
        </nav>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link href="/auth/signin">
            <Button variant="ghost" className="text-secondary hover:bg-cyan-50 hover:text-brand-navy-dark transition-all">
              Iniciar Sesión
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="btn-primary-gradient text-white">
              Comenzar Gratis
            </Button>
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
              href="/features" 
              className={`block py-3 px-4 rounded-lg transition-all ${
                isActivePage('features')
                  ? 'bg-brand-navy-dark/10 text-brand-navy-dark font-semibold'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-brand-navy-dark'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Beneficios
            </Link>
            <Link 
              href="/precios" 
              className={`block py-3 px-4 rounded-lg transition-all ${
                isActivePage('precios')
                  ? 'bg-brand-navy-dark/10 text-brand-navy-dark font-semibold'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-brand-navy-dark'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Precios
            </Link>
            <Link 
              href="/demo" 
              className={`block py-3 px-4 rounded-lg transition-all ${
                isActivePage('demo')
                  ? 'bg-brand-navy-dark/10 text-brand-navy-dark font-semibold'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-brand-navy-dark'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Demo
            </Link>
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-secondary hover:bg-cyan-50 hover:text-brand-navy-dark">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full btn-primary-gradient text-white">
                  Comenzar Gratis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}