interface WompiCredentials {
  publicKey: string
  privateKey: string
  integritySecret: string
  eventsSecret: string
}

interface WompiConfig extends WompiCredentials {
  environment: 'sandbox' | 'production' | 'testing'
  apiUrl: string
  checkoutUrl: string
  isTestMode: boolean
}

export function getWompiConfig(): WompiConfig {
  const environment = process.env.WOMPI_ENVIRONMENT as 'sandbox' | 'production' | 'testing' || 'testing'
  
  let credentials: WompiCredentials
  let apiUrl: string
  let checkoutUrl: string
  let isTestMode: boolean

  switch (environment) {
    case 'sandbox':
      credentials = {
        publicKey: process.env.WOMPI_SANDBOX_PUBLIC_KEY || '',
        privateKey: process.env.WOMPI_SANDBOX_PRIVATE_KEY || '',
        integritySecret: process.env.WOMPI_SANDBOX_INTEGRITY_SECRET || '',
        eventsSecret: process.env.WOMPI_SANDBOX_EVENTS_SECRET || ''
      }
      apiUrl = 'https://sandbox.wompi.co/v1'
      checkoutUrl = 'https://checkout.wompi.co/p/'
      isTestMode = true
      break
      
    case 'production':
      credentials = {
        publicKey: process.env.WOMPI_PUBLIC_KEY || '',
        privateKey: process.env.WOMPI_PRIVATE_KEY || '',
        integritySecret: process.env.WOMPI_INTEGRITY_SECRET || '',
        eventsSecret: process.env.WOMPI_EVENTS_SECRET || ''
      }
      apiUrl = 'https://production.wompi.co/v1'
      checkoutUrl = 'https://checkout.wompi.co/p/'
      isTestMode = false
      break
      
    case 'testing':
    default:
      // Use production credentials but in test mode
      credentials = {
        publicKey: process.env.WOMPI_PUBLIC_KEY || '',
        privateKey: process.env.WOMPI_PRIVATE_KEY || '',
        integritySecret: process.env.WOMPI_INTEGRITY_SECRET || '',
        eventsSecret: process.env.WOMPI_EVENTS_SECRET || ''
      }
      apiUrl = 'https://production.wompi.co/v1'
      checkoutUrl = 'https://checkout.wompi.co/p/'
      isTestMode = true // This enables testing features while using production API
      break
  }

  return {
    ...credentials,
    environment,
    apiUrl,
    checkoutUrl,
    isTestMode
  }
}

export function validateWompiConfig(config: WompiConfig): boolean {
  const requiredFields = ['publicKey', 'privateKey', 'integritySecret']
  const missingFields = requiredFields.filter(field => !config[field as keyof WompiConfig])
  
  if (missingFields.length > 0) {
    console.error('❌ Missing Wompi configuration:', missingFields)
    return false
  }
  
  return true
}

export function getEnvironmentLabel(config: WompiConfig): string {
  switch (config.environment) {
    case 'sandbox':
      return '🧪 Sandbox (Fake Data)'
    case 'production':
      return '🚀 Production (Live Payments)'
    case 'testing':
      return '🔧 Testing (Production API + Test Mode)'
    default:
      return '❓ Unknown Environment'
  }
}