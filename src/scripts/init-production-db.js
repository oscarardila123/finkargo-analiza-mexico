// Script to initialize PostgreSQL database in production/staging
const { PrismaClient } = require('@prisma/client')

async function initProductionDb() {
  // Only run this in production/staging environments
  if (process.env.NODE_ENV === 'development') {
    console.log('Skipping production DB init in development')
    return
  }

  const prisma = new PrismaClient()

  try {
    console.log('Initializing production database...')
    
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connection successful')
    
    // Try to run a simple query to test if tables exist
    try {
      await prisma.user.findFirst()
      console.log('✅ Tables already exist and are accessible')
    } catch (error) {
      if (error.code === 'P2021' || error.message.includes('does not exist')) {
        console.log('📋 Tables do not exist, need to run migrations')
        console.log('Please run: npx prisma db push in production environment')
      } else {
        throw error
      }
    }

  } catch (error) {
    console.error('❌ Database initialization error:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run if called directly
if (require.main === module) {
  initProductionDb()
    .then(() => {
      console.log('✅ Database initialization completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Database initialization failed:', error)
      process.exit(1)
    })
}

module.exports = initProductionDb