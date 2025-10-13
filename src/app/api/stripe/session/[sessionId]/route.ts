import { NextRequest, NextResponse } from 'next/server'
import { stripeClient } from '@/lib/stripe'

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    console.log('🔍 Fetching Stripe session:', sessionId)

    // Retrieve session from Stripe
    const session = await stripeClient.getCheckoutSession(sessionId)

    console.log('✅ Session retrieved successfully:', {
      id: session.id,
      amount_total: session.amount_total,
      currency: session.currency,
      status: session.status,
      payment_status: session.payment_status
    })

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        amount_total: session.amount_total,
        currency: session.currency,
        status: session.status,
        payment_status: session.payment_status,
        customer_email: session.customer_email,
        payment_method_types: session.payment_method_types,
        metadata: session.metadata,
        created: session.created
      }
    })

  } catch (error) {
    console.error('❌ Error fetching Stripe session:', error)
    return NextResponse.json(
      {
        error: 'Error fetching session details',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
