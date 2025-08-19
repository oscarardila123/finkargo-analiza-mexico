import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Calendar, Filter } from "lucide-react"

export default async function ReportsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <div>Please sign in to access this page.</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="h-6 w-6 text-brand-navy" />
          Reportes
        </h1>
        <p className="text-gray-600 mt-1">
          Genera reportes personalizados de importaciones y exportaciones
        </p>
      </div>

      {/* Generate Report Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generar Nuevo Reporte
          </CardTitle>
          <CardDescription>
            Crea un reporte personalizado con los datos que necesitas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-sm">Reporte de Importaciones</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-sm">Reporte de Exportaciones</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <FileText className="h-6 w-6 mb-2" />
              <span className="text-sm">Análisis de Competidores</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Reportes Recientes</CardTitle>
          <CardDescription>
            Tus reportes generados recientemente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-brand-navy" />
                <div>
                  <p className="font-medium">Importaciones Q4 2024</p>
                  <p className="text-sm text-gray-600">Generado hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">Completado</span>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-brand-navy" />
                <div>
                  <p className="font-medium">Análisis de Competidores</p>
                  <p className="text-sm text-gray-600">Generado hace 4 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">Completado</span>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-brand-navy" />
                <div>
                  <p className="font-medium">Exportaciones Textiles</p>
                  <p className="text-sm text-gray-600">Generado ayer</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-yellow-600 bg-yellow-50 px-2 py-1 rounded">Procesando</span>
                <Button size="sm" variant="outline" disabled>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}