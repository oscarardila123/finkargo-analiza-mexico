# 🚀 Quick Start - Deployment a Vercel y Supabase

## 📚 Documentos Creados

He creado los siguientes archivos para ayudarte con el deployment:

1. **`DEPLOYMENT_GUIDE.md`** - Guía completa paso a paso
2. **`DATABASE_MIGRATION_NOTE.md`** - Información sobre migración SQLite → PostgreSQL
3. **`.env.production.example`** - Variables de entorno para producción
4. **`.env.staging.example`** - Variables de entorno para staging
5. **`scripts/generate-secret.js`** - Script para generar NEXTAUTH_SECRET

---

## 🎯 Pasos Rápidos para Deployment

### 1️⃣ Configurar Supabase (Base de Datos)

1. Ve a [https://supabase.com](https://supabase.com) y crea una cuenta
2. Click en **"New Project"**
3. Configura:
   - Name: `finkargo-analiza-mexico`
   - Password: Genera y guarda una contraseña segura
   - Region: `North America (us-east-1)`
4. Espera ~2 minutos a que el proyecto se cree
5. Ve a **Settings** → **Database** → **Connection string**
6. Copia el connection string y guárdalo:
   ```
   postgresql://postgres.[REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

### 2️⃣ Generar Secret para NextAuth

En tu terminal:
```bash
node scripts/generate-secret.js
```
Copia el secret generado.

### 3️⃣ Configurar Vercel (Hosting)

1. Ve a [https://vercel.com](https://vercel.com) y haz login
2. Click **"Add New..."** → **"Project"**
3. Importa el repositorio: `finkargo-analiza-mexico`
4. **NO HAGAS CLICK EN DEPLOY AÚN**

### 4️⃣ Configurar Variables de Entorno en Vercel

En la sección **Environment Variables**, agrega estas variables marcando **Production**:

#### Base de Datos
```
DATABASE_URL
```
Valor: El connection string de Supabase + `?pgbouncer=true&connection_limit=1`

Ejemplo completo:
```
postgresql://postgres.abcdefgh:tu-password@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

#### NextAuth
```
NEXTAUTH_URL=https://finkargo-analiza.vercel.app
NEXTAUTH_SECRET=[EL_SECRET_QUE_GENERASTE]
```

#### Stripe Producción
```
STRIPE_ENVIRONMENT=production
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51QzMYEKaw7oCwz9dHllOjUIeSuh15qEhuOyNv4dPunLQ9mzbAE8B8HeIgrJoJBPctwUopAxjToZjuQfQnrCKbK3800wbA2kUfA
STRIPE_SECRET_KEY=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
STRIPE_WEBHOOK_SECRET=[PENDIENTE - CONFIGURAR DESPUÉS]
```

#### Otras Variables
```
IVA_RATE_MX=0.16
EMAIL_FROM=noreply@finkargo.com
RESEND_API_KEY=re_ULeJYLXP_MbgSoZpmKhVe7Yi1p7RhkVxu
```

### 5️⃣ Cambiar Schema de Prisma a PostgreSQL

**IMPORTANTE:** Antes de hacer el deploy, cambia en `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Cambiar de "sqlite" a "postgresql"
  url      = env("DATABASE_URL")
}
```

Haz commit del cambio:
```bash
git add prisma/schema.prisma
git commit -m "chore: cambiar schema a postgresql para producción"
git push origin main
```

### 6️⃣ Deploy a Producción

1. En Vercel, click en **"Deploy"**
2. Espera ~3-5 minutos
3. Una vez desplegado, obtendrás la URL de producción

### 7️⃣ Ejecutar Migraciones en la Base de Datos

Con el DATABASE_URL de Supabase:

```bash
DATABASE_URL="postgresql://..." npx prisma migrate deploy
DATABASE_URL="postgresql://..." npx prisma db push
```

### 8️⃣ Configurar Webhooks de Stripe

1. Ve a [Stripe Dashboard](https://dashboard.stripe.com) → **Developers** → **Webhooks**
2. Click **"Add endpoint"**
3. URL: `https://[TU-URL-VERCEL]/api/webhooks/stripe`
4. Eventos:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copia el **Signing secret** (whsec_...)
6. Actualiza `STRIPE_WEBHOOK_SECRET` en Vercel

### 9️⃣ Redeploy

Para que los cambios de webhook surtan efecto:
```bash
# En Vercel UI, ve a Deployments → ... (3 dots) → Redeploy
```

---

## ✅ Testing

Prueba estos flujos:

1. ✅ Registro de usuario
2. ✅ Login
3. ✅ Email de bienvenida
4. ✅ Reset de contraseña
5. ✅ Checkout con Stripe
6. ✅ Aplicar cupón de descuento
7. ✅ Webhook de pago completado

---

## 🧪 Configurar Staging (Opcional pero recomendado)

1. Crea el branch staging:
   ```bash
   git checkout -b staging
   git push -u origin staging
   ```

2. En Vercel, configura las mismas variables de entorno pero marcando **Preview (staging)**

3. Usa las **llaves de TEST de Stripe** para staging:
   ```
   STRIPE_ENVIRONMENT=test
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

---

## 📞 Soporte

Si tienes problemas:

1. Revisa **DEPLOYMENT_GUIDE.md** para detalles completos
2. Revisa los logs en Vercel: Deployments → [tu deploy] → Logs
3. Revisa los logs de Supabase: Tu proyecto → Logs
4. Revisa webhooks de Stripe: Dashboard → Developers → Webhooks → Events

---

## 🎉 ¡Listo!

Una vez completados estos pasos, tu aplicación estará en producción en:
- **Producción:** https://finkargo-analiza.vercel.app
- **Staging:** https://finkargo-analiza-mexico-git-staging-[usuario].vercel.app

---

**Creado:** 2025-01-10
**Última actualización:** 2025-01-10
