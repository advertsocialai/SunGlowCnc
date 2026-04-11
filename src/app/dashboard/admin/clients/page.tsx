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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
        <p className="text-slate-500 text-sm mt-1">{clients.length} registered client{clients.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">RFQs</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Total Value</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 text-sm">No clients yet.</td>
                </tr>
              ) : (
                clients.map((client) => {
                  const totalValue = client.rfqs.reduce((sum, rfq) => sum + (rfq.quote?.amount ?? 0), 0)
                  return (
                    <tr key={client.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-brand-red-100 rounded-full flex items-center justify-center text-brand-red-700 font-bold text-sm flex-shrink-0">
                            {client.name[0]}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 text-sm">{client.name}</div>
                            {client.company && <div className="text-xs text-slate-500">{client.company}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-700">{client.email}</div>
                        {client.phone && <div className="text-xs text-slate-400">{client.phone}</div>}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">{client.rfqs.length}</td>
                      <td className="px-6 py-4">
                        {totalValue > 0 ? (
                          <span className="font-semibold text-green-700 text-sm">
                            ₹{totalValue.toLocaleString('en-IN')}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400">
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
