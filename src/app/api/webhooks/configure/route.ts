import { NextRequest, NextResponse } from 'next/server'
import { getWompiConfig, validateWompiConfig } from '@/lib/wompi-config'

interface ConfigureWebhookRequest {
  url: string
  events: string[]
}

export async function POST(request: NextRequest) {
  try {
    const body: ConfigureWebhookRequest = await request.json()
    const { url, events } = body

    if (!url) {
      return NextResponse.json(
        { error: 'Webhook URL is required' },
        { status: 400 }
      )
    }

    // Obtener configuración de Wompi
    const wompiConfig = getWompiConfig()
    
    if (!validateWompiConfig(wompiConfig)) {
      return NextResponse.json(
        { error: 'Invalid Wompi configuration' },
        { status: 500 }
      )
    }

    console.log('🔗 Configuring webhook with Wompi:', {
      url: url,
      events: events,
      environment: wompiConfig.environment
    })

    // Configurar webhook en Wompi
    const webhookData = {
      url: url,
      events: events || ['transaction.updated']
    }

    const response = await fetch(`${wompiConfig.apiUrl}/webhooks`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${wompiConfig.privateKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(webhookData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('❌ Failed to configure webhook:', errorData)
      return NextResponse.json(
        { 
          error: 'Failed to configure webhook with Wompi',
          details: errorData
        },
        { status: response.status }
      )
    }

    const webhookResponse = await response.json()
    
    console.log('✅ Webhook configured successfully:', webhookResponse)

    return NextResponse.json({
      success: true,
      webhook: webhookResponse.data,
      message: 'Webhook configured successfully'
    })

  } catch (error) {
    console.error('💥 Error configuring webhook:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Obtener webhooks configurados
    const wompiConfig = getWompiConfig()
    
    if (!validateWompiConfig(wompiConfig)) {
      return NextResponse.json(
        { error: 'Invalid Wompi configuration' },
        { status: 500 }
      )
    }

    const response = await fetch(`${wompiConfig.apiUrl}/webhooks`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${wompiConfig.privateKey}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('❌ Failed to get webhooks:', errorData)
      return NextResponse.json(
        { 
          error: 'Failed to get webhooks from Wompi',
          details: errorData
        },
        { status: response.status }
      )
    }

    const webhooksData = await response.json()
    
    return NextResponse.json({
      success: true,
      webhooks: webhooksData.data,
      environment: wompiConfig.environment
    })

  } catch (error) {
    console.error('💥 Error getting webhooks:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}