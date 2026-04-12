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
      <div className="mb-4">
        <h1 className="text-white fw-bold mb-1" style={{ fontSize: '1.4rem' }}>Orders</h1>
        <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>
          {orders.length} order{orders.length !== 1 ? 's' : ''} &bull; ₹{totalRevenue.toLocaleString('en-IN')} completed revenue
        </p>
      </div>

      <div className="dark-card overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-5 text-center">
            <div className="text-muted mb-2" style={{ fontSize: '2.5rem' }}>📦</div>
            <div className="text-secondary fw-medium mb-1">No orders yet</div>
            <div className="text-muted" style={{ fontSize: '0.82rem' }}>Orders are created when a client approves a quote.</div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table-dark-custom w-100">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Client</th>
                  <th>Component</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="text-secondary fw-medium" style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>
                      {order.orderNumber}
                    </td>
                    <td className="text-secondary" style={{ fontSize: '0.875rem' }}>
                      {order.rfq.user.company ?? order.rfq.user.name}
                    </td>
                    <td className="text-secondary" style={{ fontSize: '0.875rem' }}>{order.rfq.title}</td>
                    <td className="fw-semibold" style={{ color: '#4ade80', fontSize: '0.875rem' }}>
                      ₹{order.amount.toLocaleString('en-IN')}
                    </td>
                    <td>
                      <span
                        className="badge-status"
                        style={{
                          background: order.status === 'completed' ? 'rgba(74,222,128,0.15)' :
                            order.status === 'shipped' ? 'rgba(200,32,46,0.15)' :
                            order.status === 'quality_check' ? 'rgba(167,139,250,0.15)' :
                            'rgba(192,132,252,0.15)',
                          color: order.status === 'completed' ? '#4ade80' :
                            order.status === 'shipped' ? '#f87171' :
                            order.status === 'quality_check' ? '#a78bfa' :
                            '#c084fc',
                        }}
                      >
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="text-muted" style={{ fontSize: '0.78rem' }}>
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
