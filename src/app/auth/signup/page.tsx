"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles, Shield, Check, Home } from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companyEmail: "",
    nit: "",
    address: "",
    city: "",
    phone: "",
    website: "",
    industryType: "",
    companySize: "",
    annualImportValue: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState(1)
  
  const router = useRouter()

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 1) {
      // Validaciones del paso 1
      if (!formData.name.trim()) {
        setError("El nombre completo es obligatorio")
        return
      }
      if (!formData.email.trim()) {
        setError("El correo electrónico es obligatorio")
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Las contraseñas no coinciden")
        return
      }
      if (formData.password.length < 8) {
        setError("La contraseña debe tener al menos 8 caracteres")
        return
      }
      setStep(2)
      setError("")
      return
    }

    // Validaciones del paso 2
    if (!formData.companyName.trim()) {
      setError("El nombre de la empresa es obligatorio")
      return
    }
    if (!formData.nit.trim()) {
      setError("El RFC es obligatorio")
      return
    }
    if (!formData.companyEmail.trim()) {
      setError("El correo empresarial es obligatorio")
      return
    }
    if (!formData.city.trim()) {
      setError("La ciudad es obligatoria")
      return
    }
    if (!formData.phone.trim()) {
      setError("El teléfono es obligatorio")
      return
    }
    if (!formData.industryType.trim()) {
      setError("El tipo de industria es obligatorio")
      return
    }
    if (!formData.companySize.trim()) {
      setError("El tamaño de empresa es obligatorio")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/auth/signin?message=account-created&from=/precios")
      } else {
        const data = await response.json()
        setError(data.message || "Error al crear la cuenta")
      }
    } catch {
      setError("Error al crear la cuenta")
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre completo <span className="text-red-500">*</span></Label>
        <Input
          id="name"
          type="text"
          placeholder="Juan Pérez"
          className="placeholder:text-gray-400"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico <span className="text-red-500">*</span></Label>
        <Input
          id="email"
          type="email"
          placeholder="juan@empresa.com"
          className="placeholder:text-gray-400"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña <span className="text-red-500">*</span></Label>
        <Input
          id="password"
          type="password"
          placeholder="Mínimo 8 caracteres"
          className="placeholder:text-gray-400"
          value={formData.password}
          onChange={(e) => handleInputChange("password", e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar contraseña <span className="text-red-500">*</span></Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirma tu contraseña"
          className="placeholder:text-gray-400"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
          required
        />
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Nombre de la empresa <span className="text-red-500">*</span></Label>
          <Input
            id="companyName"
            type="text"
            placeholder="Mi Empresa SAS"
            className="placeholder:text-gray-400"
            value={formData.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nit">RFC <span className="text-red-500">*</span></Label>
          <Input
            id="nit"
            type="text"
            placeholder="ABC123456XYZ"
            className="placeholder:text-gray-400"
            value={formData.nit}
            onChange={(e) => handleInputChange("nit", e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyEmail">Correo empresarial <span className="text-red-500">*</span></Label>
        <Input
          id="companyEmail"
          type="email"
          placeholder="contacto@empresa.com"
          className="placeholder:text-gray-400"
          value={formData.companyEmail}
          onChange={(e) => handleInputChange("companyEmail", e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Ciudad <span className="text-red-500">*</span></Label>
          <Input
            id="city"
            type="text"
            placeholder="Ciudad de México"
            className="placeholder:text-gray-400"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Teléfono <span className="text-red-500">*</span></Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+52 55 1234 5678"
            className="placeholder:text-gray-400"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="industryType">Tipo de industria <span className="text-red-500">*</span></Label>
        <Input
          id="industryType"
          type="text"
          placeholder="Ej: Textil, Alimentos, Tecnología"
          className="placeholder:text-gray-400"
          value={formData.industryType}
          onChange={(e) => handleInputChange("industryType", e.target.value)}
          required
        />
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="companySize">Tamaño de empresa <span className="text-red-500">*</span></Label>
          <Select value={formData.companySize} onValueChange={(value) => handleInputChange("companySize", value)} required>
            <SelectTrigger className="placeholder:text-gray-400">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent className="z-[9999] bg-white border border-gray-200 shadow-xl">
              <SelectItem value="SMALL">Pequeña (&lt; $100K USD)</SelectItem>
              <SelectItem value="MEDIUM">Mediana ($100K - $1M USD)</SelectItem>
              <SelectItem value="LARGE">Grande (&gt; $1M USD)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="annualImportValue">Volumen anual importación (USD)</Label>
          <Input
            id="annualImportValue"
            type="number"
            placeholder="500000"
            className="placeholder:text-gray-400"
            value={formData.annualImportValue}
            onChange={(e) => handleInputChange("annualImportValue", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <Label htmlFor="address">Dirección</Label>
        <Textarea
          id="address"
          placeholder="Av. Paseo de la Reforma 250, Piso 5, Col. Juárez"
          className="placeholder:text-gray-400"
          value={formData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          rows={2}
        />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-cyan-500 to-purple-600 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
      
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4 z-20">
        <Link href="/">
          <Button 
            variant="ghost" 
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-xl shadow-lg"
          >
            <Home className="h-5 w-5" />
            <span className="hidden sm:inline font-medium">Volver al inicio</span>
            <span className="sm:hidden font-medium">Inicio</span>
          </Button>
        </Link>
      </div>
      
      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Branding */}
          <div className="hidden lg:block text-white space-y-8">
            <div className="flex items-center space-x-3 mb-8">
              <BrandIcon size="lg" />
              <div>
                <span className="text-2xl font-bold">Finkargo</span>
                <span className="text-xl font-semibold ml-2 text-orange-300">Analiza</span>
              </div>
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight">
                Únete a las <span className="text-orange-300">160+ empresas</span><br />
                que transformaron su<br />
                <span className="text-cyan-300">comercio exterior</span>
              </h1>
              <p className="text-xl opacity-90">
                Tu aliado financiero confiable para importaciones inteligentes
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span>14 días de prueba gratuita</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <span>Datos 100% verificados y seguros</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span>ROI garantizado en 30 días</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Form */}
          <Card className="w-full shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center">
              <div className="lg:hidden flex items-center justify-center mb-4">
                <BrandIcon size="md" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">
                Crear cuenta en Finkargo
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                {step === 1 
                  ? "Crea tu cuenta personal para acceder a la plataforma"
                  : "Información de tu empresa para completar el registro"
                }
              </CardDescription>
              <p className="text-sm text-gray-500 mt-2">
                Los campos marcados con <span className="text-red-500">*</span> son obligatorios
              </p>
              <div className="flex justify-center mt-6">
                <div className="flex space-x-3">
                  <div className={`w-4 h-4 rounded-full transition-all ${step >= 1 ? 'bg-blue-600 shadow-lg' : 'bg-gray-300'}`} />
                  <div className={`w-4 h-4 rounded-full transition-all ${step >= 2 ? 'bg-blue-600 shadow-lg' : 'bg-gray-300'}`} />
                </div>
              </div>
            </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit}>
            {step === 1 ? renderStep1() : renderStep2()}
            
            {error && (
              <p className="text-sm text-destructive mb-4">{error}</p>
            )}

            <div className="flex gap-4 mt-6">
              {step === 2 && (
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 transition-all"
                  onClick={() => setStep(1)}
                >
                  Anterior
                </Button>
              )}
              <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando cuenta...
                  </>
                ) : step === 1 ? (
                  "Continuar"
                ) : (
                  "Crear cuenta"
                )}
              </Button>
            </div>
          </form>

          <div className="text-center">
            <span className="text-gray-600">¿Ya tienes cuenta? </span>
            <Link href="/auth/signin" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Inicia sesión aquí
            </Link>
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
    </div>
  )
}