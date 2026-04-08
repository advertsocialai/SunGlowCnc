import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">SG</span>
              </div>
              <div>
                <div className="font-bold text-white text-lg leading-tight">Sunglow CNC</div>
                <div className="text-orange-400 text-xs">Technics</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Precision Engineering & Manufacturing Solutions since 2003. Serving critical
              industries with zero-compromise quality.
            </p>
            <div className="mt-4 flex gap-3">
              <span className="bg-orange-600/20 border border-orange-600/30 text-orange-400 text-xs px-3 py-1 rounded-full">
                ISO Quality
              </span>
              <span className="bg-orange-600/20 border border-orange-600/30 text-orange-400 text-xs px-3 py-1 rounded-full">
                Since 2003
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/services', label: 'Services' },
                { href: '/industries', label: 'Industries' },
                { href: '/clients', label: 'Our Clients' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
                { href: '/register', label: 'Request Quote' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2">
              {[
                'CNC Precision Machining',
                'Pharma Components',
                'Defence & Aerospace',
                'EV & Automotive',
                'Robotics & Drones',
                'Die & Mould',
                'Medical Devices',
                'Energy & Turbine',
              ].map((service) => (
                <li key={service}>
                  <span className="text-sm text-slate-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <svg className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-slate-400">
                  Near T-Works Hub,<br />Hyderabad, Telangana, India
                </span>
              </div>
              <div className="flex gap-3">
                <svg className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="text-sm text-slate-400">
                  <div>+91 81043 30xxx</div>
                  <div>+91 81999 7xxx</div>
                </div>
              </div>
              <div className="flex gap-3">
                <svg className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-slate-400">info@sunglowcnc.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Sunglow CNC Technics. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            20+ Years of Precision Excellence | Hyderabad, India
          </p>
        </div>
      </div>
    </footer>
  )
}
