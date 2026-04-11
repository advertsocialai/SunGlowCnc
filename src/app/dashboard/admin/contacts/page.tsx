import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import DashboardLayout from '@/components/DashboardLayout'

export default async function AdminContactsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  if (session.user.role !== 'admin' && session.user.role !== 'staff') redirect('/dashboard')

  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Contact Inquiries</h1>
        <p className="text-slate-500 text-sm mt-1">{contacts.length} inquir{contacts.length !== 1 ? 'ies' : 'y'}</p>
      </div>

      <div className="space-y-4">
        {contacts.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center text-slate-400 shadow-sm">
            <div className="text-4xl mb-3">✉</div>
            <div>No contact inquiries yet.</div>
          </div>
        ) : (
          contacts.map((c) => (
            <div key={c.id} className="bg-white rounded-xl shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-red-100 rounded-full flex items-center justify-center text-brand-red-700 font-bold text-sm flex-shrink-0">
                    {c.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{c.name}</div>
                    <div className="text-xs text-slate-500">
                      {c.email} {c.phone ? `· ${c.phone}` : ''} {c.company ? `· ${c.company}` : ''}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge text-xs ${
                    c.status === 'new' ? 'bg-blue-100 text-blue-700' :
                    c.status === 'replied' ? 'bg-green-100 text-green-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {c.status}
                  </span>
                  <span className="text-xs text-slate-400">{new Date(c.createdAt).toLocaleDateString('en-IN')}</span>
                </div>
              </div>
              <p className="text-sm text-slate-700 bg-slate-50 rounded-lg p-3">{c.message}</p>
              <div className="mt-3 flex gap-2">
                <a
                  href={`mailto:${c.email}`}
                  className="text-xs bg-brand-red-50 hover:bg-brand-red-100 text-brand-red-700 border border-brand-red-200 px-3 py-1.5 rounded-lg transition-colors font-medium"
                >
                  Reply via Email
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  )
}
