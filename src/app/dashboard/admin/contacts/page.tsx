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
      <div className="mb-4">
        <h1 className="text-white fw-bold mb-1" style={{ fontSize: '1.4rem' }}>Contact Inquiries</h1>
        <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
          {contacts.length} inquir{contacts.length !== 1 ? 'ies' : 'y'} received
        </p>
      </div>

      <div className="d-flex flex-column gap-3">
        {contacts.length === 0 ? (
          <div className="dark-card p-5 text-center">
            <div className="text-muted mb-2" style={{ fontSize: '2.5rem' }}>✉</div>
            <div className="text-secondary fw-medium">No contact inquiries yet.</div>
          </div>
        ) : (
          contacts.map((c) => (
            <div key={c.id} className="dark-card p-4">
              <div className="d-flex align-items-start justify-content-between mb-3">
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
                    style={{ width: 40, height: 40, background: 'rgba(200,32,46,0.2)', color: 'var(--brand-red)', fontSize: '0.9rem', border: '1px solid rgba(200,32,46,0.3)' }}
                  >
                    {c.name[0]}
                  </div>
                  <div>
                    <div className="text-white fw-semibold" style={{ fontSize: '0.9rem' }}>{c.name}</div>
                    <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                      {c.email}{c.phone ? ` · ${c.phone}` : ''}{c.company ? ` · ${c.company}` : ''}
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span
                    className="badge-status"
                    style={{
                      background: c.status === 'new' ? 'rgba(96,165,250,0.15)' :
                        c.status === 'replied' ? 'rgba(74,222,128,0.15)' :
                        'rgba(148,163,184,0.15)',
                      color: c.status === 'new' ? '#60a5fa' :
                        c.status === 'replied' ? '#4ade80' :
                        '#94a3b8',
                    }}
                  >
                    {c.status}
                  </span>
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}>
                    {new Date(c.createdAt).toLocaleDateString('en-IN')}
                  </span>
                </div>
              </div>
              <p className="text-secondary mb-3 p-3 rounded" style={{ fontSize: '0.95rem', background: 'var(--dark-elevated)', border: '1px solid var(--dark-border)' }}>
                {c.message}
              </p>
              <div className="d-flex gap-2">
                <a
                  href={`mailto:${c.email}`}
                  className="btn px-3 py-1"
                  style={{
                    fontSize: '0.88rem', fontWeight: 500,
                    background: 'rgba(200,32,46,0.12)', color: 'var(--brand-red)',
                    border: '1px solid rgba(200,32,46,0.3)', borderRadius: '6px',
                    textDecoration: 'none',
                  }}
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
