'use client'

import { useState } from 'react'
import Image from 'next/image'
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
  { label: 'Industries', href: '/industries', dropdown: null },
  { label: 'Materials', href: '/materials', dropdown: null },
  { label: 'Clients', href: '/clients', dropdown: null },
  {
    label: 'Resources',
    href: '/resources',
    dropdown: [
      { href: '/resources', label: 'All Resources' },
      { href: '/capabilities', label: 'DFM Guidelines' },
      { href: '/about', label: 'About Us' },
    ],
  },
  { label: 'About', href: '/about', dropdown: null },
  { label: 'Reach Us', href: '/reach-us', dropdown: null },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  // Dropdowns are now CSS hover-triggered
  const { data: session } = useSession()
  const pathname = usePathname()

  return (
    <nav className="navbar-dark-brand sticky-top w-100">
      <div className="container-xl d-flex align-items-center justify-content-between h-100">
        {/* Logo */}
        <Link href="/" className="text-decoration-none flex-shrink-0">
          <div className="d-flex align-items-center gap-2">
            <div className="bg-white rounded px-2 py-1">
              <Image
                src="/logo.png"
                alt="Sunglow CNC Technics"
                width={40}
                height={40}
                style={{ height: '36px', width: '36px', objectFit: 'contain' }}
                unoptimized
              />
            </div>
            <div className="d-flex flex-column lh-1">
              <span className="fw-bold text-white" style={{ fontSize: '0.95rem', letterSpacing: '0.5px' }}>Sun Glow</span>
              <span className="fw-semibold text-white" style={{ fontSize: '0.82rem', letterSpacing: '1px', opacity: 0.85 }}>CNC Technics</span>
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="d-none d-lg-flex align-items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.href}
              className="position-relative"
            >
              <Link
                href={link.href}
                className={`nav-link-brand ${pathname === link.href || pathname.startsWith(link.href + '/') ? 'active' : ''}`}
              >
                {link.label}
                {link.dropdown && (
                  <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </Link>
              {link.dropdown && (
                <div className="nav-dropdown">
                  {link.dropdown.map((item) => (
                    <Link key={item.href} href={item.href} className="nav-dropdown-item">
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Auth + CTA */}
        <div className="d-none d-lg-flex align-items-center gap-3">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className={`nav-link-brand ${pathname.startsWith('/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              <div className="d-flex align-items-center gap-2">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle bg-brand-red text-white fw-bold"
                  style={{ width: 28, height: 28, fontSize: 11, opacity: 0.9 }}
                >
                  {session.user.name?.[0]?.toUpperCase()}
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="btn btn-link p-0 text-secondary text-decoration-none"
                  style={{ fontSize: '0.9rem' }}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="nav-link-brand">Sign In</Link>
              <Link href="/dashboard/rfq/new" className="btn-brand" style={{ fontSize: '0.92rem', padding: '0.45rem 1rem' }}>
                Get Instant Quote
              </Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="d-lg-none btn btn-link text-secondary p-2"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="mobile-menu px-3 py-3">
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
            { href: '/reach-us', label: 'Reach Us' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`mobile-nav-link ${pathname === link.href ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-top border-dark-custom pt-2 mt-2">
            {session ? (
              <>
                <Link href="/dashboard" onClick={() => setIsOpen(false)} className="mobile-nav-link">
                  Dashboard
                </Link>
                <button
                  onClick={() => { setIsOpen(false); signOut({ callbackUrl: '/' }) }}
                  className="btn btn-link text-danger p-0 ps-3 py-2 text-decoration-none w-100 text-start"
                  style={{ fontSize: '0.95rem' }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)} className="mobile-nav-link">Sign In</Link>
                <Link href="/dashboard/rfq/new" onClick={() => setIsOpen(false)} className="btn-brand d-block text-center mt-2">
                  Get Instant Quote
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
