"use client"

import { useEffect } from 'react'

// Known Google Drive embed warnings that don't affect functionality
const GOOGLE_DRIVE_WARNINGS = [
  'Refused to display',
  'in a frame because it set \'X-Frame-Options\'',
  'blocked by CORS policy',
  'google.com refused to connect',
  'drive.google.com refused to connect',
  'Mixed Content',
  'Permissions-Policy header',
  'Feature policy',
  'Cross-Origin-Embedder-Policy',
  'Cross-Origin-Opener-Policy',
  'SharedArrayBuffer',
  'Failed to load resource: the server responded with a status of 401',
  'Failed to load resource: the server responded with a status of 403',
  'net::ERR_BLOCKED_BY_CLIENT',
  'net::ERR_FAILED'
]

export function ConsoleErrorFilter() {
  useEffect(() => {
    // Store original console methods
    const originalError = console.error
    const originalWarn = console.warn
    const originalLog = console.log

    // Filter console.error
    console.error = (...args: any[]) => {
      const message = args.join(' ')
      const shouldFilter = GOOGLE_DRIVE_WARNINGS.some(warning => 
        message.includes(warning)
      )
      
      if (!shouldFilter) {
        originalError.apply(console, args)
      }
    }

    // Filter console.warn
    console.warn = (...args: any[]) => {
      const message = args.join(' ')
      const shouldFilter = GOOGLE_DRIVE_WARNINGS.some(warning => 
        message.includes(warning)
      )
      
      if (!shouldFilter) {
        originalWarn.apply(console, args)
      }
    }

    // Optional: Filter console.log for Google Drive related messages
    console.log = (...args: any[]) => {
      const message = args.join(' ')
      const shouldFilter = GOOGLE_DRIVE_WARNINGS.some(warning => 
        message.includes(warning)
      )
      
      if (!shouldFilter) {
        originalLog.apply(console, args)
      }
    }

    // Cleanup function to restore original console methods
    return () => {
      console.error = originalError
      console.warn = originalWarn
      console.log = originalLog
    }
  }, [])

  return null // This component doesn't render anything
}