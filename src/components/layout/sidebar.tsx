"use client"

import { useState } from "react"
import Link from "next/link"
import { ClientOnly } from "@/components/ui/client-only"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Building2,
  FileText,
  Globe,
  Home,
  Menu,
  Package,
  Search,
  Settings,
  TrendingUp,
  Users,
  X,
} from "lucide-react"

interface SidebarProps {
  className?: string
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    description: "Resumen general"
  },
  {
    name: "Análisis de Importaciones",
    href: "/dashboard/imports",
    icon: Package,
    description: "Datos de importación"
  },
  {
    name: "Análisis de Exportaciones", 
    href: "/dashboard/exports",
    icon: Globe,
    description: "Datos de exportación"
  },
  {
    name: "Descubrimiento de Proveedores",
    href: "/dashboard/suppliers",
    icon: Search,
    description: "Encontrar proveedores"
  },
  {
    name: "Análisis de Competidores",
    href: "/dashboard/competitors",
    icon: TrendingUp,
    description: "Inteligencia competitiva"
  },
  {
    name: "Reportes",
    href: "/dashboard/reports",
    icon: FileText,
    description: "Generar reportes"
  },
  {
    name: "Mi Empresa",
    href: "/dashboard/company",
    icon: Building2,
    description: "Configuración empresarial"
  },
  {
    name: "Usuarios",
    href: "/dashboard/users",
    icon: Users,
    description: "Gestión de usuarios"
  },
]

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0 lg:static lg:inset-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Finkargo</h2>
                <p className="text-xs text-gray-500">Analiza</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors group",
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <Icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      isActive ? "text-white" : "text-gray-800 group-hover:text-gray-600"
                    )}
                  />
                  <div className="flex-1">
                    <div className="text-sm">{item.name}</div>
                    <div
                      className={cn(
                        "text-xs mt-0.5",
                        isActive ? "text-white/80" : "text-gray-500"
                      )}
                    >
                      {item.description}
                    </div>
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Settings */}
          <div className="p-4 border-t border-gray-200">
            <Link
              href="/dashboard/settings"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors group",
                pathname === "/dashboard/settings"
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <Settings className="mr-3 h-5 w-5 text-gray-800 group-hover:text-gray-600" />
              <div>
                <div className="text-sm">Configuración</div>
                <div className="text-xs text-gray-700 mt-0.5">
                  Ajustes generales
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}