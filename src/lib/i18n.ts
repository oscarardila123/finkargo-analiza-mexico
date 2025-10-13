// Simple i18n implementation for Spanish (México)
export const translations = {
  common: {
    loading: 'Cargando...',
    save: 'Guardar',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    edit: 'Editar',
    create: 'Crear',
    search: 'Buscar',
    filter: 'Filtrar',
    export: 'Exportar',
    import: 'Importar',
    yes: 'Sí',
    no: 'No',
    ok: 'OK',
    close: 'Cerrar',
    back: 'Volver',
    next: 'Siguiente',
    previous: 'Anterior',
    submit: 'Enviar',
    confirm: 'Confirmar',
  },
  auth: {
    signIn: 'Iniciar Sesión',
    signUp: 'Registrarse',
    signOut: 'Cerrar Sesión',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    forgotPassword: 'Olvidé mi contraseña',
    welcomeBack: 'Bienvenido de vuelta',
    createAccount: 'Crear cuenta nueva',
    invalidCredentials: 'Credenciales inválidas',
    accountCreated: 'Cuenta creada exitosamente',
  },
  dashboard: {
    title: 'Dashboard',
    welcome: 'Bienvenido',
    overview: 'Resumen',
    analytics: 'Análisis',
    reports: 'Reportes',
    settings: 'Configuración',
    profile: 'Mi Perfil',
    notifications: 'Notificaciones',
  },
  imports: {
    title: 'Análisis de Importaciones',
    description: 'Inteligencia de mercado basada en datos verificados',
    totalValue: 'Valor Total CIF',
    activeImporters: 'Importadores Activos',
    originCountries: 'Países de Origen',
    tariffPositions: 'Posiciones Arancelarias',
    topImporters: 'Principales Importadores',
    topSuppliers: 'Principales Proveedores',
    topProducts: 'Productos Más Importados',
    monthlyTrends: 'Tendencias Mensuales',
  },
  suppliers: {
    title: 'Descubrimiento de Proveedores',
    description: 'Encuentra y analiza proveedores internacionales basado en datos reales de importación',
    searchPlaceholder: 'Ej: componentes electrónicos',
    country: 'País',
    product: 'Producto',
    sortBy: 'Ordenar por',
    totalVolume: 'Volumen total',
    averagePrice: 'Precio promedio',
    reliability: 'Confiabilidad',
    lastImport: 'Última importación',
    topImporters: 'Principales importadores mexicanos',
    viewDetails: 'Ver Detalles',
    contact: 'Contactar',
  },
  competitors: {
    title: 'Análisis de Competidores',
    description: 'Monitorea y analiza la actividad de importación de tus competidores directos',
    searchPlaceholder: 'Buscar por nombre de empresa o NIT...',
    marketShare: 'Participación de mercado',
    totalImports: 'Importaciones totales',
    monthlyAverage: 'Promedio mensual',
    growth: 'Crecimiento',
    mainProducts: 'Productos principales',
    lastActivity: 'Última actividad',
    competitiveRisk: 'Riesgo competitivo',
    low: 'Bajo',
    medium: 'Medio',
    high: 'Alto',
  },
  subscription: {
    title: 'Suscripción',
    description: 'Gestiona tu plan y facturación',
    currentPlan: 'Plan Actual',
    nextPayment: 'Próximo Pago',
    reportsUsed: 'Reportes Utilizados',
    monthly: 'Mensual',
    yearly: 'Anual',
    save17: 'Ahorra 17%',
    mostPopular: 'Más Popular',
    currentPlan_: 'Plan Actual',
    selectPlan: 'Seleccionar Plan',
    paymentMethods: 'Métodos de Pago',
    cards: 'Tarjetas',
    pse: 'PSE',
    nequi: 'Nequi',
  },
  company: {
    name: 'Nombre de la empresa',
    email: 'Correo empresarial',
    nit: 'NIT',
    address: 'Dirección',
    city: 'Ciudad',
    phone: 'Teléfono',
    website: 'Sitio web',
    industry: 'Tipo de industria',
    size: 'Tamaño de empresa',
    small: 'Pequeña (< $100K USD)',
    medium: 'Mediana ($100K - $1M USD)',
    large: 'Grande (> $1M USD)',
    annualImports: 'Volumen anual importación (USD)',
  },
  currency: {
    mxn: 'MXN',
    usd: 'USD',
    eur: 'EUR',
  },
  time: {
    today: 'Hoy',
    yesterday: 'Ayer',
    thisWeek: 'Esta semana',
    thisMonth: 'Este mes',
    lastMonth: 'Mes anterior',
    thisYear: 'Este año',
    lastYear: 'Año anterior',
    ago: 'hace',
    hours: 'horas',
    days: 'días',
    months: 'meses',
    years: 'años',
  },
  errors: {
    general: 'Ha ocurrido un error',
    networkError: 'Error de red',
    unauthorized: 'No autorizado',
    forbidden: 'Acceso denegado',
    notFound: 'No encontrado',
    serverError: 'Error interno del servidor',
    validationError: 'Error de validación',
    paymentError: 'Error en el pago',
  },
  success: {
    saved: 'Guardado exitosamente',
    created: 'Creado exitosamente',
    updated: 'Actualizado exitosamente',
    deleted: 'Eliminado exitosamente',
    paymentCompleted: 'Pago completado exitosamente',
    subscriptionUpdated: 'Suscripción actualizada exitosamente',
  }
} as const

export type TranslationKey = keyof typeof translations
export type NestedTranslationKey<T = typeof translations> = {
  [K in keyof T]: T[K] extends object 
    ? `${K & string}.${keyof T[K] & string}`
    : K & string
}[keyof T]

export function t(key: NestedTranslationKey): string {
  const keys = key.split('.')
  let value: any = translations
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
  }
  
  return typeof value === 'string' ? value : key
}

// Mexican specific formatting utilities
export const mexicanFormatters = {
  currency: (amount: number, currency: 'MXN' | 'USD' = 'MXN') => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency,
      minimumFractionDigits: currency === 'MXN' ? 2 : 2,
    }).format(amount)
  },
  
  number: (value: number) => {
    return new Intl.NumberFormat('es-MX').format(value)
  },

  percentage: (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100)
  },
  
  date: (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(d)
  },

  dateShort: (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(d)
  },

  dateTime: (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d)
  },
  
  relativeTime: (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)
    
    if (diffInSeconds < 60) return 'hace un momento'
    if (diffInSeconds < 3600) return `hace ${Math.floor(diffInSeconds / 60)} minutos`
    if (diffInSeconds < 86400) return `hace ${Math.floor(diffInSeconds / 3600)} horas`
    if (diffInSeconds < 2592000) return `hace ${Math.floor(diffInSeconds / 86400)} días`
    if (diffInSeconds < 31536000) return `hace ${Math.floor(diffInSeconds / 2592000)} meses`
    return `hace ${Math.floor(diffInSeconds / 31536000)} años`
  }
}