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
  return <span className={map[status] ?? 'badge bg-slate-100 text-slate-600'}>{labels[status] ?? status}</span>
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My RFQs</h1>
          <p className="text-slate-500 text-sm mt-1">All your Request for Quotation submissions</p>
        </div>
        <Link href="/dashboard/rfq/new" className="btn-primary">
          + New RFQ
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Title / ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Material</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tolerance</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Qty</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Quote</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rfqs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center">
                    <div className="text-slate-400 text-4xl mb-3">📋</div>
                    <div className="text-slate-600 font-medium">No RFQs submitted yet</div>
                    <div className="text-sm text-slate-400 mb-4">Submit your first Request for Quotation to get started</div>
                    <Link href="/dashboard/rfq/new" className="btn-primary text-sm">
                      Submit First RFQ
                    </Link>
                  </td>
                </tr>
              ) : (
                rfqs.map((rfq) => (
                  <tr key={rfq.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 text-sm">{rfq.title}</div>
                      <div className="text-xs text-slate-400 font-mono">#{rfq.id.slice(-8)}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{rfq.material}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{rfq.tolerance ?? '—'}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{rfq.quantity}</td>
                    <td className="px-6 py-4">
                      <span className={`badge text-xs ${
                        rfq.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                        rfq.priority === 'high' ? 'bg-brand-red-100 text-brand-red-700' :
                        rfq.priority === 'normal' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {rfq.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4"><StatusBadge status={rfq.status} /></td>
                    <td className="px-6 py-4 text-sm">
                      {rfq.quote ? (
                        <div>
                          <div className="font-semibold text-green-700">₹{rfq.quote.amount.toLocaleString('en-IN')}</div>
                          <div className="text-xs text-slate-400">Valid till {new Date(rfq.quote.validUntil).toLocaleDateString('en-IN')}</div>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs">Awaiting quote</span>
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
    </DashboardLayout>
  )
}
