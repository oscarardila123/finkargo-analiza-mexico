import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Edit, Save, MapPin, Phone, Mail, Globe } from "lucide-react"

export default async function CompanyPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <div>Please sign in to access this page.</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-brand-navy" />
          Mi Empresa
        </h1>
        <p className="text-gray-600 mt-1">
          Gestiona la información y configuración de tu empresa
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Información de la Empresa
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </CardTitle>
            <CardDescription>
              Datos básicos de tu organización
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Nombre de la Empresa</label>
              <p className="text-sm text-gray-900 mt-1">Oscar's Company</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">NIT</label>
              <p className="text-sm text-gray-900 mt-1">901176641</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Tipo de Industria</label>
              <p className="text-sm text-gray-900 mt-1">Textil</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Tamaño de Empresa</label>
              <p className="text-sm text-gray-900 mt-1">Mediana ($100K - $1M USD)</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Información de Contacto
              <Button size="sm" variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
            </CardTitle>
            <CardDescription>
              Datos de contacto y ubicación
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-sm text-gray-900">alejo1@hotmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <div>
                <label className="text-sm font-medium text-gray-700">Teléfono</label>
                <p className="text-sm text-gray-900">3166666666</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <div>
                <label className="text-sm font-medium text-gray-700">Dirección</label>
                <p className="text-sm text-gray-900">Falsa 123, Neiva</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <div>
                <label className="text-sm font-medium text-gray-700">País</label>
                <p className="text-sm text-gray-900">Colombia</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Info */}
        <Card>
          <CardHeader>
            <CardTitle>Información de Suscripción</CardTitle>
            <CardDescription>
              Estado actual de tu plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Plan Actual</label>
              <p className="text-sm text-gray-900 mt-1">Plan Básico - Prueba</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Estado</label>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                Activo
              </span>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Reportes Utilizados</label>
              <p className="text-sm text-gray-900 mt-1">0 de 10</p>
            </div>
            <Button className="w-full">
              Actualizar Plan
            </Button>
          </CardContent>
        </Card>

        {/* Import Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Estadísticas de Comercio</CardTitle>
            <CardDescription>
              Resumen de tu actividad comercial
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">Volumen Anual de Importación</span>
              <span className="text-sm text-gray-900">$500,000 USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">Reportes Generados</span>
              <span className="text-sm text-gray-900">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">Fecha de Registro</span>
              <span className="text-sm text-gray-900">Hace 2 horas</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}