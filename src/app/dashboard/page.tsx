import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import DashboardLayout from '@/components/DashboardLayout'
import Link from 'next/link'

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending:       'status-pending',
    quoted:        'status-quoted',
    approved:      'status-approved',
    in_production: 'status-production',
    shipped:       'status-shipped',
    completed:     'status-completed',
    rejected:      'status-rejected',
  }
  const labels: Record<string, string> = {
    pending:       'Pending',
    quoted:        'Quoted',
    approved:      'Approved',
    in_production: 'In Production',
    shipped:       'Shipped',
    completed:     'Completed',
    rejected:      'Rejected',
  }
  return <span className={map[status] ?? 'badge bg-slate-100 text-slate-600'}>{labels[status] ?? status}</span>
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const isAdmin = session.user.role === 'admin' || session.user.role === 'staff'

  let rfqs, totalClients: number | undefined, recentContacts

  if (isAdmin) {
    rfqs = await prisma.rFQ.findMany({
      include: { user: true, quote: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })
    totalClients = await prisma.user.count({ where: { role: 'client' } })
    recentContacts = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
  } else {
    rfqs = await prisma.rFQ.findMany({
      where: { userId: session.user.id },
      include: { quote: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    })
  }

  const statusCounts = rfqs.reduce((acc: Record<string, number>, rfq) => {
    acc[rfq.status] = (acc[rfq.status] || 0) + 1
    return acc
  }, {})

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          {isAdmin ? 'Admin Dashboard' : `Welcome, ${session.user.name}`}
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {isAdmin ? 'Manage RFQs, orders, and client relationships' : 'Track your RFQs and orders'}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="text-2xl font-black text-slate-900">{rfqs.length}</div>
          <div className="text-sm text-slate-500 mt-1">Total RFQs</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="text-2xl font-black text-yellow-600">{statusCounts.pending || 0}</div>
          <div className="text-sm text-slate-500 mt-1">Pending Review</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="text-2xl font-black text-purple-600">{statusCounts.in_production || 0}</div>
          <div className="text-sm text-slate-500 mt-1">In Production</div>
        </div>
        {isAdmin ? (
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-black text-green-600">{totalClients}</div>
            <div className="text-sm text-slate-500 mt-1">Total Clients</div>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="text-2xl font-black text-green-600">{statusCounts.completed || 0}</div>
            <div className="text-sm text-slate-500 mt-1">Completed</div>
          </div>
        )}
      </div>

      {/* Workflow Guide */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
        <h2 className="font-semibold text-slate-900 mb-3">Order Workflow</h2>
        <div className="flex items-center gap-1 flex-wrap">
          {['RFQ Submitted', 'Quote Sent', 'Approved', 'In Production', 'Quality Check', 'Shipped', 'Completed'].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-1">
              <span className="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-full font-medium">{step}</span>
              {i < arr.length - 1 && <span className="text-slate-400 text-xs">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Recent RFQs */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="font-semibold text-slate-900">Recent RFQs</h2>
          <div className="flex gap-2">
            {!isAdmin && (
              <Link href="/dashboard/rfq/new" className="bg-brand-red-600 hover:bg-brand-red-700 text-white text-xs px-4 py-2 rounded-lg transition-colors">
                + New RFQ
              </Link>
            )}
            <Link href={isAdmin ? '/dashboard/admin' : '/dashboard/rfq'} className="text-xs text-brand-red-600 hover:text-brand-red-700 font-medium">
              View All →
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                {isAdmin && <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Client</th>}
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Material</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Qty</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Quote</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rfqs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-slate-400 text-sm">
                    No RFQs yet.{' '}
                    {!isAdmin && (
                      <Link href="/dashboard/rfq/new" className="text-brand-red-600 font-medium">Submit your first RFQ</Link>
                    )}
                  </td>
                </tr>
              ) : (
                rfqs.map((rfq) => (
                  <tr key={rfq.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 text-sm">{rfq.title}</div>
                      <div className="text-xs text-slate-400">{rfq.id.slice(0, 8)}...</div>
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {(rfq as { user?: { name: string; company?: string | null } }).user?.company ?? (rfq as { user?: { name: string } }).user?.name}
                      </td>
                    )}
                    <td className="px-6 py-4 text-sm text-slate-600">{rfq.material}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{rfq.quantity}</td>
                    <td className="px-6 py-4"><StatusBadge status={rfq.status} /></td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {rfq.quote ? (
                        <span className="font-semibold text-green-700">
                          ₹{rfq.quote.amount.toLocaleString('en-IN')}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {new Date(rfq.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Contacts (admin only) */}
      {isAdmin && recentContacts && recentContacts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-900">Recent Contact Inquiries</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {recentContacts.map((c) => (
              <div key={c.id} className="px-6 py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-sm text-slate-900">{c.name}</div>
                    <div className="text-xs text-slate-500">{c.email} {c.company ? `· ${c.company}` : ''}</div>
                    <div className="text-xs text-slate-600 mt-1 line-clamp-1">{c.message}</div>
                  </div>
                  <span className="text-xs text-slate-400">{new Date(c.createdAt).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
