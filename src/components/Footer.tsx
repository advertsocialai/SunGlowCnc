'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-brand-navy-800 text-slate-300">
      {/* Newsletter bar — Protolabs style */}
      <div className="border-b border-brand-navy-600 bg-brand-navy-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-lg">Stay Connected!</h3>
              <p className="text-slate-400 text-sm mt-1">Get manufacturing tips, material guides, and capability updates.</p>
            </div>
            {subscribed ? (
              <div className="bg-green-900/40 border border-green-700 text-green-400 px-6 py-3 rounded-lg text-sm font-medium">
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3 w-full md:w-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 md:w-72 bg-slate-700 border border-slate-600 text-white placeholder-slate-400 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red-500"
                />
                <button
                  type="submit"
                  className="bg-brand-red-600 hover:bg-brand-red-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer — 5 columns like Protolabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <div className="bg-white rounded-lg px-3 py-2">
                <Image src="/logo.svg" alt="Sunglow CNC Technics" width={180} height={48} className="h-11 w-auto object-contain" unoptimized />
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Precision Engineering & Manufacturing Solutions since 2003. Hyderabad, India.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-brand-red-600/20 border border-brand-red-600/30 text-brand-red-400 text-xs px-2.5 py-1 rounded">ISO 9001</span>
              <span className="bg-brand-red-600/20 border border-brand-red-600/30 text-brand-red-400 text-xs px-2.5 py-1 rounded">GMP</span>
              <span className="bg-brand-red-600/20 border border-brand-red-600/30 text-brand-red-400 text-xs px-2.5 py-1 rounded">AS9100</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2">
              {[
                { href: '/services', label: 'CNC Milling (VMC)' },
                { href: '/services', label: 'CNC Turning / Lathe' },
                { href: '/services', label: 'Wire Cut & EDM' },
                { href: '/services', label: 'Pharma Components' },
                { href: '/services', label: 'Defence Hardware' },
                { href: '/services', label: 'EV Battery Casings' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-brand-red-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Industries</h3>
            <ul className="space-y-2">
              {[
                { href: '/industries', label: 'Pharma & Medical' },
                { href: '/industries', label: 'Defence & Aerospace' },
                { href: '/industries', label: 'EV & Automotive' },
                { href: '/industries', label: 'Robotics & Drones' },
                { href: '/industries', label: 'Electronics' },
                { href: '/industries', label: 'Energy & Turbine' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-brand-red-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2">
              {[
                { href: '/materials', label: 'Materials Guide' },
                { href: '/capabilities', label: 'Capabilities & Specs' },
                { href: '/resources', label: 'Design Guidelines' },
                { href: '/resources', label: 'Industry Guides' },
                { href: '/capabilities', label: 'DFM Tips' },
                { href: '/clients', label: 'Case Studies' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-brand-red-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Helpful Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/dashboard/rfq/new', label: 'Get Instant Quote' },
                { href: '/register', label: 'Create Account' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact Us' },
                { href: '/clients', label: 'Our Clients' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-brand-red-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2">
              <div className="flex gap-2 text-xs text-slate-400">
                <svg className="w-3.5 h-3.5 text-brand-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 92463 51511
              </div>
              <div className="flex gap-2 text-xs text-slate-400">
                <svg className="w-3.5 h-3.5 text-brand-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Sunglowcnctechnics@gmail.com
              </div>
              <div className="flex gap-2 text-xs text-slate-400">
                <svg className="w-3.5 h-3.5 text-brand-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Sai Baba Nagar, Balanagar, Hyderabad 500042
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-brand-navy-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Sunglow CNC Technics. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-slate-600">
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
