'use client'

import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const clientNav = [
  { href: '/dashboard', label: 'Overview', icon: '📊' },
  { href: '/dashboard/rfq', label: 'My RFQs', icon: '📋' },
  { href: '/dashboard/rfq/new', label: 'New RFQ', icon: '➕' },
]

const adminNav = [
  { href: '/dashboard', label: 'Overview', icon: '📊' },
  { href: '/dashboard/admin', label: 'All RFQs', icon: '📋' },
  { href: '/dashboard/admin/orders', label: 'Orders', icon: '📦' },
  { href: '/dashboard/admin/clients', label: 'Clients', icon: '👥' },
  { href: '/dashboard/admin/contacts', label: 'Inquiries', icon: '✉' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const pathname = usePathname()
  const isAdmin = session?.user?.role === 'admin' || session?.user?.role === 'staff'
  const navItems = isAdmin ? adminNav : clientNav

  return (
    <div className="d-flex min-vh-100" style={{ background: 'var(--dark-bg)' }}>
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        {/* Logo */}
        <div className="p-4 border-bottom border-dark-custom">
          <Link href="/" className="d-flex align-items-center gap-2 text-decoration-none mb-2">
            <div className="bg-white rounded px-2 py-1 flex-shrink-0">
              <Image src="/logo.png" alt="Sunglow CNC Technics" width={36} height={36} style={{ height: '32px', width: '32px', objectFit: 'contain' }} unoptimized />
            </div>
            <div className="d-flex flex-column lh-1">
              <span className="fw-bold text-white" style={{ fontSize: '0.9rem', letterSpacing: '0.3px' }}>Sun Glow</span>
              <span className="fw-semibold text-white" style={{ fontSize: '0.72rem', letterSpacing: '0.8px', opacity: 0.8 }}>CNC Technics</span>
            </div>
          </Link>
          <span className="text-brand-red fw-semibold" style={{ fontSize: '0.78rem' }}>
            {isAdmin ? 'Admin Panel' : 'Client Portal'}
          </span>
        </div>

        {/* User info */}
        <div className="p-3 border-bottom border-dark-custom">
          <div className="d-flex align-items-center gap-3">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold flex-shrink-0"
              style={{ width: 36, height: 36, background: 'rgba(200,32,46,0.3)', color: 'var(--brand-red)', fontSize: 13 }}
            >
              {session?.user?.name?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <div className="min-w-0">
              <div className="fw-medium text-truncate" style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                {session?.user?.name}
              </div>
              <div className="text-muted text-truncate" style={{ fontSize: '0.85rem' }}>
                {session?.user?.company ?? session?.user?.email}
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-grow-1 p-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-nav-link ${pathname === item.href ? 'active' : ''}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-top border-dark-custom">
          <Link href="/" className="sidebar-nav-link">
            <span>🌐</span> Public Website
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="sidebar-nav-link w-100 border-0 bg-transparent text-start"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-grow-1 overflow-auto">
        <div className="p-4 p-md-5">
          {children}
        </div>
      </main>
    </div>
  )
}
