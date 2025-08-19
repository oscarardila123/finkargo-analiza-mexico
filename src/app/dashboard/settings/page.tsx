import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, Bell, Shield, CreditCard, Download, Trash2, Save } from "lucide-react"

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <div>Please sign in to access this page.</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Settings className="h-6 w-6 text-brand-navy" />
          Configuración
        </h1>
        <p className="text-gray-600 mt-1">
          Administra las preferencias y configuración de tu cuenta
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Configuración de Cuenta
            </CardTitle>
            <CardDescription>
              Gestiona tu información personal y seguridad
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Nombre Completo</label>
              <p className="text-sm text-gray-900 mt-1">Oscar Alejandro Ardila Novoa</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <p className="text-sm text-gray-900 mt-1">alejo1@hotmail.com</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Rol</label>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                Administrador
              </span>
            </div>
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full">
                Cambiar Contraseña
              </Button>
              <Button variant="outline" className="w-full">
                Actualizar Perfil
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificaciones
            </CardTitle>
            <CardDescription>
              Configura cómo y cuándo recibir notificaciones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Reportes Completados</p>
                <p className="text-xs text-gray-600">Notificar cuando un reporte esté listo</p>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Nuevos Datos Disponibles</p>
                <p className="text-xs text-gray-600">Alertas sobre actualizaciones de datos</p>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Resumen Semanal</p>
                <p className="text-xs text-gray-600">Recibir resumen de actividad semanal</p>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Notificaciones de Marketing</p>
                <p className="text-xs text-gray-600">Ofertas especiales y actualizaciones</p>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
            <Button className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Guardar Preferencias
            </Button>
          </CardContent>
        </Card>

        {/* Subscription Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Suscripción y Facturación
            </CardTitle>
            <CardDescription>
              Administra tu plan y métodos de pago
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Plan Actual</label>
              <p className="text-sm text-gray-900 mt-1">Plan Básico - Prueba Gratuita</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Reportes Disponibles</label>
              <p className="text-sm text-gray-900 mt-1">10 de 10 restantes</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Próxima Facturación</label>
              <p className="text-sm text-gray-900 mt-1">30 días restantes de prueba</p>
            </div>
            <div className="pt-4 space-y-2">
              <Button className="w-full">
                Actualizar Plan
              </Button>
              <Button variant="outline" className="w-full">
                Administrar Facturación
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Gestión de Datos
            </CardTitle>
            <CardDescription>
              Exporta o elimina tus datos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Exportar Datos</p>
              <p className="text-xs text-gray-600 mb-4">
                Descarga todos tus datos en formato JSON
              </p>
              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Exportar Datos
              </Button>
            </div>
            <div className="border-t pt-4">
              <p className="text-sm font-medium text-red-700 mb-2">Zona de Peligro</p>
              <p className="text-xs text-gray-600 mb-4">
                Eliminar permanentemente tu cuenta y todos los datos asociados
              </p>
              <Button variant="destructive" className="w-full">
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar Cuenta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}