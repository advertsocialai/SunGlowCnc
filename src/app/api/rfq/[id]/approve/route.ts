/**
 * POST /api/rfq/[id]/approve
 * Called by the CLIENT when they accept a quote.
 * Creates an Order record and moves RFQ status to "approved".
 */
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { notifyClientOrderUpdate } from '@/lib/email'

function generateOrderNumber(): string {
  const date = new Date()
  const y = date.getFullYear().toString().slice(-2)
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `SG-${y}${m}-${rand}`
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const rfq = await prisma.rFQ.findUnique({
    where: { id: params.id },
    include: { quote: true, user: true, order: true },
  })

  if (!rfq) return NextResponse.json({ error: 'RFQ not found' }, { status: 404 })

  // Only the owner can approve their own RFQ
  if (rfq.userId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  if (!rfq.quote) {
    return NextResponse.json({ error: 'No quote available to approve' }, { status: 400 })
  }

  if (rfq.status !== 'quoted') {
    return NextResponse.json(
      { error: `RFQ cannot be approved from status: ${rfq.status}` },
      { status: 400 }
    )
  }

  if (rfq.order) {
    return NextResponse.json({ error: 'Order already exists for this RFQ' }, { status: 409 })
  }

  try {
    // Create order + update RFQ status atomically
    const [order] = await prisma.$transaction([
      prisma.order.create({
        data: {
          rfqId: rfq.id,
          orderNumber: generateOrderNumber(),
          status: 'in_production',
          amount: rfq.quote.amount,
          currency: rfq.quote.currency,
          notes: `Quote approved by ${rfq.user.name} on ${new Date().toLocaleDateString('en-IN')}`,
        },
      }),
      prisma.rFQ.update({
        where: { id: rfq.id },
        data: { status: 'approved' },
      }),
    ])

    // Send notification
    await notifyClientOrderUpdate({
      clientEmail: rfq.user.email,
      clientName: rfq.user.name,
      rfqTitle: rfq.title,
      orderNumber: order.orderNumber,
      status: 'in_production',
    }).catch(console.error) // non-blocking

    return NextResponse.json({ order }, { status: 201 })
  } catch (err) {
    console.error('Approve error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
