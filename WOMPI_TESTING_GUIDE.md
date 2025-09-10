# 🧪 Guía de Pruebas - Integración Wompi

## 📋 Resumen Rápido

El sistema está configurado en **modo testing** con credenciales de producción. Esto significa:
- ✅ Usas la API real de producción de Wompi
- ✅ Las transacciones son simuladas (no se hacen cargos reales)
- ✅ Puedes probar todos los flujos de pago de forma segura

## 🚀 Cómo Hacer Pruebas

### 1. Prueba Rápida de Pago Exitoso

1. **Visita el checkout:**
   ```
   http://localhost:3000/checkout-simple?plan=trimestral
   ```

2. **En la página de Wompi, usa estos datos:**
   - **Tarjeta:** `4242 4242 4242 4242`
   - **CVV:** `123`
   - **Fecha:** `12/29`
   - **Nombre:** Cualquier nombre
   - **Email:** Cualquier email válido
   - **Teléfono:** Cualquier número (ej: 3001234567)

3. **Resultado esperado:**
   - Redirección a `/checkout/success`
   - Botón de WhatsApp para contactar a Finkargo
   - Mensaje de confirmación del pago

### 2. Prueba de Pago Rechazado

1. **Usa esta tarjeta para simular rechazo:**
   - **Tarjeta:** `4000 0000 0000 0002`
   - **CVV:** `123`
   - **Fecha:** `12/29`

2. **Resultado esperado:**
   - Redirección a `/checkout/failed`
   - Opciones para reintentar el pago
   - Contacto de soporte por WhatsApp

## 💳 Tarjetas de Prueba Disponibles

### ✅ Pagos Exitosos
| Tarjeta | CVV | Fecha | Tipo |
|---------|-----|-------|------|
| `4242 4242 4242 4242` | 123 | 12/29 | Visa |
| `4111 1111 1111 1111` | 123 | 12/29 | Visa |
| `5555 5555 5555 4444` | 123 | 12/29 | Mastercard |
| `3714 4963 5398 431` | 1234 | 12/29 | Amex |

### ❌ Pagos Fallidos
| Tarjeta | CVV | Fecha | Resultado |
|---------|-----|-------|-----------|
| `4000 0000 0000 0002` | 123 | 12/29 | Rechazado |
| `4000 0000 0000 9995` | 123 | 12/29 | Fondos insuficientes |
| `4000 0000 0000 0127` | 123 | 12/29 | Error CVV |

## 🏦 Pruebas con PSE

Para probar pagos con PSE, usa estos datos:
- **Email:** `test@wompi.com`
- **Documento:** `CC - 123456789`
- **Banco:** Selecciona "Banco de Prueba PSE" para pago exitoso

## 📱 Flujo Completo de Usuario

1. **Registro/Login:**
   - Usuario se registra o inicia sesión
   - Sistema valida autenticación

2. **Selección de Plan:**
   - Usuario visita `/precios`
   - Selecciona un plan (Trimestral, Semestral, Anual)
   - Click en "Comenzar ahora"

3. **Checkout:**
   - Redirección a `/checkout-simple`
   - Muestra resumen del plan
   - Click en "Completar pago"

4. **Pago en Wompi:**
   - Redirección a checkout de Wompi
   - Usuario ingresa datos de pago
   - Wompi procesa el pago

5. **Confirmación:**
   - **Si exitoso:** → `/checkout/success`
     - Mensaje de confirmación
     - Botón para contactar por WhatsApp
     - Instrucciones de activación manual
   
   - **Si falla:** → `/checkout/failed`
     - Mensaje de error
     - Opciones para reintentar
     - Soporte por WhatsApp

## 🔧 Configuración de Ambiente

### Variables de Entorno Actuales
```env
WOMPI_ENVIRONMENT="testing"  # Modo de pruebas con producción
WOMPI_PUBLIC_KEY="pub_prod_3alUrDm4IwEqxStCUUcEGRwcLRch22qv"
WOMPI_PRIVATE_KEY="prv_prod_BLCMTH788oW1tVVUesBuUmHsVNshOwG0"
```

### Cambiar entre Ambientes
```env
# Para Sandbox (datos falsos)
WOMPI_ENVIRONMENT="sandbox"

# Para Producción real (pagos reales)
WOMPI_ENVIRONMENT="production"

# Para Testing (producción + simulación)
WOMPI_ENVIRONMENT="testing"
```

## 📝 Notas Importantes

1. **No se hacen cargos reales** en modo testing
2. **WhatsApp de contacto:** +57 (322) 223-5280
3. **Activación manual:** Después del pago, el equipo de Finkargo activa la cuenta manualmente
4. **Sin factura automática:** La generación de facturas aún no está disponible

## 🎯 Enlaces Útiles para Testing

- **Página de tarjetas de prueba:** http://localhost:3000/test-cards
- **Checkout Plan Trimestral:** http://localhost:3000/checkout-simple?plan=trimestral
- **Checkout Plan Anual:** http://localhost:3000/checkout-simple?plan=anual
- **Página de éxito (simulada):** http://localhost:3000/checkout/success?reference=TEST
- **Página de error (simulada):** http://localhost:3000/checkout/failed?reference=TEST&error=DECLINED

## 🐛 Solución de Problemas

### Error: "La firma es inválida"
- Verifica que `WOMPI_INTEGRITY_SECRET` esté correctamente configurado
- La firma debe generarse como: `reference + amountInCents + COP + integritySecret`

### Error: "Credenciales inválidas"
- Verifica que estés usando las credenciales correctas para el ambiente
- Asegúrate de que el Bearer token se esté enviando correctamente

### Página queda cargando
- Revisa la consola del navegador para errores
- Verifica que el servidor esté corriendo (`npm run dev`)
- Revisa los logs del servidor para más detalles

## 📞 Soporte

Si encuentras problemas durante las pruebas:
1. Revisa esta documentación
2. Verifica los logs del servidor
3. Contacta al equipo de desarrollo
4. Para soporte de Wompi: https://docs.wompi.com

---

**Última actualización:** Enero 2025
**Ambiente actual:** Testing (Producción + Simulación)