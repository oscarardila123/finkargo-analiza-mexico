# 🚀 Guía de Deployment - Finkargo Analiza México

Esta guía te ayudará a configurar los ambientes de **Staging** y **Producción** en Vercel con base de datos PostgreSQL en Supabase.

---

## 📦 Repositorio

**GitHub:** `https://github.com/oscarardila123/finkargo-analiza-mexico.git`

**Estrategia de branches:**
- `development` → Local development
- `staging` → Ambiente de staging (https://finkargo-analiza-c.vercel.app)
- `main` → Ambiente de producción (https://finkargo-analiza.vercel.app)

---

## 🗄️ Parte 1: Configurar Base de Datos en Supabase

### Paso 1.1: Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Inicia sesión o crea una cuenta
3. Click en **"New Project"**
4. Configura el proyecto:
   - **Name:** `finkargo-analiza-mexico`
   - **Database Password:** Genera una contraseña segura (GUÁRDALA)
   - **Region:** North America (us-east-1) - Más cercano a México
   - **Pricing Plan:** Free (o Pro si necesitas más recursos)
5. Click en **"Create new project"** (tarda ~2 minutos)

### Paso 1.2: Obtener Connection String

Una vez creado el proyecto:

1. En el dashboard de Supabase, ve a **Settings** (⚙️) → **Database**
2. En la sección **Connection string**, selecciona el tab **"URI"**
3. Copia el connection string que se ve así:
   ```
   postgresql://postgres.[PROJECT_REF]:[YOUR_PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```
4. **IMPORTANTE:** Reemplaza `[YOUR_PASSWORD]` con la contraseña que generaste en el paso 1.1

### Paso 1.3: Configurar Prisma para PostgreSQL

El connection string lo usaremos en Vercel como `DATABASE_URL`.

**Formato correcto para Prisma con Supabase:**
```
postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

**Nota:** Agregamos `?pgbouncer=true&connection_limit=1` para optimizar las conexiones.

### Paso 1.4: Ejecutar Migraciones

Una vez configurado el DATABASE_URL en Vercel, ejecutarás:

```bash
# En tu terminal local, con el DATABASE_URL de producción
DATABASE_URL="postgresql://..." npx prisma migrate deploy
DATABASE_URL="postgresql://..." npx prisma db push
```

---

## ☁️ Parte 2: Configurar Vercel

### Paso 2.1: Crear Proyecto en Vercel

1. Ve a [https://vercel.com](https://vercel.com)
2. Click en **"Add New..."** → **"Project"**
3. **Import Git Repository:**
   - Selecciona tu cuenta de GitHub
   - Busca `finkargo-analiza-mexico`
   - Click en **"Import"**

### Paso 2.2: Configurar Framework Settings

En la pantalla de configuración:

- **Framework Preset:** Next.js
- **Root Directory:** `./` (por defecto)
- **Build Command:** `npm run build` (por defecto)
- **Output Directory:** `.next` (por defecto)
- **Install Command:** `npm install` (por defecto)

### Paso 2.3: Configurar Variables de Entorno para PRODUCCIÓN

En la sección **Environment Variables**, agrega las siguientes variables (marca solo **Production**):

#### 🔹 Database
```
DATABASE_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

#### 🔹 NextAuth
```
NEXTAUTH_URL=https://finkargo-analiza.vercel.app
NEXTAUTH_SECRET=[GENERAR_NUEVO_SECRET_ALEATORIO]
```
**Generar NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

#### 🔹 Stripe PRODUCCIÓN
```
STRIPE_ENVIRONMENT=production
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_51QzMYEKaw7oCwz9dHllOjUIeSuh15qEhuOyNv4dPunLQ9mzbAE8B8HeIgrJoJBPctwUopAxjToZjuQfQnrCKbK3800wbA2kUfA
STRIPE_SECRET_KEY=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
STRIPE_WEBHOOK_SECRET=[CONFIGURAR_DESPUES_CON_STRIPE_CLI]
```

#### 🔹 IVA México
```
IVA_RATE_MX=0.16
```

#### 🔹 Email (Resend)
```
EMAIL_FROM=noreply@finkargo.com
RESEND_API_KEY=re_ULeJYLXP_MbgSoZpmKhVe7Yi1p7RhkVxu
```

### Paso 2.4: Deploy a Producción

1. Click en **"Deploy"**
2. Espera a que termine el build (~3-5 minutos)
3. Una vez completado, verás tu URL de producción

### Paso 2.5: Configurar Dominio Personalizado (Opcional)

Si tienes un dominio:
1. Ve a **Settings** → **Domains**
2. Agrega tu dominio (ej: `analiza.finkargo.com`)
3. Configura los DNS según las instrucciones de Vercel

---

## 🧪 Parte 3: Configurar Ambiente de Staging

### Paso 3.1: Crear Branch de Staging

En tu terminal local:
```bash
git checkout -b staging
git push -u origin staging
```

### Paso 3.2: Configurar Staging en Vercel

1. En el proyecto de Vercel, ve a **Settings** → **Git**
2. En **Production Branch**, asegúrate que sea `main`
3. Ve a **Settings** → **Environment Variables**
4. Agrega las mismas variables pero marcando solo **Preview (staging branch)**

#### Variables de Entorno para STAGING:

**Usar las mismas que producción EXCEPTO:**

```
NEXTAUTH_URL=https://finkargo-analiza-mexico-git-staging-[tu-usuario].vercel.app
STRIPE_ENVIRONMENT=test
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51QzMYR4FTM5lDoTQFjrYvzsbymRbAYpyrIDkIzUcJiaN24QLe5SzD1NBxKgAJHdLlWKGzQzfGGw1unN3Zn2lNA9Z00VLlpXGiU
STRIPE_SECRET_KEY=sk_test_51QzMYR4FTM5lDoTQAe34WpkSA1duNleXqJsAmunR3WuQb065rZu2oVdzQiDbSaISUkSwH9RUbedW2x7bX7bBfcqi00lGIrw0UM
STRIPE_WEBHOOK_SECRET=whsec_e67713d6e4f879a3803ae7f2b7ce544afaba44c69dd3a84e48e62dfd1368b86c
```

### Paso 3.3: Deploy a Staging

```bash
git checkout staging
git merge development
git push origin staging
```

Vercel automáticamente detectará el push y desplegará a staging.

---

## 🔐 Parte 4: Configurar Webhooks de Stripe

### Para Producción:

1. Ve a [Stripe Dashboard](https://dashboard.stripe.com) → **Developers** → **Webhooks**
2. Click en **"Add endpoint"**
3. Endpoint URL: `https://finkargo-analiza.vercel.app/api/webhooks/stripe`
4. Selecciona los eventos:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copia el **Signing secret** (whsec_...)
6. Actualiza la variable `STRIPE_WEBHOOK_SECRET` en Vercel (Production)

### Para Staging:

1. Repite los mismos pasos pero con URL: `https://[TU-URL-DE-STAGING]/api/webhooks/stripe`
2. Actualiza la variable `STRIPE_WEBHOOK_SECRET` en Vercel (Preview - staging)

---

## 🔄 Parte 5: Workflow de Deployment

### Development → Staging → Production

```bash
# 1. Desarrollo en branch development
git checkout development
# ... hacer cambios ...
git add .
git commit -m "feat: nueva funcionalidad"
git push origin development

# 2. Mergear a staging para testing
git checkout staging
git merge development
git push origin staging
# Vercel despliega automáticamente a staging

# 3. Después de testing exitoso, mergear a main (producción)
git checkout main
git merge staging
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin main --tags
# Vercel despliega automáticamente a producción
```

---

## 📊 Parte 6: Ejecutar Migraciones en Producción

Una vez que Vercel esté configurado:

```bash
# Obtén el DATABASE_URL de Vercel
# Settings → Environment Variables → DATABASE_URL (Production)

# Ejecuta las migraciones
DATABASE_URL="postgresql://..." npx prisma migrate deploy
DATABASE_URL="postgresql://..." npx prisma db push

# Verifica que las tablas se crearon
DATABASE_URL="postgresql://..." npx prisma studio
```

---

## ✅ Checklist de Deployment

### Supabase:
- [ ] Proyecto creado en Supabase
- [ ] Connection string obtenido
- [ ] Base de datos PostgreSQL lista

### Vercel - Producción:
- [ ] Proyecto importado desde GitHub
- [ ] Variables de entorno configuradas (Production)
- [ ] Primera deploy exitosa
- [ ] Dominio configurado (opcional)
- [ ] Webhooks de Stripe configurados
- [ ] Migraciones ejecutadas

### Vercel - Staging:
- [ ] Branch `staging` creada
- [ ] Variables de entorno configuradas (Preview - staging)
- [ ] Deploy de staging exitosa
- [ ] Webhooks de Stripe configurados

### Testing:
- [ ] Registro de usuario funciona
- [ ] Login funciona
- [ ] Email de bienvenida se envía
- [ ] Reset de contraseña funciona
- [ ] Checkout con Stripe funciona
- [ ] Webhooks de pago funcionan
- [ ] Cupones de descuento funcionan
- [ ] Dashboard funciona correctamente

---

## 🆘 Troubleshooting

### Error: "Database connection failed"
- Verifica que el `DATABASE_URL` esté correcto
- Asegúrate de incluir `?pgbouncer=true&connection_limit=1`
- Verifica que la contraseña no tenga caracteres especiales sin escapar

### Error: "NEXTAUTH_URL must be provided"
- Asegúrate de configurar `NEXTAUTH_URL` con la URL correcta de Vercel

### Error: Webhooks no funcionan
- Verifica que la URL del webhook sea correcta en Stripe Dashboard
- Asegúrate de que `STRIPE_WEBHOOK_SECRET` esté configurado
- Revisa los logs en Vercel: Deployment → Logs

### Error: Build fails
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que TypeScript compile sin errores
- Revisa los logs de build en Vercel

---

## 📞 Soporte

Si encuentras problemas durante el deployment, revisa:
- Logs de Vercel: Proyecto → Deployments → [deployment] → Logs
- Logs de Supabase: Proyecto → Logs
- Stripe Dashboard → Developers → Webhooks → [tu webhook] → Events

---

**Creado:** 2025-01-10
**Última actualización:** 2025-01-10
**Versión:** 1.0.0
