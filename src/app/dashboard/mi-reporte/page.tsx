import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import StreamlitReportViewer from "@/components/dashboard/StreamlitReportViewer"
import { BarChart3, Lock, Sparkles, TrendingUp, Database } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Mi Reporte de Analiza | Finkargo",
  description: "Visualiza tu reporte personalizado de inteligencia comercial",
}

export default async function MiReportePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect("/auth/signin")
  }

  // Obtener datos del usuario con su suscripción
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      company: {
        include: {
          subscription: true,
        },
      },
    },
  })

  if (!user) {
    redirect("/auth/signin")
  }

  const isAdmin = user.role === "ADMIN"
  const subscription = user.company.subscription

  // Verificar acceso: Admin o suscripción activa
  const hasAccess = isAdmin ||
    (subscription && subscription.status === "ACTIVE") ||
    (subscription && subscription.status === "TRIAL")

  // Registrar actividad
  if (hasAccess) {
    await prisma.userActivity.create({
      data: {
        userId: user.id,
        action: "VIEW_STREAMLIT_REPORT",
        resource: "mi-reporte",
        metadata: {
          userEmail: user.email,
          isAdmin,
          subscriptionStatus: subscription?.status || "none",
          subscriptionPlan: subscription?.plan || "none",
        },
      },
    })
  }

  // Si no tiene acceso, mostrar mensaje de suscripción requerida
  if (!hasAccess) {
    return (
      <div className="h-full bg-gradient-section relative overflow-hidden p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <div className="business-card-elevated border-l-4 border-l-yellow-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-100/50 to-transparent rounded-full blur-2xl"></div>

            <div className="p-8 relative z-10">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Lock className="h-8 w-8 text-white" />
                </div>
              </div>

              <h2 className="heading-lg text-gray-900 text-center mb-4">
                Suscripción Requerida
              </h2>

              <p className="body-md text-gray-700 text-center mb-6">
                Para acceder a tu reporte personalizado de Analiza, necesitas tener una suscripción activa.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-brand-cyan/5 to-transparent rounded-xl">
                  <div className="w-10 h-10 bg-brand-cyan/20 rounded-xl flex items-center justify-center">
                    <Database className="h-5 w-5 text-brand-navy" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Datos Oficiales</p>
                    <p className="text-xs text-gray-600">Información verificada de Aduanas</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-brand-coral/5 to-transparent rounded-xl">
                  <div className="w-10 h-10 bg-brand-coral/20 rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-brand-coral" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Análisis Avanzado</p>
                    <p className="text-xs text-gray-600">Insights accionables y competitivos</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-brand-navy/5 to-transparent rounded-xl">
                  <div className="w-10 h-10 bg-brand-navy/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-brand-navy" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Actualización 24/7</p>
                    <p className="text-xs text-gray-600">Datos siempre al día</p>
                  </div>
                </div>
              </div>

              <a
                href="/dashboard/subscription"
                className="block w-full px-6 py-4 bg-gradient-to-r from-brand-navy via-blue-600 to-brand-navy hover:from-brand-navy-dark hover:to-blue-700 text-white rounded-xl transition-all duration-300 text-center font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Ver Planes de Suscripción
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Renderizar el reporte
  return (
    <div className="min-h-screen bg-gradient-section relative p-6">
      {/* Hero Header */}
      <div className="text-center mb-6">
        <Badge className="mb-2 px-4 py-1 bg-gradient-to-r from-brand-coral/10 to-brand-cyan/10 text-brand-navy-dark border border-brand-navy/20 mx-auto text-xs">
          <BarChart3 className="inline h-3 w-3 mr-1" />
          {isAdmin ? "VISTA ADMINISTRATIVA - REPORTE DEMO" : "TU REPORTE PERSONALIZADO"}
        </Badge>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Mi Reporte de <span className="text-brand-navy">Analiza</span>
        </h1>
        <p className="text-sm text-gray-600">
          Visualiza tu reporte personalizado de inteligencia comercial
          {isAdmin && " • Mostrando reporte de demostración"}
        </p>
      </div>

      {/* Streamlit Report Viewer Card */}
      <div className="business-card-elevated p-4 relative">
        <div className="relative z-10">
          <StreamlitReportViewer
            email={user.email}
            isAdmin={isAdmin}
            reportType="imports" // O "exports" según sea necesario
          />
        </div>
      </div>
    </div>
  )
}
