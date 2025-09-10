import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getWompiConfig } from '@/lib/wompi-config'
import { updatePaymentByReference, completePayment, getPaymentByReference } from '@/lib/payments'

// Estructura del webhook de Wompi
interface WompiWebhookEvent {
  event: string
  data: {
    transaction: {
      id: string
      amount_in_cents: number
      reference: string
      customer_email: string
      currency: string
      payment_method_type: string
      payment_method: any
      status: 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR'
      status_message: string
      created_at: string
      finalized_at: string
      amount_refunded: number
    }
  }
  sent_at: string
}

export async function POST(request: NextRequest) {
  try {
    console.log('🔔 Webhook received from Wompi')

    // Leer el body del webhook
    const body = await request.text()
    const event: WompiWebhookEvent = JSON.parse(body)

    console.log('📦 Webhook event:', {
      event: event.event,
      transactionId: event.data.transaction.id,
      reference: event.data.transaction.reference,
      status: event.data.transaction.status,
      amount: event.data.transaction.amount_in_cents / 100
    })

    // Verificar la firma del webhook (seguridad)
    const signature = request.headers.get('wompi-signature')
    if (!verifyWebhookSignature(body, signature)) {
      console.error('❌ Invalid webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Procesar solo eventos de transacciones
    if (event.event !== 'transaction.updated') {
      console.log('ℹ️ Skipping non-transaction event:', event.event)
      return NextResponse.json({ success: true, message: 'Event ignored' })
    }

    const transaction = event.data.transaction
    const reference = transaction.reference

    // Buscar el pago en nuestra base de datos
    const payment = await getPaymentByReference(reference)
    if (!payment) {
      console.error('❌ Payment not found for reference:', reference)
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
    }

    console.log('💾 Found payment in database:', {
      id: payment.id,
      currentStatus: payment.status,
      newStatus: transaction.status
    })

    // Procesar según el estado de la transacción
    switch (transaction.status) {
      case 'APPROVED':
        await handleApprovedPayment(transaction, payment)
        break
      
      case 'DECLINED':
        await handleDeclinedPayment(transaction, payment)
        break
      
      case 'VOIDED':
        await handleVoidedPayment(transaction, payment)
        break
      
      case 'ERROR':
        await handleErrorPayment(transaction, payment)
        break
      
      default:
        console.log('⚠️ Unknown transaction status:', transaction.status)
    }

    console.log('✅ Webhook processed successfully')
    return NextResponse.json({ 
      success: true, 
      message: 'Webhook processed',
      transaction_id: transaction.id,
      status: transaction.status
    })

  } catch (error) {
    console.error('💥 Error processing webhook:', error)
    return NextResponse.json(
      { 
        error: 'Webhook processing failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * Verifica la firma del webhook para asegurar que viene de Wompi
 */
function verifyWebhookSignature(body: string, signature: string | null): boolean {
  if (!signature) {
    console.log('⚠️ No signature provided, skipping verification (development mode)')
    return true // En desarrollo, permitir sin firma
  }

  try {
    const wompiConfig = getWompiConfig()
    const expectedSignature = crypto
      .createHmac('sha256', wompiConfig.eventsSecret)
      .update(body)
      .digest('hex')

    const isValid = signature === expectedSignature
    console.log('🔐 Signature verification:', isValid ? 'VALID' : 'INVALID')
    return isValid
  } catch (error) {
    console.error('❌ Error verifying signature:', error)
    return false
  }
}

/**
 * Maneja pagos aprobados - Activa la suscripción
 */
async function handleApprovedPayment(transaction: any, payment: any) {
  try {
    console.log('✅ Processing APPROVED payment:', transaction.id)

    // Completar el pago y activar suscripción
    const result = await completePayment(transaction.reference, transaction.id)

    console.log('🎉 Payment completed and subscription activated:', {
      paymentId: result.payment.id,
      subscriptionId: result.subscription.id,
      plan: result.subscription.plan,
      endDate: result.subscription.currentPeriodEnd
    })

    // Aquí podrías agregar:
    // - Envío de email de confirmación
    // - Notificación a Slack
    // - Activación de funcionalidades específicas

  } catch (error) {
    console.error('❌ Error handling approved payment:', error)
    throw error
  }
}

/**
 * Maneja pagos declinados
 */
async function handleDeclinedPayment(transaction: any, payment: any) {
  try {
    console.log('❌ Processing DECLINED payment:', transaction.id)

    await updatePaymentByReference(transaction.reference, {
      status: 'FAILED',
      providerPaymentId: transaction.id,
      failedAt: new Date(),
      failureReason: transaction.status_message || 'Payment declined',
      paymentMethod: transaction.payment_method_type
    })

    console.log('📝 Payment marked as FAILED in database')

    // Aquí podrías agregar:
    // - Envío de email informando el fallo
    // - Reintento automático
    // - Notificación al usuario

  } catch (error) {
    console.error('❌ Error handling declined payment:', error)
    throw error
  }
}

/**
 * Maneja pagos anulados
 */
async function handleVoidedPayment(transaction: any, payment: any) {
  try {
    console.log('🚫 Processing VOIDED payment:', transaction.id)

    await updatePaymentByReference(transaction.reference, {
      status: 'CANCELED',
      providerPaymentId: transaction.id,
      failedAt: new Date(),
      failureReason: 'Payment voided',
      paymentMethod: transaction.payment_method_type
    })

    console.log('📝 Payment marked as CANCELED in database')

  } catch (error) {
    console.error('❌ Error handling voided payment:', error)
    throw error
  }
}

/**
 * Maneja pagos con error
 */
async function handleErrorPayment(transaction: any, payment: any) {
  try {
    console.log('⚠️ Processing ERROR payment:', transaction.id)

    await updatePaymentByReference(transaction.reference, {
      status: 'FAILED',
      providerPaymentId: transaction.id,
      failedAt: new Date(),
      failureReason: transaction.status_message || 'Payment error',
      paymentMethod: transaction.payment_method_type
    })

    console.log('📝 Payment marked as FAILED (error) in database')

  } catch (error) {
    console.error('❌ Error handling error payment:', error)
    throw error
  }
}

// Permitir only POST requests
export async function GET() {
  return NextResponse.json({ 
    message: 'Wompi webhook endpoint',
    status: 'active',
    timestamp: new Date().toISOString()
  })
}