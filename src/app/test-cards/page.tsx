'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { BrandIcon } from '@/components/ui/brand-icon'
import { 
  CreditCard, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Copy,
  ArrowLeft,
  Shield,
  TestTube,
  Banknote,
  Smartphone,
  Clock,
  Info
} from 'lucide-react'

interface TestCard {
  number: string
  cvv: string
  expiry: string
  result: 'success' | 'decline' | 'insufficient' | 'error'
  description: string
  type: 'credit' | 'debit'
}

const testCards: TestCard[] = [
  {
    number: '4242 4242 4242 4242',
    cvv: '123',
    expiry: '12/29',
    result: 'success',
    description: 'Pago exitoso - Tarjeta de crédito Visa',
    type: 'credit'
  },
  {
    number: '4111 1111 1111 1111',
    cvv: '123',
    expiry: '12/29',
    result: 'success',
    description: 'Pago exitoso - Tarjeta de crédito Visa alternativa',
    type: 'credit'
  },
  {
    number: '5555 5555 5555 4444',
    cvv: '123',
    expiry: '12/29',
    result: 'success',
    description: 'Pago exitoso - Mastercard',
    type: 'credit'
  },
  {
    number: '3714 4963 5398 431',
    cvv: '1234',
    expiry: '12/29',
    result: 'success',
    description: 'Pago exitoso - American Express',
    type: 'credit'
  },
  {
    number: '4000 0000 0000 0002',
    cvv: '123',
    expiry: '12/29',
    result: 'decline',
    description: 'Pago declinado - Tarjeta rechazada',
    type: 'credit'
  },
  {
    number: '4000 0000 0000 9995',
    cvv: '123',
    expiry: '12/29',
    result: 'insufficient',
    description: 'Fondos insuficientes',
    type: 'credit'
  },
  {
    number: '4000 0000 0000 0127',
    cvv: '123',
    expiry: '12/29',
    result: 'error',
    description: 'Error de procesamiento - CVV incorrecto',
    type: 'credit'
  }
]

const pseTestData = {
  email: 'test@wompi.com',
  documentType: 'CC',
  documentNumber: '123456789',
  banks: [
    { name: 'Banco de Prueba PSE', code: 'BANCO_TEST', result: 'success' },
    { name: 'Banco Decline PSE', code: 'BANCO_DECLINE', result: 'decline' },
    { name: 'Banco Timeout PSE', code: 'BANCO_TIMEOUT', result: 'timeout' }
  ]
}

const cashTestData = {
  stores: ['Efecty', 'Baloto', 'PagaTodo'],
  expiryHours: 24,
  note: 'Los pagos en efectivo generan un código de referencia para pagar en tienda física'
}

export default function TestCardsPage() {
  const [copiedCard, setCopiedCard] = useState<string | null>(null)

  const copyToClipboard = (text: string, cardNumber: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCard(cardNumber)
    setTimeout(() => setCopiedCard(null), 2000)
  }

  const getResultIcon = (result: string) => {
    switch(result) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'decline':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'insufficient':
        return <AlertCircle className="h-5 w-5 text-orange-500" />
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getResultBadgeColor = (result: string) => {
    switch(result) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'decline':
        return 'bg-red-100 text-red-800'
      case 'insufficient':
        return 'bg-orange-100 text-orange-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BrandIcon size="md" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tarjetas de Prueba - Wompi</h1>
                <p className="text-gray-600">Documentación para testing de pagos</p>
              </div>
            </div>
            <Link href="/checkout-simple?plan=trimestral">
              <Button>
                <TestTube className="h-4 w-4 mr-2" />
                Ir a Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Alert de modo testing */}
          <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Modo Testing Activo</h3>
            </div>
            <p className="text-blue-800 text-sm">
              Estás usando credenciales de producción con el modo de prueba habilitado. 
              Los pagos no serán procesados realmente y no se realizarán cargos.
            </p>
          </div>

          {/* Tarjetas de Crédito/Débito */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-2xl">Tarjetas de Prueba</CardTitle>
              </div>
              <CardDescription>
                Usa estas tarjetas para simular diferentes escenarios de pago
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {testCards.map((card) => (
                  <div key={card.number} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getResultIcon(card.result)}
                          <span className="font-medium">{card.description}</span>
                          <Badge className={getResultBadgeColor(card.result)}>
                            {card.result === 'success' ? 'ÉXITO' : 
                             card.result === 'decline' ? 'DECLINADO' :
                             card.result === 'insufficient' ? 'SIN FONDOS' : 'ERROR'}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Número:</span>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="font-mono font-bold">{card.number}</code>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(card.number.replace(/\s/g, ''), card.number)}
                              >
                                {copiedCard === card.number ? 
                                  <CheckCircle className="h-3 w-3 text-green-500" /> : 
                                  <Copy className="h-3 w-3" />
                                }
                              </Button>
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-500">CVV:</span>
                            <div className="font-mono font-bold mt-1">{card.cvv}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Vencimiento:</span>
                            <div className="font-mono font-bold mt-1">{card.expiry}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border border-amber-200 bg-amber-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-4 w-4 text-amber-600" />
                  <span className="font-semibold text-amber-900">Datos adicionales para pruebas:</span>
                </div>
                <ul className="mt-2 space-y-1 text-sm text-amber-800">
                  <li>• Nombre: Cualquier nombre (ej: "Juan Pérez")</li>
                  <li>• Email: Cualquier email válido</li>
                  <li>• Teléfono: Cualquier número (ej: 3001234567)</li>
                  <li>• Documento: Cualquier número (ej: 123456789)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* PSE */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Banknote className="h-6 w-6 text-green-600" />
                <CardTitle className="text-2xl">PSE - Pago Seguro en Línea</CardTitle>
              </div>
              <CardDescription>
                Datos de prueba para pagos con PSE
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Datos de usuario PSE:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <div className="font-mono font-bold mt-1">{pseTestData.email}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Tipo de documento:</span>
                      <div className="font-mono font-bold mt-1">{pseTestData.documentType}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Número de documento:</span>
                      <div className="font-mono font-bold mt-1">{pseTestData.documentNumber}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Bancos de prueba disponibles:</h4>
                  <div className="space-y-2">
                    {pseTestData.banks.map((bank) => (
                      <div key={bank.code} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{bank.name}</span>
                          <code className="text-sm text-gray-500">({bank.code})</code>
                        </div>
                        <Badge className={getResultBadgeColor(bank.result)}>
                          {bank.result === 'success' ? 'APROBADO' : 
                           bank.result === 'decline' ? 'RECHAZADO' : 'TIMEOUT'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Efectivo */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Smartphone className="h-6 w-6 text-orange-600" />
                <CardTitle className="text-2xl">Pago en Efectivo</CardTitle>
              </div>
              <CardDescription>
                Información para pagos en efectivo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <span className="font-semibold">Proceso de pago en efectivo:</span>
                  </div>
                  <ol className="space-y-2 text-sm text-gray-700">
                    <li>1. El usuario selecciona pago en efectivo</li>
                    <li>2. Se genera un código de referencia único</li>
                    <li>3. El código expira en {cashTestData.expiryHours} horas</li>
                    <li>4. El usuario paga en cualquier punto autorizado</li>
                    <li>5. La confirmación llega en 15-30 minutos (simulado)</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Puntos de pago disponibles:</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {cashTestData.stores.map((store) => (
                      <div key={store} className="text-center p-3 border rounded-lg bg-gray-50">
                        <span className="font-medium">{store}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-blue-200 bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-800 font-medium">Nota:</span>
                  </div>
                  <p className="text-sm text-blue-700">{cashTestData.note}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Flujos de Prueba */}
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">🧪 Flujos de Prueba Recomendados</CardTitle>
              <CardDescription>
                Escenarios completos para validar la integración
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                    <h4 className="font-semibold text-green-900 mb-2">✅ Flujo Exitoso</h4>
                    <ol className="space-y-1 text-sm text-green-800">
                      <li>1. Ir a <Link href="/checkout-simple?plan=anual" className="underline">checkout con plan anual</Link></li>
                      <li>2. Usar tarjeta: 4242 4242 4242 4242</li>
                      <li>3. Completar pago</li>
                      <li>4. Verificar redirección a página de éxito</li>
                      <li>5. Probar botón de WhatsApp</li>
                    </ol>
                  </div>

                  <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
                    <h4 className="font-semibold text-red-900 mb-2">❌ Flujo de Rechazo</h4>
                    <ol className="space-y-1 text-sm text-red-800">
                      <li>1. Ir a <Link href="/checkout-simple?plan=trimestral" className="underline">checkout con plan trimestral</Link></li>
                      <li>2. Usar tarjeta: 4000 0000 0000 0002</li>
                      <li>3. Intentar pago</li>
                      <li>4. Verificar redirección a página de error</li>
                      <li>5. Probar opciones de recuperación</li>
                    </ol>
                  </div>

                  <div className="p-4 border-l-4 border-orange-500 bg-orange-50 rounded-r-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">⚠️ Flujo de Fondos Insuficientes</h4>
                    <ol className="space-y-1 text-sm text-orange-800">
                      <li>1. Ir a <Link href="/checkout-simple?plan=semestral" className="underline">checkout con plan semestral</Link></li>
                      <li>2. Usar tarjeta: 4000 0000 0000 9995</li>
                      <li>3. Intentar pago</li>
                      <li>4. Verificar mensaje de fondos insuficientes</li>
                      <li>5. Probar con otra tarjeta</li>
                    </ol>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Enlaces Rápidos de Prueba:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/checkout-simple?plan=trimestral&currency=COP&amount=650000">
                      <Button variant="outline" className="w-full">
                        Plan Trimestral - $650,000 COP
                      </Button>
                    </Link>
                    <Link href="/checkout-simple?plan=anual&currency=COP&amount=1000000">
                      <Button variant="outline" className="w-full">
                        Plan Anual - $1,000,000 COP
                      </Button>
                    </Link>
                    <Link href="/checkout/success?reference=TEST_SUCCESS&simulation=true">
                      <Button variant="outline" className="w-full">
                        Ver Página de Éxito (Simulado)
                      </Button>
                    </Link>
                    <Link href="/checkout/failed?reference=TEST_FAILED&error=DECLINED">
                      <Button variant="outline" className="w-full">
                        Ver Página de Error (Simulado)
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer con información adicional */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <Shield className="h-12 w-12" />
                </div>
                <h3 className="text-xl font-bold">Ambiente Seguro de Pruebas</h3>
                <p className="text-blue-100 max-w-2xl mx-auto">
                  Todas las transacciones en este modo son simuladas. No se realizan cargos reales 
                  a las tarjetas y los datos son procesados de forma segura por Wompi con certificación PCI DSS Level 1.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                  <Link href="/checkout-simple?plan=trimestral">
                    <Button variant="secondary" size="lg">
                      <TestTube className="h-5 w-5 mr-2" />
                      Comenzar Pruebas
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="ghost" size="lg" className="text-white hover:text-blue-100">
                      <ArrowLeft className="h-5 w-5 mr-2" />
                      Volver al Inicio
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}