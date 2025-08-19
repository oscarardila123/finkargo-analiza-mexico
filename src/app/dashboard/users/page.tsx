import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, Edit, Trash2, MoreHorizontal } from "lucide-react"

export default async function UsersPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <div>Please sign in to access this page.</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-6 w-6 text-brand-navy" />
            Usuarios
          </h1>
          <p className="text-gray-600 mt-1">
            Gestiona los usuarios de tu empresa
          </p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Invitar Usuario
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Usuario activo en la empresa
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administradores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Con acceso completo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Invitaciones Pendientes</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Esperando respuesta
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>
            Todos los usuarios de tu empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Current User */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-navy rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">OA</span>
                </div>
                <div>
                  <p className="font-medium">Oscar Alejandro Ardila Novoa</p>
                  <p className="text-sm text-gray-600">alejo1@hotmail.com</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Admin</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Activo</span>
                    <span className="text-xs text-gray-500">(Tú)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Empty State */}
            <div className="text-center py-8 text-gray-500">
              <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium mb-2">No hay más usuarios</p>
              <p className="text-sm mb-4">Invita a tu equipo para colaborar en los análisis</p>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Invitar Usuario
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Roles Info */}
      <Card>
        <CardHeader>
          <CardTitle>Roles de Usuario</CardTitle>
          <CardDescription>
            Comprende los diferentes niveles de acceso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">Admin</span>
              <div>
                <p className="text-sm font-medium">Administrador</p>
                <p className="text-xs text-gray-600">Acceso completo a todas las funciones</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-medium">Analyst</span>
              <div>
                <p className="text-sm font-medium">Analista</p>
                <p className="text-xs text-gray-600">Puede generar reportes y análisis</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded font-medium">Viewer</span>
              <div>
                <p className="text-sm font-medium">Visualizador</p>
                <p className="text-xs text-gray-600">Solo puede ver reportes existentes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}