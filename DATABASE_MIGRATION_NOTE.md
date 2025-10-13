# ⚠️ IMPORTANTE: Migración de SQLite a PostgreSQL

## 🔄 Cambio Realizado

Hemos actualizado el schema de Prisma de **SQLite** a **PostgreSQL** para preparar el proyecto para producción.

**Archivo modificado:** `prisma/schema.prisma`
```prisma
datasource db {
  provider = "postgresql"  // Antes era "sqlite"
  url      = env("DATABASE_URL")
}
```

## 🏠 Opciones para Desarrollo Local

### Opción 1: Usar SQLite Localmente (Recomendado para desarrollo rápido)

Si prefieres seguir usando SQLite en desarrollo local:

1. **Revertir temporalmente el provider en `prisma/schema.prisma`:**
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

2. **Mantener tu `.env` actual:**
   ```env
   DATABASE_URL="file:./dev-mexico.db"
   ```

3. **IMPORTANTE:** Antes de hacer commit, asegúrate de cambiar nuevamente a `postgresql`

### Opción 2: Usar PostgreSQL Localmente (Recomendado para consistencia)

Para mantener consistencia con producción, usa PostgreSQL localmente.

#### A) Instalar PostgreSQL Localmente

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
createdb finkargo_mexico_dev
```

**Actualiza tu `.env`:**
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/finkargo_mexico_dev"
```

#### B) Usar Docker

Crea un `docker-compose.yml`:
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: finkargo_mexico_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

**Inicia PostgreSQL:**
```bash
docker-compose up -d
```

**Actualiza tu `.env`:**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/finkargo_mexico_dev"
```

#### C) Usar Supabase para Desarrollo

Puedes usar la misma base de datos de Supabase para desarrollo (crea una tabla con prefijo `dev_`).

### Opción 3: Configuración Dual con Múltiples Archivos .env

Crea dos archivos de entorno:

**`.env.local`** (SQLite - para desarrollo):
```env
DATABASE_URL="file:./dev-mexico.db"
```

**`.env.production`** (PostgreSQL - NO commitear):
```env
DATABASE_URL="postgresql://..."
```

Y usa:
```bash
# Para desarrollo local
npm run dev

# Para testing con PostgreSQL
cp .env.production .env
npm run dev
```

## 🔧 Ejecutar Migraciones

Después de cambiar la base de datos:

```bash
# Regenerar el cliente de Prisma
npx prisma generate

# Aplicar el schema a la nueva base de datos
npx prisma db push

# O crear una migración formal
npx prisma migrate dev --name init_postgres
```

## 📝 Recomendación

Para **desarrollo local activo**, usa **Opción 1** (SQLite) temporalmente para no complicar el setup.

Para **producción y staging**, el schema ya está configurado correctamente para PostgreSQL.

Antes de hacer deploy, asegúrate de que `prisma/schema.prisma` tenga:
```prisma
provider = "postgresql"
```

## ✅ Checklist Pre-Deploy

- [ ] Schema de Prisma usa `provider = "postgresql"`
- [ ] Base de datos PostgreSQL creada en Supabase
- [ ] Variables de entorno configuradas en Vercel
- [ ] Migraciones ejecutadas en la base de datos de producción

---

**Fecha:** 2025-01-10
**Versión:** 1.0.0
