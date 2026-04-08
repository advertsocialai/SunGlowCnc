import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const isAdmin = session.user.role === 'admin' || session.user.role === 'staff'
  if (!isAdmin) return NextResponse.json({ error: 'Forbidden — admin only' }, { status: 403 })

  try {
    const body = await req.json()
    const { amount, validDays = 30, notes } = body

    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 })
    }

    const rfq = await prisma.rFQ.findUnique({ where: { id: params.id } })
    if (!rfq) return NextResponse.json({ error: 'RFQ not found' }, { status: 404 })

    const validUntil = new Date(Date.now() + validDays * 24 * 60 * 60 * 1000)

    // Upsert quote
    const quote = await prisma.quote.upsert({
      where: { rfqId: params.id },
      update: { amount: parseFloat(amount), validUntil, notes: notes || null },
      create: { rfqId: params.id, amount: parseFloat(amount), validUntil, notes: notes || null },
    })

    // Update RFQ status to quoted
    await prisma.rFQ.update({
      where: { id: params.id },
      data: { status: 'quoted' },
    })

    return NextResponse.json({ quote }, { status: 201 })
  } catch (err) {
    console.error('Quote creation error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
