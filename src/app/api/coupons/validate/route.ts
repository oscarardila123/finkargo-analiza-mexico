import { NextRequest, NextResponse } from 'next/server'

// Definir cupones con códigos más seguros
const COUPONS = {
  // Cupón 50% para clientes existentes de Finkargo (código ultra-seguro con alfanuméricos)
  'FK2025-ANALIZA-X7K9M-3QP8N-PREMIUM': {
    discount: 50,
    description: 'Cliente Finkargo Premium - 50% de descuento',
    appliesTo: 'ALL', // Aplica a todos los planes (full access y por sector)
    maxUses: 100,
    expiresAt: new Date('2025-12-31'),
    type: 'existing_customer'
  },
  // Cupón 10% para campañas en redes sociales (código más simple)
  'ANALIZA10': {
    discount: 10,
    description: 'Promoción redes sociales - 10% de descuento',
    appliesTo: 'ALL', // Aplica a todos los planes (full access y por sector)
    maxUses: 500,
    expiresAt: new Date('2025-12-31'),
    type: 'social_media'
  },
  // Cupón 15% para socios COMCE - Aplica a TODOS los planes (full access y por sector)
  'COMCE15': {
    discount: 15,
    description: 'Socio COMCE - 15% de descuento exclusivo',
    appliesTo: 'ALL', // Especial: aplica a cualquier plan
    maxUses: 1000,
    expiresAt: new Date('2025-12-31'),
    type: 'comce_member'
  }
}

export async function POST(req: NextRequest) {
  try {
    const { couponCode, planId } = await req.json()

    // Validar que se proporcionó un código
    if (!couponCode || !planId) {
      return NextResponse.json(
        { 
          valid: false, 
          error: 'Código de cupón y plan requeridos' 
        },
        { status: 400 }
      )
    }

    // Buscar el cupón (case insensitive)
    const normalizedCode = couponCode.toUpperCase().trim()
    const coupon = COUPONS[normalizedCode as keyof typeof COUPONS]

    // Validar si el cupón existe
    if (!coupon) {
      return NextResponse.json(
        { 
          valid: false, 
          error: 'Código de cupón inválido' 
        },
        { status: 400 }
      )
    }

    // Validar si el cupón ha expirado
    if (new Date() > coupon.expiresAt) {
      return NextResponse.json(
        { 
          valid: false, 
          error: 'Este cupón ha expirado' 
        },
        { status: 400 }
      )
    }

    // Validar si el cupón aplica al plan seleccionado
    if (coupon.appliesTo !== 'ALL' && !coupon.appliesTo.includes(planId)) {
      return NextResponse.json(
        {
          valid: false,
          error: 'Este cupón no es válido para el plan seleccionado'
        },
        { status: 400 }
      )
    }

    // Si todas las validaciones pasan, retornar el cupón válido
    return NextResponse.json({
      valid: true,
      discount: coupon.discount,
      description: coupon.description,
      type: coupon.type,
      code: normalizedCode
    })

  } catch (error) {
    console.error('Error validating coupon:', error)
    return NextResponse.json(
      { 
        valid: false, 
        error: 'Error al validar el cupón' 
      },
      { status: 500 }
    )
  }
}