"use client"

import React, { useEffect, useState } from "react"

/**
 * Hook to prevent hydration mismatches by only rendering content after hydration
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}

/**
 * Hook for safe date formatting that prevents hydration mismatches
 */
export function useSafeDate(date: string | Date) {
  const [formattedDate, setFormattedDate] = useState<string>("")
  const isClient = useIsClient()

  useEffect(() => {
    if (isClient) {
      const dateObj = typeof date === "string" ? new Date(date) : date
      setFormattedDate(dateObj.toLocaleDateString('es-CO'))
    }
  }, [date, isClient])

  return isClient ? formattedDate : ""
}

/**
 * Component wrapper that only renders children on the client
 */
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient()
  
  if (!isClient) {
    return null
  }

  return <>{children}</>
}