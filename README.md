# Finkargo Analiza - B2B SaaS Platform

## 🚀 Overview

**Finkargo Analiza** is a comprehensive B2B SaaS platform that provides business intelligence and market analysis for international trade in Colombia. The platform leverages Colombian customs data from Aduanas to deliver actionable insights for importers, exporters, freight forwarders, and customs agents.

### 🎯 Value Proposition
*"El aliado en comercio exterior, confiable y útil del importador"* (The reliable, trustworthy, and useful ally for foreign trade operations)

## 🏗️ Technical Architecture

### Stack
- **Frontend**: Next.js 14+ with TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with RBAC
- **Payments**: Wompi (Colombia-primary) + PayU (backup)
- **Styling**: Tailwind CSS with custom Colombian color scheme
- **Deployment**: Vercel-ready with environment configuration

### 🎨 Design System

#### Color Palette (Finkargo Brand)
```css
Primary: #2563eb (Finkargo Blue)
Secondary: #06b6d4 (Cyan)
Success: #10b981
Warning: #f59e0b
Error: #ef4444
Neutral: #64748b, #f8fafc
```

## 🌟 Features

### 1. Multi-Tenant Architecture
- Company-based multi-tenancy
- Role-based access control (Admin, Analyst, Viewer)
- User management and activity tracking
- Company verification and onboarding

### 2. Authentication & Security
- NextAuth.js with multiple providers
- Google OAuth integration
- Credential-based authentication
- JWT session management
- Activity logging and audit trails

### 3. Business Intelligence Dashboard
- **Import Analytics**: Interactive charts, time-series analysis, CIF/FOB value analysis
- **Export Analytics**: Export volumes, destination countries, competitive positioning
- **Supplier Discovery**: Search and analyze international suppliers with pricing data
- **Competitor Analysis**: Market share analysis, import volumes, supplier networks
- **Market Trends**: Seasonal patterns, price fluctuations, demand forecasting

### 4. Colombian Payment Integration
```typescript
// Wompi Integration (Primary)
{
  provider: "wompi",
  supportedMethods: ["credit_card", "pse", "nequi"],
  currency: "COP",
  taxRate: 0.19, // Colombian IVA
}
```

### 5. Subscription Management
- **Basic Plan**: 10 reports/month, basic analytics
- **Professional Plan**: 50 reports/month, advanced features, API access
- **Enterprise Plan**: Unlimited reports, AI-powered insights, dedicated support

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 13+
- npm or yarn

### Environment Variables
```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/finkargo_db"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Wompi Payment Provider (Colombia)
WOMPI_PUBLIC_KEY="your-wompi-public-key"
WOMPI_PRIVATE_KEY="your-wompi-private-key"
WOMPI_EVENTS_SECRET="your-wompi-webhook-secret"

# Colombian Tax Settings
IVA_RATE=0.19
```

### Installation Steps

1. **Clone and Install Dependencies**
```bash
git clone <repository-url>
cd finkargo-analiza
npm install
```

2. **Database Setup**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev
```

3. **Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
src/
├── app/                          # Next.js 13+ app directory
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── payments/             # Payment processing
│   │   └── subscription/         # Subscription management
│   ├── auth/                     # Authentication pages
│   ├── dashboard/                # Main dashboard pages
│   └── layout.tsx                # Root layout
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Layout components
│   └── dashboard/                # Dashboard-specific components
├── lib/                          # Utility libraries
│   ├── auth.ts                   # NextAuth configuration
│   ├── prisma.ts                 # Prisma client
│   ├── wompi.ts                  # Wompi payment integration
│   └── i18n.ts                   # Internationalization
└── types/                        # TypeScript type definitions
```

## 🏢 Business Model

### Target Market
- **Primary**: Colombian importers with $350K+ USD annual volume
- **Secondary**: Freight forwarders, customs agents, financial institutions

### Revenue Streams
1. **Subscription Plans**: Monthly/Annual recurring revenue
2. **Custom Reports**: Pay-per-report for specialized analysis
3. **API Access**: Enterprise integration fees

### Pricing Strategy (COP)
- **Basic**: $149,000 COP/month
- **Professional**: $349,000 COP/month  
- **Enterprise**: $799,000 COP/month

## 🚀 Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🔐 Security & Compliance

### Colombian Compliance
- **HABEAS DATA**: Colombian data protection compliance
- **Aduanas Integration**: Official customs data integration
- **Financial Encryption**: AES-256 encryption for sensitive data

## 🌐 Colombian Market Specifications

### Payment Integration
- **Primary**: Wompi (supports credit cards, PSE, Nequi)
- **Tax Compliance**: Automatic IVA (19%) calculation
- **Currency**: Colombian Peso (COP) primary, USD secondary

### Localization Features
- Spanish language interface
- Colombian timezone (GMT-5)
- COP currency formatting
- Colombian business document templates

## 📈 MVP Status

### ✅ Completed Features
- [x] User authentication system with NextAuth.js
- [x] Multi-tenant architecture with company management
- [x] Dashboard with import/export data visualization
- [x] Wompi payment integration for Colombian market
- [x] Subscription management system
- [x] Basic analytics (supplier search, competitor analysis)
- [x] Spanish i18n support and Colombian UX patterns
- [x] Responsive design for mobile and desktop

### 🚧 Ready for Production
The MVP is feature-complete and ready for deployment with:
- Complete authentication flow
- Payment processing with Colombian providers
- Core business intelligence features
- Responsive design optimized for Colombian users
- Security and compliance measures

---

## 🇨🇴 Proudly Built for Colombia

Finkargo Analiza is specifically designed for the Colombian market, incorporating local business practices, payment methods, and regulatory requirements.

**Version**: 1.0.0 MVP
**Built with**: ❤️ for Colombian businesses
