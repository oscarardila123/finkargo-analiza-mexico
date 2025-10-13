"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Settings,
  TestTube,
  Rocket,
  Play,
  AlertTriangle,
  CheckCircle,
  ExternalLink
} from "lucide-react"
import { useState, useEffect } from "react"

interface StripeStatusProps {
  environment?: 'test' | 'production'
  className?: string
}

export function StripeStatus({ environment = 'test', className }: StripeStatusProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="animate-pulse bg-gray-200 h-24 rounded-lg" />
  }

  const environmentConfig = {
    test: {
      emoji: '🧪',
      label: 'Modo de Pruebas',
      description: 'API real de Stripe con datos de prueba',
      color: 'bg-orange-50 text-orange-700 border-orange-200',
      icon: TestTube,
      status: 'warning'
    },
    production: {
      emoji: '🚀',
      label: 'Producción',
      description: 'Ambiente live con pagos reales',
      color: 'bg-green-50 text-green-700 border-green-200',
      icon: Rocket,
      status: 'success'
    }
  }

  const config = environmentConfig[environment]
  const Icon = config.icon

  return (
    <Card className={`${className} ${config.color} border-2`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Icon className="h-4 w-4" />
            Estado de Pagos
          </CardTitle>
          <Badge variant="outline" className={`${config.color} font-medium`}>
            <span className="mr-1">{config.emoji}</span>
            {environment.toUpperCase()}
          </Badge>
        </div>
        <CardDescription className="text-xs">
          Ambiente actual de Stripe
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <div className="font-semibold text-sm mb-1">{config.label}</div>
            <div className="text-xs opacity-80">{config.description}</div>
          </div>

          {environment === 'test' && (
            <div className="flex items-start gap-2 p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
              <div className="text-xs">
                <div className="font-medium text-orange-800">Modo Pruebas</div>
                <div className="text-orange-600">API real, sin dinero real</div>
              </div>
            </div>
          )}

          {environment === 'production' && (
            <div className="flex items-start gap-2 p-2 bg-green-100 rounded-lg">
              <Rocket className="h-4 w-4 text-green-600 mt-0.5" />
              <div className="text-xs">
                <div className="font-medium text-green-800">Ambiente Live</div>
                <div className="text-green-600">Pagos reales activos</div>
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-current/20">
            <Button
              size="sm"
              variant="outline"
              className="w-full h-7 text-xs"
              onClick={() => window.open('https://dashboard.stripe.com/', '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Dashboard Stripe
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
