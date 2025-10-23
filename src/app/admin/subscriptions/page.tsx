'use client'

import { useEffect, useState } from 'react'
import { Search, Filter, Calendar, DollarSign, Users, TrendingUp, AlertCircle } from 'lucide-react'
import { Pagination } from '@/components/ui/pagination'

interface Subscription {
  id: string
  plan: 'BASIC' | 'PROFESSIONAL' | 'ENTERPRISE' | 'TRIMESTRAL' | 'SEMESTRAL' | 'ANUAL'
  status: 'TRIAL' | 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'INCOMPLETE'
  currentPeriodStart: string
  currentPeriodEnd: string
  trialEndsAt: string | null
  billingCycle: 'MONTHLY' | 'YEARLY'
  company: {
    id: string
    name: string
    email: string
    users: {
      id: string
      name: string
      email: string
      role: string
    }[]
  }
  payments: {
    id: string
    amount: number
    status: string
    createdAt: string
  }[]
}

interface PaginationData {
  total: number
  page: number
  limit: number
  totalPages: number
}

const planLabels = {
  BASIC: 'Básico',
  PROFESSIONAL: 'Profesional',
  ENTERPRISE: 'Empresarial',
  TRIMESTRAL: 'Trimestral',
  SEMESTRAL: 'Semestral',
  ANUAL: 'Anual'
}

const statusLabels = {
  TRIAL: 'Prueba',
  ACTIVE: 'Activa',
  PAST_DUE: 'Vencida',
  CANCELED: 'Cancelada',
  INCOMPLETE: 'Incompleta'
}

const statusColors = {
  TRIAL: 'bg-blue-100 text-blue-800',
  ACTIVE: 'bg-green-100 text-green-800',
  PAST_DUE: 'bg-red-100 text-red-800',
  CANCELED: 'bg-gray-100 text-gray-800',
  INCOMPLETE: 'bg-yellow-100 text-yellow-800'
}

export default function SubscriptionsManagement() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [planFilter, setPlanFilter] = useState<string>('all')
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1
  })

  // Load subscriptions when filters or pagination changes
  useEffect(() => {
    loadSubscriptions()
  }, [currentPage, itemsPerPage, searchTerm, statusFilter, planFilter])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter, planFilter])

  const loadSubscriptions = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchTerm,
        status: statusFilter,
        plan: planFilter
      })

      const response = await fetch(`/api/admin/subscriptions?${params}`)

      if (!response.ok) {
        throw new Error('Error al cargar suscripciones')
      }

      const data = await response.json()

      if (data.success && data.subscriptions) {
        setSubscriptions(data.subscriptions)
        setPagination(data.pagination)
      } else {
        console.error('Formato de respuesta inválido:', data)
        setSubscriptions([])
      }

      setLoading(false)
    } catch (error) {
      console.error('Error loading subscriptions:', error)
      setSubscriptions([])
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
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getDaysUntilExpiry = (endDate: string) => {
    const today = new Date()
    const expiryDate = new Date(endDate)
    const diffTime = expiryDate.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  // Removed client-side filtering - now handled by API
  const filteredSubscriptions = subscriptions

  // Helper function for display purposes
  const isExpiringSoon = (subscription: Subscription) => {
    if (subscription.status !== 'ACTIVE') return false
    const daysUntilExpiry = getDaysUntilExpiry(subscription.currentPeriodEnd)
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0
  }


  const getTotalRevenue = () => {
    return subscriptions.reduce((total, subscription) => {
      return total + subscription.payments.reduce((paymentTotal, payment) => {
        return payment.status === 'COMPLETED' ? paymentTotal + payment.amount : paymentTotal
      }, 0)
    }, 0)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Suscripciones</h1>
        <p className="text-gray-600 mt-2">
          Monitorea suscripciones activas, usage y facturación
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Suscripciones Activas</p>
              <p className="text-2xl font-bold text-green-600">
                {subscriptions.filter(s => s.status === 'ACTIVE').length}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En Periodo de Prueba</p>
              <p className="text-2xl font-bold text-blue-600">
                {subscriptions.filter(s => s.status === 'TRIAL').length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
              <p className="text-2xl font-bold text-purple-600">
                {subscriptions.reduce((total, s) => total + s.company.users.length, 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
              <p className="text-2xl font-bold text-yellow-600">
                {formatCurrency(getTotalRevenue())}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar por empresa o email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2">
            <Filter className="text-gray-400 w-4 h-4 hidden sm:block" />
            <select
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos los estados</option>
              <option value="TRIAL">Prueba</option>
              <option value="ACTIVE">Activa</option>
              <option value="PAST_DUE">Vencida</option>
              <option value="CANCELED">Cancelada</option>
              <option value="EXPIRING_SOON">Por vencer</option>
            </select>
            <select
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
            >
              <option value="all">Todos los planes</option>
              <option value="BASIC">Básico</option>
              <option value="TRIMESTRAL">Trimestral</option>
              <option value="SEMESTRAL">Semestral</option>
              <option value="ANUAL">Anual</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuarios
                </th>
                <th className="hidden lg:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vencimiento
                </th>
                <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Facturación
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscriptions.map((subscription) => (
                <tr key={subscription.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {subscription.company.name}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-[150px] sm:max-w-none">
                        {subscription.company.email}
                      </div>
                      {/* Mostrar info adicional en móvil */}
                      <div className="md:hidden mt-2 space-y-1">
                        <div className="text-xs text-gray-500">
                          {subscription.company.users.length} usuarios
                        </div>
                        {subscription.payments.length > 0 && (
                          <div className="text-xs font-medium text-gray-700">
                            {formatCurrency(subscription.payments[subscription.payments.length - 1].amount)}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                      {planLabels[subscription.plan]}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${statusColors[subscription.status]}`}>
                      {statusLabels[subscription.status]}
                    </span>
                  </td>
                  <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {subscription.company.users.length} usuarios
                  </td>
                  <td className="hidden lg:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {subscription.status === 'ACTIVE' && (
                      <>
                        <div>{formatDate(subscription.currentPeriodEnd)}</div>
                        <div className="text-xs text-gray-500">
                          {getDaysUntilExpiry(subscription.currentPeriodEnd)} días restantes
                        </div>
                      </>
                    )}
                    {subscription.status === 'TRIAL' && subscription.trialEndsAt && (
                      <div className="flex items-center space-x-1 text-xs text-amber-600">
                        <AlertCircle className="w-3 h-3" />
                        <span>Prueba hasta {formatDate(subscription.trialEndsAt)}</span>
                      </div>
                    )}
                  </td>
                  <td className="hidden sm:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {subscription.payments.length > 0 
                      ? formatCurrency(subscription.payments[subscription.payments.length - 1].amount)
                      : 'Sin pagos'
                    }
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => setSelectedSubscription(subscription)}
                      className="text-blue-600 hover:text-blue-900 text-xs sm:text-sm px-2 py-1 rounded bg-blue-50 hover:bg-blue-100"
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.total}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            showItemsPerPage={true}
          />
        )}
      </div>

      {/* Modal de detalles */}
      {selectedSubscription && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Detalles de Suscripción - {selectedSubscription.company.name}
              </h3>
              <button
                onClick={() => setSelectedSubscription(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Información de la empresa */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Información de la Empresa</h4>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Nombre:</span> {selectedSubscription.company.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedSubscription.company.email}</p>
                  </div>
                </div>

                {/* Plan y estado */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Plan y Estado</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Plan:</span>
                      <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                        {planLabels[selectedSubscription.plan]}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Estado:</span>
                      <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${statusColors[selectedSubscription.status]}`}>
                        {statusLabels[selectedSubscription.status]}
                      </span>
                    </div>
                    <p><span className="font-medium">Ciclo de facturación:</span> {selectedSubscription.billingCycle === 'MONTHLY' ? 'Mensual' : 'Anual'}</p>
                  </div>
                </div>

                {/* Fechas */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Fechas</h4>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Inicio del período:</span> {formatDate(selectedSubscription.currentPeriodStart)}</p>
                    <p><span className="font-medium">Fin del período:</span> {formatDate(selectedSubscription.currentPeriodEnd)}</p>
                    {selectedSubscription.trialEndsAt && (
                      <p><span className="font-medium">Fin de prueba:</span> {formatDate(selectedSubscription.trialEndsAt)}</p>
                    )}
                    {selectedSubscription.status === 'ACTIVE' && (
                      <p><span className="font-medium">Días restantes:</span> {getDaysUntilExpiry(selectedSubscription.currentPeriodEnd)}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Usuarios y pagos */}
              <div className="space-y-4">
                {/* Usuarios */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Usuarios ({selectedSubscription.company.users.length})</h4>
                  <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                    {selectedSubscription.company.users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          user.role === 'ADMIN' ? 'bg-red-100 text-red-700' :
                          user.role === 'ANALYST' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Historial de pagos */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Historial de Pagos</h4>
                  <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                    {selectedSubscription.payments.length > 0 ? (
                      selectedSubscription.payments.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{formatCurrency(payment.amount)}</p>
                            <p className="text-xs text-gray-500">{formatDate(payment.createdAt)}</p>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                            {payment.status}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No hay pagos registrados</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedSubscription(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredSubscriptions.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay suscripciones</h3>
          <p className="text-gray-500">No se encontraron suscripciones con los filtros aplicados.</p>
        </div>
      )}
    </div>
  )
}