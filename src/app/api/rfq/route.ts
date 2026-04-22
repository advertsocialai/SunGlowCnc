import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { notifyAdminNewRFQ } from '@/lib/email'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const isAdmin = session.user.role === 'admin' || session.user.role === 'staff'

  const rfqs = await prisma.rFQ.findMany({
    where: isAdmin ? {} : { userId: session.user.id },
    include: { user: isAdmin, quote: true, order: true },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(rfqs)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { title, description, material, tolerance, quantity, priority, notes } = body

    if (!title || !material || !quantity) {
      return NextResponse.json(
        { error: 'Title, material and quantity are required' },
        { status: 400 }
      )
    }

    const rfq = await prisma.rFQ.create({
      data: {
        userId: session.user.id,
        title,
        description: description || null,
        material,
        tolerance: tolerance || null,
        quantity: parseInt(quantity),
        priority: priority || 'normal',
        notes: notes || null,
        status: 'pending',
      },
    })

    // Send email notification to admin
    notifyAdminNewRFQ({
      adminEmail: process.env.ADMIN_EMAIL || 'Sunglowcnctechnics@gmail.com',
      clientName: session.user.name || 'Unknown',
      clientCompany: session.user.company || null,
      rfqTitle: title,
      rfqId: rfq.id,
    }).catch(console.error)

    return NextResponse.json(rfq, { status: 201 })
  } catch (err) {
    console.error('RFQ creation error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
