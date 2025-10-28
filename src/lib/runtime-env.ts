// Centralized runtime environment detection helpers
// Supports AWS Amplify, generic Node, and manual override via APP_ENV

export type AppEnv = 'development' | 'preview' | 'staging' | 'production'

function truthy(v: string | undefined | null): boolean {
  return typeof v === 'string' && v.trim().length > 0
}

function normalize(val?: string | null): string | undefined {
  return val?.trim().toLowerCase() || undefined
}

// Detect hosting platform (Amplify-only or generic Node)
export function getPlatform(): 'amplify' | 'node' {
  if (truthy(process.env.AMPLIFY_BRANCH) || truthy(process.env.AWS_BRANCH) || truthy(process.env.AWS_REGION) || truthy(process.env.AMPLIFY_ENV)) return 'amplify'
  return 'node'
}

// Compute application environment with multiple signals
export function getAppEnv(): AppEnv {
  // Highest priority: explicit override
  const appEnv = normalize(process.env.APP_ENV) as AppEnv | undefined
  if (appEnv === 'production' || appEnv === 'staging' || appEnv === 'preview' || appEnv === 'development') {
    return appEnv
  }

  // Next: platform-specific signals (Amplify)
  const platform = getPlatform()

  if (platform === 'amplify') {
    // Amplify exposes various vars: AMPLIFY_BRANCH, AWS_BRANCH, AMPLIFY_ENV, USER_BRANCH
    const amplifyEnv = normalize(process.env.AMPLIFY_ENV)
    const awsBranch = normalize(process.env.AWS_BRANCH || process.env.AMPLIFY_BRANCH || process.env.USER_BRANCH)

    // Many setups use 'prod' or 'production' for AMPLIFY_ENV
    if (amplifyEnv === 'production' || amplifyEnv === 'prod' || awsBranch === 'main' || awsBranch === 'master' || awsBranch === 'prod') {
      return 'production'
    }
    // Treat other branches as staging/preview; prefer 'staging' if named explicitly
    if (amplifyEnv === 'staging' || awsBranch === 'staging' || awsBranch === 'stage' || awsBranch === 'develop' || awsBranch === 'dev') {
      return 'staging'
    }
    // Fallback to preview for arbitrary branch builds
    return 'preview'
  }

  // Fallback to NODE_ENV
  const nodeEnv = normalize(process.env.NODE_ENV)
  if (nodeEnv === 'production') return 'production'
  if (nodeEnv === 'development') return 'development'

  // Default safest: preview
  return 'preview'
}

export function isProduction(): boolean {
  return getAppEnv() === 'production'
}

export function isPreview(): boolean {
  const env = getAppEnv()
  return env === 'preview' || env === 'staging'
}

export function isDevelopment(): boolean {
  return getAppEnv() === 'development'
}

export function getEnvSnapshot() {
  // Provide a safe snapshot for diagnostics (no secrets)
  const mask = (v?: string) => (v ? `${v.substring(0, 8)}...` : undefined)
  return {
    computed: {
      platform: getPlatform(),
      appEnv: getAppEnv(),
      isProduction: isProduction(),
      isPreview: isPreview(),
      isDevelopment: isDevelopment(),
    },
    raw: {
      NODE_ENV: process.env.NODE_ENV,
      APP_ENV: process.env.APP_ENV,
      AMPLIFY_ENV: process.env.AMPLIFY_ENV,
      AMPLIFY_BRANCH: process.env.AMPLIFY_BRANCH,
      AWS_BRANCH: process.env.AWS_BRANCH,
      AWS_REGION: process.env.AWS_REGION,
      STRIPE_ENVIRONMENT: process.env.STRIPE_ENVIRONMENT,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      DATABASE_URL_PREFIX: mask(process.env.DATABASE_URL),
    },
  }
}
