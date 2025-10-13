import { NextRequest, NextResponse } from 'next/server'
import { stripeClient } from '@/lib/stripe'
import { updatePaymentByReference, completePayment, getPaymentByReference } from '@/lib/payments'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  try {
    console.log('🔔 Webhook received from Stripe')

    // Get the raw body for signature verification
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      console.error('❌ No Stripe signature found')
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = stripeClient.verifyWebhookSignature(body, signature)
    } catch (err) {
      console.error('❌ Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    console.log('📦 Webhook event:', {
      type: event.type,
      id: event.id,
    })

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case 'checkout.session.expired':
        await handleCheckoutSessionExpired(event.data.object as Stripe.Checkout.Session)
        break

      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent)
        break

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent)
        break

      default:
        console.log('ℹ️ Unhandled event type:', event.type)
    }

    console.log('✅ Webhook processed successfully')
    return NextResponse.json({
      success: true,
      message: 'Webhook processed',
      event_id: event.id,
      event_type: event.type
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
 * Handle successful checkout session completion
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  try {
    console.log('✅ Processing COMPLETED checkout session:', session.id)

    const reference = session.metadata?.reference
    if (!reference) {
      console.error('❌ No reference found in session metadata')
      return
    }

    // Get payment from database
    const payment = await getPaymentByReference(reference)
    if (!payment) {
      console.error('❌ Payment not found for reference:', reference)
      return
    }

    // Complete the payment and activate subscription
    const result = await completePayment(reference, session.id)

    console.log('🎉 Payment completed and subscription activated:', {
      paymentId: result.payment.id,
      subscriptionId: result.subscription.id,
      plan: result.subscription.plan,
      endDate: result.subscription.currentPeriodEnd
    })

    // TODO: Send confirmation email
    // TODO: Notify Slack/Discord
    // TODO: Activate specific features

  } catch (error) {
    console.error('❌ Error handling completed checkout session:', error)
    throw error
  }
}

/**
 * Handle expired checkout session
 */
async function handleCheckoutSessionExpired(session: Stripe.Checkout.Session) {
  try {
    console.log('⏰ Processing EXPIRED checkout session:', session.id)

    const reference = session.metadata?.reference
    if (!reference) {
      console.error('❌ No reference found in session metadata')
      return
    }

    await updatePaymentByReference(reference, {
      status: 'CANCELED',
      providerPaymentId: session.id,
      failedAt: new Date(),
      failureReason: 'Checkout session expired',
      paymentMethod: 'card'
    })

    console.log('📝 Payment marked as CANCELED (expired) in database')

  } catch (error) {
    console.error('❌ Error handling expired checkout session:', error)
    throw error
  }
}

/**
 * Handle successful payment intent
 */
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log('✅ Processing SUCCEEDED payment intent:', paymentIntent.id)

    // Payment intents are usually handled via checkout.session.completed
    // This is a backup handler
    console.log('ℹ️ Payment intent succeeded (handled via checkout session)')

  } catch (error) {
    console.error('❌ Error handling payment intent succeeded:', error)
    throw error
  }
}

/**
 * Handle failed payment intent
 */
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    console.log('❌ Processing FAILED payment intent:', paymentIntent.id)

    const reference = paymentIntent.metadata?.reference
    if (!reference) {
      console.error('❌ No reference found in payment intent metadata')
      return
    }

    await updatePaymentByReference(reference, {
      status: 'FAILED',
      providerPaymentId: paymentIntent.id,
      failedAt: new Date(),
      failureReason: paymentIntent.last_payment_error?.message || 'Payment failed',
      paymentMethod: 'card'
    })

    console.log('📝 Payment marked as FAILED in database')

    // TODO: Send failure notification email
    // TODO: Offer retry options

  } catch (error) {
    console.error('❌ Error handling failed payment intent:', error)
    throw error
  }
}

// Allow only POST requests
export async function GET() {
  return NextResponse.json({
    message: 'Stripe webhook endpoint',
    status: 'active',
    timestamp: new Date().toISOString()
  })
}
