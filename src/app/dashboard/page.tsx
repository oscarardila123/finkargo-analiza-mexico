import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Package,
  Globe,
  FileText,
  Search,
  DollarSign,
  Users,
  Database,
  Target,
} from "lucide-react"
import Link from "next/link"
import { BrandIcon } from "@/components/ui/brand-icon"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  // Mock data - in production this would come from your database
  const stats = {
    totalImports: {
      value: "1,234",
      trend: { value: 12.5, isPositive: true },
      description: "Importaciones este mes"
    },
    totalExports: {
      value: "567",
      trend: { value: -3.2, isPositive: false },
      description: "Exportaciones este mes"
    },
    totalValue: {
      value: "$2.4M",
      trend: { value: 8.1, isPositive: true },
      description: "Valor CIF total"
    },
    activeSuppliers: {
      value: "89",
      trend: { value: 5.4, isPositive: true },
      description: "Proveedores activos"
    }
  }

  const recentActivity = [
    {
      id: 1,
      type: "import",
      description: "Nueva importación desde China",
      value: "$45,000",
      time: "Hace 2 horas"
    },
    {
      id: 2,
      type: "report",
      description: "Reporte de competidores generado",
      value: "Análisis sectorial",
      time: "Hace 4 horas"
    },
    {
      id: 3,
      type: "export",
      description: "Exportación a Brasil completada",
      value: "$28,500",
      time: "Hace 6 horas"
    }
  ]

  const quickActions = [
    {
      title: "Generar Reporte",
      description: "Crear un nuevo reporte personalizado",
      href: "/dashboard/reports",
      icon: FileText,
      color: "bg-blue-500"
    },
    {
      title: "Buscar Proveedores",
      description: "Descubrir nuevos proveedores internacionales",
      href: "/dashboard/suppliers",
      icon: Search,
      color: "bg-green-500"
    },
    {
      title: "Análisis de Mercado",
      description: "Ver tendencias y oportunidades",
      href: "/dashboard/imports",
      icon: BarChart3,
      color: "bg-purple-500"
    },
    {
      title: "Comparar Competidores",
      description: "Analizar la competencia en tu sector",
      href: "/dashboard/competitors",
      icon: TrendingUp,
      color: "bg-orange-500"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Bienvenido de vuelta, {session?.user?.name?.split(" ")[0]}
        </h1>
        <p className="text-white opacity-90">
          Aquí tienes un resumen de tu actividad comercial {session?.user?.companyName && `en ${session.user.companyName}`}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Importaciones"
          value={stats.totalImports.value}
          description={stats.totalImports.description}
          icon={Package}
          trend={stats.totalImports.trend}
        />
        <StatsCard
          title="Exportaciones"
          value={stats.totalExports.value}
          description={stats.totalExports.description}
          icon={Globe}
          trend={stats.totalExports.trend}
        />
        <StatsCard
          title="Valor Total"
          value={stats.totalValue.value}
          description={stats.totalValue.description}
          icon={DollarSign}
          trend={stats.totalValue.trend}
        />
        <StatsCard
          title="Proveedores"
          value={stats.activeSuppliers.value}
          description={stats.activeSuppliers.description}
          icon={Users}
          trend={stats.activeSuppliers.trend}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 relative">
        {/* Decorative vectors */}
        <div className="absolute top-6 right-10 opacity-3 pointer-events-none z-0">
          <Database className="w-14 h-14 text-blue-500" />
        </div>
        <div className="absolute bottom-20 left-16 opacity-4 pointer-events-none z-0">
          <Target className="w-12 h-12 text-purple-600" />
        </div>
        <div className="absolute top-12 left-12 opacity-4 pointer-events-none z-0">
          <svg className="w-12 h-12" viewBox="0 0 124 112" fill="none">
            <path d="M86.7734 0.00767596H37.2266C32.7789 0.00767596 28.6652 2.41025 26.4413 6.30964L1.66788 49.7019C-0.55596 53.6013 -0.55596 58.3987 1.66788 62.2981L26.4413 105.698C28.6652 109.597 32.7789 112 37.2266 112H86.7734C91.2211 112 95.3348 109.597 97.5587 105.698L122.332 62.2981C124.556 58.3987 124.556 53.6013 122.332 49.7019L97.5587 6.30197C95.3348 2.40258 91.2211 0 86.7734 0" fill="#5479F7"/>
          </svg>
        </div>
        <div className="absolute bottom-12 right-24 opacity-4 pointer-events-none z-0">
          <svg className="w-10 h-10" viewBox="0 0 218 218" fill="none">
            <path d="M109 0L109 218" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M218 109L0 109" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M190.917 27.0833L27.0834 190.917" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M190.917 190.917L27.0833 27.0833" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M54.1667 13.5417L163.833 204.458" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M163.833 13.5417L54.1667 204.458" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
          </svg>
        </div>
        
        {/* Quick Actions */}
        <Card className="relative z-10">
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Accede rápidamente a las funciones más utilizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <Link key={action.title} href={action.href}>
                  <div className="flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                    <div className={`p-2 rounded-lg text-white mr-3 ${action.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{action.title}</h4>
                      <p className="text-xs text-gray-500">{action.description}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="relative z-10">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimas operaciones y eventos en tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-600">
                      {activity.description}
                    </p>
                    <p className="text-sm text-gray-500">{activity.value}</p>
                  </div>
                  <div className="text-xs text-gray-600">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="ghost" size="sm" className="w-full">
                Ver toda la actividad
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2 relative">
        {/* Decorative vectors */}
        <div className="absolute top-12 left-12 opacity-2 pointer-events-none z-0">
          <BrandIcon size="lg" />
        </div>
        <div className="absolute bottom-16 right-20 opacity-3 pointer-events-none z-0">
          <Globe className="w-16 h-16 text-green-600" />
        </div>
        <div className="absolute top-8 right-16 opacity-4 pointer-events-none z-0">
          <svg className="w-14 h-14" viewBox="0 0 124 112" fill="none">
            <path d="M86.7734 0.00767596H37.2266C32.7789 0.00767596 28.6652 2.41025 26.4413 6.30964L1.66788 49.7019C-0.55596 53.6013 -0.55596 58.3987 1.66788 62.2981L26.4413 105.698C28.6652 109.597 32.7789 112 37.2266 112H86.7734C91.2211 112 95.3348 109.597 97.5587 105.698L122.332 62.2981C124.556 58.3987 124.556 53.6013 122.332 49.7019L97.5587 6.30197C95.3348 2.40258 91.2211 0 86.7734 0" fill="#5479F7"/>
          </svg>
        </div>
        <div className="absolute bottom-8 left-20 opacity-4 pointer-events-none z-0">
          <svg className="w-12 h-12" viewBox="0 0 218 218" fill="none">
            <path d="M109 0L109 218" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M218 109L0 109" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M190.917 27.0833L27.0834 190.917" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M190.917 190.917L27.0833 27.0833" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M54.1667 13.5417L163.833 204.458" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
            <path d="M163.833 13.5417L54.1667 204.458" stroke="#f97316" strokeWidth="27" strokeLinecap="round"/>
          </svg>
        </div>
        
        <Card className="relative z-10">
          <CardHeader>
            <CardTitle>Tendencias de Importación</CardTitle>
            <CardDescription>
              Valores CIF de los últimos 12 meses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Gráfico de importaciones</p>
                <p className="text-sm">Datos disponibles próximamente</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative z-10">
          <CardHeader>
            <CardTitle>Top Proveedores</CardTitle>
            <CardDescription>
              Tus principales socios comerciales este mes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Proveedor Internacional S.A.", country: "China", value: "$125K" },
                { name: "Global Supplies Co.", country: "Estados Unidos", value: "$98K" },
                { name: "European Trading Ltd.", country: "Alemania", value: "$76K" },
                { name: "Asian Commerce Inc.", country: "Corea del Sur", value: "$54K" },
              ].map((supplier, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{supplier.name}</p>
                    <p className="text-xs text-gray-500">{supplier.country}</p>
                  </div>
                  <div className="text-sm font-medium">{supplier.value}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}