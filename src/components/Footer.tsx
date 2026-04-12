'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) { setSubscribed(true); setEmail('') }
  }

  return (
    <footer className="footer-brand">
      {/* Newsletter bar */}
      <div className="border-bottom border-dark-custom">
        <div className="container-xl py-4">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4">
            <div>
              <h3 className="text-white fw-bold mb-1" style={{ fontSize: '1rem' }}>Stay Connected!</h3>
              <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>
                Get manufacturing tips, material guides, and capability updates.
              </p>
            </div>
            {subscribed ? (
              <div className="px-4 py-2 rounded" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80', fontSize: '0.85rem' }}>
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="d-flex gap-2 w-100" style={{ maxWidth: '420px' }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="form-control-dark flex-grow-1"
                  style={{ minWidth: 0 }}
                />
                <button type="submit" className="btn-brand flex-shrink-0" style={{ padding: '0.6rem 1.25rem' }}>
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-xl py-5">
        <div className="row g-5">
          {/* Brand */}
          <div className="col-12 col-md-6 col-lg-3">
            <Link href="/" className="d-inline-block mb-3 text-decoration-none">
              <div className="bg-white rounded px-3 py-2">
                <Image src="/logo.svg" alt="Sunglow CNC Technics" width={160} height={40} style={{ height: '38px', width: 'auto' }} unoptimized />
              </div>
            </Link>
            <p className="text-muted mb-3" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
              Precision Engineering &amp; Manufacturing Solutions since 2003. Hyderabad, India.
            </p>
            <div className="d-flex flex-wrap gap-2">
              <span className="cert-badge">ISO 9001</span>
              <span className="cert-badge">GMP</span>
              <span className="cert-badge">AS9100</span>
            </div>
          </div>

          {/* Services */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="text-white fw-semibold mb-3 text-uppercase letter-wide" style={{ fontSize: '0.75rem' }}>Services</h6>
            {[
              { href: '/services', label: 'CNC Milling (VMC)' },
              { href: '/services', label: 'CNC Turning / Lathe' },
              { href: '/services', label: 'Wire Cut & EDM' },
              { href: '/services', label: 'Pharma Components' },
              { href: '/services', label: 'Defence Hardware' },
              { href: '/services', label: 'EV Battery Casings' },
            ].map((link) => (
              <Link key={link.label} href={link.href} className="footer-link">{link.label}</Link>
            ))}
          </div>

          {/* Industries */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="text-white fw-semibold mb-3 text-uppercase letter-wide" style={{ fontSize: '0.75rem' }}>Industries</h6>
            {[
              { href: '/industries', label: 'Pharma & Medical' },
              { href: '/industries', label: 'Defence & Aerospace' },
              { href: '/industries', label: 'EV & Automotive' },
              { href: '/industries', label: 'Robotics & Drones' },
              { href: '/industries', label: 'Electronics' },
              { href: '/industries', label: 'Energy & Turbine' },
            ].map((link) => (
              <Link key={link.label} href={link.href} className="footer-link">{link.label}</Link>
            ))}
          </div>

          {/* Resources */}
          <div className="col-6 col-md-3 col-lg-2">
            <h6 className="text-white fw-semibold mb-3 text-uppercase letter-wide" style={{ fontSize: '0.75rem' }}>Resources</h6>
            {[
              { href: '/materials', label: 'Materials Guide' },
              { href: '/capabilities', label: 'Capabilities & Specs' },
              { href: '/resources', label: 'Design Guidelines' },
              { href: '/resources', label: 'Industry Guides' },
              { href: '/capabilities', label: 'DFM Tips' },
              { href: '/clients', label: 'Case Studies' },
            ].map((link) => (
              <Link key={link.label} href={link.href} className="footer-link">{link.label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div className="col-6 col-md-3 col-lg-3">
            <h6 className="text-white fw-semibold mb-3 text-uppercase letter-wide" style={{ fontSize: '0.75rem' }}>Helpful Links</h6>
            {[
              { href: '/dashboard/rfq/new', label: 'Get Instant Quote' },
              { href: '/register', label: 'Create Account' },
              { href: '/about', label: 'About Us' },
              { href: '/contact', label: 'Contact Us' },
              { href: '/clients', label: 'Our Clients' },
            ].map((link) => (
              <Link key={link.label} href={link.href} className="footer-link">{link.label}</Link>
            ))}

            <div className="mt-3 d-flex flex-column gap-2">
              {[
                { icon: '📞', text: '+91 92463 51511' },
                { icon: '✉', text: 'Sunglowcnctechnics@gmail.com' },
                { icon: '📍', text: 'Sai Baba Nagar, Balanagar, Hyderabad 500042' },
              ].map((info) => (
                <div key={info.text} className="d-flex gap-2 align-items-start text-muted" style={{ fontSize: '0.78rem' }}>
                  <span className="flex-shrink-0">{info.icon}</span>
                  <span>{info.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 pt-4 mt-4 border-top border-dark-custom">
          <p className="text-muted mb-0" style={{ fontSize: '0.82rem' }}>
            &copy; {new Date().getFullYear()} Sunglow CNC Technics. All rights reserved.
          </p>
          <div className="d-flex gap-3 text-muted" style={{ fontSize: '0.75rem' }}>
            <span>GMP Compliant</span>
            <span>|</span>
            <span>AS9100 Capable</span>
            <span>|</span>
            <span>Defence Grade</span>
            <span>|</span>
            <span>ISO 9001 Quality</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
