'use client'

import { useEffect, useState } from 'react'
import { Save, Settings, Shield, Mail, CreditCard, Database, AlertCircle } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

interface SystemSettings {
  // General Settings
  siteName: string
  siteDescription: string | null
  maintenanceMode: boolean
  registrationEnabled: boolean

  // Authentication Settings
  requireEmailVerification: boolean
  minPasswordLength: number
  sessionTimeoutHours: number

  // Subscription Settings
  trialPeriodDays: number
  maxUsersPerCompany: number
  defaultReportsLimit: number

  // Payment Settings
  wompiSandboxMode: boolean
  paymentRetryAttempts: number

  // Email Settings
  emailProvider: string
  emailFromName: string
  emailFromAddress: string

  // Security Settings
  maxLoginAttempts: number
  lockoutDurationMinutes: number
}

export default function SystemSettings() {
  const [settings, setSettings] = useState<SystemSettings>({
    siteName: 'Finkargo Analiza',
    siteDescription: '',
    maintenanceMode: false,
    registrationEnabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    sessionTimeoutHours: 24,
    trialPeriodDays: 14,
    maxUsersPerCompany: 10,
    defaultReportsLimit: 5,
    wompiSandboxMode: true,
    paymentRetryAttempts: 3,
    emailProvider: 'resend',
    emailFromName: 'Finkargo Analiza',
    emailFromAddress: 'noreply@finkargo.com',
    maxLoginAttempts: 5,
    lockoutDurationMinutes: 15
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings')

      if (!response.ok) {
        throw new Error('Error al cargar configuración')
      }

      const data = await response.json()

      if (data.success && data.settings) {
        setSettings(data.settings)
      }

      setLoading(false)
    } catch (error) {
      console.error('Error loading settings:', error)
      setMessage({ type: 'error', text: 'Error al cargar la configuración' })
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings)
      })

      if (!response.ok) {
        throw new Error('Error al guardar configuración')
      }

      const data = await response.json()

      if (data.success) {
        setMessage({ type: 'success', text: 'Configuración guardada exitosamente' })
        setTimeout(() => setMessage(null), 3000)
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      setMessage({ type: 'error', text: 'Error al guardar la configuración' })
      setTimeout(() => setMessage(null), 3000)
    } finally {
      setSaving(false)
    }
  }

  const handleSettingChange = (key: keyof SystemSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
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
          <h1 className="text-3xl font-bold text-gray-900">Configuración del Sistema</h1>
          <p className="text-gray-600 mt-2">
            Administra la configuración general de la plataforma
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {saving ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          <div className="flex items-center">
            {message.type === 'success' ? (
              <div className="w-5 h-5 text-green-600 mr-2">✓</div>
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            )}
            {message.text}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Settings className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Configuración General</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Sitio
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={settings.siteName}
                onChange={(e) => handleSettingChange('siteName', e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                value={settings.siteDescription || ''}
                onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Modo Mantenimiento</label>
                <p className="text-xs text-gray-500">Bloquea el acceso a usuarios no administradores</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Registro Habilitado</label>
                <p className="text-xs text-gray-500">Permite nuevos registros de usuarios</p>
              </div>
              <Switch
                checked={settings.registrationEnabled}
                onCheckedChange={(checked) => handleSettingChange('registrationEnabled', checked)}
              />
            </div>
          </div>
        </div>

        {/* Authentication Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Autenticación</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Verificación de Email</label>
                <p className="text-xs text-gray-500">Requiere verificar email al registrarse</p>
              </div>
              <Switch
                checked={settings.requireEmailVerification}
                onCheckedChange={(checked) => handleSettingChange('requireEmailVerification', checked)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Longitud Mínima de Contraseña
              </label>
              <input
                type="number"
                min="6"
                max="20"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={settings.minPasswordLength}
                onChange={(e) => handleSettingChange('minPasswordLength', parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duración de Sesión (horas)
              </label>
              <input
                type="number"
                min="1"
                max="168"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={settings.sessionTimeoutHours}
                onChange={(e) => handleSettingChange('sessionTimeoutHours', parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Máximo Intentos de Login
              </label>
              <input
                type="number"
                min="3"
                max="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={settings.maxLoginAttempts}
                onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Subscription Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Database className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">Suscripciones</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Días de Periodo de Prueba
              </label>
              <input
                type="number"
                min="7"
                max="30"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={settings.trialPeriodDays}
                onChange={(e) => handleSettingChange('trialPeriodDays', parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Máximo Usuarios por Empresa
              </label>
              <input
                type="number"
                min="5"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={settings.maxUsersPerCompany}
                onChange={(e) => handleSettingChange('maxUsersPerCompany', parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Límite de Reportes (Prueba)
              </label>
              <input
                type="number"
                min="3"
                max="20"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={settings.defaultReportsLimit}
                onChange={(e) => handleSettingChange('defaultReportsLimit', parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <CreditCard className="w-5 h-5 text-yellow-600" />
            <h2 className="text-lg font-semibold text-gray-900">Pagos</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">Modo Sandbox Wompi</label>
                <p className="text-xs text-gray-500">Usar ambiente de pruebas para pagos</p>
              </div>
              <Switch
                checked={settings.wompiSandboxMode}
                onCheckedChange={(checked) => handleSettingChange('wompiSandboxMode', checked)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reintentos de Pago
              </label>
              <input
                type="number"
                min="1"
                max="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={settings.paymentRetryAttempts}
                onChange={(e) => handleSettingChange('paymentRetryAttempts', parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6 lg:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <Mail className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Configuración de Email</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proveedor de Email
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={settings.emailProvider}
                onChange={(e) => handleSettingChange('emailProvider', e.target.value)}
              >
                <option value="RESEND">Resend</option>
                <option value="SMTP">SMTP</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Remitente
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={settings.emailFromName}
                onChange={(e) => handleSettingChange('emailFromName', e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email del Remitente
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={settings.emailFromAddress}
                onChange={(e) => handleSettingChange('emailFromAddress', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}