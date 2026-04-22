import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import DashboardLayout from '@/components/DashboardLayout'

export default async function AdminClientsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  if (session.user.role !== 'admin' && session.user.role !== 'staff') redirect('/dashboard')

  const clients = await prisma.user.findMany({
    where: { role: 'client' },
    include: { rfqs: { include: { quote: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="text-white fw-bold mb-1" style={{ fontSize: '1.4rem' }}>Clients</h1>
        <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
          {clients.length} registered client{clients.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="dark-card overflow-hidden">
        <div className="table-responsive">
          <table className="table-dark-custom w-100">
            <thead>
              <tr>
                <th>Client</th>
                <th>Contact</th>
                <th>RFQs</th>
                <th>Total Value</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-5 text-secondary" style={{ fontSize: '0.95rem' }}>
                    No clients yet.
                  </td>
                </tr>
              ) : (
                clients.map((client) => {
                  const totalValue = client.rfqs.reduce((sum, rfq) => sum + (rfq.quote?.amount ?? 0), 0)
                  return (
                    <tr key={client.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                            style={{ width: 36, height: 36, background: 'rgba(200,32,46,0.2)', color: 'var(--brand-red)', fontSize: '0.95rem', border: '1px solid rgba(200,32,46,0.3)' }}
                          >
                            {client.name[0]}
                          </div>
                          <div>
                            <div className="text-white fw-medium" style={{ fontSize: '0.95rem' }}>{client.name}</div>
                            {client.company && <div className="text-muted" style={{ fontSize: '0.85rem' }}>{client.company}</div>}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-secondary" style={{ fontSize: '0.95rem' }}>{client.email}</div>
                        {client.phone && <div className="text-muted" style={{ fontSize: '0.85rem' }}>{client.phone}</div>}
                      </td>
                      <td className="text-secondary" style={{ fontSize: '0.95rem' }}>{client.rfqs.length}</td>
                      <td>
                        {totalValue > 0 ? (
                          <span className="fw-semibold" style={{ color: '#4ade80', fontSize: '0.95rem' }}>
                            ₹{totalValue.toLocaleString('en-IN')}
                          </span>
                        ) : (
                          <span className="text-muted" style={{ fontSize: '0.95rem' }}>—</span>
                        )}
                      </td>
                      <td className="text-muted" style={{ fontSize: '0.88rem' }}>
                        {new Date(client.createdAt).toLocaleDateString('en-IN')}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
