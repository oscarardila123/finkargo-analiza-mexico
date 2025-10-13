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
  private stripe: Stripe
  private config: StripeConfig

  constructor() {
    const environment = process.env.STRIPE_ENVIRONMENT?.trim() || 'test'

    this.config = {
      secretKey: process.env.STRIPE_SECRET_KEY!,
      publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || ''
    }

    console.log('🔧 Stripe Client Init:', {
      environment,
      hasSecretKey: !!this.config.secretKey,
      secretKeyPrefix: this.config.secretKey?.substring(0, 10)
    })

    // Validate credentials
    if (!this.config.secretKey) {
      throw new Error(`Stripe secret key not configured for ${environment} environment`)
    }

    // Initialize Stripe with API version
    this.stripe = new Stripe(this.config.secretKey, {
      apiVersion: '2024-12-18.acacia',
      typescript: true,
    })

    console.log('✅ Stripe Client initialized successfully')
  }

  /**
   * Create a Stripe Checkout Session
   */
  async createCheckoutSession(
    sessionData: CreateCheckoutSessionRequest
  ): Promise<StripeCheckoutSession> {
    try {
      console.log('🚀 Creating Stripe Checkout Session')
      console.log('Session data:', JSON.stringify(sessionData, null, 2))

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card', 'link'],
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
      const session = await this.stripe.checkout.sessions.retrieve(sessionId)
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
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId)
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

      const event = this.stripe.webhooks.constructEvent(
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
