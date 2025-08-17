import { NextRequest, NextResponse } from 'next/server'

const FINKARGO_URLS: Record<string, string> = {
  'sobre-nosotros': 'https://www.finkargo.com/nosotros/',
  'blog': 'https://devsite.finkargo.com/blog/',
  'politicas-privacidad': 'https://www.finkargo.com/politicas_privacidad/',
  'aviso-privacidad': 'https://www.finkargo.com/aviso_privacidad/',
  'terminos-condiciones': 'https://devsite.finkargo.com/terminos-condiciones-servicios-analiza/',
  'datos-sensibles': 'https://www.finkargo.com/tratamiento_datos_sensibles/',
  'datos-personales': 'https://www.finkargo.com/tratamiento_datos_personales/'
}

export async function GET(
  request: NextRequest,
  { params }: { params: { page: string } }
) {
  const { page } = params
  const targetUrl = FINKARGO_URLS[page]

  if (!targetUrl) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 })
  }

  try {
    // Attempt to fetch the content and redirect
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Finkargo-Analiza-Proxy/1.0)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.8,en;q=0.5',
        'Cache-Control': 'no-cache'
      },
      redirect: 'follow'
    })

    if (response.ok) {
      // If successful, redirect to the original URL
      return NextResponse.redirect(targetUrl)
    } else {
      // If failed, return error
      return NextResponse.json(
        { error: `Failed to access ${targetUrl}`, status: response.status },
        { status: 502 }
      )
    }
  } catch (error) {
    console.error('Proxy error:', error)
    // Fallback: redirect anyway, let the user's browser handle it
    return NextResponse.redirect(targetUrl)
  }
}