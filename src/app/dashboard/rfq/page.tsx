import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import DashboardLayout from '@/components/DashboardLayout'
import Link from 'next/link'

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: 'status-pending', quoted: 'status-quoted', approved: 'status-approved',
    in_production: 'status-production', shipped: 'status-shipped', completed: 'status-completed', rejected: 'status-rejected',
  }
  const labels: Record<string, string> = {
    pending: 'Pending', quoted: 'Quoted', approved: 'Approved',
    in_production: 'In Production', shipped: 'Shipped', completed: 'Completed', rejected: 'Rejected',
  }
  return <span className={`badge-status ${map[status] ?? 'status-completed'}`}>{labels[status] ?? status}</span>
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, { bg: string; color: string }> = {
    urgent: { bg: 'rgba(239,68,68,0.15)', color: '#f87171' },
    high:   { bg: 'rgba(200,32,46,0.15)', color: '#fca5a5' },
    normal: { bg: 'rgba(96,165,250,0.15)', color: '#60a5fa' },
    low:    { bg: 'rgba(148,163,184,0.15)', color: '#94a3b8' },
  }
  const c = colors[priority] ?? colors.normal
  return <span className="badge-status" style={{ background: c.bg, color: c.color }}>{priority}</span>
}

export default async function RFQListPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const rfqs = await prisma.rFQ.findMany({
    where: { userId: session.user.id },
    include: { quote: true, order: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h1 className="text-white fw-bold mb-1" style={{ fontSize: '1.4rem' }}>My RFQs</h1>
          <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>All your Request for Quotation submissions</p>
        </div>
        <Link href="/dashboard/rfq/new" className="btn-brand" style={{ fontSize: '0.85rem', padding: '0.5rem 1.1rem' }}>
          + New RFQ
        </Link>
      </div>

      <div className="dark-card overflow-hidden">
        <div className="table-responsive">
          <table className="table-dark-custom w-100">
            <thead>
              <tr>
                <th>Title / ID</th>
                <th>Material</th>
                <th>Tolerance</th>
                <th>Qty</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Quote</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {rfqs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-5">
                    <div className="text-muted mb-2" style={{ fontSize: '2.5rem' }}>📋</div>
                    <div className="text-secondary fw-medium mb-1">No RFQs submitted yet</div>
                    <div className="text-muted mb-4" style={{ fontSize: '0.82rem' }}>Submit your first Request for Quotation to get started</div>
                    <Link href="/dashboard/rfq/new" className="btn-brand" style={{ fontSize: '0.82rem' }}>Submit First RFQ</Link>
                  </td>
                </tr>
              ) : rfqs.map((rfq) => (
                <tr key={rfq.id}>
                  <td>
                    <div className="text-white fw-medium" style={{ fontSize: '0.875rem' }}>{rfq.title}</div>
                    <div className="text-muted" style={{ fontSize: '0.72rem', fontFamily: 'monospace' }}>#{rfq.id.slice(-8)}</div>
                  </td>
                  <td className="text-secondary">{rfq.material}</td>
                  <td className="text-secondary">{rfq.tolerance ?? '—'}</td>
                  <td className="text-secondary">{rfq.quantity}</td>
                  <td><PriorityBadge priority={rfq.priority} /></td>
                  <td><StatusBadge status={rfq.status} /></td>
                  <td>
                    {rfq.quote ? (
                      <div>
                        <div className="fw-semibold" style={{ color: '#4ade80', fontSize: '0.875rem' }}>₹{rfq.quote.amount.toLocaleString('en-IN')}</div>
                        <div className="text-muted" style={{ fontSize: '0.72rem' }}>Valid till {new Date(rfq.quote.validUntil).toLocaleDateString('en-IN')}</div>
                      </div>
                    ) : (
                      <span className="text-muted" style={{ fontSize: '0.78rem' }}>Awaiting quote</span>
                    )}
                  </td>
                  <td className="text-muted" style={{ fontSize: '0.78rem' }}>{new Date(rfq.createdAt).toLocaleDateString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
