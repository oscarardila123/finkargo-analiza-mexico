'use client'

import { useEffect, useState } from 'react'
import { Search, Filter, Building2, Users, CreditCard, TrendingUp, Eye, Ban, Edit3, FileText } from 'lucide-react'
import { Pagination } from '@/components/ui/pagination'

interface Company {
  id: string
  name: string
  email: string
  nit: string | null
  address: string | null
  city: string | null
  country: string
  phone: string | null
  website: string | null
  industryType: string | null
  companySize: 'SMALL' | 'MEDIUM' | 'LARGE'
  annualImportValue: number | null
  isActive: boolean
  isComceMember: boolean
  comceMemberNumber: string | null
  createdAt: string
  updatedAt: string
  users: {
    id: string
    name: string
    email: string
    role: string
    isActive: boolean
    lastLoginAt: string | null
  }[]
  subscription: {
    id: string
    plan: string
    status: string
    currentPeriodEnd: string
    billingCycle: string
  } | null
  stats: {
    totalUsers: number
    totalPayments: number
    totalReports: number
  }
}

interface PaginationData {
  total: number
  page: number
  limit: number
  totalPages: number
}

const companySizeLabels = {
  SMALL: 'Pequeña',
  MEDIUM: 'Mediana',
  LARGE: 'Grande'
}

export default function CompaniesManagement() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [comceFilter, setComceFilter] = useState<string>('all')
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1
  })

  // Load companies when filters or pagination changes
  useEffect(() => {
    loadCompanies()
  }, [currentPage, itemsPerPage, searchTerm, statusFilter, comceFilter])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter, comceFilter])

  const loadCompanies = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchTerm,
        status: statusFilter,
        comce: comceFilter
      })

      const response = await fetch(`/api/admin/companies?${params}`)

      if (!response.ok) {
        throw new Error('Error al cargar empresas')
      }

      const data = await response.json()

      if (data.success && data.companies) {
        setCompanies(data.companies)
        setPagination(data.pagination)
      } else {
        console.error('Formato de respuesta inválido:', data)
        setCompanies([])
      }

      setLoading(false)
    } catch (error) {
      console.error('Error loading companies:', error)
      setCompanies([])
      setLoading(false)
    }
  }

  const handleToggleStatus = async (companyId: string, currentStatus: boolean) => {
    try {
      const response = await fetch('/api/admin/companies', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyId,
          isActive: !currentStatus
        })
      })

      if (!response.ok) {
        throw new Error('Error al cambiar estado')
      }

      const data = await response.json()

      if (data.success) {
        // Actualizar el estado local
        setCompanies(prev => prev.map(company =>
          company.id === companyId ? { ...company, isActive: !company.isActive } : company
        ))
      }
    } catch (error) {
      console.error('Error toggling company status:', error)
      alert('Error al cambiar el estado de la empresa')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number | null) => {
    if (!amount) return '-'
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0
    }).format(amount)
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
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Empresas</h1>
        <p className="text-gray-600 mt-2">
          Administra empresas registradas en la plataforma
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Empresas</p>
              <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
            </div>
            <Building2 className="w-10 h-10 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Empresas Activas</p>
              <p className="text-2xl font-bold text-green-600">
                {companies.filter(c => c.isActive).length}
              </p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Miembros COMCE</p>
              <p className="text-2xl font-bold text-purple-600">
                {companies.filter(c => c.isComceMember).length}
              </p>
            </div>
            <CreditCard className="w-10 h-10 text-purple-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Usuarios</p>
              <p className="text-2xl font-bold text-gray-900">
                {companies.reduce((sum, c) => sum + c.stats.totalUsers, 0)}
              </p>
            </div>
            <Users className="w-10 h-10 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar empresas por nombre, email o NIT..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 w-4 h-4" />
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activas</option>
              <option value="inactive">Inactivas</option>
            </select>

            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={comceFilter}
              onChange={(e) => setComceFilter(e.target.value)}
            >
              <option value="all">Membresía COMCE</option>
              <option value="member">Miembros</option>
              <option value="non-member">No miembros</option>
            </select>
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Empresas ({pagination.total})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NIT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuarios
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Suscripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  COMCE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{company.name}</div>
                      <div className="text-sm text-gray-500">{company.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {company.nit || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {company.stats.totalUsers} usuarios
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {company.subscription ? (
                      <div>
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          {company.subscription.plan}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">Sin suscripción</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      company.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {company.isActive ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {company.isComceMember ? (
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                        Miembro
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedCompany(company)
                          setShowDetailModal(true)
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(company.id, company.isActive)}
                        className={company.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                        title={company.isActive ? 'Desactivar empresa' : 'Activar empresa'}
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
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

      {/* Detail Modal */}
      {showDetailModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Detalles de Empresa - {selectedCompany.name}
                </h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Company Info */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Información General</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Nombre</p>
                    <p className="text-sm font-medium">{selectedCompany.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-sm font-medium">{selectedCompany.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">NIT</p>
                    <p className="text-sm font-medium">{selectedCompany.nit || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Teléfono</p>
                    <p className="text-sm font-medium">{selectedCompany.phone || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ciudad</p>
                    <p className="text-sm font-medium">{selectedCompany.city || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">País</p>
                    <p className="text-sm font-medium">{selectedCompany.country}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tamaño</p>
                    <p className="text-sm font-medium">{companySizeLabels[selectedCompany.companySize]}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fecha de registro</p>
                    <p className="text-sm font-medium">{formatDate(selectedCompany.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Users List */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">
                  Usuarios ({selectedCompany.users.length})
                </h4>
                <div className="space-y-2">
                  {selectedCompany.users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800">
                          {user.role}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subscription Info */}
              {selectedCompany.subscription && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Suscripción</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Plan</p>
                      <p className="text-sm font-medium">{selectedCompany.subscription.plan}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Estado</p>
                      <p className="text-sm font-medium">{selectedCompany.subscription.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ciclo de facturación</p>
                      <p className="text-sm font-medium">{selectedCompany.subscription.billingCycle}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fin del periodo</p>
                      <p className="text-sm font-medium">{formatDate(selectedCompany.subscription.currentPeriodEnd)}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Stats */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Estadísticas</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{selectedCompany.stats.totalUsers}</p>
                    <p className="text-xs text-gray-500">Usuarios</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{selectedCompany.stats.totalPayments}</p>
                    <p className="text-xs text-gray-500">Pagos</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{selectedCompany.stats.totalReports}</p>
                    <p className="text-xs text-gray-500">Reportes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t">
              <button
                onClick={() => setShowDetailModal(false)}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
