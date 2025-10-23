'use client'

import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  DollarSign,
  FileText,
  Calendar,
  Award,
  Activity,
  CreditCard
} from 'lucide-react'

interface Analytics {
  overview: {
    totalCompanies: number
    activeCompanies: number
    totalUsers: number
    activeUsers: number
    totalSubscriptions: number
    activeSubscriptions: number
    trialSubscriptions: number
    totalPayments: number
    completedPayments: number
    totalReports: number
    totalRevenue: number
    periodRevenue: number
    mrr: number
    conversionRate: number
    churnRate: number
    paymentSuccessRate: number
    comceMembers: number
  }
  growth: {
    userGrowth: Array<{ date: string; count: number; cumulative: number }>
    companyGrowth: Array<{ date: string; count: number; cumulative: number }>
    revenueByDay: Array<{ date: string; amount: number; cumulative: number }>
  }
  distribution: {
    subscriptionsByPlan: Array<{ plan: string; count: number }>
    subscriptionsByStatus: Array<{ status: string; count: number }>
    companySizeDistribution: Array<{ size: string; count: number }>
  }
  topPerformers: {
    topCompaniesByUsers: Array<{
      id: string
      name: string
      email: string
      userCount: number
      reportCount: number
      paymentCount: number
      isComceMember: boolean
    }>
    topCompaniesByRevenue: Array<{
      id: string
      name: string
      email: string
      revenue: number
      userCount: number
      reportCount: number
    }>
  }
  reports: {
    reportsGenerated: Array<{ month: string; count: number }>
  }
  recentActivity: {
    recentUsers: any[]
    recentCompanies: any[]
    recentPayments: any[]
    recentReports: any[]
  }
}

const COLORS = ['#2563eb', '#06b6d4', '#8b5cf6', '#f97316', '#10b981', '#f59e0b']

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('30')

  useEffect(() => {
    loadAnalytics()
  }, [period])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/analytics?period=${period}`)

      if (!response.ok) {
        throw new Error('Error al cargar analíticas')
      }

      const data = await response.json()

      if (data.success) {
        setAnalytics(data.analytics)
      }
    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('es-CO', {
      month: 'short',
      day: 'numeric'
    }).format(date)
  }

  if (loading || !analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Avanzados</h1>
          <p className="text-gray-600 mt-2">
            Análisis completo del rendimiento de la plataforma
          </p>
        </div>
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="7">Últimos 7 días</option>
          <option value="30">Últimos 30 días</option>
          <option value="90">Últimos 90 días</option>
          <option value="365">Último año</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Ingresos Totales"
          value={formatCurrency(analytics.overview.totalRevenue)}
          subtitle={`${formatCurrency(analytics.overview.periodRevenue)} en el período`}
          icon={DollarSign}
          color="bg-green-100 text-green-600"
        />
        <MetricCard
          title="MRR"
          value={formatCurrency(analytics.overview.mrr)}
          subtitle="Monthly Recurring Revenue"
          icon={TrendingUp}
          color="bg-blue-100 text-blue-600"
        />
        <MetricCard
          title="Empresas Activas"
          value={analytics.overview.activeCompanies}
          subtitle={`${analytics.overview.totalCompanies} total`}
          icon={Building2}
          color="bg-purple-100 text-purple-600"
        />
        <MetricCard
          title="Usuarios Activos"
          value={analytics.overview.activeUsers}
          subtitle={`${analytics.overview.totalUsers} total`}
          icon={Users}
          color="bg-orange-100 text-orange-600"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Tasa de Conversión"
          value={`${analytics.overview.conversionRate}%`}
          subtitle="Trial a Pago"
          icon={TrendingUp}
          color="bg-green-100 text-green-600"
        />
        <MetricCard
          title="Churn Rate"
          value={`${analytics.overview.churnRate}%`}
          subtitle="Últimos 30 días"
          icon={TrendingDown}
          color="bg-red-100 text-red-600"
        />
        <MetricCard
          title="Éxito de Pagos"
          value={`${analytics.overview.paymentSuccessRate}%`}
          subtitle={`${analytics.overview.completedPayments} completados`}
          icon={CreditCard}
          color="bg-blue-100 text-blue-600"
        />
        <MetricCard
          title="Reportes Generados"
          value={analytics.overview.totalReports}
          subtitle="Total en la plataforma"
          icon={FileText}
          color="bg-indigo-100 text-indigo-600"
        />
      </div>

      {/* Growth Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Crecimiento de Usuarios
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.growth.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatDate} />
              <YAxis />
              <Tooltip labelFormatter={formatDate} />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#2563eb"
                name="Nuevos"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="cumulative"
                stroke="#06b6d4"
                name="Acumulado"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Company Growth */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Crecimiento de Empresas
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.growth.companyGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatDate} />
              <YAxis />
              <Tooltip labelFormatter={formatDate} />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8b5cf6"
                name="Nuevas"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="cumulative"
                stroke="#f97316"
                name="Acumulado"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Growth */}
        <div className="bg-white rounded-lg shadow-sm border p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Ingresos por Día
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.growth.revenueByDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatDate} />
              <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
              <Tooltip
                labelFormatter={formatDate}
                formatter={(value: any) => formatCurrency(value)}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#10b981"
                name="Diario"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="cumulative"
                stroke="#f59e0b"
                name="Acumulado"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subscriptions by Plan */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Suscripciones por Plan
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={analytics.distribution.subscriptionsByPlan}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.plan}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {analytics.distribution.subscriptionsByPlan.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Subscriptions by Status */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Suscripciones por Estado
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics.distribution.subscriptionsByStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Company Size Distribution */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Tamaño de Empresas
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics.distribution.companySizeDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="size" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reports Generated */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Reportes Generados por Mes
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.reports.reportsGenerated}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#06b6d4" name="Reportes" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Companies by Users */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-blue-600" />
            Top Empresas por Usuarios
          </h2>
          <div className="space-y-3">
            {analytics.topPerformers.topCompaniesByUsers.slice(0, 5).map((company, index) => (
              <div
                key={company.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{company.name}</p>
                    <p className="text-sm text-gray-500">{company.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{company.userCount}</p>
                  <p className="text-xs text-gray-500">usuarios</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Companies by Revenue */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-green-600" />
            Top Empresas por Ingresos
          </h2>
          <div className="space-y-3">
            {analytics.topPerformers.topCompaniesByRevenue.slice(0, 5).map((company, index) => (
              <div
                key={company.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-green-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{company.name}</p>
                    <p className="text-sm text-gray-500">{company.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{formatCurrency(company.revenue)}</p>
                  <p className="text-xs text-gray-500">{company.userCount} usuarios</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-purple-600" />
            Usuarios Recientes
          </h2>
          <div className="space-y-3">
            {analytics.recentActivity.recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{user.name || user.email}</p>
                  <p className="text-sm text-gray-500">{user.company.name}</p>
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString('es-CO')}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-green-600" />
            Pagos Recientes
          </h2>
          <div className="space-y-3">
            {analytics.recentActivity.recentPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{payment.company.name}</p>
                  <p className="text-sm text-gray-500">
                    {payment.paidAt ? new Date(payment.paidAt).toLocaleDateString('es-CO') : '-'}
                  </p>
                </div>
                <p className="font-bold text-green-600">{formatCurrency(payment.amount)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: React.ElementType
  color: string
}

function MetricCard({ title, value, subtitle, icon: Icon, color }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  )
}
