"use client"

import { BrandIcon } from "@/components/ui/brand-icon"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tag, Percent, Copy, CheckCircle, Shield, Lock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function TestCouponsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const coupons = [
    {
      code: "FK2025-ANALIZA-X7K9M-3QP8N-PREMIUM",
      discount: 50,
      description: "Clientes Premium Finkargo",
      audience: "Exclusivo para clientes que ya operan con Finkargo en su producto financiero",
      color: "text-purple-600 bg-purple-50 border-purple-200",
      bgGradient: "from-purple-500 to-blue-500",
      isSecure: true
    },
    {
      code: "ANALIZA10",
      discount: 10,
      description: "Promoción redes sociales",
      audience: "Para nuevos clientes que llegan por campañas en redes",
      color: "text-blue-600 bg-blue-50 border-blue-200",
      bgGradient: "from-blue-500 to-cyan-500",
      isSecure: false
    }
  ]

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <BrandIcon size="lg" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🎟️ Cupones de Descuento - Testing
            </h1>
            <p className="text-lg text-gray-600">
              Página de prueba para verificar el funcionamiento de los cupones de descuento
            </p>
            <Badge className="mt-4 px-4 py-2">
              Solo aplican para planes anuales
            </Badge>
          </div>

          {/* Coupons */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {coupons.map((coupon, index) => (
              <Card key={index} className="overflow-hidden shadow-xl hover:shadow-2xl transition-all">
                <div className={`h-2 bg-gradient-to-r ${coupon.bgGradient}`} />
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {coupon.isSecure && (
                        <Shield className="w-6 h-6 text-purple-600" />
                      )}
                      Cupón {coupon.discount}%
                    </span>
                    <Badge className={coupon.color}>
                      <Percent className="w-3 h-3 mr-1" />
                      {coupon.discount}% OFF
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    {coupon.description}
                    {coupon.isSecure && (
                      <Badge variant="outline" className="text-xs">
                        <Lock className="w-3 h-3 mr-1" />
                        Código Reforzado
                      </Badge>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-3">{coupon.audience}</p>
                    {coupon.isSecure && (
                      <div className="mb-3 p-2 bg-purple-50 border border-purple-200 rounded text-xs text-purple-700">
                        <strong>🔐 Código de alta seguridad:</strong> Contiene caracteres alfanuméricos y guiones para mayor protección
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <code className={`flex-1 px-4 py-2 bg-white border-2 ${coupon.isSecure ? 'border-solid border-purple-300' : 'border-dashed border-gray-300'} rounded-lg font-mono ${coupon.isSecure ? 'text-sm' : 'text-lg'} text-center break-all`}>
                        {coupon.code}
                      </code>
                      <Button
                        onClick={() => handleCopy(coupon.code)}
                        variant="outline"
                        size="sm"
                        className="min-w-[80px]"
                      >
                        {copiedCode === coupon.code ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-1" />
                            Copiar
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    <p>• Válido hasta: 31/12/2025</p>
                    <p>• Aplicable solo a planes anuales</p>
                    <p>• No acumulable con otras promociones</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Test Instructions */}
          <Card className="mb-12 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Instrucciones de Prueba
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Cómo probar los cupones:</h3>
                <ol className="space-y-2 text-sm text-gray-700">
                  <li>1. Copia uno de los códigos de cupón arriba</li>
                  <li>2. Ve a la página de precios y selecciona el <strong>Plan Anual</strong></li>
                  <li>3. En el checkout, busca la sección "Cupón de descuento"</li>
                  <li>4. Pega el código y haz clic en "Aplicar"</li>
                  <li>5. Verifica que el descuento se aplique correctamente</li>
                </ol>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold mb-2">Notas importantes:</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Los cupones <strong>SOLO</strong> funcionan con planes anuales</li>
                  <li>• El código <strong className="text-purple-600">FK2025-ANALIZA-X7K9M-3QP8N-PREMIUM</strong> da 50% de descuento (alta seguridad)</li>
                  <li>• El código <strong className="text-blue-600">ANALIZA10</strong> da 10% de descuento</li>
                  <li>• Los códigos no son case-sensitive (mayúsculas/minúsculas)</li>
                  <li>• El código de 50% es más largo y complejo por seguridad</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/precios">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 text-lg">
                Ir a Precios y Probar
              </Button>
            </Link>
            <Link href="/checkout-simple?plan=anual&amount=1000000&currency=COP">
              <Button variant="outline" className="px-8 py-3 text-lg">
                Ir Directo al Checkout (Plan Anual)
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}