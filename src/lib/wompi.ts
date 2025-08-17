// Wompi Payment Integration for Colombia
// Documentation: https://comercios.wompi.co/docs

interface WompiConfig {
  publicKey: string
  privateKey: string
  eventsSecret: string
  baseUrl: string
}

interface WompiPayment {
  id: string
  created_at: string
  finalized_at?: string
  amount_in_cents: number
  reference: string
  customer_email: string
  customer_data?: {
    phone_number?: string
    full_name?: string
  }
  currency: 'COP'
  payment_method_type: 'CARD' | 'PSE' | 'NEQUI'
  payment_method: {
    type: string
    extra?: any
  }
  status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR'
  status_message?: string
  shipping_address?: any
  redirect_url?: string
  payment_source_id?: string
  payment_link?: {
    checkout_url: string
  }
}

interface CreatePaymentRequest {
  amount_in_cents: number
  currency: 'COP'
  customer_email: string
  reference: string
  payment_method: {
    type: 'CARD' | 'PSE' | 'NEQUI'
    installments?: number
    token?: string
  }
  customer_data?: {
    phone_number?: string
    full_name?: string
  }
  redirect_url?: string
  shipping_address?: any
}

interface WompiWebhookEvent {
  event: 'transaction.updated'
  data: {
    transaction: WompiPayment
  }
  sent_at: string
  timestamp: number
  signature: {
    properties: string[]
    checksum: string
  }
}

export class WompiClient {
  private config: WompiConfig

  constructor() {
    this.config = {
      publicKey: process.env.WOMPI_PUBLIC_KEY!,
      privateKey: process.env.WOMPI_PRIVATE_KEY!,
      eventsSecret: process.env.WOMPI_EVENTS_SECRET!,
      baseUrl: process.env.WOMPI_DEV_MODE?.trim() === 'true' 
        ? 'https://sandbox.wompi.co/v1' 
        : 'https://production.wompi.co/v1'
    }

    if (!this.config.publicKey || !this.config.privateKey) {
      throw new Error('Wompi credentials not configured')
    }
  }

  private getAuthHeaders() {
    const credentials = Buffer.from(`${this.config.privateKey}:`).toString('base64')
    return {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    }
  }

  async createPayment(paymentData: CreatePaymentRequest): Promise<WompiPayment> {
    // Development mode simulation - check for dev mode regardless of NODE_ENV
    if (process.env.WOMPI_DEV_MODE?.trim() === 'true') {
      console.log('🎭 WOMPI SIMULATION MODE - Creating fake payment')
      return this.createFakePayment(paymentData)
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/transactions`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(paymentData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`Wompi payment creation failed: ${error.error?.reason || response.statusText}`)
      }

      const payment = await response.json()
      return payment.data as WompiPayment
    } catch (error) {
      console.error('Error creating Wompi payment:', error)
      throw error
    }
  }

  private createFakePayment(paymentData: CreatePaymentRequest): WompiPayment {
    const fakePaymentId = `fake_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const checkoutUrl = `${process.env.NEXTAUTH_URL}/checkout/success?simulation=true&reference=${paymentData.reference}`
    
    return {
      id: fakePaymentId,
      created_at: new Date().toISOString(),
      amount_in_cents: paymentData.amount_in_cents,
      reference: paymentData.reference,
      customer_email: paymentData.customer_email,
      customer_data: paymentData.customer_data,
      currency: 'COP',
      payment_method_type: paymentData.payment_method.type,
      payment_method: paymentData.payment_method,
      status: 'PENDING',
      payment_link: {
        checkout_url: checkoutUrl
      }
    }
  }

  async getPayment(paymentId: string): Promise<WompiPayment> {
    try {
      const response = await fetch(`${this.config.baseUrl}/transactions/${paymentId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch payment: ${response.statusText}`)
      }

      const payment = await response.json()
      return payment.data as WompiPayment
    } catch (error) {
      console.error('Error fetching Wompi payment:', error)
      throw error
    }
  }

  async createPaymentSource(tokenData: {
    type: 'CARD'
    token: string
    customer_email: string
    acceptance_token: string
  }) {
    try {
      const response = await fetch(`${this.config.baseUrl}/payment_sources`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(tokenData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`Payment source creation failed: ${error.error?.reason || response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating payment source:', error)
      throw error
    }
  }

  verifyWebhookSignature(
    payload: string,
    signature: string,
    timestamp: string
  ): boolean {
    try {
      const crypto = require('crypto')
      const concatenatedString = `${payload}${timestamp}${this.config.eventsSecret}`
      const computedSignature = crypto
        .createHash('sha256')
        .update(concatenatedString)
        .digest('hex')

      return computedSignature === signature
    } catch (error) {
      console.error('Error verifying webhook signature:', error)
      return false
    }
  }

  // Utility methods for Colombian payments
  formatCOPAmount(amount: number): number {
    // Convert amount to cents (Wompi requires amounts in cents)
    return Math.round(amount * 100)
  }

  formatCOPDisplay(amountInCents: number): string {
    const amount = amountInCents / 100
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  generateReference(prefix: string = 'FINKARGO'): string {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `${prefix}_${timestamp}_${random}`
  }

  calculateIVA(amount: number, rate: number = 0.19): number {
    return Math.round(amount * rate * 100) / 100
  }

  calculateTotalWithIVA(amount: number, rate: number = 0.19): number {
    return amount + this.calculateIVA(amount, rate)
  }

  // Payment method helpers for Colombia
  getPaymentMethodLabel(type: string): string {
    const labels: Record<string, string> = {
      'CARD': 'Tarjeta de Crédito/Débito',
      'PSE': 'PSE - Pagos Seguros en Línea',
      'NEQUI': 'Nequi',
      'BANCOLOMBIA_COLLECT': 'Bancolombia Button',
      'BANCOLOMBIA_TRANSFER': 'Transferencia Bancolombia'
    }
    return labels[type] || type
  }

  isTestEnvironment(): boolean {
    return process.env.WOMPI_DEV_MODE?.trim() === 'true'
  }
}

export const wompiClient = new WompiClient()