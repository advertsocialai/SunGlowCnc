'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const navLinks = [
  {
    label: 'Services',
    href: '/services',
    dropdown: [
      { href: '/services', label: 'All Services' },
      { href: '/capabilities', label: 'Capabilities & Tolerances' },
      { href: '/materials', label: 'Materials' },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    dropdown: null,
  },
  {
    label: 'Materials',
    href: '/materials',
    dropdown: null,
  },
  {
    label: 'Clients',
    href: '/clients',
    dropdown: null,
  },
  {
    label: 'Resources',
    href: '/resources',
    dropdown: [
      { href: '/resources', label: 'All Resources' },
      { href: '/capabilities', label: 'DFM Guidelines' },
      { href: '/about', label: 'About Us' },
    ],
  },
  {
    label: 'About',
    href: '/about',
    dropdown: null,
  },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { data: session } = useSession()
  const pathname = usePathname()

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-sm">SG</span>
            </div>
            <div>
              <div className="font-bold text-base leading-tight">Sunglow CNC</div>
              <div className="text-orange-400 text-xs leading-tight hidden sm:block">Technics · Since 2003</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.dropdown && setOpenDropdown(link.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                    pathname === link.href || pathname.startsWith(link.href + '/')
                      ? 'bg-orange-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {link.label}
                  {link.dropdown && (
                    <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {link.dropdown && openDropdown === link.href && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-700 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname.startsWith('/dashboard')
                      ? 'bg-orange-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-orange-600/30 rounded-full flex items-center justify-center text-orange-400 text-xs font-bold">
                    {session.user.name?.[0]?.toUpperCase()}
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-slate-400 hover:text-slate-200 text-xs transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/dashboard/rfq/new"
                  className="bg-orange-600 hover:bg-orange-700 text-white text-sm px-4 py-2 rounded-lg transition-colors font-semibold"
                >
                  Get Instant Quote
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-700"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-700 bg-slate-900">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {[
              { href: '/', label: 'Home' },
              { href: '/services', label: 'Services' },
              { href: '/capabilities', label: 'Capabilities' },
              { href: '/materials', label: 'Materials' },
              { href: '/industries', label: 'Industries' },
              { href: '/clients', label: 'Clients' },
              { href: '/resources', label: 'Resources' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-orange-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-700 flex flex-col gap-2">
              {session ? (
                <>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm text-slate-300 hover:bg-slate-700">
                    Dashboard
                  </Link>
                  <button onClick={() => { setIsOpen(false); signOut({ callbackUrl: '/' }) }} className="bg-red-800/30 text-red-400 text-sm px-4 py-2 rounded-lg text-left">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-300 text-sm">Sign In</Link>
                  <Link href="/dashboard/rfq/new" onClick={() => setIsOpen(false)} className="bg-orange-600 text-white text-sm px-4 py-2 rounded-lg text-center font-semibold">
                    Get Instant Quote
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
