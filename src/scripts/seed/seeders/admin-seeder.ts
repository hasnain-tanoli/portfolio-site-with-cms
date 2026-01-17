import payload from 'payload'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Load environment variables from .env file in the root directory
dotenv.config({ path: path.resolve(dirname, '../../../../.env') })

const runAdminSeeder = async () => {
  try {
    // Check for required environment variables
    if (!process.env.PAYLOAD_SECRET) {
      console.error('❌ Error: PAYLOAD_SECRET environment variable is required.')
      console.error('Please create a .env file in the root directory with:')
      console.error('PAYLOAD_SECRET=your-secret-key-here')
      console.error('DATABASE_URL=your-database-connection-string')
      process.exit(1)
    }

    if (!process.env.DATABASE_URL) {
      console.error('❌ Error: DATABASE_URL environment variable is required.')
      console.error('Please add DATABASE_URL to your .env file')
      process.exit(1)
    }

    console.log('🚀 Initializing Payload...')

    // Initialize Payload locally
    const { default: config } = await import('../../../payload.config.js')
    await payload.init({
      config,
    })

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'StrongPassword.12345'

    // Check if super admin already exists
    const existing = await payload.find({
      collection: 'users',
      where: {
        email: { equals: adminEmail },
      },
    })

    if (existing.totalDocs > 0) {
      console.log('Super admin already exists:', adminEmail)
      process.exit(0)
    }

    // Create the super admin
    const admin = await payload.create({
      collection: 'users',
      data: {
        name: 'Super Admin',
        email: adminEmail,
        password: adminPassword,
        roles: ['admin'], // must match your Users collection roles
      },
    })

    console.log('✅ Super admin created successfully:', admin.email)
    process.exit(0)
  } catch (err) {
    console.error('❌ Error creating super admin:', err)
    process.exit(1)
  }
}

runAdminSeeder()
