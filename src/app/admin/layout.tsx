import { Metadata } from "next"
import Link from "next/link"
import { Users, CreditCard, Settings, BarChart3, Home, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "Panel de Administración - Finkargo Analiza",
  description: "Panel de administración para gestionar usuarios, pagos y configuraciones",
}

interface AdminLayoutProps {
  children: React.ReactNode
}

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: Home
  },
  {
    href: "/admin/users", 
    label: "Gestión de Usuarios",
    icon: Users
  },
  {
    href: "/admin/subscriptions",
    label: "Suscripciones", 
    icon: Calendar
  },
  {
    href: "/admin/payments",
    label: "Pagos",
    icon: CreditCard
  },
  {
    href: "/admin/settings",
    label: "Configuración",
    icon: Settings
  }
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Finkargo Analiza</span>
              </Link>
              <span className="ml-4 px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                Panel Admin
              </span>
            </div>
            <Link 
              href="/"
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors group"
                >
                  <Icon className="w-5 h-5 group-hover:text-blue-600" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}