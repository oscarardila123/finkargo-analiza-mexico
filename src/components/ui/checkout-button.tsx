"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface CheckoutButtonProps {
  plan: string
  amount: number
  currency: string
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline"
}

export function CheckoutButton({ 
  plan, 
  amount, 
  currency, 
  children, 
  className,
  variant = "default"
}: CheckoutButtonProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleCheckout = () => {
    if (status === "loading") return

    if (!session) {
      // Guardar la intención de compra y redirigir al login
      const redirectUrl = `/checkout-simple?plan=${plan}&amount=${amount}&currency=${currency}`
      router.push(`/auth/signin?from=${encodeURIComponent(redirectUrl)}`)
      return
    }

    // Usuario autenticado, ir directamente al checkout
    router.push(`/checkout-simple?plan=${plan}&amount=${amount}&currency=${currency}`)
  }

  return (
    <Button 
      onClick={handleCheckout}
      className={className}
      variant={variant}
      disabled={status === "loading"}
    >
      {children}
    </Button>
  )
}