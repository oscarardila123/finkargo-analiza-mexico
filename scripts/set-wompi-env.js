#!/usr/bin/env node

/**
 * Script para cambiar fácilmente entre ambientes de Wompi
 * Usage: node scripts/set-wompi-env.js [simulation|sandbox|production]
 */

const fs = require('fs')
const path = require('path')

const envPath = path.join(__dirname, '..', '.env.local')
const args = process.argv.slice(2)
const targetEnvironment = args[0]

const validEnvironments = ['simulation', 'sandbox', 'production']

if (!targetEnvironment || !validEnvironments.includes(targetEnvironment)) {
  console.log('❌ Ambiente no válido')
  console.log('')
  console.log('Uso: node scripts/set-wompi-env.js [environment]')
  console.log('')
  console.log('Ambientes disponibles:')
  console.log('  simulation  - 🎭 Desarrollo local con pagos simulados')
  console.log('  sandbox     - 🧪 Pruebas con API real de Wompi')
  console.log('  production  - 🚀 Ambiente de producción con pagos reales')
  console.log('')
  process.exit(1)
}

try {
  // Read current .env.local file
  let envContent = fs.readFileSync(envPath, 'utf8')
  
  // Update WOMPI_ENVIRONMENT
  const envRegex = /^WOMPI_ENVIRONMENT=.*$/m
  if (envRegex.test(envContent)) {
    envContent = envContent.replace(envRegex, `WOMPI_ENVIRONMENT="${targetEnvironment}"`)
  } else {
    envContent += `\nWOMPI_ENVIRONMENT="${targetEnvironment}"\n`
  }

  // Write updated content
  fs.writeFileSync(envPath, envContent)

  // Show success message with emoji based on environment
  const environmentInfo = {
    simulation: { emoji: '🎭', label: 'Simulación Local', description: 'Pagos simulados para desarrollo' },
    sandbox: { emoji: '🧪', label: 'Sandbox (Pruebas)', description: 'API real de Wompi con datos de prueba' },
    production: { emoji: '🚀', label: 'Producción', description: 'Ambiente live con pagos reales' }
  }

  const info = environmentInfo[targetEnvironment]
  
  console.log('')
  console.log(`✅ Ambiente de Wompi actualizado`)
  console.log('')
  console.log(`${info.emoji} **${info.label}**`)
  console.log(`   ${info.description}`)
  console.log('')
  
  if (targetEnvironment === 'sandbox') {
    console.log('📝 Notas para Sandbox:')
    console.log('   • Asegúrate de tener las credenciales sandbox correctas')
    console.log('   • Usa tarjetas de prueba de Wompi')
    console.log('   • Los webhooks deben estar configurados en el dashboard sandbox')
    console.log('')
  }

  if (targetEnvironment === 'production') {
    console.log('⚠️  IMPORTANTE - Ambiente de Producción:')
    console.log('   • Los pagos serán REALES')
    console.log('   • Asegúrate de tener las credenciales de producción')
    console.log('   • Verifica que los webhooks estén configurados correctamente')
    console.log('   • Realiza pruebas exhaustivas antes de usar')
    console.log('')
  }

  console.log('🔄 Reinicia el servidor para aplicar los cambios:')
  console.log('   npm run dev')
  console.log('')

} catch (error) {
  console.error('❌ Error actualizando el ambiente:', error.message)
  process.exit(1)
}