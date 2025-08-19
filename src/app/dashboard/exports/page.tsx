import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, TrendingDown, TrendingUp, Package } from "lucide-react"

export default async function ExportsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <div>Please sign in to access this page.</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Globe className="h-6 w-6 text-brand-navy" />
          Análisis de Exportaciones
        </h1>
        <p className="text-gray-600 mt-1">
          Analiza datos de exportación y tendencias del mercado internacional
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exportaciones Totales</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                -3.2% vs mes anterior
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor FOB Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.8M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +5.4% vs mes anterior
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Países Destino</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Mercados internacionales activos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos Exportados</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <p className="text-xs text-muted-foreground">
              Diferentes líneas de productos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Principales Destinos</CardTitle>
            <CardDescription>
              Países con mayor volumen de exportación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">🇺🇸 Estados Unidos</span>
                <span className="text-sm text-gray-600">$456K</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">🇲🇽 México</span>
                <span className="text-sm text-gray-600">$234K</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">🇧🇷 Brasil</span>
                <span className="text-sm text-gray-600">$189K</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productos Principales</CardTitle>
            <CardDescription>
              Categorías de productos más exportados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Textiles</span>
                <span className="text-sm text-gray-600">34%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Alimentos Procesados</span>
                <span className="text-sm text-gray-600">28%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Manufacturas</span>
                <span className="text-sm text-gray-600">22%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}