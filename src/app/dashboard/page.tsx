import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import DashboardLayout from '@/components/DashboardLayout'
import Link from 'next/link'

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: 'status-pending', quoted: 'status-quoted', approved: 'status-approved',
    in_production: 'status-production', shipped: 'status-shipped',
    completed: 'status-completed', rejected: 'status-rejected',
  }
  const labels: Record<string, string> = {
    pending: 'Pending', quoted: 'Quoted', approved: 'Approved',
    in_production: 'In Production', shipped: 'Shipped', completed: 'Completed', rejected: 'Rejected',
  }
  return <span className={`badge-status ${map[status] ?? 'status-completed'}`}>{labels[status] ?? status}</span>
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const isAdmin = session.user.role === 'admin' || session.user.role === 'staff'

  let rfqs, totalClients: number | undefined, recentContacts

  if (isAdmin) {
    rfqs = await prisma.rFQ.findMany({ include: { user: true, quote: true }, orderBy: { createdAt: 'desc' }, take: 10 })
    totalClients = await prisma.user.count({ where: { role: 'client' } })
    recentContacts = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
  } else {
    rfqs = await prisma.rFQ.findMany({ where: { userId: session.user.id }, include: { quote: true }, orderBy: { createdAt: 'desc' }, take: 10 })
  }

  const statusCounts = rfqs.reduce((acc: Record<string, number>, rfq) => {
    acc[rfq.status] = (acc[rfq.status] || 0) + 1
    return acc
  }, {})

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="text-white fw-bold mb-1" style={{ fontSize: '1.5rem' }}>
          {isAdmin ? 'Admin Dashboard' : `Welcome, ${session.user.name}`}
        </h1>
        <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>
          {isAdmin ? 'Manage RFQs, orders, and client relationships' : 'Track your RFQs and orders'}
        </p>
      </div>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {[
          { value: rfqs.length, label: 'Total RFQs', color: 'var(--text-primary)' },
          { value: statusCounts.pending || 0, label: 'Pending Review', color: '#fbbf24' },
          { value: statusCounts.in_production || 0, label: 'In Production', color: '#c084fc' },
          { value: isAdmin ? totalClients : (statusCounts.completed || 0), label: isAdmin ? 'Total Clients' : 'Completed', color: '#4ade80' },
        ].map((stat) => (
          <div key={stat.label} className="col-6 col-lg-3">
            <div className="dark-card p-4 h-100">
              <div className="fw-black mb-1" style={{ fontSize: '1.75rem', color: stat.color }}>{stat.value}</div>
              <div className="text-muted" style={{ fontSize: '0.82rem' }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Workflow */}
      <div className="dark-card p-4 mb-4">
        <h2 className="text-white fw-semibold mb-3" style={{ fontSize: '0.95rem' }}>Order Workflow</h2>
        <div className="d-flex align-items-center flex-wrap gap-1">
          {['RFQ Submitted', 'Quote Sent', 'Approved', 'In Production', 'Quality Check', 'Shipped', 'Completed'].map((step, i, arr) => (
            <div key={step} className="d-flex align-items-center gap-1">
              <span className="badge-status status-completed">{step}</span>
              {i < arr.length - 1 && <span className="text-muted">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Recent RFQs */}
      <div className="dark-card overflow-hidden mb-4">
        <div className="px-4 py-3 d-flex justify-content-between align-items-center border-bottom border-dark-custom">
          <h2 className="text-white fw-semibold mb-0" style={{ fontSize: '0.95rem' }}>Recent RFQs</h2>
          <div className="d-flex gap-3">
            {!isAdmin && (
              <Link href="/dashboard/rfq/new" className="btn-brand" style={{ padding: '0.35rem 0.9rem', fontSize: '0.78rem' }}>+ New RFQ</Link>
            )}
            <Link href={isAdmin ? '/dashboard/admin' : '/dashboard/rfq'} className="text-brand-red text-decoration-none fw-medium" style={{ fontSize: '0.82rem' }}>View All →</Link>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table-dark-custom w-100">
            <thead>
              <tr>
                <th>Title</th>
                {isAdmin && <th>Client</th>}
                <th>Material</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Quote</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {rfqs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-5">
                    No RFQs yet.{' '}
                    {!isAdmin && <Link href="/dashboard/rfq/new" className="text-brand-red text-decoration-none fw-semibold">Submit your first RFQ</Link>}
                  </td>
                </tr>
              ) : rfqs.map((rfq) => (
                <tr key={rfq.id}>
                  <td>
                    <div className="text-white fw-medium" style={{ fontSize: '0.875rem' }}>{rfq.title}</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>{rfq.id.slice(0, 8)}...</div>
                  </td>
                  {isAdmin && (
                    <td className="text-secondary">
                      {(rfq as { user?: { name: string; company?: string | null } }).user?.company ?? (rfq as { user?: { name: string } }).user?.name}
                    </td>
                  )}
                  <td className="text-secondary">{rfq.material}</td>
                  <td className="text-secondary">{rfq.quantity}</td>
                  <td><StatusBadge status={rfq.status} /></td>
                  <td>
                    {rfq.quote
                      ? <span className="fw-semibold" style={{ color: '#4ade80' }}>₹{rfq.quote.amount.toLocaleString('en-IN')}</span>
                      : <span className="text-muted">—</span>
                    }
                  </td>
                  <td className="text-muted" style={{ fontSize: '0.78rem' }}>{new Date(rfq.createdAt).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Contacts (admin) */}
      {isAdmin && recentContacts && recentContacts.length > 0 && (
        <div className="dark-card overflow-hidden">
          <div className="px-4 py-3 border-bottom border-dark-custom">
            <h2 className="text-white fw-semibold mb-0" style={{ fontSize: '0.95rem' }}>Recent Contact Inquiries</h2>
          </div>
          {recentContacts.map((c) => (
            <div key={c.id} className="px-4 py-3 border-bottom border-dark-custom d-flex justify-content-between align-items-start">
              <div>
                <div className="text-white fw-medium" style={{ fontSize: '0.875rem' }}>{c.name}</div>
                <div className="text-muted" style={{ fontSize: '0.78rem' }}>{c.email} {c.company ? `· ${c.company}` : ''}</div>
                <div className="text-secondary mt-1" style={{ fontSize: '0.82rem', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.message}</div>
              </div>
              <span className="text-muted flex-shrink-0" style={{ fontSize: '0.75rem' }}>{new Date(c.createdAt).toLocaleDateString('en-IN')}</span>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
