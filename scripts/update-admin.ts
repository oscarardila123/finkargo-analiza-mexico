import { PrismaClient, UserRole } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function updateAdmin() {
  const email = 'oscar.ardila@finkargo.com'

  try {
    // Buscar el usuario
    const user = await prisma.user.findUnique({
      where: { email },
      include: { company: true }
    })

    if (!user) {
      console.error(`❌ Usuario con email ${email} no encontrado`)
      console.log('\nUsuarios existentes:')
      const allUsers = await prisma.user.findMany({
        select: { email: true, name: true, role: true }
      })
      console.table(allUsers)
      return
    }

    console.log('✅ Usuario encontrado:')
    console.log(`  - Nombre: ${user.name}`)
    console.log(`  - Email: ${user.email}`)
    console.log(`  - Rol actual: ${user.role}`)
    console.log(`  - Compañía: ${user.company.name}`)

    // Actualizar rol a ADMIN
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: UserRole.ADMIN }
    })

    console.log(`\n🎉 Rol actualizado exitosamente a: ${updatedUser.role}`)

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateAdmin()
