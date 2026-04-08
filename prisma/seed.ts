import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sunglowcnc.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@sunglowcnc.com',
      password: adminPassword,
      role: 'admin',
      company: 'Sunglow CNC Technics',
      phone: '+91 98765 43210',
    },
  })

  // Create demo client
  const clientPassword = await bcrypt.hash('client123', 12)
  const client = await prisma.user.upsert({
    where: { email: 'client@bharatbiotech.com' },
    update: {},
    create: {
      name: 'Rajesh Kumar',
      email: 'client@bharatbiotech.com',
      password: clientPassword,
      role: 'client',
      company: 'Bharat Biotech',
      phone: '+91 98765 12345',
    },
  })

  // Create sample RFQ
  const rfq = await prisma.rFQ.create({
    data: {
      userId: client.id,
      title: 'Star Wheel Components - Batch 50',
      description: 'Need 50 units of star wheel guides for filling machine. Standard pharma grade.',
      material: 'Stainless Steel 316L',
      tolerance: '±0.01mm',
      quantity: 50,
      status: 'quoted',
      priority: 'high',
    },
  })

  // Create sample Quote
  await prisma.quote.create({
    data: {
      rfqId: rfq.id,
      amount: 75000,
      currency: 'INR',
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      notes: 'Includes material, machining, and quality inspection. Delivery in 15 working days.',
    },
  })

  console.log('Seed data created successfully.')
  console.log('Admin login: admin@sunglowcnc.com / admin123')
  console.log('Client login: client@bharatbiotech.com / client123')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
