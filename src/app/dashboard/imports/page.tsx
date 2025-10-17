"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Package,
  Globe,
  DollarSign,
  Calendar,
  Filter,
  Download,
  Eye,
} from "lucide-react"

interface ImportData {
  id: string
  importerName: string
  supplierName: string
  supplierCountry: string
  productDescription: string
  tariffPosition: string
  cifValue: number
  fobValue: number
  quantity: number
  unit: string
  importDate: string
  year: number
  month: number
}

interface MarketAnalysis {
  topImporters: Array<{
    name: string
    value: number
    percentage: number
    trend: number
  }>
  topSuppliers: Array<{
    name: string
    country: string
    value: number
    percentage: number
  }>
  topProducts: Array<{
    description: string
    tariffPosition: string
    value: number
    percentage: number
  }>
  monthlyTrends: Array<{
    month: string
    value: number
    growth: number
  }>
}

// Mock data - in production this would come from verified sources
const mockMarketAnalysis: MarketAnalysis = {
  topImporters: [
    { name: "AVIANCA", value: 2450000, percentage: 15.2, trend: 12.5 },
    { name: "LDR SOLUTIONS SA DE CV", value: 1890000, percentage: 11.7, trend: -3.2 },
    { name: "NISSAN MEXICANA SA DE CV", value: 1650000, percentage: 10.3, trend: 8.7 },
    { name: "MAQUINARIA INTERTORITO", value: 1320000, percentage: 8.2, trend: 22.1 },
    { name: "SERVICIOS LOGÍSTICOS DYLO", value: 1180000, percentage: 7.3, trend: -5.1 },
  ],
  topSuppliers: [
    { name: "Shenzhen Electronics Co.", country: "China", value: 3200000, percentage: 19.8 },
    { name: "Asian Electronics Manufacturing", country: "Corea del Sur", value: 2850000, percentage: 17.6 },
    { name: "Taiwan Semiconductor", country: "Taiwán", value: 2100000, percentage: 13.0 },
    { name: "American Tech Solutions", country: "Estados Unidos", value: 1750000, percentage: 10.8 },
    { name: "German Industrial Components", country: "Alemania", value: 1450000, percentage: 9.0 },
  ],
  topProducts: [
    { description: "Componentes electrónicos", tariffPosition: "8542.31.00", value: 4200000, percentage: 26.0 },
    { description: "Semiconductores", tariffPosition: "8541.10.00", value: 3800000, percentage: 23.5 },
    { description: "Circuitos integrados", tariffPosition: "8542.32.00", value: 2900000, percentage: 18.0 },
    { description: "Microprocesadores", tariffPosition: "8542.33.00", value: 2100000, percentage: 13.0 },
    { description: "Memoria RAM", tariffPosition: "8542.34.00", value: 1800000, percentage: 11.1 },
  ],
  monthlyTrends: [
    { month: "Ene", value: 1200000, growth: 5.2 },
    { month: "Feb", value: 1350000, growth: 12.5 },
    { month: "Mar", value: 1280000, growth: -5.2 },
    { month: "Abr", value: 1420000, growth: 10.9 },
    { month: "May", value: 1580000, growth: 11.3 },
    { month: "Jun", value: 1650000, growth: 4.4 },
  ]
}

export default function ImportsPage() {
  const [marketData, setMarketData] = useState<MarketAnalysis>(mockMarketAnalysis)
  const [selectedPeriod, setSelectedPeriod] = useState("2024")
  const [selectedSector, setSelectedSector] = useState("electronics")
  const [loading, setLoading] = useState(false)

  const formatCurrency = (amount: number) => {
    // Use a simple format to avoid hydration issues
    return `$${amount.toLocaleString('es-CO')}`
  }

  const getTrendIcon = (trend: number) => {
    return trend > 0 ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    )
  }

  const getTrendColor = (trend: number) => {
    return trend > 0 ? "text-green-600" : "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Análisis de Importaciones</h1>
          <p className="text-gray-700">
            Inteligencia de mercado basada en datos verificados
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Generar Reporte
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filtros de Análisis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Período</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="last-12-months">Últimos 12 meses</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Sector</label>
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electrónicos</SelectItem>
                  <SelectItem value="textiles">Textiles</SelectItem>
                  <SelectItem value="machinery">Maquinaria</SelectItem>
                  <SelectItem value="chemicals">Químicos</SelectItem>
                  <SelectItem value="all">Todos los sectores</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">País de origen</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Todos los países" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los países</SelectItem>
                  <SelectItem value="china">China</SelectItem>
                  <SelectItem value="usa">Estados Unidos</SelectItem>
                  <SelectItem value="germany">Alemania</SelectItem>
                  <SelectItem value="korea">Corea del Sur</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total FOB</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$16.1M</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8.2% vs mes anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Importadores Activos</CardTitle>
            <Package className="h-4 w-4 text-gray-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5% vs mes anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Países de Origen</CardTitle>
            <Globe className="h-4 w-4 text-gray-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="w-3 h-3 mr-1" />
              -2.1% vs mes anterior
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posiciones Arancelarias</CardTitle>
            <BarChart3 className="h-4 w-4 text-gray-700" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5.4% vs mes anterior
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analysis Tabs */}
      <Tabs defaultValue="importers" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="importers">Top Importadores</TabsTrigger>
          <TabsTrigger value="suppliers">Top Proveedores</TabsTrigger>
          <TabsTrigger value="products">Top Productos</TabsTrigger>
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
        </TabsList>

        <TabsContent value="importers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Principales Importadores</CardTitle>
              <CardDescription>
                Empresas mexicanas con mayor volumen de importación en el sector seleccionado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketData.topImporters.map((importer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{importer.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-700">
                          <span>{formatCurrency(importer.value)}</span>
                          <span>{importer.percentage}% del total</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(importer.trend)}
                      <span className={`text-sm font-medium ${getTrendColor(importer.trend)}`}>
                        {importer.trend > 0 ? '+' : ''}{importer.trend}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Principales Proveedores Internacionales</CardTitle>
              <CardDescription>
                Empresas extranjeras con mayor volumen de exportación a México
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketData.topSuppliers.map((supplier, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-secondary">#{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{supplier.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-700">
                          <Badge variant="outline" className="text-xs">{supplier.country}</Badge>
                          <span>{formatCurrency(supplier.value)}</span>
                          <span>{supplier.percentage}% del total</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-24">
                      <Progress value={supplier.percentage} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Productos Más Importados</CardTitle>
              <CardDescription>
                Productos con mayor volumen de importación por valor FOB
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketData.topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Package className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{product.description}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-700">
                          <Badge variant="secondary" className="text-xs">{product.tariffPosition}</Badge>
                          <span>{formatCurrency(product.value)}</span>
                          <span>{product.percentage}% del total</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-24">
                      <Progress value={product.percentage} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendencias Mensuales</CardTitle>
              <CardDescription>
                Evolución del volumen de importaciones en los últimos 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketData.monthlyTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">{trend.month}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{formatCurrency(trend.value)}</h4>
                        <div className="flex items-center space-x-2 text-sm">
                          {getTrendIcon(trend.growth)}
                          <span className={getTrendColor(trend.growth)}>
                            {trend.growth > 0 ? '+' : ''}{trend.growth}% vs mes anterior
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-32">
                      <Progress value={Math.abs(trend.growth) * 2} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}