import { NextRequest, NextResponse } from "next/server"
import { wompiClient } from "@/lib/wompi"

export async function GET(request: NextRequest) {
  try {
    // Test Wompi configuration
    const testPaymentData = {
      amount_in_cents: 100000, // $1,000 COP
      currency: 'COP' as const,
      customer_email: 'test@example.com',
      reference: wompiClient.generateReference('TEST'),
      payment_method: {
        type: 'CARD' as const,
        installments: 1
      },
      customer_data: {
        phone_number: '3001234567',
        full_name: 'Test User'
      },
      redirect_url: `${process.env.NEXTAUTH_URL}/checkout/success`
    }

    const payment = await wompiClient.createPayment(testPaymentData)
    
    return NextResponse.json({
      status: "success",
      message: "Wompi test successful",
      payment,
      config: {
        isTestMode: wompiClient.isTestEnvironment(),
        devMode: process.env.WOMPI_DEV_MODE,
        hasPublicKey: !!process.env.WOMPI_PUBLIC_KEY,
        hasPrivateKey: !!process.env.WOMPI_PRIVATE_KEY,
      }
    })
  } catch (error) {
    console.error("Wompi test error:", error)
    return NextResponse.json(
      { 
        status: "error", 
        message: error instanceof Error ? error.message : "Unknown error",
        config: {
          isTestMode: wompiClient.isTestEnvironment(),
          devMode: process.env.WOMPI_DEV_MODE,
          hasPublicKey: !!process.env.WOMPI_PUBLIC_KEY,
          hasPrivateKey: !!process.env.WOMPI_PRIVATE_KEY,
        }
      },
      { status: 500 }
    )
  }
}