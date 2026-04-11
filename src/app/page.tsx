import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const serviceCards = [
  {
    name: 'CNC Milling (VMC)',
    icon: '⚙',
    desc: '3-axis precision milling for complex metal and plastic components. 3 VMC machines in-house.',
    href: '/services',
    color: 'hover:border-blue-400',
    tag: '3–7 Days',
  },
  {
    name: 'CNC Turning / Lathe',
    icon: '🔄',
    desc: 'Precision turned shafts, flanges, and rotational components in all metals and plastics.',
    href: '/services',
    color: 'hover:border-green-400',
    tag: '3–7 Days',
  },
  {
    name: 'Wire Cut & EDM',
    icon: '⚡',
    desc: 'Wire cut for complex contours, die sinking EDM for hardened steel moulds and dies.',
    href: '/services',
    color: 'hover:border-purple-400',
    tag: '5–10 Days',
  },
  {
    name: 'Die & Mould',
    icon: '🔧',
    desc: 'Cavity and core inserts, textured mould plates, precision 3D contouring for injection moulds.',
    href: '/services',
    color: 'hover:border-brand-red-400',
    tag: 'Custom Quote',
  },
]

const industries = [
  { name: 'Aerospace', icon: '✈', href: '/industries' },
  { name: 'Automobile & EV', icon: '⚡', href: '/industries' },
  { name: 'Pharma & Medical', icon: '💊', href: '/industries' },
  { name: 'Defence', icon: '🛡', href: '/industries' },
  { name: 'Electronics', icon: '💻', href: '/industries' },
  { name: 'Energy & Turbine', icon: '⚙', href: '/industries' },
  { name: 'Robotics & Drones', icon: '🤖', href: '/industries' },
  { name: 'Tool Room', icon: '🔩', href: '/industries' },
]

const capabilityCompare = [
  { service: 'CNC VMC Milling', leadTime: '3–7 days', materials: 'Metals & Plastics', tolerance: '±0.05mm / ±0.01mm precision', maxSize: '600 × 400 × 400 mm' },
  { service: 'CNC Turning', leadTime: '3–7 days', materials: 'Metals & Plastics', tolerance: '±0.01mm', maxSize: 'Ø300mm × 600mm' },
  { service: 'Wire Cut EDM', leadTime: '5–10 days', materials: 'All conductive metals', tolerance: '±0.005mm', maxSize: '400 × 300 mm' },
  { service: 'Die Sinking EDM', leadTime: '5–10 days', materials: 'Hardened steels', tolerance: '±0.01mm', maxSize: '300 × 200 × 200 mm' },
]

const clients = [
  { name: 'Bharat Biotech', sector: 'Pharma' },
  { name: 'Sanofi', sector: 'Pharma' },
  { name: 'Gland Pharma', sector: 'Pharma' },
  { name: 'BEL', sector: 'Defence' },
  { name: 'ECIL', sector: 'Defence' },
  { name: 'BHEL', sector: 'Defence' },
  { name: 'Avantel', sector: 'Defence' },
  { name: 'Zen Technologies', sector: 'Technology' },
  { name: 'T-Works Hub', sector: 'Technology' },
  { name: 'ICLEAN', sector: 'Pharma' },
]

const stats = [
  { value: '20+', label: 'Years Experience', sub: 'Since 2003' },
  { value: '500+', label: 'Projects Delivered', sub: 'On time, every time' },
  { value: '10+', label: 'Industry Sectors', sub: 'Pharma to Aerospace' },
  { value: '5', label: 'Machine Types', sub: 'Complete in-house' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero — Protolabs/Xometry style with real content */}
      <section className="relative bg-gradient-to-br from-brand-navy-800 via-brand-navy-700 to-brand-navy-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-red-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-red-600 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-red-600/20 border border-brand-red-500/30 text-brand-red-300 text-sm px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-brand-red-400 rounded-full animate-pulse" />
                Precision Engineering Since 2003 · Hyderabad, India
              </div>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
                CNC Precision
                <span className="text-brand-red-500"> Manufacturing</span>
                <br />Solutions
              </h1>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                High-quality machined components for Pharma, Defence, Aerospace, EV & Robotics.
                Trusted by Bharat Biotech, BEL, BHEL, Sanofi and 6+ more industry leaders.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-8">
                {['GMP Pharma-Grade', 'Defence Hardware', 'AS9100 Capable', '±0.01mm Tolerance', 'Quote in 24hrs'].map((tag) => (
                  <span key={tag} className="bg-slate-700/50 border border-slate-600 text-slate-300 text-xs px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/dashboard/rfq/new" className="btn-primary text-base">
                  Get Instant Quote
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/services" className="border border-slate-500 text-slate-300 hover:border-brand-red-500 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 inline-flex items-center gap-2">
                  Explore Capabilities
                </Link>
              </div>
            </div>
            {/* Stats panel */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-brand-navy-700/60 border border-brand-navy-600 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-black text-brand-red-500 mb-1">{stat.value}</div>
                  <div className="text-sm font-semibold text-white mb-1">{stat.label}</div>
                  <div className="text-xs text-slate-400">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications bar */}
        <div className="relative border-t border-brand-navy-600/50 bg-brand-navy-800/60 backdrop-blur py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Certifications & Standards:</span>
            {['GMP Compliant', 'AS9100 Capable', 'ISO 9001 Quality', 'Defence Hardware', 'ITAR Eligible'].map((cert) => (
              <span key={cert} className="text-xs text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-brand-red-500 rounded-full" />
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Choose a Service — Protolabs style cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Choose a Machining Service</h2>
            <p className="section-subtitle">Complete in-house CNC capability — no subcontracting, no delays</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {serviceCards.map((svc) => (
              <Link
                key={svc.name}
                href={svc.href}
                className={`card p-6 border-2 border-transparent transition-all ${svc.color} group`}
              >
                <div className="text-4xl mb-4">{svc.icon}</div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-slate-900 text-base leading-tight">{svc.name}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{svc.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="bg-brand-red-100 text-brand-red-700 text-xs font-semibold px-2.5 py-1 rounded-full">{svc.tag}</span>
                  <span className="text-brand-red-600 text-sm font-semibold group-hover:underline">Learn More →</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/services" className="btn-primary">
              View All Capabilities
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities Comparison Table — Xometry style */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center mb-8">
            <div>
              <h2 className="section-title">Compare Our Services</h2>
              <p className="text-slate-600 mt-3">
                Our CNC machining services cover prototyping to production with consistent quality. Upload your CAD file to get pricing and lead time instantly.
              </p>
              <div className="mt-6 flex gap-3">
                <Link href="/dashboard/rfq/new" className="btn-primary text-sm">
                  Get Instant Quote
                </Link>
                <Link href="/capabilities" className="btn-secondary text-sm">
                  Full Spec Sheet
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-navy-800 text-white">
                    <th className="px-4 py-3 text-left font-semibold text-xs">Service</th>
                    <th className="px-4 py-3 text-left font-semibold text-xs">Lead Time</th>
                    <th className="px-4 py-3 text-left font-semibold text-xs">Tolerance</th>
                    <th className="px-4 py-3 text-left font-semibold text-xs">Max Size</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {capabilityCompare.map((row, i) => (
                    <tr key={row.service} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-3 font-medium text-slate-900 text-xs">{row.service}</td>
                      <td className="px-4 py-3 text-brand-red-700 font-semibold text-xs">{row.leadTime}</td>
                      <td className="px-4 py-3 text-slate-700 text-xs">{row.tolerance}</td>
                      <td className="px-4 py-3 text-slate-600 text-xs">{row.maxSize}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Industries We Serve</h2>
            <p className="section-subtitle">From pharmaceutical GMP parts to defence-grade aerospace hardware</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {industries.map((ind) => (
              <Link
                key={ind.name}
                href={ind.href}
                className="bg-slate-50 hover:bg-brand-red-50 border border-slate-200 hover:border-brand-red-200 rounded-xl p-4 text-center transition-all group"
              >
                <div className="text-3xl mb-2">{ind.icon}</div>
                <div className="text-xs font-semibold text-slate-700 group-hover:text-brand-red-700 leading-tight">{ind.name}</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/industries" className="btn-primary">
              View All Industries
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works — Xometry style */}
      <section className="py-16 bg-brand-navy-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-3">How It Works</h2>
            <p className="text-slate-400">From RFQ to delivered components in as fast as 3 days</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Submit RFQ', desc: 'Register and upload your CAD files, material requirements, tolerance specs, and quantity.', icon: '📤' },
              { step: '02', title: 'Get Quote in 24hrs', desc: 'Our engineers review your design for manufacturability and send a detailed quote within 24 hours.', icon: '💬' },
              { step: '03', title: 'Production Begins', desc: 'Once you approve the quote, we schedule production on our VMC, lathe, or EDM machines.', icon: '🏭' },
              { step: '04', title: 'Delivery', desc: 'Parts are inspected, packed, and delivered to your facility. Track status from your dashboard.', icon: '📦' },
            ].map((step) => (
              <div key={step.step} className="relative">
                <div className="bg-brand-navy-700 rounded-2xl p-6">
                  <div className="text-3xl mb-4">{step.icon}</div>
                  <div className="text-brand-red-500 font-black text-sm mb-2">{step.step}</div>
                  <h3 className="font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/dashboard/rfq/new" className="bg-brand-red-600 hover:bg-brand-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center gap-2">
              Start Your RFQ
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-2">Proudly Serving</p>
            <h2 className="section-title">Trusted by Industry Leaders</h2>
            <p className="section-subtitle">Long-term partnerships with India&apos;s leading organizations for 20+ years</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
            {clients.map((client) => (
              <div
                key={client.name}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center hover:border-brand-red-200 hover:bg-brand-red-50 transition-all"
              >
                <div className="w-12 h-12 bg-white border border-slate-200 rounded-full mx-auto mb-3 flex items-center justify-center shadow-sm">
                  <span className="text-slate-700 font-black text-lg">{client.name[0]}</span>
                </div>
                <div className="font-semibold text-slate-800 text-sm">{client.name}</div>
                <div className="text-xs text-brand-red-600 mt-0.5">{client.sector}</div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/clients" className="btn-primary">
              View All Partners
            </Link>
          </div>
        </div>
      </section>

      {/* Manufacturing Lifecycle — Protolabs style */}
      <section className="py-16 bg-brand-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="section-title">Manufacturing for Every Stage</h2>
              <p className="text-slate-600 mt-4 mb-6 leading-relaxed">
                Whether you need a single prototype component or a repeat production batch of 1,000 pieces, we deliver at every stage of your product lifecycle.
              </p>
              <div className="space-y-4">
                {[
                  { title: 'Rapid Prototyping', desc: 'One-off parts in 3–7 days. Validate your design before committing to production.', icon: '🔬' },
                  { title: 'Bridge Production', desc: 'Low-to-medium volume batches while scaling up. Consistent quality, on-time delivery.', icon: '🔗' },
                  { title: 'Regular Production Supply', desc: 'Long-term supply contracts with dedicated scheduling. We supply Bharat Biotech monthly.', icon: '📦' },
                ].map((stage) => (
                  <div key={stage.title} className="flex gap-4 bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-2xl">{stage.icon}</div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{stage.title}</h4>
                      <p className="text-sm text-slate-600 mt-0.5">{stage.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-brand-navy-800 rounded-2xl p-8 text-white">
              <h3 className="text-lg font-bold text-brand-red-400 mb-5 uppercase tracking-wider">Our Machinery</h3>
              <div className="space-y-4">
                {[
                  { machine: 'CNC VMC Milling Machines', count: '×3', detail: 'Vertical Machining Centers — 3-axis' },
                  { machine: 'CNC Lathe / Turning Center', count: '×1', detail: 'Precision turning up to Ø300mm' },
                  { machine: 'Wire Cut EDM', count: '×1', detail: '±0.005mm on hardened metals' },
                  { machine: 'Die Sinking EDM', count: '×1', detail: 'Deep cavity, hardened tool steel' },
                  { machine: 'Conventional Setup', count: 'Full', detail: 'Milling, turning, grinding' },
                ].map((m) => (
                  <div key={m.machine} className="flex justify-between items-center border-b border-brand-navy-600 pb-3">
                    <div>
                      <div className="font-medium text-sm">{m.machine}</div>
                      <div className="text-xs text-slate-400">{m.detail}</div>
                    </div>
                    <span className="bg-brand-red-600/30 text-brand-red-300 text-xs px-3 py-1 rounded-full font-bold">{m.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-brand-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-brand-red-100 mb-8 max-w-2xl mx-auto">
            Upload your design files and receive a detailed quote within 24 hours. Our engineering team is ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard/rfq/new"
              className="bg-white text-brand-red-600 hover:bg-brand-red-50 font-black py-4 px-10 rounded-lg transition-colors inline-flex items-center gap-2 text-base"
            >
              Get Instant Quote
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white/50 text-white hover:bg-white/10 font-bold py-4 px-10 rounded-lg transition-colors text-base"
            >
              Contact Engineers
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
