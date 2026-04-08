/**
 * PATCH /api/orders/[id]  — Admin/Staff: update order status
 */
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { orderUpdateSchema } from '@/lib/validations'
import { notifyClientOrderUpdate } from '@/lib/email'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const isAdmin = session.user.role === 'admin' || session.user.role === 'staff'
  if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const body = await req.json()
  const parsed = orderUpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { rfq: { include: { user: true } } },
  })

  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

  const updateData: Record<string, unknown> = {
    status: parsed.data.status,
    notes: parsed.data.notes ?? order.notes,
  }

  if (parsed.data.status === 'shipped' && !order.shippedAt) {
    updateData.shippedAt = new Date()
  }
  if (parsed.data.status === 'completed' && !order.completedAt) {
    updateData.completedAt = new Date()
  }

  const updated = await prisma.order.update({
    where: { id: params.id },
    data: updateData,
  })

  // Sync RFQ status with order status (in_production stays 'approved', rest mirror)
  const rfqStatusMap: Record<string, string> = {
    quality_check: 'quality_check',
    shipped: 'shipped',
    completed: 'completed',
  }
  if (rfqStatusMap[parsed.data.status]) {
    await prisma.rFQ.update({
      where: { id: order.rfqId },
      data: { status: rfqStatusMap[parsed.data.status] },
    })
  }

  // Email notification
  await notifyClientOrderUpdate({
    clientEmail: order.rfq.user.email,
    clientName: order.rfq.user.name,
    rfqTitle: order.rfq.title,
    orderNumber: order.orderNumber,
    status: parsed.data.status,
  }).catch(console.error)

  return NextResponse.json({ order: updated })
}
