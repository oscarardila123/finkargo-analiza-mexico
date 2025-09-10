# Configuración de Wompi para Finkargo Analiza

## Ambientes Disponibles

### 1. 🎭 Simulación Local (`simulation`)
- **Uso**: Desarrollo local sin costos
- **Funcionalidad**: Pagos simulados, no se hacen llamadas reales a Wompi
- **Ideal para**: Desarrollo de features, pruebas de UI/UX
- **Configuración en `.env.local`**:
```bash
WOMPI_ENVIRONMENT="simulation"
```

### 2. 🧪 Sandbox (`sandbox`)
- **Uso**: Pruebas con API real de Wompi pero sin dinero real
- **Funcionalidad**: Llamadas reales a la API de Wompi sandbox
- **Ideal para**: Pruebas de integración, QA, demo a clientes
- **Configuración en `.env.local`**:
```bash
WOMPI_ENVIRONMENT="sandbox"
WOMPI_PUBLIC_KEY="pub_test_YOUR_SANDBOX_PUBLIC_KEY"
WOMPI_PRIVATE_KEY="prv_test_YOUR_SANDBOX_PRIVATE_KEY"
WOMPI_EVENTS_SECRET="YOUR_SANDBOX_EVENTS_SECRET"
```

### 3. 🚀 Producción (`production`)
- **Uso**: Ambiente live con pagos reales
- **Funcionalidad**: Transacciones reales con dinero real
- **Ideal para**: Ambiente de producción
- **Configuración en `.env.local`**:
```bash
WOMPI_ENVIRONMENT="production"
WOMPI_PUBLIC_KEY="pub_prod_YOUR_PRODUCTION_PUBLIC_KEY"
WOMPI_PRIVATE_KEY="prv_prod_YOUR_PRODUCTION_PRIVATE_KEY"
WOMPI_EVENTS_SECRET="YOUR_PRODUCTION_EVENTS_SECRET"
```

## Instrucciones de Cambio de Ambiente

### Para Activar Sandbox (Pruebas)
1. Obtén tus credenciales sandbox de [Wompi Dashboard](https://comercios.wompi.co/)
2. En tu `.env.local`:
   ```bash
   WOMPI_ENVIRONMENT="sandbox"
   WOMPI_PUBLIC_KEY="pub_test_TU_CLAVE_PUBLICA_SANDBOX"
   WOMPI_PRIVATE_KEY="prv_test_TU_CLAVE_PRIVADA_SANDBOX"
   WOMPI_EVENTS_SECRET="TU_SECRET_DE_EVENTOS_SANDBOX"
   ```
3. Reinicia el servidor: `npm run dev`
4. Verifica que aparece "🧪 Sandbox (Pruebas)" en el header del checkout

### Para Activar Producción
1. Obtén tus credenciales de producción de [Wompi Dashboard](https://comercios.wompi.co/)
2. En tu `.env.local`:
   ```bash
   WOMPI_ENVIRONMENT="production"
   WOMPI_PUBLIC_KEY="pub_prod_TU_CLAVE_PUBLICA_PRODUCCION"
   WOMPI_PRIVATE_KEY="prv_prod_TU_CLAVE_PRIVADA_PRODUCCION"
   WOMPI_EVENTS_SECRET="TU_SECRET_DE_EVENTOS_PRODUCCION"
   ```
3. Reinicia el servidor
4. Verifica que aparece "🚀 Producción" en el header del checkout

## Características de Cada Ambiente

| Característica | Simulación | Sandbox | Producción |
|---------------|------------|---------|------------|
| Llamadas API a Wompi | ❌ No | ✅ Sí | ✅ Sí |
| Dinero real | ❌ No | ❌ No | ✅ Sí |
| Tarjetas de prueba | ❌ N/A | ✅ Sí | ❌ No |
| Webhooks | ❌ Simulados | ✅ Reales | ✅ Reales |
| Costos Wompi | ❌ No | ❌ No | ✅ Sí |
| Ideal para | Desarrollo | Testing | Live |

## Tarjetas de Prueba para Sandbox

### Visa de Prueba
- **Número**: 4242424242424242
- **CVC**: 123
- **Fecha**: Cualquier fecha futura
- **Resultado**: Aprobado

### Mastercard de Prueba
- **Número**: 5555555555554444
- **CVC**: 123
- **Fecha**: Cualquier fecha futura
- **Resultado**: Aprobado

### Tarjeta Rechazada
- **Número**: 4000000000000002
- **CVC**: 123
- **Fecha**: Cualquier fecha futura
- **Resultado**: Rechazado

## Verificación del Estado Actual

El indicador visual en el header del checkout muestra el ambiente actual:
- 🎭 **Simulación Local**: Modo desarrollo sin Wompi real
- 🧪 **Sandbox (Pruebas)**: Usando API sandbox de Wompi
- 🚀 **Producción**: Usando API de producción de Wompi

## Logs y Debugging

En cada ambiente, se generan logs específicos:
- **Simulación**: `🎭 WOMPI SIMULATION MODE - Creating fake payment`
- **Sandbox**: `🚀 WOMPI SANDBOX MODE - Creating real payment`
- **Producción**: `🚀 WOMPI PRODUCTION MODE - Creating real payment`

## URLs de Wompi

- **Dashboard Comercios**: https://comercios.wompi.co/
- **Documentación API**: https://docs.wompi.co/
- **Sandbox Dashboard**: https://sandbox.wompi.co/
- **Status Page**: https://status.wompi.co/

## Webhooks Configuration

Para ambientes sandbox y producción, configura los webhooks en Wompi Dashboard:

**Endpoint**: `https://tu-dominio.com/api/payments/webhook`
**Eventos**: `transaction.updated`

## Contacto de Soporte

- **Email Wompi**: soporte@wompi.co
- **Documentación**: https://docs.wompi.co/
- **Community**: https://community.wompi.co/