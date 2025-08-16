"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSafeDate } from "@/lib/client-utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  TrendingUp,
  Building,
  Globe,
  Star,
  Package,
  Calendar,
} from "lucide-react"

interface Supplier {
  id: string
  name: string
  country: string
  city?: string
  products: string[]
  totalImports: number
  avgPrice: number
  lastImport: string
  reliability: number
  topImporters: string[]
}

// Mock data - in production this would come from your Aduanas database
const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "Global Electronics Manufacturing Co.",
    country: "China",
    city: "Shenzhen",
    products: ["Componentes electrónicos", "Semiconductores", "Circuitos integrados"],
    totalImports: 1250000,
    avgPrice: 45.50,
    lastImport: "2024-01-15",
    reliability: 4.8,
    topImporters: ["Tech Solutions SAS", "Digital Components Ltda", "Electronics Import Co"]
  },
  {
    id: "2",
    name: "European Textile Industries",
    country: "Italia",
    city: "Milano",
    products: ["Telas premium", "Materiales sintéticos", "Accesorios textiles"],
    totalImports: 890000,
    avgPrice: 28.75,
    lastImport: "2024-01-20",
    reliability: 4.6,
    topImporters: ["Fashion Import SAS", "Textiles Premium Ltda", "Moda Internacional"]
  },
  {
    id: "3",
    name: "American Steel Corp",
    country: "Estados Unidos",
    city: "Pittsburgh",
    products: ["Acero inoxidable", "Aleaciones especiales", "Productos metalúrgicos"],
    totalImports: 2100000,
    avgPrice: 125.00,
    lastImport: "2024-01-22",
    reliability: 4.9,
    topImporters: ["Aceros Colombia SAS", "Metalúrgica Nacional", "Steel Import Co"]
  },
  {
    id: "4",
    name: "Asian Food Exports Ltd",
    country: "Tailandia",
    city: "Bangkok",
    products: ["Ingredientes asiáticos", "Especias", "Conservas"],
    totalImports: 450000,
    avgPrice: 15.25,
    lastImport: "2024-01-18",
    reliability: 4.4,
    topImporters: ["Alimentos Asia SAS", "Import Food Colombia", "Gourmet Ingredients"]
  },
]

// Component to safely render date without hydration mismatch
function SafeDateDisplay({ date }: { date: string }) {
  const formattedDate = useSafeDate(date)
  return <span>{formattedDate || "Cargando..."}</span>
}

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers)
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>(mockSuppliers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState("all")
  const [sortBy, setSortBy] = useState("totalImports")
  const [loading, setLoading] = useState(false)

  const countries = ["all", ...Array.from(new Set(suppliers.map(s => s.country)))]
  const products = ["all", ...Array.from(new Set(suppliers.flatMap(s => s.products)))]

  useEffect(() => {
    filterAndSortSuppliers()
  }, [searchTerm, selectedCountry, selectedProduct, sortBy, suppliers])

  const filterAndSortSuppliers = () => {
    const filtered = suppliers.filter(supplier => {
      const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           supplier.products.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCountry = selectedCountry === "all" || supplier.country === selectedCountry
      const matchesProduct = selectedProduct === "all" || supplier.products.includes(selectedProduct)
      
      return matchesSearch && matchesCountry && matchesProduct
    })

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "totalImports":
          return b.totalImports - a.totalImports
        case "avgPrice":
          return a.avgPrice - b.avgPrice
        case "reliability":
          return b.reliability - a.reliability
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    setFilteredSuppliers(filtered)
  }

  const handleSearch = async () => {
    setLoading(true)
    // In production, this would call your API
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const formatCurrency = (amount: number) => {
    // Use a simple format to avoid hydration issues
    return `$${amount.toLocaleString('es-CO')}`
  }

  const formatPrice = (price: number) => {
    // Use a simple format to avoid hydration issues
    return `$${price.toFixed(2)}`
  }

  const getReliabilityColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-600"
    if (rating >= 4.0) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Descubrimiento de Proveedores</h1>
        <p className="text-gray-700">
          Encuentra y analiza proveedores internacionales basado en datos reales de importación
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Búsqueda Avanzada
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Buscar proveedor o producto</Label>
              <Input
                id="search"
                placeholder="Ej: componentes electrónicos"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">País</Label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los países" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>
                      {country === "all" ? "Todos los países" : country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product">Producto</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los productos" />
                </SelectTrigger>
                <SelectContent>
                  {products.map(product => (
                    <SelectItem key={product} value={product}>
                      {product === "all" ? "Todos los productos" : product}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort">Ordenar por</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="totalImports">Volumen total</SelectItem>
                  <SelectItem value="avgPrice">Precio promedio</SelectItem>
                  <SelectItem value="reliability">Confiabilidad</SelectItem>
                  <SelectItem value="name">Nombre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleSearch} disabled={loading} className="w-full md:w-auto">
            {loading ? "Buscando..." : "Buscar Proveedores"}
          </Button>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-700">
          {filteredSuppliers.length} proveedores encontrados
        </p>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filtros activos:</span>
          {searchTerm && <Badge variant="secondary">Búsqueda: {searchTerm}</Badge>}
          {selectedCountry !== "all" && <Badge variant="secondary">País: {selectedCountry}</Badge>}
          {selectedProduct !== "all" && <Badge variant="secondary">Producto: {selectedProduct}</Badge>}
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{supplier.name}</CardTitle>
                  <div className="flex items-center text-sm text-gray-700">
                    <MapPin className="w-4 h-4 mr-1" />
                    {supplier.city ? `${supplier.city}, ${supplier.country}` : supplier.country}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`flex items-center ${getReliabilityColor(supplier.reliability)}`}>
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    <span className="font-medium">{supplier.reliability}</span>
                  </div>
                  <p className="text-xs text-gray-700">Confiabilidad</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Products */}
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <Package className="w-4 h-4 mr-1" />
                  Productos principales
                </h4>
                <div className="flex flex-wrap gap-1">
                  {supplier.products.slice(0, 3).map((product, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {product}
                    </Badge>
                  ))}
                  {supplier.products.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{supplier.products.length - 3} más
                    </Badge>
                  )}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                    <span className="font-medium">Volumen total</span>
                  </div>
                  <p className="text-lg font-bold">{formatCurrency(supplier.totalImports)}</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <TrendingUp className="w-4 h-4 mr-1 text-blue-600" />
                    <span className="font-medium">Precio promedio</span>
                  </div>
                  <p className="text-lg font-bold">{formatPrice(supplier.avgPrice)}</p>
                </div>
              </div>

              {/* Last Import */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-4 h-4 mr-1" />
                  Última importación: <SafeDateDisplay date={supplier.lastImport} />
                </div>
              </div>

              {/* Top Importers */}
              <div>
                <h5 className="text-xs font-medium text-gray-700 mb-1">
                  Principales importadores colombianos:
                </h5>
                <p className="text-sm">{supplier.topImporters.slice(0, 2).join(", ")}</p>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button size="sm" className="flex-1">
                  Ver Detalles
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Contactar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredSuppliers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="w-12 h-12 mx-auto text-gray-700 mb-4" />
            <h3 className="text-lg font-medium mb-2">No se encontraron proveedores</h3>
            <p className="text-gray-700 mb-4">
              Intenta ajustar tus filtros de búsqueda o usar términos más generales
            </p>
            <Button onClick={() => {
              setSearchTerm("")
              setSelectedCountry("all")
              setSelectedProduct("all")
            }}>
              Limpiar filtros
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}