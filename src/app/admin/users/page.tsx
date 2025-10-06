'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Search, Filter, MoreVertical, Shield, Eye, Edit3, Ban } from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'ANALYST' | 'VIEWER'
  isActive: boolean
  lastLoginAt: string | null
  createdAt: string
  company: {
    id: string
    name: string
  }
}

const roleLabels = {
  ADMIN: 'Administrador',
  ANALYST: 'Analista', 
  VIEWER: 'Visualizador'
}

const roleColors = {
  ADMIN: 'bg-red-100 text-red-800',
  ANALYST: 'bg-blue-100 text-blue-800',
  VIEWER: 'bg-gray-100 text-gray-800'
}

export default function UsersManagement() {
  const { data: session } = useSession()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showRoleModal, setShowRoleModal] = useState(false)

  // Verificar si el usuario actual puede gestionar roles
  const canManageUsers = session?.user?.email === 'oscaralejo06@hotmail.com' || session?.user?.role === 'ADMIN'

  useEffect(() => {
    if (!canManageUsers) {
      // Redirigir si no tiene permisos
      window.location.href = '/admin'
      return
    }
    loadUsers()
  }, [canManageUsers])

  const loadUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      
      if (!response.ok) {
        throw new Error('Error al cargar usuarios')
      }

      const data = await response.json()
      
      if (data.success && data.users) {
        // Mapear los usuarios para asegurar que la empresa tenga el formato correcto
        const mappedUsers = data.users.map((user: any) => ({
          ...user,
          company: user.company || {
            id: 'no-company',
            name: 'Sin empresa'
          }
        }))
        setUsers(mappedUsers)
      } else {
        console.error('Formato de respuesta inválido:', data)
        setUsers([])
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Error loading users:', error)
      setUsers([])
      setLoading(false)
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter

    return matchesSearch && matchesRole
  })

  const handleChangeRole = async (userId: string, newRole: 'ADMIN' | 'ANALYST' | 'VIEWER') => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          role: newRole
        })
      })

      if (!response.ok) {
        throw new Error('Error al cambiar rol')
      }

      const data = await response.json()
      
      if (data.success) {
        // Actualizar el estado local
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, role: newRole } : user
        ))
        
        setShowRoleModal(false)
        setSelectedUser(null)
      }
    } catch (error) {
      console.error('Error changing user role:', error)
      alert('Error al cambiar el rol del usuario')
    }
  }

  const handleToggleStatus = async (userId: string) => {
    try {
      const currentUser = users.find(u => u.id === userId)
      if (!currentUser) return

      const response = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          isActive: !currentUser.isActive
        })
      })

      if (!response.ok) {
        throw new Error('Error al cambiar estado')
      }

      const data = await response.json()
      
      if (data.success) {
        // Actualizar el estado local
        setUsers(prev => prev.map(user => 
          user.id === userId ? { ...user, isActive: !user.isActive } : user
        ))
      }
    } catch (error) {
      console.error('Error toggling user status:', error)
      alert('Error al cambiar el estado del usuario')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (!canManageUsers) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Acceso Denegado</h2>
          <p className="text-gray-600">No tienes permisos para gestionar usuarios.</p>
        </div>
      </div>
    )
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
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600 mt-2">
            Administra usuarios, roles y permisos del sistema
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <Shield className="w-3 h-3 mr-1" />
            Solo Administradores
          </span>
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
                placeholder="Buscar usuarios, empresas..."
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
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">Todos los roles</option>
              <option value="ADMIN">Administradores</option>
              <option value="ANALYST">Analistas</option>
              <option value="VIEWER">Visualizadores</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Usuarios ({filteredUsers.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Acceso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.company.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${roleColors[user.role]}`}>
                      {roleLabels[user.role]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      user.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLoginAt ? formatDate(user.lastLoginAt) : 'Nunca'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user)
                          setShowRoleModal(true)
                        }}
                        className="text-blue-600 hover:text-blue-900"
                        title="Cambiar rol"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className={user.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                        title={user.isActive ? 'Desactivar usuario' : 'Activar usuario'}
                      >
                        {user.isActive ? <Ban className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Change Modal */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Cambiar rol de {selectedUser.name}
            </h3>
            <div className="space-y-3 mb-6">
              {(['ADMIN', 'ANALYST', 'VIEWER'] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => handleChangeRole(selectedUser.id, role)}
                  className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${
                    selectedUser.role === role
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{roleLabels[role]}</div>
                  <div className="text-sm text-gray-500">
                    {role === 'ADMIN' && 'Acceso completo al sistema'}
                    {role === 'ANALYST' && 'Puede crear y gestionar reportes'}
                    {role === 'VIEWER' && 'Solo puede visualizar reportes'}
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowRoleModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}