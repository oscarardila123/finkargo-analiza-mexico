#!/usr/bin/env node

/**
 * Script to generate secure random secrets for NEXTAUTH_SECRET
 * Usage: node scripts/generate-secret.js
 */

const crypto = require('crypto')

function generateSecret() {
  return crypto.randomBytes(32).toString('base64')
}

console.log('\n🔐 Generated NEXTAUTH_SECRET:\n')
console.log(generateSecret())
console.log('\n✅ Copia este valor en las Variables de Entorno de tu entorno de AWS Amplify (Backend)\n')
