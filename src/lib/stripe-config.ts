interface StripeCredentials {
  publicKey: string
  secretKey: string
  webhookSecret: string
}

interface StripeConfig extends StripeCredentials {
  environment: 'test' | 'production'
  isTestMode: boolean
}

export function getStripeConfig(): StripeConfig {
  const environment = process.env.STRIPE_ENVIRONMENT as 'test' | 'production' || 'test'

  let credentials: StripeCredentials
  let isTestMode: boolean

  switch (environment) {
    case 'production':
      credentials = {
        publicKey: process.env.STRIPE_PUBLIC_KEY || '',
        secretKey: process.env.STRIPE_SECRET_KEY || '',
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || ''
      }
      isTestMode = false
      break

    case 'test':
    default:
      credentials = {
        publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
        secretKey: process.env.STRIPE_SECRET_KEY || '',
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || ''
      }
      isTestMode = true
      break
  }

  return {
    ...credentials,
    environment,
    isTestMode
  }
}

export function validateStripeConfig(config: StripeConfig): boolean {
  const requiredFields = ['publicKey', 'secretKey']
  const missingFields = requiredFields.filter(field => !config[field as keyof StripeConfig])

  if (missingFields.length > 0) {
    console.error('❌ Missing Stripe configuration:', missingFields)
    return false
  }

  return true
}

export function getEnvironmentLabel(config: StripeConfig): string {
  switch (config.environment) {
    case 'test':
      return '🧪 Modo de Pruebas (Test Mode)'
    case 'production':
      return '🚀 Producción (Live Payments)'
    default:
      return '❓ Entorno Desconocido'
  }
}
