import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import DashboardLayout from '@/components/DashboardLayout'

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions)
  if (!session || (session.user.role !== 'admin' && session.user.role !== 'staff')) {
    redirect('/dashboard')
  }

  const [rfqs, orders, users, contacts] = await Promise.all([
    prisma.rFQ.findMany({ include: { quote: true, order: true } }),
    prisma.order.findMany(),
    prisma.user.findMany({ where: { role: 'client' } }),
    prisma.contact.findMany(),
  ])

  const totalRevenue = orders
    .filter((o) => o.status === 'completed')
    .reduce((sum, o) => sum + o.amount, 0)

  const pipelineValue = orders
    .filter((o) => o.status !== 'completed')
    .reduce((sum, o) => sum + o.amount, 0)

  const statusCounts = rfqs.reduce<Record<string, number>>((acc, r) => {
    acc[r.status] = (acc[r.status] ?? 0) + 1
    return acc
  }, {})

  const materialCounts = rfqs.reduce<Record<string, number>>((acc, r) => {
    const mat = r.material.split(' ')[0]
    acc[mat] = (acc[mat] ?? 0) + 1
    return acc
  }, {})

  const topMaterials = Object.entries(materialCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)

  const conversionRate = rfqs.length > 0
    ? Math.round((rfqs.filter((r) => ['approved', 'in_production', 'quality_check', 'shipped', 'completed'].includes(r.status)).length / rfqs.length) * 100)
    : 0

  const stats = [
    { label: 'Total RFQs', value: rfqs.length, sub: `${statusCounts.pending ?? 0} pending review` },
    { label: 'Active Clients', value: users.length, sub: 'registered accounts' },
    { label: 'Total Orders', value: orders.length, sub: `${conversionRate}% conversion` },
    { label: 'Completed Revenue', value: `₹${(totalRevenue / 100000).toFixed(1)}L`, sub: 'INR' },
    { label: 'Pipeline Value', value: `₹${(pipelineValue / 100000).toFixed(1)}L`, sub: 'in production' },
    { label: 'Contact Inquiries', value: contacts.length, sub: `${contacts.filter((c) => c.status === 'new').length} unread` },
  ]

  const rfqStatusDisplay = [
    { key: 'pending',      label: 'Pending',      color: '#fbbf24' },
    { key: 'quoted',       label: 'Quoted',       color: '#60a5fa' },
    { key: 'approved',     label: 'Approved',     color: '#4ade80' },
    { key: 'in_production',label: 'In Production',color: '#c084fc' },
    { key: 'quality_check',label: 'QC',           color: '#a78bfa' },
    { key: 'shipped',      label: 'Shipped',      color: '#f87171' },
    { key: 'completed',    label: 'Completed',    color: '#94a3b8' },
    { key: 'rejected',     label: 'Rejected',     color: '#ef4444' },
  ]

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="text-white fw-bold mb-1" style={{ fontSize: '1.4rem' }}>Analytics</h1>
        <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>Platform overview and business metrics</p>
      </div>

      {/* KPI Grid */}
      <div className="row g-3 mb-4">
        {stats.map((s) => (
          <div key={s.label} className="col-6 col-lg-4">
            <div className="dark-card p-4">
              <p className="text-muted text-uppercase mb-1" style={{ fontSize: '0.8rem', letterSpacing: '0.05em' }}>{s.label}</p>
              <p className="fw-black text-white mb-1" style={{ fontSize: '2rem' }}>{s.value}</p>
              <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* RFQ by Status */}
        <div className="col-lg-6">
          <div className="dark-card p-4 h-100">
            <h2 className="text-white fw-semibold mb-4" style={{ fontSize: '0.95rem' }}>RFQs by Status</h2>
            <div className="d-flex flex-column gap-3">
              {rfqStatusDisplay.map(({ key, label, color }) => {
                const count = statusCounts[key] ?? 0
                const pct = rfqs.length > 0 ? Math.round((count / rfqs.length) * 100) : 0
                return (
                  <div key={key}>
                    <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.92rem' }}>
                      <span className="text-secondary">{label}</span>
                      <span className="text-white fw-semibold">{count} ({pct}%)</span>
                    </div>
                    <div className="rounded-pill overflow-hidden" style={{ height: '6px', background: 'var(--dark-elevated)' }}>
                      <div className="rounded-pill h-100" style={{ width: `${pct}%`, background: color, transition: 'width 0.3s' }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Top Materials */}
        <div className="col-lg-6">
          <div className="dark-card p-4 h-100">
            <h2 className="text-white fw-semibold mb-4" style={{ fontSize: '0.95rem' }}>Top Requested Materials</h2>
            {topMaterials.length === 0 ? (
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>No data yet.</p>
            ) : (
              <div className="d-flex flex-column gap-3">
                {topMaterials.map(([mat, count]) => {
                  const pct = rfqs.length > 0 ? Math.round((count / rfqs.length) * 100) : 0
                  return (
                    <div key={mat}>
                      <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.92rem' }}>
                        <span className="text-secondary">{mat}</span>
                        <span className="text-white fw-semibold">{count} RFQs</span>
                      </div>
                      <div className="rounded-pill overflow-hidden" style={{ height: '6px', background: 'var(--dark-elevated)' }}>
                        <div className="rounded-pill h-100" style={{ width: `${pct}%`, background: 'var(--brand-red)' }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Order Revenue Breakdown */}
        <div className="col-lg-6">
          <div className="dark-card p-4 h-100">
            <h2 className="text-white fw-semibold mb-4" style={{ fontSize: '0.95rem' }}>Order Revenue by Status</h2>
            {orders.length === 0 ? (
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>No orders yet.</p>
            ) : (
              <div className="d-flex flex-column gap-3">
                {[
                  { key: 'in_production', label: 'In Production', color: '#c084fc' },
                  { key: 'quality_check', label: 'Quality Check', color: '#a78bfa' },
                  { key: 'shipped',       label: 'Shipped',       color: '#f87171' },
                  { key: 'completed',     label: 'Completed',     color: '#4ade80' },
                ].map(({ key, label, color }) => {
                  const rev = orders.filter((o) => o.status === key).reduce((s, o) => s + o.amount, 0)
                  const total = orders.reduce((s, o) => s + o.amount, 0)
                  const pct = total > 0 ? Math.round((rev / total) * 100) : 0
                  return (
                    <div key={key}>
                      <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.92rem' }}>
                        <span className="text-secondary">{label}</span>
                        <span className="text-white fw-semibold">₹{rev.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="rounded-pill overflow-hidden" style={{ height: '6px', background: 'var(--dark-elevated)' }}>
                        <div className="rounded-pill h-100" style={{ width: `${pct}%`, background: color }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Priority distribution */}
        <div className="col-lg-6">
          <div className="dark-card p-4 h-100">
            <h2 className="text-white fw-semibold mb-4" style={{ fontSize: '0.95rem' }}>RFQ Priority Distribution</h2>
            {rfqs.length === 0 ? (
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>No RFQs yet.</p>
            ) : (
              <div className="row g-3">
                {[
                  { key: 'urgent', label: 'Urgent', bg: 'rgba(239,68,68,0.15)',   color: '#f87171' },
                  { key: 'high',   label: 'High',   bg: 'rgba(200,32,46,0.15)',   color: '#fca5a5' },
                  { key: 'normal', label: 'Normal', bg: 'rgba(96,165,250,0.15)',  color: '#60a5fa' },
                  { key: 'low',    label: 'Low',    bg: 'rgba(148,163,184,0.15)', color: '#94a3b8' },
                ].map(({ key, label, bg, color }) => {
                  const count = rfqs.filter((r) => r.priority === key).length
                  const pct = rfqs.length > 0 ? Math.round((count / rfqs.length) * 100) : 0
                  return (
                    <div key={key} className="col-6">
                      <div className="rounded p-3" style={{ background: bg, border: `1px solid ${color}33` }}>
                        <p className="fw-black mb-1" style={{ fontSize: '1.75rem', color }}>{count}</p>
                        <p className="fw-semibold mb-0" style={{ fontSize: '0.88rem', color }}>{label}</p>
                        <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>{pct}% of total</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
