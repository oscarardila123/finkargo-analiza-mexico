"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSafeDate } from "@/lib/client-utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  TrendingUp,
  TrendingDown,
  Building,
  DollarSign,
  Globe,
  Users,
  Target,
  BarChart3,
  AlertTriangle,
} from "lucide-react"

interface Competitor {
  id: string
  name: string
  nit: string
  marketShare: number
  totalImports: number
  avgMonthlyImports: number
  topSuppliers: string[]
  topProducts: string[]
  growthRate: number
  riskLevel: 'low' | 'medium' | 'high'
  lastActivity: string
}

const mockCompetitors: Competitor[] = [
  {
    id: "1",
    name: "LDR SOLUTIONS SA DE CV",
    nit: "LDR980615-MX3",
    marketShare: 18.5,
    totalImports: 2450000,
    avgMonthlyImports: 204000,
    topSuppliers: ["Mercedes-Benz", "BMW Group", "Volkswagen AG"],
    topProducts: ["Vehículos", "Repuestos automotrices", "Componentes mecánicos"],
    growthRate: 12.5,
    riskLevel: 'high',
    lastActivity: "2024-01-22"
  },
  {
    id: "2",
    name: "NISSAN MEXICANA SA DE CV",
    nit: "NIS840722-MX7",
    marketShare: 15.2,
    totalImports: 1890000,
    avgMonthlyImports: 157500,
    topSuppliers: ["Nissan Motor Co", "Renault Group", "Infiniti"],
    topProducts: ["Vehículos de pasajeros", "Repuestos Nissan", "Componentes automotrices"],
    growthRate: 8.7,
    riskLevel: 'medium',
    lastActivity: "2024-01-20"
  },
  {
    id: "3",
    name: "MAQUINARIA INTERTORITO",
    nit: "MIT950310-MX2",
    marketShare: 12.8,
    totalImports: 1650000,
    avgMonthlyImports: 137500,
    topSuppliers: ["Industrial Equipment Ltd", "Machinery Corp", "Tech Solutions Inc"],
    topProducts: ["Maquinaria industrial", "Equipos técnicos", "Componentes especializados"],
    growthRate: -3.2,
    riskLevel: 'low',
    lastActivity: "2024-01-18"
  },
  {
    id: "4",
    name: "SERVICIOS LOGÍSTICOS DYLO",
    nit: "SLD070420-MX9",
    marketShare: 10.3,
    totalImports: 1320000,
    avgMonthlyImports: 110000,
    topSuppliers: ["Global Logistics Partners", "Asian Freight Solutions", "European Transport Co"],
    topProducts: ["Servicios logísticos", "Equipos de almacenaje", "Sistemas de transporte"],
    growthRate: 22.1,
    riskLevel: 'high',
    lastActivity: "2024-01-25"
  },
]

// Component to safely render date without hydration mismatch
function SafeDateDisplay({ date }: { date: string }) {
  const formattedDate = useSafeDate(date)
  return <span>{formattedDate || "Cargando..."}</span>
}

export default function CompetitorsPage() {
  const [competitors, setCompetitors] = useState<Competitor[]>(mockCompetitors)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null)

  const formatCurrency = (amount: number) => {
    // Use a simple format to avoid hydration issues
    return `$${amount.toLocaleString('es-CO')}`
  }

  const getRiskBadge = (level: string) => {
    const config = {
      low: { label: 'Bajo', variant: 'default' as const, color: 'text-green-600' },
      medium: { label: 'Medio', variant: 'secondary' as const, color: 'text-yellow-600' },
      high: { label: 'Alto', variant: 'destructive' as const, color: 'text-red-600' }
    }
    const risk = config[level as keyof typeof config]
    return <Badge variant={risk.variant}>{risk.label}</Badge>
  }

  const getTrendIcon = (growth: number) => {
    return growth > 0 ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    )
  }

  const getTrendColor = (growth: number) => {
    return growth > 0 ? "text-green-600" : "text-red-600"
  }

  const filteredCompetitors = competitors.filter(competitor =>
    competitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    competitor.nit.includes(searchTerm)
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Análisis de Competidores</h1>
        <p className="text-gray-700">
          Monitorea y analiza la actividad de importación de tus competidores directos
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Buscar Competidores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Input
              placeholder="Buscar por nombre de empresa o NIT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button>Buscar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Competidores</CardTitle>
            <Building className="h-4 w-4 text-gray-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{competitors.length}</div>
            <p className="text-xs text-gray-700">En tu sector</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total Mercado</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$13.2M</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +9.8% vs trimestre anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tu Posición</CardTitle>
            <Target className="h-4 w-4 text-gray-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#2</div>
            <p className="text-xs text-gray-700">13.7% market share</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Competidores Activos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-gray-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {competitors.filter(c => c.riskLevel === 'high').length}
            </div>
            <p className="text-xs text-red-600">Riesgo alto</p>
          </CardContent>
        </Card>
      </div>

      {/* Competitors List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCompetitors.map((competitor) => (
          <Card key={competitor.id} className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedCompetitor(competitor)}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{competitor.name}</CardTitle>
                  <p className="text-sm text-gray-700">NIT: {competitor.nit}</p>
                </div>
                <div className="text-right space-y-1">
                  {getRiskBadge(competitor.riskLevel)}
                  <p className="text-xs text-gray-700">Riesgo competitivo</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Market Share */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Participación de mercado</span>
                  <span className="text-sm font-bold">{competitor.marketShare}%</span>
                </div>
                <Progress value={competitor.marketShare} className="h-2" />
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-700">Importaciones totales</p>
                  <p className="font-medium">{formatCurrency(competitor.totalImports)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-700">Promedio mensual</p>
                  <p className="font-medium">{formatCurrency(competitor.avgMonthlyImports)}</p>
                </div>
              </div>

              {/* Growth */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Crecimiento</span>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(competitor.growthRate)}
                  <span className={`text-sm font-medium ${getTrendColor(competitor.growthRate)}`}>
                    {competitor.growthRate > 0 ? '+' : ''}{competitor.growthRate}%
                  </span>
                </div>
              </div>

              {/* Top Products */}
              <div>
                <p className="text-sm font-medium mb-2">Productos principales</p>
                <div className="flex flex-wrap gap-1">
                  {competitor.topProducts.slice(0, 2).map((product, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {product}
                    </Badge>
                  ))}
                  {competitor.topProducts.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{competitor.topProducts.length - 2} más
                    </Badge>
                  )}
                </div>
              </div>

              {/* Last Activity */}
              <div className="flex items-center justify-between text-xs text-gray-700 border-t pt-2">
                <span>Última actividad: <SafeDateDisplay date={competitor.lastActivity} /></span>
                <Button size="sm" variant="ghost">Ver detalles</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Analysis Modal/Panel */}
      {selectedCompetitor && (
        <Card className="border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Análisis Detallado: {selectedCompetitor.name}</CardTitle>
              <Button variant="outline" onClick={() => setSelectedCompetitor(null)}>
                Cerrar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Resumen</TabsTrigger>
                <TabsTrigger value="suppliers">Proveedores</TabsTrigger>
                <TabsTrigger value="products">Productos</TabsTrigger>
                <TabsTrigger value="trends">Tendencias</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="text-lg font-bold">{selectedCompetitor.marketShare}%</h4>
                    <p className="text-sm text-gray-700">Market Share</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="text-lg font-bold">{formatCurrency(selectedCompetitor.totalImports)}</h4>
                    <p className="text-sm text-gray-700">Importaciones Totales</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className={`text-lg font-bold ${getTrendColor(selectedCompetitor.growthRate)}`}>
                      {selectedCompetitor.growthRate > 0 ? '+' : ''}{selectedCompetitor.growthRate}%
                    </h4>
                    <p className="text-sm text-gray-700">Crecimiento</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="suppliers" className="space-y-4">
                <h4 className="font-medium">Principales Proveedores</h4>
                <div className="space-y-2">
                  {selectedCompetitor.topSuppliers.map((supplier, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <span>{supplier}</span>
                      <Badge variant="secondary">#{index + 1}</Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="products" className="space-y-4">
                <h4 className="font-medium">Productos Principales</h4>
                <div className="space-y-2">
                  {selectedCompetitor.topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <span>{product}</span>
                      <Badge variant="outline">Top {index + 1}</Badge>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="trends" className="space-y-4">
                <div className="text-center py-8 text-gray-700">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Análisis de tendencias disponible próximamente</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* No Results */}
      {filteredCompetitors.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="w-12 h-12 mx-auto text-gray-700 mb-4" />
            <h3 className="text-lg font-medium mb-2">No se encontraron competidores</h3>
            <p className="text-gray-700 mb-4">
              Intenta usar términos de búsqueda más generales
            </p>
            <Button onClick={() => setSearchTerm("")}>
              Limpiar búsqueda
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}