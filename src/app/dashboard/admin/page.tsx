import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import DashboardLayout from '@/components/DashboardLayout'
import AdminRFQTable from './AdminRFQTable'

export default async function AdminRFQPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  if (session.user.role !== 'admin' && session.user.role !== 'staff') redirect('/dashboard')

  const rfqs = await prisma.rFQ.findMany({
    include: { user: true, quote: true, order: true },
    orderBy: { createdAt: 'desc' },
  })

  const statusCounts = rfqs.reduce((acc: Record<string, number>, rfq) => {
    acc[rfq.status] = (acc[rfq.status] || 0) + 1
    return acc
  }, {})

  const statuses = [
    { key: 'pending',       label: 'Pending',    bg: 'rgba(251,191,36,0.15)',  color: '#fbbf24' },
    { key: 'quoted',        label: 'Quoted',     bg: 'rgba(96,165,250,0.15)', color: '#60a5fa' },
    { key: 'approved',      label: 'Approved',   bg: 'rgba(74,222,128,0.15)', color: '#4ade80' },
    { key: 'in_production', label: 'Production', bg: 'rgba(192,132,252,0.15)',color: '#c084fc' },
    { key: 'shipped',       label: 'Shipped',    bg: 'rgba(200,32,46,0.15)',  color: '#f87171' },
    { key: 'completed',     label: 'Completed',  bg: 'rgba(148,163,184,0.15)',color: '#94a3b8' },
    { key: 'rejected',      label: 'Rejected',   bg: 'rgba(239,68,68,0.15)', color: '#fca5a5' },
  ]

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="text-white fw-bold mb-1" style={{ fontSize: '1.4rem' }}>All RFQs</h1>
        <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>Review, quote, and manage customer requests</p>
      </div>

      {/* Status summary */}
      <div className="row g-2 mb-4">
        {statuses.map((s) => (
          <div key={s.key} className="col-6 col-sm-4 col-lg">
            <div className="dark-card p-3 text-center h-100" style={{ borderColor: s.color + '33' }}>
              <div className="fw-black mb-1" style={{ fontSize: '1.5rem', color: s.color }}>{statusCounts[s.key] || 0}</div>
              <div className="text-muted" style={{ fontSize: '0.72rem' }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <AdminRFQTable rfqs={JSON.parse(JSON.stringify(rfqs))} />
    </DashboardLayout>
  )
}
