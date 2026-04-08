'use client'

import { useSession, signOut } from 'next-auth/react'
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
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="p-5 border-b border-slate-700">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xs">SG</span>
            </div>
            <div>
              <div className="font-bold text-sm leading-tight">Sunglow CNC</div>
              <div className="text-orange-400 text-xs">
                {isAdmin ? 'Admin Panel' : 'Client Portal'}
              </div>
            </div>
          </Link>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-600/30 rounded-full flex items-center justify-center text-orange-400 font-bold text-sm flex-shrink-0">
              {session?.user?.name?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <div className="min-w-0">
              <div className="font-medium text-sm truncate">{session?.user?.name}</div>
              <div className="text-xs text-slate-400 truncate">{session?.user?.company ?? session?.user?.email}</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === item.href
                  ? 'bg-orange-600 text-white'
                  : 'text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-slate-700 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <span>🌐</span> Public Website
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-red-900/30 hover:text-red-400 transition-colors"
          >
            <span>🚪</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
