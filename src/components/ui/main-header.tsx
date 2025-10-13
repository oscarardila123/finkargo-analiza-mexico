"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BrandIcon } from "@/components/ui/brand-icon"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  CreditCard as SubscriptionIcon,
} from "lucide-react"

export function MainHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session, status } = useSession()

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
          <Link href="/features" className="body-md text-secondary hover:text-brand-navy-dark transition-colors">
            Beneficios
          </Link>
          <Link href="/precios" className="body-md text-secondary hover:text-brand-navy-dark transition-colors">
            Precios
          </Link>
          <Link href="/demo" className="body-md text-secondary hover:text-brand-navy-dark transition-colors">
            Demo
          </Link>
        </nav>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border border-blue-200 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
                    <AvatarImage src={session.user?.image || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-semibold">
                      {session.user?.name?.charAt(0)?.toUpperCase() || session.user?.email?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden xl:block text-left">
                    <p className="text-sm font-semibold text-gray-900">{session.user?.name || 'Usuario'}</p>
                    <p className="text-xs text-gray-600">{session.user?.email}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-600 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 shadow-xl border border-gray-100">
                <DropdownMenuLabel className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-gray-200">
                      <AvatarImage src={session.user?.image || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-semibold">
                        {session.user?.name?.charAt(0)?.toUpperCase() || session.user?.email?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-gray-900">{session.user?.name || 'Usuario'}</p>
                      <p className="text-xs text-gray-600">{session.user?.email}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/suscripcion" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-blue-50 transition-colors">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <SubscriptionIcon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Suscripción</span>
                      <span className="text-xs text-gray-500">Gestiona tu plan</span>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem 
                  onClick={() => signOut()} 
                  className="cursor-pointer flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-50 text-red-600 transition-colors"
                >
                  <div className="p-2 bg-red-100 rounded-lg">
                    <LogOut className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button variant="ghost" className="body-md text-secondary hover:text-brand-navy-dark">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button className="bg-brand-navy hover:bg-brand-navy-dark text-white px-6 py-2 rounded-lg transition-colors shadow-lg hover:shadow-xl">
                  Comenzar Ahora
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-secondary" />
          ) : (
            <Menu className="h-6 w-6 text-secondary" />
          )}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="container-responsive py-4 space-y-4">
            <Link 
              href="/features" 
              className="block body-md text-secondary hover:text-brand-navy-dark transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Beneficios
            </Link>
            <Link 
              href="/precios" 
              className="block body-md text-secondary hover:text-brand-navy-dark transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Precios
            </Link>
            <Link 
              href="/demo" 
              className="block body-md text-secondary hover:text-brand-navy-dark transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Demo
            </Link>
            
            <div className="pt-4 border-t border-gray-200 space-y-2">
              {session ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 py-2">
                    <Avatar className="h-8 w-8 border-2 border-gray-200">
                      <AvatarImage src={session.user?.image || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-semibold text-xs">
                        {session.user?.name?.charAt(0)?.toUpperCase() || session.user?.email?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="text-sm font-semibold text-gray-900">{session.user?.name || 'Usuario'}</p>
                      <p className="text-xs text-gray-600">{session.user?.email}</p>
                    </div>
                  </div>
                  <Link href="/suscripcion" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      <SubscriptionIcon className="h-4 w-4 mr-2" />
                      Suscripción
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => {
                      signOut()
                      setMobileMenuOpen(false)
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-brand-navy hover:bg-brand-navy-dark text-white">
                      Comenzar Ahora
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}