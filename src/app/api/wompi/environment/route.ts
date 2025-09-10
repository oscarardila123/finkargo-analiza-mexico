import { NextResponse } from 'next/server'
import { getWompiEnvironment, getWompiEnvironmentLabel } from '@/lib/wompi-server'

export async function GET() {
  return NextResponse.json({
    environment: getWompiEnvironment(),
    label: getWompiEnvironmentLabel()
  })
}