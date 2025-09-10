// Server-side Wompi utility functions
export function getWompiEnvironment(): 'simulation' | 'sandbox' | 'production' {
  const env = process.env.WOMPI_ENVIRONMENT?.trim()
  if (env === 'production' || env === 'sandbox') return env
  return 'simulation'
}

export function getWompiEnvironmentLabel(): string {
  const environment = getWompiEnvironment()
  const labels = {
    'simulation': '🎭 Simulación Local',
    'sandbox': '🧪 Sandbox (Pruebas)',
    'production': '🚀 Producción'
  }
  return labels[environment]
}