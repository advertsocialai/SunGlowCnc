/**
 * GET  /api/orders  — Admin: all orders; Client: own orders
 * PATCH /api/orders  — Not used (see /api/orders/[id]/route.ts)
 */
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const isAdmin = session.user.role === 'admin' || session.user.role === 'staff'

  const orders = await prisma.order.findMany({
    where: isAdmin ? {} : { rfq: { userId: session.user.id } },
    include: {
      rfq: {
        include: { user: { select: { id: true, name: true, email: true, company: true } } },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ orders })
}
