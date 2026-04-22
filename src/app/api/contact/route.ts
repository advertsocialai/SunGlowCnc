import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { notifyContactReceived } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, company, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      )
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        message,
        status: 'new',
      },
    })

    // Send email notification to admin
    notifyContactReceived({
      adminEmail: process.env.ADMIN_EMAIL || 'Sunglowcnctechnics@gmail.com',
      name,
      email,
      phone: phone || null,
      company: company || null,
      message,
    }).catch(console.error)

    return NextResponse.json({ id: contact.id, success: true }, { status: 201 })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  // Admin only endpoint
  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(contacts)
}
