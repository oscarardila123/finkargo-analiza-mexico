import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

export interface CreatePaymentData {
  companyId: string
  amount: number
  currency: string
  planType: string
  customerEmail: string
  wompiReference: string
  wompiCheckoutUrl: string
  description?: string
}

export interface UpdatePaymentData {
  providerPaymentId?: string
  status?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELED'
  paymentMethod?: string
  paidAt?: Date
  failedAt?: Date
  failureReason?: string
  metadata?: any
}

/**
 * Crea una nueva transacción en la base de datos
 */
export async function createPayment(data: CreatePaymentData) {
  try {
    const payment = await prisma.payment.create({
      data: {
        companyId: data.companyId,
        amount: data.amount,
        currency: data.currency,
        status: 'PENDING',
        provider: 'WOMPI',
        description: data.description || `Pago plan ${data.planType}`,
        wompiReference: data.wompiReference,
        wompiCheckoutUrl: data.wompiCheckoutUrl,
        planType: data.planType,
        customerEmail: data.customerEmail,
        metadata: {
          planType: data.planType,
          environment: process.env.WOMPI_ENVIRONMENT || 'testing'
        }
      },
      include: {
        company: true
      }
    })

    console.log('💾 Payment created in database:', {
      id: payment.id,
      reference: payment.wompiReference,
      amount: payment.amount,
      planType: payment.planType
    })

    return payment
  } catch (error) {
    console.error('❌ Error creating payment:', error)
    throw error
  }
}

/**
 * Actualiza el estado de un pago usando la referencia de Wompi
 */
export async function updatePaymentByReference(reference: string, data: UpdatePaymentData) {
  try {
    const payment = await prisma.payment.update({
      where: {
        wompiReference: reference
      },
      data: {
        ...data,
        updatedAt: new Date()
      },
      include: {
        company: true
      }
    })

    console.log('🔄 Payment updated:', {
      id: payment.id,
      reference: payment.wompiReference,
      status: payment.status,
      wompiPaymentId: data.wompiPaymentId
    })

    return payment
  } catch (error) {
    console.error('❌ Error updating payment:', error)
    throw error
  }
}

/**
 * Obtiene un pago por su referencia de Wompi
 */
export async function getPaymentByReference(reference: string) {
  try {
    const payment = await prisma.payment.findUnique({
      where: {
        wompiReference: reference
      },
      include: {
        company: true,
        subscription: true
      }
    })

    return payment
  } catch (error) {
    console.error('❌ Error getting payment by reference:', error)
    throw error
  }
}

/**
 * Obtiene todos los pagos de una empresa
 */
export async function getPaymentsByCompany(companyId: string) {
  try {
    const payments = await prisma.payment.findMany({
      where: {
        companyId: companyId
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        company: true,
        subscription: true
      }
    })

    return payments
  } catch (error) {
    console.error('❌ Error getting payments by company:', error)
    throw error
  }
}

/**
 * Marca un pago como completado y crea/actualiza la suscripción
 */
export async function completePayment(reference: string, wompiPaymentId: string) {
  try {
    const payment = await prisma.payment.findUnique({
      where: { wompiReference: reference },
      include: { company: true }
    })

    if (!payment) {
      throw new Error(`Payment not found for reference: ${reference}`)
    }

    // Actualizar el pago
    const updatedPayment = await updatePaymentByReference(reference, {
      status: 'COMPLETED',
      providerPaymentId: wompiPaymentId,
      paidAt: new Date(),
      paymentMethod: 'credit_card' // Se puede mejorar detectando el método real
    })

    // Crear o actualizar la suscripción
    const subscriptionData = getSubscriptionDataFromPlan(payment.planType || 'trimestral')
    
    let subscription
    if (payment.company.subscriptionId) {
      // Actualizar suscripción existente
      subscription = await prisma.subscription.update({
        where: { id: payment.company.subscriptionId },
        data: {
          plan: subscriptionData.plan,
          status: 'ACTIVE',
          currentPeriodStart: new Date(),
          currentPeriodEnd: subscriptionData.endDate,
          billingCycle: subscriptionData.billingCycle,
          updatedAt: new Date()
        }
      })
    } else {
      // Crear nueva suscripción
      subscription = await prisma.subscription.create({
        data: {
          companyId: payment.companyId,
          plan: subscriptionData.plan,
          status: 'ACTIVE',
          currentPeriodStart: new Date(),
          currentPeriodEnd: subscriptionData.endDate,
          billingCycle: subscriptionData.billingCycle
        }
      })

      // Actualizar la referencia en la empresa
      await prisma.company.update({
        where: { id: payment.companyId },
        data: { subscriptionId: subscription.id }
      })
    }

    // Actualizar el pago con la referencia de suscripción
    await prisma.payment.update({
      where: { id: payment.id },
      data: { subscriptionId: subscription.id }
    })

    console.log('✅ Payment completed and subscription activated:', {
      paymentId: updatedPayment.id,
      subscriptionId: subscription.id,
      plan: subscription.plan,
      endDate: subscription.currentPeriodEnd
    })

    return { payment: updatedPayment, subscription }
  } catch (error) {
    console.error('❌ Error completing payment:', error)
    throw error
  }
}

/**
 * Convierte el tipo de plan en datos de suscripción
 */
function getSubscriptionDataFromPlan(planType: string) {
  const now = new Date()
  let endDate = new Date()
  let plan: 'TRIMESTRAL' | 'SEMESTRAL' | 'ANUAL' = 'TRIMESTRAL'
  let billingCycle: 'MONTHLY' | 'YEARLY' = 'MONTHLY'

  switch (planType) {
    case 'trimestral':
      endDate.setMonth(now.getMonth() + 3)
      plan = 'TRIMESTRAL'
      billingCycle = 'MONTHLY'
      break
    case 'semestral':
      endDate.setMonth(now.getMonth() + 6)
      plan = 'SEMESTRAL'
      billingCycle = 'MONTHLY'
      break
    case 'anual':
      endDate.setFullYear(now.getFullYear() + 1)
      plan = 'ANUAL'
      billingCycle = 'YEARLY'
      break
    default:
      endDate.setMonth(now.getMonth() + 3)
      plan = 'TRIMESTRAL'
      billingCycle = 'MONTHLY'
  }

  return { plan, endDate, billingCycle }
}