'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Loader2, AlertCircle, BarChart3, RefreshCw, Sparkles, ExternalLink, Maximize2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface StreamlitReportViewerProps {
  email: string
  isAdmin?: boolean
  reportType?: 'imports' | 'exports' // Para México: URLs separadas
}

export default function StreamlitReportViewer({
  email,
  isAdmin,
  reportType = 'imports'
}: StreamlitReportViewerProps) {
  const pathname = usePathname()
  const isFullscreen = pathname?.includes('/fullscreen')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)

  // Determinar URL según el tipo de reporte (México tiene URLs separadas)
  const getReportUrl = () => {
    // Para usuarios ADMIN, usar email de demostración de México
    const emailToUse = isAdmin ? 'rcarlosospina9@gmail.com' : email

    // URLs para México
    if (reportType === 'exports') {
      return `https://analizaexp-production.finkargo.com.mx/?email=${encodeURIComponent(emailToUse)}`
    }
    return `https://analiza-production.finkargo.com.mx/?email=${encodeURIComponent(emailToUse)}`
  }

  const reportUrl = getReportUrl()

  useEffect(() => {
    setIsLoading(true)
    setHasError(false)
  }, [reportUrl])

  // Timer para detectar si el iframe no carga (30 segundos)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setHasError(true)
        setIsLoading(false)
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [isLoading])

  const handleIframeLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const handleRetry = () => {
    setIsLoading(true)
    setHasError(false)
    setIframeKey(prev => prev + 1)
  }

  return (
    <div className={`w-full relative bg-white overflow-hidden ${isFullscreen ? 'h-screen' : 'rounded-2xl shadow-lg border border-gray-200'}`}>
      {/* Estado de Carga */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 z-10">
          <div className="text-center space-y-6 max-w-md px-4">
            <div className="relative">
              <div className="w-20 h-20 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-cyan to-brand-coral rounded-full opacity-20 blur-xl animate-pulse"></div>
                <Loader2 className="h-20 w-20 animate-spin text-brand-navy mx-auto relative z-10" />
              </div>
            </div>

            <div className="space-y-3">
              <Badge className="mb-3 px-6 py-2 bg-gradient-to-r from-brand-coral/10 to-brand-cyan/10 text-brand-navy-dark border border-brand-navy/20 mx-auto shadow-lg">
                <BarChart3 className="inline h-4 w-4 mr-2" />
                CARGANDO REPORTE
              </Badge>

              <h3 className="text-2xl font-bold text-gray-900">
                Preparando tu Reporte de <span className="text-brand-navy">Analiza</span>
              </h3>
              <p className="text-base text-gray-600">
                Por favor espera mientras cargamos tu información personalizada con datos oficiales de Aduanas
              </p>
            </div>

            {isAdmin && (
              <div className="mt-6 px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 text-brand-navy-dark text-sm rounded-xl border border-blue-200 shadow-sm">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-semibold">Vista administrativa: Reporte de demostración</span>
                </div>
              </div>
            )}

            <div className="w-64 mx-auto">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-brand-navy via-brand-cyan to-brand-coral rounded-full animate-pulse" style={{width: '70%'}}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estado de Error */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 z-10 p-6">
          <div className="max-w-xl w-full">
            <div className="business-card-elevated border-l-4 border-l-red-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100/50 to-transparent rounded-full blur-2xl"></div>

              <div className="p-8 relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <AlertCircle className="h-8 w-8 text-white" />
                  </div>
                </div>

                <h2 className="heading-lg text-gray-900 text-center mb-4">
                  No se pudo cargar el reporte
                </h2>

                <p className="body-md text-gray-700 text-center mb-6">
                  El servicio de reportes no está disponible en este momento. Esto puede deberse a:
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-gray-600">1</span>
                    </div>
                    <p className="text-sm text-gray-700">Mantenimiento temporal del servicio</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-gray-600">2</span>
                    </div>
                    <p className="text-sm text-gray-700">Problemas de conectividad</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-gray-600">3</span>
                    </div>
                    <p className="text-sm text-gray-700">El servicio está procesando tu reporte</p>
                  </div>
                </div>

                <button
                  onClick={handleRetry}
                  className="w-full px-6 py-4 bg-gradient-to-r from-brand-navy via-blue-600 to-brand-navy hover:from-brand-navy-dark hover:to-blue-700 text-white rounded-xl transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="h-5 w-5" />
                  Reintentar
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Si el problema persiste, contacta a soporte
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Iframe */}
      <iframe
        key={iframeKey}
        src={reportUrl}
        className="w-full border-0"
        title="Reporte de Analiza - Streamlit"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        allow="camera; microphone; clipboard-write"
        sandbox="allow-same-origin allow-scripts allow-forms allow-downloads allow-popups allow-popups-to-escape-sandbox"
        style={{
          height: isFullscreen ? '100vh' : '1400px',
          minHeight: isFullscreen ? '100vh' : '1400px',
        }}
      />

      {/* Botón Ver en Pantalla Completa */}
      {!isLoading && !hasError && !isFullscreen && (
        <a
          href="/reporte/fullscreen"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-6 right-6 z-[100] inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-sm whitespace-nowrap"
        >
          <Maximize2 className="h-5 w-5 flex-shrink-0" />
          <span className="font-bold">Ver en Pantalla Completa</span>
        </a>
      )}

      {/* Info Bar */}
      {!isLoading && !hasError && !isFullscreen && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-navy/10 via-brand-navy/5 to-transparent p-3 text-center backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-3 w-3 text-brand-cyan" />
            <p className="text-xs text-gray-700 font-medium">
              Reporte generado por <span className="font-bold text-brand-navy">Finkargo Analiza</span>
              {isAdmin && ' • Vista administrativa'}
            </p>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            ¿Tienes problemas visualizando el reporte? <a
              href="https://api.whatsapp.com/send?phone=573222235280&text=Hola%2C%20tengo%20problemas%20visualizando%20mi%20reporte%20de%20Analiza"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-navy hover:underline font-medium"
            >
              Contáctanos por WhatsApp
            </a>
          </p>
        </div>
      )}
    </div>
  )
}
