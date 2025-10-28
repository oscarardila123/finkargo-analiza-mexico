// Stripe Payment Integration for Mexico
// Documentation: https://docs.stripe.com/api

import Stripe from 'stripe'

interface StripeConfig {
  secretKey: string
  publicKey: string
  webhookSecret: string
}

interface CreateCheckoutSessionRequest {
  amount: number
  currency: 'mxn' | 'usd'
  customerEmail: string
  reference: string
  planId: string
  planName: string
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, string>
}

interface StripeCheckoutSession {
  id: string
  url: string | null
  amount_total: number | null
  currency: string | null
  customer_email: string | null
  payment_status: string
  status: string | null
  metadata: Stripe.Metadata
}

export class StripeClient {
  private stripe: Stripe | undefined
  private config: StripeConfig

  constructor() {
    const environment = process.env.STRIPE_ENVIRONMENT?.trim() || 'test'

    // Lectura de variables sin fallar al importar
    const secretKey = process.env.STRIPE_SECRET_KEY || ''
    const publicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

    this.config = {
      secretKey,
      publicKey,
      webhookSecret
    }

    // Logs seguros en no-producción
    if (process.env.NODE_ENV !== 'production') {
      const mask = (v: string) => (v ? `${v.substring(0, 8)}...` : 'undefined')
      // eslint-disable-next-line no-console
      console.log('🔧 Stripe Client Config:', {
        environment,
        hasSecretKey: !!this.config.secretKey,
        secretKeyPrefix: mask(this.config.secretKey),
        hasPublicKey: !!this.config.publicKey,
        publicKeyPrefix: mask(this.config.publicKey),
        hasWebhookSecret: !!this.config.webhookSecret,
      })
    }

    if (!this.config.secretKey) {
      // eslint-disable-next-line no-console
      console.warn('❌ Falta STRIPE_SECRET_KEY en el entorno. El cliente se inicializará de forma diferida y los métodos que requieran Stripe fallarán con mensaje controlado.')
    }
    if (!this.config.publicKey) {
      // eslint-disable-next-line no-console
      console.warn('⚠️ Falta NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (requerida para el frontend).')
    }
    if (!this.config.webhookSecret) {
      // eslint-disable-next-line no-console
      console.warn('⚠️ Falta STRIPE_WEBHOOK_SECRET (solo necesario para webhooks).')
    }

    // No inicializamos Stripe aquí si falta la clave; se hará en ensureStripe()
  }

  private ensureStripe(): Stripe {
    if (this.stripe) return this.stripe
    const key = this.config.secretKey || process.env.STRIPE_SECRET_KEY || ''
    if (!key) {
      throw new Error('Stripe no está configurado: falta STRIPE_SECRET_KEY en el entorno')
    }
    this.config.secretKey = key
    this.stripe = new Stripe(key, {
      apiVersion: '2024-12-18.acacia',
      typescript: true,
    })
    return this.stripe
  }

  /**
   * Create a Stripe Checkout Session
   */
  async createCheckoutSession(
    sessionData: CreateCheckoutSessionRequest
  ): Promise<StripeCheckoutSession> {
    try {
      const stripe = this.ensureStripe()
      console.log('🚀 Creating Stripe Checkout Session')
      console.log('Session data:', JSON.stringify(sessionData, null, 2))

      const session = await stripe.checkout.sessions.create({
        // Stripe automatically enables all available payment methods for the account
        // including cards, Link, and any other methods enabled in the dashboard
        line_items: [
          {
            price_data: {
              currency: sessionData.currency,
              product_data: {
                name: sessionData.planName,
                description: `Suscripción a Finkargo Analiza - ${sessionData.planName}`,
              },
              unit_amount: Math.round(sessionData.amount * 100), // Stripe expects amount in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: sessionData.successUrl,
        cancel_url: sessionData.cancelUrl,
        customer_email: sessionData.customerEmail,
        metadata: {
          reference: sessionData.reference,
          planId: sessionData.planId,
          ...sessionData.metadata,
        },
        payment_intent_data: {
          metadata: {
            reference: sessionData.reference,
            planId: sessionData.planId,
          },
        },
      })

      console.log('✅ Checkout session created:', session.id)

      return {
        id: session.id,
        url: session.url,
        amount_total: session.amount_total,
        currency: session.currency,
        customer_email: session.customer_email,
        payment_status: session.payment_status,
        status: session.status,
        metadata: session.metadata,
      }
    } catch (error) {
      console.error('❌ Error creating Stripe checkout session:', error)
      throw error
    }
  }

  /**
   * Retrieve a Checkout Session
   */
  async getCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session> {
    try {
      const stripe = this.ensureStripe()
      const session = await stripe.checkout.sessions.retrieve(sessionId)
      return session
    } catch (error) {
      console.error('❌ Error retrieving checkout session:', error)
      throw error
    }
  }

  /**
   * Retrieve a Payment Intent
   */
  async getPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      const stripe = this.ensureStripe()
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
      return paymentIntent
    } catch (error) {
      console.error('❌ Error retrieving payment intent:', error)
      throw error
    }
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(
    payload: string | Buffer,
    signature: string
  ): Stripe.Event {
    try {
      if (!this.config.webhookSecret) {
        console.warn('⚠️ Webhook secret not configured, skipping verification')
        return JSON.parse(payload.toString())
      }

      const stripe = this.ensureStripe()
      const event = stripe.webhooks.constructEvent(
        payload,
        signature,
        this.config.webhookSecret
      )

      console.log('✅ Webhook signature verified')
      return event
    } catch (error) {
      console.error('❌ Webhook signature verification failed:', error)
      throw new Error('Invalid webhook signature')
    }
  }

  // Utility methods for Mexican payments
  formatMXNAmount(amount: number): number {
    // Convert amount to cents (Stripe requires amounts in cents)
    return Math.round(amount * 100)
  }

  formatMXNDisplay(amountInCents: number): string {
    const amount = amountInCents / 100
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount)
  }

  formatUSDDisplay(amountInCents: number): string {
    const amount = amountInCents / 100
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  generateReference(prefix: string = 'FINKARGO'): string {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `${prefix}_${timestamp}_${random}`
  }

  calculateIVA(amount: number, rate: number = 0.16): number {
    // Mexico IVA is 16%
    return Math.round(amount * rate * 100) / 100
  }

  calculateTotalWithIVA(amount: number, rate: number = 0.16): number {
    return amount + this.calculateIVA(amount, rate)
  }

  // Payment method helpers
  getPaymentMethodLabel(type: string): string {
    const labels: Record<string, string> = {
      'card': 'Tarjeta de Crédito/Débito',
      'oxxo': 'OXXO',
      'spei': 'Transferencia SPEI',
    }
    return labels[type] || type
  }

  isTestEnvironment(): boolean {
    return process.env.STRIPE_ENVIRONMENT?.trim() === 'test'
  }

  getEnvironment(): 'test' | 'production' {
    const env = process.env.STRIPE_ENVIRONMENT?.trim()
    return env === 'production' ? 'production' : 'test'
  }

  getEnvironmentLabel(): string {
    const environment = this.getEnvironment()
    const labels = {
      'test': '🧪 Modo de Pruebas',
      'production': '🚀 Producción'
    }
    return labels[environment]
  }

  getPublicKey(): string {
    return this.config.publicKey
  }
}

export const stripeClient = new StripeClient()
