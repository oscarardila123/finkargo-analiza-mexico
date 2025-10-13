# Guía de Configuración de Stripe para Finkargo Analiza México

## 🎯 Resumen de la Integración

Hemos migrado completamente de **Wompi** (Colombia) a **Stripe** (México) para procesar pagos en la plataforma Finkargo Analiza México.

---

## ✅ Trabajo Completado

### 1. **Instalación de Paquetes**
- ✅ Instalado `stripe` (SDK de servidor)
- ✅ Instalado `@stripe/stripe-js` (SDK de cliente)

### 2. **Archivos Creados**

#### Configuración y Cliente
- ✅ `/src/lib/stripe-config.ts` - Configuración de credenciales
- ✅ `/src/lib/stripe.ts` - Cliente de Stripe con funciones de utilidad

#### Rutas API
- ✅ `/src/app/api/stripe/create-checkout-session/route.ts` - Crear sesiones de checkout
- ✅ `/src/app/api/webhooks/stripe/route.ts` - Procesar webhooks de Stripe

#### Componentes UI
- ✅ `/src/components/ui/stripe-status.tsx` - Indicador de estado de Stripe

### 3. **Archivos Actualizados**

#### Páginas
- ✅ `/src/app/precios/page.tsx` - Cambiado "Powered by Wompi" → "Powered by Stripe"
- ✅ `/src/app/checkout-simple/page.tsx` - Integración completa con Stripe
  - API endpoint: `/api/wompi/create-link` → `/api/stripe/create-checkout-session`
  - Mensajes de seguridad: "Wompi" → "Stripe"
  - Trust indicators: "Wompi Certified" → "Stripe Certified"

#### Variables de Entorno
- ✅ `.env` - Agregadas variables de Stripe:
  ```env
  STRIPE_ENVIRONMENT="test"
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
  STRIPE_SECRET_KEY="sk_test_..."
  STRIPE_WEBHOOK_SECRET="whsec_..."
  IVA_RATE_MX="0.16"
  ```

---

## 🔑 Cómo Obtener tus API Keys de Stripe

### Paso 1: Crear Cuenta en Stripe

1. Ve a https://dashboard.stripe.com/register
2. Regístrate con tu email empresarial
3. Completa la verificación de identidad
4. Selecciona **México** como tu país

### Paso 2: Obtener API Keys de Prueba

1. Inicia sesión en https://dashboard.stripe.com/
2. Verifica que estás en **Modo de Prueba** (toggle en la esquina superior derecha)
3. Ve a **Developers** → **API keys**
4. Encontrarás dos keys:
   - **Publishable key** (empieza con `pk_test_...`)
   - **Secret key** (empieza con `sk_test_...`) - Click en "Reveal test key"

### Paso 3: Configurar Webhook Secret

1. Ve a **Developers** → **Webhooks**
2. Click en **"Add endpoint"**
3. Ingresa tu URL de webhook:
   - Local: `http://localhost:3000/api/webhooks/stripe`
   - Producción: `https://tu-dominio.com/api/webhooks/stripe`
4. Selecciona los siguientes eventos:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click en **"Add endpoint"**
6. En la página del endpoint, revela el **Signing secret** (empieza con `whsec_...`)

### Paso 4: Actualizar Variables de Entorno

Abre el archivo `.env` y actualiza las siguientes variables:

```env
# Stripe (México - Modo Pruebas)
STRIPE_ENVIRONMENT="test"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_TU_KEY_AQUI"
STRIPE_SECRET_KEY="sk_test_TU_KEY_AQUI"
STRIPE_WEBHOOK_SECRET="whsec_TU_SECRET_AQUI"
```

### Paso 5: Reiniciar el Servidor

```bash
# Detén el servidor (Ctrl+C)
# Reinicia el servidor
npm run dev
```

---

## 🧪 Probar la Integración

### Tarjetas de Prueba de Stripe

Stripe proporciona tarjetas de prueba para simular diferentes escenarios:

#### ✅ Pago Exitoso
```
Número: 4242 4242 4242 4242
Fecha: Cualquier fecha futura
CVC: Cualquier 3 dígitos
ZIP: Cualquier código postal
```

#### ❌ Pago Declinado
```
Número: 4000 0000 0000 0002
Fecha: Cualquier fecha futura
CVC: Cualquier 3 dígitos
```

#### 🔐 Requiere Autenticación 3D Secure
```
Número: 4000 0025 0000 3155
Fecha: Cualquier fecha futura
CVC: Cualquier 3 dígitos
```

### Flujo de Prueba Completo

1. Ve a http://localhost:3000/precios
2. Selecciona un plan (ej: Plan Anual)
3. Haz click en "Comenzar Ahora"
4. Si no has iniciado sesión, regístrate o inicia sesión
5. Serás redirigido a `/checkout-simple`
6. Click en "Completar pago"
7. Serás redirigido a Stripe Checkout
8. Usa una tarjeta de prueba
9. Completa el pago
10. Deberías ser redirigido a `/checkout/success`

---

## 🚀 Migrar a Producción

### Cuando estés listo para procesar pagos reales:

1. **Completa la verificación de tu cuenta** en el Dashboard de Stripe
2. **Obtén las API keys de producción**:
   - Cambia a **Modo Live** en el dashboard
   - Ve a **Developers** → **API keys**
   - Copia las keys de producción (`pk_live_...` y `sk_live_...`)
3. **Configura el webhook de producción**:
   - Crea un nuevo endpoint con tu URL de producción
   - Copia el nuevo `whsec_...` de producción
4. **Actualiza las variables de entorno de producción**:
   ```env
   STRIPE_ENVIRONMENT="production"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
   STRIPE_SECRET_KEY="sk_live_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   ```

---

## 📊 Características Implementadas

### ✅ Funcionalidades de Pago

- [x] Crear sesiones de Stripe Checkout
- [x] Procesar pagos con tarjeta de crédito/débito
- [x] Calcular IVA mexicano (16%)
- [x] Aplicar cupones de descuento
- [x] Webhooks para confirmar pagos
- [x] Activación automática de suscripciones
- [x] Redirección post-pago

### ✅ Métodos de Pago Soportados

- **Tarjetas**: Visa, Mastercard, American Express
- **Futuros** (fácil de agregar):
  - OXXO (efectivo)
  - SPEI (transferencia bancaria)

### ✅ Monedas Soportadas

- **MXN** (Pesos Mexicanos) - Principal
- **USD** (Dólares) - Opcional

---

## 🔒 Seguridad

- ✅ Verificación de firmas de webhook con `whsec_...`
- ✅ Autenticación de usuarios con NextAuth
- ✅ Certificación PCI DSS Level 1 (manejado por Stripe)
- ✅ Encriptación SSL/TLS
- ✅ No almacenamos datos de tarjetas (manejado por Stripe)

---

## 📝 Próximos Pasos Opcionales

1. **Configurar notificaciones por email** cuando un pago sea exitoso
2. **Agregar métodos de pago adicionales** (OXXO, SPEI)
3. **Implementar manejo de reembolsos** desde el dashboard
4. **Configurar suscripciones recurrentes** si se requiere
5. **Agregar soporte para múltiples monedas**

---

## 🆘 Troubleshooting

### Error: "Stripe secret key not configured"
**Solución**: Verifica que `STRIPE_SECRET_KEY` esté configurado en `.env`

### Error: "Invalid webhook signature"
**Solución**: Verifica que `STRIPE_WEBHOOK_SECRET` sea correcto

### Error: "No se recibió URL de pago"
**Solución**: Revisa los logs del servidor para ver el error específico de Stripe

### Pago no se confirma automáticamente
**Solución**: Verifica que el webhook esté configurado correctamente y los eventos estén seleccionados

---

## 📚 Recursos

- **Stripe Dashboard**: https://dashboard.stripe.com/
- **Documentación de Stripe**: https://docs.stripe.com/
- **API Reference**: https://docs.stripe.com/api
- **Stripe Checkout Docs**: https://docs.stripe.com/checkout/quickstart
- **Webhooks Guide**: https://docs.stripe.com/webhooks
- **Test Cards**: https://docs.stripe.com/testing#cards

---

**¿Necesitas ayuda?** Contacta al equipo de soporte de Stripe en https://support.stripe.com/

---

Generated with Claude Code on 2025-10-10
