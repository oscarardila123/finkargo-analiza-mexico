import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getWompiConfig, validateWompiConfig, getEnvironmentLabel } from '@/lib/wompi-config'
import { createPayment } from '@/lib/payments'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

interface CreateLinkRequest {
  amount: number
  plan_name: string
  customer_email: string
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateLinkRequest = await request.json()
    const { amount, plan_name, customer_email } = body

    // Obtener sesión del usuario
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Usuario no autenticado' },
        { status: 401 }
      )
    }

    // Validar datos básicos
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Monto inválido' },
        { status: 400 }
      )
    }

    if (!customer_email) {
      return NextResponse.json(
        { error: 'Email requerido' },
        { status: 400 }
      )
    }

    // Obtener información del usuario y empresa
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { company: true }
    })

    if (!user || !user.company) {
      return NextResponse.json(
        { error: 'Usuario o empresa no encontrados' },
        { status: 404 }
      )
    }

    // Obtener configuración de Wompi según el ambiente
    const wompiConfig = getWompiConfig()
    
    if (!validateWompiConfig(wompiConfig)) {
      return NextResponse.json(
        { error: 'Configuración de Wompi inválida' },
        { status: 500 }
      )
    }
    
    // Convertir monto a centavos
    const amountInCents = Math.round(amount * 100)

    // Generar referencia única
    const reference = `FINKARGO_${Date.now()}_${Math.floor(Math.random() * 1000)}`
    
    // URLs de redirección (Wompi agregará automáticamente el id de transacción)
    const successUrl = `${process.env.NEXTAUTH_URL}/checkout/success?reference=${reference}&simulation=false`
    const failureUrl = `${process.env.NEXTAUTH_URL}/checkout/failed?reference=${reference}&error=PAYMENT_FAILED`

    console.log('🚀 Creando checkout con Wompi')
    console.log('Ambiente:', getEnvironmentLabel(wompiConfig))
    console.log('Monto:', amountInCents, 'centavos COP')
    console.log('Referencia:', reference)
    console.log('Public Key:', wompiConfig.publicKey.substring(0, 20) + '...')

    // Crear firma de integridad (hash SHA256)
    // Formato correcto según Wompi: reference + amount_in_cents + currency + integrity_secret
    const crypto = require('crypto')
    const concatenatedString = `${reference}${amountInCents}COP${wompiConfig.integritySecret}`
    const signature = crypto.createHash('sha256').update(concatenatedString).digest('hex')
    
    console.log('Signature string:', concatenatedString)
    console.log('Generated signature:', signature)

    // URL con firma de integridad y URLs de éxito y fallo
    const widgetUrl = `${wompiConfig.checkoutUrl}?public-key=${wompiConfig.publicKey}&currency=COP&amount-in-cents=${amountInCents}&reference=${reference}&signature:integrity=${signature}&redirect-url=${encodeURIComponent(successUrl)}`

    // Determinar el tipo de plan basado en el monto y nombre
    const planType = determinePlanType(amount, plan_name)

    // Guardar la transacción en la base de datos
    const payment = await createPayment({
      companyId: user.company.id,
      amount: amount,
      currency: 'COP',
      planType: planType,
      customerEmail: customer_email,
      wompiReference: reference,
      wompiCheckoutUrl: widgetUrl,
      description: `Suscripción ${plan_name} - ${formatPrice(amount)} COP`
    })

    console.log('💾 Transaction saved to database:', {
      paymentId: payment.id,
      reference: reference,
      companyId: user.company.id,
      amount: amount,
      planType: planType
    })

    return NextResponse.json({
      success: true,
      checkout_url: widgetUrl,
      reference: reference,
      amount: amount,
      amount_in_cents: amountInCents,
      public_key: wompiConfig.publicKey,
      environment: wompiConfig.environment,
      test_mode: wompiConfig.isTestMode,
      environment_label: getEnvironmentLabel(wompiConfig),
      payment_id: payment.id
    })

  } catch (error) {
    console.error('💥 Error inesperado:', error)
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    )
  }
}

// Funciones auxiliares
function determinePlanType(amount: number, planName: string): string {
  // Primero intentar por nombre
  if (planName.toLowerCase().includes('trimestral')) return 'trimestral'
  if (planName.toLowerCase().includes('semestral')) return 'semestral'
  if (planName.toLowerCase().includes('anual')) return 'anual'
  
  // Si no, determinar por monto
  if (amount === 650000) return 'trimestral'
  if (amount === 800000) return 'semestral'
  if (amount === 1000000) return 'anual'
  
  // Por defecto
  return 'trimestral'
}

function formatPrice(amount: number): string {
  return amount.toLocaleString('es-CO')
}