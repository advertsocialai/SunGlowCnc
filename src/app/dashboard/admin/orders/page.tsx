import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import DashboardLayout from '@/components/DashboardLayout'

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  if (session.user.role !== 'admin' && session.user.role !== 'staff') redirect('/dashboard')

  const orders = await prisma.order.findMany({
    include: { rfq: { include: { user: true } } },
    orderBy: { createdAt: 'desc' },
  })

  const totalRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + o.amount, 0)

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Orders</h1>
        <p className="text-slate-500 text-sm mt-1">
          {orders.length} order{orders.length !== 1 ? 's' : ''} &bull; ₹{totalRevenue.toLocaleString('en-IN')} completed revenue
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <div className="text-4xl mb-3">📦</div>
            <div>No orders yet. Orders are created when a client approves a quote.</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Order #</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Component</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono text-xs text-slate-700 font-medium">{order.orderNumber}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {order.rfq.user.company ?? order.rfq.user.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">{order.rfq.title}</td>
                    <td className="px-6 py-4 font-semibold text-green-700 text-sm">
                      ₹{order.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge text-xs ${
                        order.status === 'completed' ? 'bg-green-100 text-green-700' :
                        order.status === 'shipped' ? 'bg-brand-red-100 text-brand-red-700' :
                        order.status === 'quality_check' ? 'bg-indigo-100 text-indigo-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      {new Date(order.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
