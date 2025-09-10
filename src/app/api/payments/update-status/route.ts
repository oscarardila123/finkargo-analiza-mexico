import { NextRequest, NextResponse } from 'next/server'
import { updatePaymentByReference, completePayment, getPaymentByReference } from '@/lib/payments'

interface UpdatePaymentRequest {
  reference: string
  wompi_payment_id?: string
  status: 'COMPLETED' | 'FAILED' | 'CANCELED'
  payment_method?: string
  failure_reason?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: UpdatePaymentRequest = await request.json()
    const { reference, wompi_payment_id, status, payment_method, failure_reason } = body

    if (!reference) {
      return NextResponse.json(
        { error: 'Reference is required' },
        { status: 400 }
      )
    }

    let updatedPayment

    if (status === 'COMPLETED' && wompi_payment_id) {
      // Completar pago y activar suscripción
      const result = await completePayment(reference, wompi_payment_id)
      updatedPayment = result.payment
      
      console.log('✅ Payment completed successfully:', {
        paymentId: result.payment.id,
        subscriptionId: result.subscription.id,
        reference: reference
      })
    } else {
      // Solo actualizar el estado del pago
      updatedPayment = await updatePaymentByReference(reference, {
        status: status,
        wompiPaymentId: wompi_payment_id,
        paymentMethod: payment_method,
        failedAt: status === 'FAILED' ? new Date() : undefined,
        failureReason: failure_reason
      })

      console.log('🔄 Payment status updated:', {
        paymentId: updatedPayment.id,
        status: status,
        reference: reference
      })
    }

    return NextResponse.json({
      success: true,
      payment: {
        id: updatedPayment.id,
        reference: updatedPayment.wompiReference,
        status: updatedPayment.status,
        amount: updatedPayment.amount,
        planType: updatedPayment.planType,
        updatedAt: updatedPayment.updatedAt
      }
    })

  } catch (error) {
    console.error('❌ Error updating payment status:', error)
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const reference = searchParams.get('reference')

    if (!reference) {
      return NextResponse.json(
        { error: 'Reference is required' },
        { status: 400 }
      )
    }

    const payment = await getPaymentByReference(reference)

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      payment: {
        id: payment.id,
        reference: payment.wompiReference,
        status: payment.status,
        amount: payment.amount,
        currency: payment.currency,
        planType: payment.planType,
        customerEmail: payment.customerEmail,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
        company: {
          name: payment.company.name,
          email: payment.company.email
        }
      }
    })

  } catch (error) {
    console.error('❌ Error getting payment:', error)
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    )
  }
}