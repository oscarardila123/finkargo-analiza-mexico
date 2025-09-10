import { NextRequest, NextResponse } from 'next/server'

interface TestWebhookRequest {
  reference: string
  status: 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR'
  transaction_id?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: TestWebhookRequest = await request.json()
    const { reference, status, transaction_id } = body

    if (!reference || !status) {
      return NextResponse.json(
        { error: 'Reference and status are required' },
        { status: 400 }
      )
    }

    console.log('🧪 Simulating webhook for testing:', {
      reference,
      status,
      transaction_id
    })

    // Crear un evento de webhook simulado
    const mockWebhookEvent = {
      event: 'transaction.updated',
      data: {
        transaction: {
          id: transaction_id || `test_${Date.now()}`,
          amount_in_cents: 65000000, // $650,000 COP
          reference: reference,
          customer_email: 'test@example.com',
          currency: 'COP',
          payment_method_type: 'CARD',
          payment_method: {
            type: 'CARD',
            installments: 1
          },
          status: status,
          status_message: getStatusMessage(status),
          created_at: new Date().toISOString(),
          finalized_at: new Date().toISOString(),
          amount_refunded: 0
        }
      },
      sent_at: new Date().toISOString()
    }

    // Enviar el webhook simulado a nuestro endpoint
    const webhookResponse = await fetch(`${request.nextUrl.origin}/api/webhooks/wompi`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // No incluir signature para testing
      },
      body: JSON.stringify(mockWebhookEvent)
    })

    const webhookResult = await webhookResponse.json()

    console.log('📡 Webhook simulation result:', webhookResult)

    return NextResponse.json({
      success: true,
      message: 'Webhook simulation completed',
      webhook_event: mockWebhookEvent,
      webhook_response: webhookResult
    })

  } catch (error) {
    console.error('💥 Error simulating webhook:', error)
    return NextResponse.json(
      { 
        error: 'Webhook simulation failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

function getStatusMessage(status: string): string {
  switch (status) {
    case 'APPROVED':
      return 'Payment approved successfully'
    case 'DECLINED':
      return 'Payment was declined by the bank'
    case 'VOIDED':
      return 'Payment was voided'
    case 'ERROR':
      return 'An error occurred during payment processing'
    default:
      return 'Unknown status'
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Webhook testing endpoint',
    usage: 'POST with { reference, status, transaction_id? }',
    available_statuses: ['APPROVED', 'DECLINED', 'VOIDED', 'ERROR']
  })
}