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
    { key: 'pending', label: 'Pending', color: 'bg-yellow-400' },
    { key: 'quoted', label: 'Quoted', color: 'bg-blue-400' },
    { key: 'approved', label: 'Approved', color: 'bg-green-400' },
    { key: 'in_production', label: 'In Production', color: 'bg-orange-400' },
    { key: 'quality_check', label: 'QC', color: 'bg-purple-400' },
    { key: 'shipped', label: 'Shipped', color: 'bg-teal-400' },
    { key: 'completed', label: 'Completed', color: 'bg-slate-400' },
    { key: 'rejected', label: 'Rejected', color: 'bg-red-400' },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-500 text-sm mt-1">Platform overview and business metrics</p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl shadow-sm p-5">
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">{s.label}</p>
              <p className="text-3xl font-black text-slate-900">{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* RFQ by Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-4">RFQs by Status</h2>
            <div className="space-y-3">
              {rfqStatusDisplay.map(({ key, label, color }) => {
                const count = statusCounts[key] ?? 0
                const pct = rfqs.length > 0 ? Math.round((count / rfqs.length) * 100) : 0
                return (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">{label}</span>
                      <span className="font-semibold text-slate-800">{count} ({pct}%)</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Top Materials */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Top Requested Materials</h2>
            {topMaterials.length === 0 ? (
              <p className="text-slate-400 text-sm">No data yet.</p>
            ) : (
              <div className="space-y-3">
                {topMaterials.map(([mat, count]) => {
                  const pct = rfqs.length > 0 ? Math.round((count / rfqs.length) * 100) : 0
                  return (
                    <div key={mat}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">{mat}</span>
                        <span className="font-semibold text-slate-800">{count} RFQs</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-400 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Order Revenue Breakdown */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-4">Order Revenue by Status</h2>
            {orders.length === 0 ? (
              <p className="text-slate-400 text-sm">No orders yet.</p>
            ) : (
              <div className="space-y-3">
                {[
                  { key: 'in_production', label: 'In Production', color: 'bg-orange-400' },
                  { key: 'quality_check', label: 'Quality Check', color: 'bg-purple-400' },
                  { key: 'shipped', label: 'Shipped', color: 'bg-teal-400' },
                  { key: 'completed', label: 'Completed', color: 'bg-green-400' },
                ].map(({ key, label, color }) => {
                  const rev = orders.filter((o) => o.status === key).reduce((s, o) => s + o.amount, 0)
                  const total = orders.reduce((s, o) => s + o.amount, 0)
                  const pct = total > 0 ? Math.round((rev / total) * 100) : 0
                  return (
                    <div key={key}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">{label}</span>
                        <span className="font-semibold text-slate-800">₹{rev.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Priority distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-base font-semibold text-slate-900 mb-4">RFQ Priority Distribution</h2>
            {rfqs.length === 0 ? (
              <p className="text-slate-400 text-sm">No RFQs yet.</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'urgent', label: 'Urgent', color: 'text-red-600 bg-red-50' },
                  { key: 'high', label: 'High', color: 'text-orange-600 bg-orange-50' },
                  { key: 'normal', label: 'Normal', color: 'text-blue-600 bg-blue-50' },
                  { key: 'low', label: 'Low', color: 'text-slate-600 bg-slate-100' },
                ].map(({ key, label, color }) => {
                  const count = rfqs.filter((r) => r.priority === key).length
                  const pct = rfqs.length > 0 ? Math.round((count / rfqs.length) * 100) : 0
                  return (
                    <div key={key} className={`rounded-lg p-4 ${color}`}>
                      <p className="text-2xl font-black">{count}</p>
                      <p className="text-xs font-semibold mt-0.5">{label}</p>
                      <p className="text-xs opacity-70">{pct}% of total</p>
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
