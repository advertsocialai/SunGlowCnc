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

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">All RFQs</h1>
        <p className="text-slate-500 text-sm mt-1">Review, quote, and manage customer requests</p>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-3 lg:grid-cols-7 gap-3 mb-6">
        {[
          { key: 'pending', label: 'Pending', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
          { key: 'quoted', label: 'Quoted', color: 'bg-blue-50 text-blue-700 border-blue-200' },
          { key: 'approved', label: 'Approved', color: 'bg-green-50 text-green-700 border-green-200' },
          { key: 'in_production', label: 'Production', color: 'bg-purple-50 text-purple-700 border-purple-200' },
          { key: 'shipped', label: 'Shipped', color: 'bg-orange-50 text-orange-700 border-orange-200' },
          { key: 'completed', label: 'Completed', color: 'bg-slate-50 text-slate-700 border-slate-200' },
          { key: 'rejected', label: 'Rejected', color: 'bg-red-50 text-red-700 border-red-200' },
        ].map((s) => (
          <div key={s.key} className={`rounded-xl border p-3 text-center ${s.color}`}>
            <div className="text-xl font-black">{statusCounts[s.key] || 0}</div>
            <div className="text-xs font-medium mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <AdminRFQTable rfqs={JSON.parse(JSON.stringify(rfqs))} />
    </DashboardLayout>
  )
}
