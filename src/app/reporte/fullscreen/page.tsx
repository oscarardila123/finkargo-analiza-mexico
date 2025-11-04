import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import StreamlitReportViewer from "@/components/dashboard/StreamlitReportViewer"

export const metadata = {
  title: "Mi Reporte de Analiza - Pantalla Completa | Finkargo",
  description: "Visualiza tu reporte personalizado de inteligencia comercial en pantalla completa",
}

export default async function ReporteFullscreenPage() {
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

  if (!hasAccess) {
    redirect("/dashboard/mi-reporte")
  }

  // Registrar actividad
  await prisma.userActivity.create({
    data: {
      userId: user.id,
      action: "VIEW_STREAMLIT_REPORT_FULLSCREEN",
      resource: "mi-reporte-fullscreen",
      metadata: {
        userEmail: user.email,
        isAdmin,
        subscriptionStatus: subscription?.status || "none",
        subscriptionPlan: subscription?.plan || "none",
      },
    },
  })

  return (
    <div className="w-full h-screen bg-white">
      <StreamlitReportViewer
        email={user.email}
        isAdmin={isAdmin}
        reportType="imports"
      />
    </div>
  )
}
