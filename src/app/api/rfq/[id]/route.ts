import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const rfq = await prisma.rFQ.findUnique({
    where: { id: params.id },
    include: { user: true, quote: true, order: true },
  })

  if (!rfq) return NextResponse.json({ error: 'RFQ not found' }, { status: 404 })

  const isAdmin = session.user.role === 'admin' || session.user.role === 'staff'
  if (!isAdmin && rfq.userId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return NextResponse.json(rfq)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const isAdmin = session.user.role === 'admin' || session.user.role === 'staff'

  const rfq = await prisma.rFQ.findUnique({ where: { id: params.id } })
  if (!rfq) return NextResponse.json({ error: 'RFQ not found' }, { status: 404 })

  // Only admin can update status; client can update own pending RFQ
  if (!isAdmin && rfq.userId !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  try {
    const body = await req.json()
    const updateData: Record<string, unknown> = {}

    if (body.status && isAdmin) updateData.status = body.status
    if (body.priority && isAdmin) updateData.priority = body.priority
    if (body.notes !== undefined && isAdmin) updateData.notes = body.notes

    const updated = await prisma.rFQ.update({
      where: { id: params.id },
      data: updateData,
      include: { quote: true },
    })

    return NextResponse.json(updated)
  } catch (err) {
    console.error('RFQ update error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
