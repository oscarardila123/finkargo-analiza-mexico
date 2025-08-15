# Wompi Payment Testing Guide

## Configuración de Sandbox

### Credenciales configuradas
- **Public Key**: `pub_sandbox_4kMJu-7cPW7_Qa7b6lTiEOKOF-MNJ_c8XNNxsOKyYaI`
- **Private Key**: `prv_sandbox_UxsIcFSb_GQ3XnUDq6Bb6Q9rjLB3XSlQYYccJGGqUKI`
- **Events Secret**: `sandbox_events_secret_ZXZ3YzFjNGY1NjdjMzVlNjIxN`

### Ambiente
- **Sandbox URL**: `https://sandbox.wompi.co/v1`
- **Entorno**: Automáticamente detecta desarrollo (NODE_ENV !== 'production')

## Tarjetas de Prueba

### ✅ Transacciones Aprobadas
- **Visa**: `4242424242424242`
- **Mastercard**: `5555555555554444`
- **American Express**: `378282246310005`

### ❌ Transacciones Rechazadas
- **Fondos insuficientes**: `4000000000000002`
- **Tarjeta robada**: `4000000000000069`
- **Tarjeta vencida**: `4000000000000010`

### 📋 Datos de Prueba
- **Fecha de vencimiento**: Cualquier fecha futura (ej: 12/30)
- **CVV**: Cualquier 3 dígitos (ej: 123)
- **Nombre**: Cualquier nombre

## Métodos de Pago Disponibles

### 💳 Tarjeta de Crédito/Débito
- Visa, Mastercard, American Express
- Débito y crédito
- Cuotas disponibles

### 🏪 PSE (Pagos Seguros en Línea)
- Bancolombia, Banco de Bogotá, BBVA, Davivienda
- Simulación de transferencias bancarias
- Proceso completo de autenticación bancaria

### 📱 Efectivo
- Efecty, Baloto, PagaTodo, Gana
- Genera código de pago
- Simulación de pago en puntos físicos

## Flujo de Testing

### 1. Proceso Local
1. Ir a `/precios` y seleccionar un plan
2. Hacer clic en "Comenzar" → redirige a `/checkout`
3. Completar formulario con datos de prueba
4. Clic en "Completar pago"
5. Ser redirigido a Wompi sandbox
6. Completar pago con tarjetas de prueba

### 2. Verificación
- Revisar logs en consola del servidor
- Verificar creación de registros en base de datos
- Comprobar webhooks (si están configurados)

## Estados de Pago

- **PENDING**: Pago iniciado, esperando confirmación
- **APPROVED**: Pago aprobado exitosamente
- **DECLINED**: Pago rechazado (tarjeta, fondos, etc.)
- **VOIDED**: Pago anulado
- **ERROR**: Error en el procesamiento

## Webhooks (Opcional)

Si quieres configurar webhooks para testing local:

1. Instalar ngrok: `npm install -g ngrok`
2. Exponer puerto local: `ngrok http 3000`
3. Configurar webhook URL en Wompi: `https://tu-url.ngrok.io/api/payments/webhook`

## Montos de Prueba

- **Mínimo**: $1.000 COP
- **Máximo**: $20.000.000 COP
- **IVA**: Calculado automáticamente (19%)

## Troubleshooting

### Error: "Wompi credentials not configured"
- Verificar que las variables estén en `.env.local`
- Reiniciar servidor de desarrollo

### Error: "Payment creation failed"
- Verificar conexión a internet
- Revisar formato de datos enviados
- Comprobar logs del servidor

### Pago no se procesa
- Verificar que estés usando tarjetas de prueba válidas
- Comprobar que el monto sea mayor a $1.000 COP
- Revisar logs de Wompi en dashboard

## URLs Importantes

- **Dashboard Wompi**: https://comercios.wompi.co/
- **Documentación**: https://docs.wompi.co/
- **Soporte**: soporte@wompi.co