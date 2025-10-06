"use client"

import { signOut, useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, ChevronDown, LogOut, Settings, User, Shield } from "lucide-react"
import Link from "next/link"

export function Header() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 lg:px-8">
      <div className="flex items-center space-x-4">
        <div className="lg:hidden w-16" /> {/* Spacer for mobile menu button */}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            {getPageTitle(pathname)}
          </h1>
          <p className="text-sm text-gray-500">
            Bienvenido a tu plataforma de inteligencia comercial
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 px-3 gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                <AvatarFallback className="bg-primary text-white text-sm">
                  {session?.user?.name ? getInitials(session.user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">{session?.user?.name}</span>
                <span className="text-xs text-gray-500">{session?.user?.companyName}</span>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                <p className="text-xs leading-none text-gray-700">
                  {session?.user?.email}
                </p>
                <p className="text-xs leading-none text-gray-700">
                  {session?.user?.companyName} • {getRoleLabel(session?.user?.role)}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Mi Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Configuración
              </Link>
            </DropdownMenuItem>
            {(session?.user as any)?.role === 'ADMIN' && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="flex items-center text-purple-600 hover:text-purple-700">
                    <Shield className="mr-2 h-4 w-4" />
                    Panel de Administración
                  </Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onClick={() => signOut({ callbackUrl: "/auth/signin" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

function getPageTitle(pathname: string): string {
  const titleMap: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/imports": "Análisis de Importaciones",
    "/dashboard/exports": "Análisis de Exportaciones",
    "/dashboard/suppliers": "Descubrimiento de Proveedores",
    "/dashboard/competitors": "Análisis de Competidores",
    "/dashboard/reports": "Reportes",
    "/dashboard/company": "Mi Empresa",
    "/dashboard/users": "Usuarios",
    "/dashboard/settings": "Configuración",
    "/dashboard/profile": "Mi Perfil",
    "/dashboard/subscription": "Suscripción",
  }
  
  return titleMap[pathname] || "Dashboard"
}

function getRoleLabel(role?: string): string {
  const roleMap: Record<string, string> = {
    "ADMIN": "Administrador",
    "ANALYST": "Analista",
    "VIEWER": "Consultor",
  }
  
  return roleMap[role || ""] || "Usuario"
}