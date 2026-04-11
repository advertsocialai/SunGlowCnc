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
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-navy-800 text-white flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="p-5 border-b border-brand-navy-600">
          <Link href="/" className="flex flex-col items-start gap-1">
            <div className="bg-white rounded-lg px-2 py-1">
              <Image src="/logo.png" alt="Sunglow CNC Technics" width={120} height={30} className="h-7 w-auto object-contain" />
            </div>
            <div className="text-brand-red-400 text-xs pl-1">
              {isAdmin ? 'Admin Panel' : 'Client Portal'}
            </div>
          </Link>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-brand-navy-600">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-red-600/30 rounded-full flex items-center justify-center text-brand-red-400 font-bold text-sm flex-shrink-0">
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
                  ? 'bg-brand-red-600 text-white'
                  : 'text-slate-300 hover:bg-brand-navy-600 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-brand-navy-600 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-brand-navy-600 hover:text-white transition-colors"
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
