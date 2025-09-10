import { NextRequest, NextResponse } from 'next/server'
import { getWompiConfig, validateWompiConfig } from '@/lib/wompi-config'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const paymentId = searchParams.get('payment_id')
    
    if (!paymentId) {
      return NextResponse.json(
        { error: 'Payment ID is required' },
        { status: 400 }
      )
    }

    // Obtener configuración de Wompi
    const wompiConfig = getWompiConfig()
    
    if (!validateWompiConfig(wompiConfig)) {
      return NextResponse.json(
        { error: 'Configuración de Wompi inválida' },
        { status: 500 }
      )
    }

    // URL de la API según la configuración
    const apiUrl = `${wompiConfig.apiUrl}/transactions/${paymentId}`
    
    console.log('🔍 Fetching payment from Wompi:', {
      url: apiUrl,
      environment: wompiConfig.environment,
      paymentId,
      testMode: wompiConfig.isTestMode
    })
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${wompiConfig.privateKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      console.error('Error fetching payment from Wompi:', response.status, response.statusText)
      return NextResponse.json(
        { error: 'Failed to verify payment with Wompi' },
        { status: response.status }
      )
    }

    const paymentData = await response.json()
    
    console.log('📊 Payment verification result:', {
      id: paymentData.data?.id,
      status: paymentData.data?.status,
      reference: paymentData.data?.reference
    })

    return NextResponse.json({
      success: true,
      payment: paymentData.data
    })

  } catch (error) {
    console.error('💥 Error verifying payment:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}