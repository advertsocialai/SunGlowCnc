import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const serviceCards = [
  { name: 'CNC Milling (VMC)', icon: '⚙', desc: '3-axis precision milling for complex metal and plastic components. 3 VMC machines in-house.', href: '/services', tag: '3–7 Days' },
  { name: 'CNC Turning / Lathe', icon: '🔄', desc: 'Precision turned shafts, flanges, and rotational components in all metals and plastics.', href: '/services', tag: '3–7 Days' },
  { name: 'Wire Cut & EDM', icon: '⚡', desc: 'Wire cut for complex contours, die sinking EDM for hardened steel moulds and dies.', href: '/services', tag: '5–10 Days' },
  { name: 'Die & Mould', icon: '🔧', desc: 'Cavity and core inserts, textured mould plates, precision 3D contouring for injection moulds.', href: '/services', tag: 'Custom Quote' },
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
  { service: 'CNC VMC Milling', leadTime: '3–7 days', tolerance: '±0.05mm / ±0.01mm precision', maxSize: '600 × 400 × 400 mm' },
  { service: 'CNC Turning', leadTime: '3–7 days', tolerance: '±0.01mm', maxSize: 'Ø300mm × 600mm' },
  { service: 'Wire Cut EDM', leadTime: '5–10 days', tolerance: '±0.005mm', maxSize: '400 × 300 mm' },
  { service: 'Die Sinking EDM', leadTime: '5–10 days', tolerance: '±0.01mm', maxSize: '300 × 200 × 200 mm' },
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

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80&fit=crop', alt: 'CNC Milling', label: 'CNC Milling' },
  { src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80&fit=crop', alt: 'Precision Parts', label: 'Precision Parts' },
  { src: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80&fit=crop', alt: 'Pharma Grade', label: 'Pharma Grade' },
  { src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80&fit=crop', alt: 'Our Facility', label: 'Our Facility' },
]

export default function HomePage() {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: 'var(--dark-bg)' }}>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <div className="container-xl position-relative">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                Precision Engineering Since 2003 · Hyderabad, India
              </div>
              <h1 className="fs-hero text-white mb-3">
                CNC Precision
                <span className="text-brand-red"> Manufacturing</span>
                {' '}Solutions
              </h1>
              <p className="text-secondary mb-4" style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>
                High-quality machined components for Pharma, Defence, Aerospace, EV &amp; Robotics.
                Trusted by Bharat Biotech, BEL, BHEL, Sanofi and 6+ more industry leaders.
              </p>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {['GMP Pharma-Grade', 'Defence Hardware', 'AS9100 Capable', '±0.01mm Tolerance', 'Quote in 24hrs'].map((tag) => (
                  <span key={tag} className="cert-tag">{tag}</span>
                ))}
              </div>
              <div className="d-flex flex-wrap gap-3">
                <Link href="/dashboard/rfq/new" className="btn-brand">
                  Get Instant Quote
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <Link href="/services" className="btn-ghost-white">
                  Explore Capabilities
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="col-lg-6">
              <div className="row g-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="col-6">
                    <div className="stat-card">
                      <div className="text-brand-red fw-black mb-1" style={{ fontSize: '2.25rem' }}>{stat.value}</div>
                      <div className="text-white fw-semibold mb-1" style={{ fontSize: '0.875rem' }}>{stat.label}</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>{stat.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications bar */}
          <div className="d-flex flex-wrap align-items-center gap-3 mt-5 pt-4 border-top" style={{ borderColor: 'rgba(255,255,255,0.08) !important' }}>
            <span className="text-muted text-uppercase letter-wide fw-semibold" style={{ fontSize: '0.7rem' }}>Certifications:</span>
            {['GMP Compliant', 'AS9100 Capable', 'ISO 9001 Quality', 'Defence Hardware', 'ITAR Eligible'].map((cert) => (
              <span key={cert} className="d-flex align-items-center gap-2 text-secondary" style={{ fontSize: '0.8rem' }}>
                <span className="rounded-circle bg-brand-red d-inline-block" style={{ width: 6, height: 6 }} />
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Cards ─────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--dark-surface)' }}>
        <div className="container-xl">
          <div className="text-center mb-5">
            <h2 className="section-title">Choose a Machining Service</h2>
            <p className="section-subtitle mx-auto">Complete in-house CNC capability — no subcontracting, no delays</p>
          </div>
          <div className="row g-4 mb-4">
            {serviceCards.map((svc) => (
              <div key={svc.name} className="col-sm-6 col-lg-3">
                <Link href={svc.href} className="service-card h-100">
                  <div className="service-card-body d-flex flex-column h-100">
                    <div className="mb-3" style={{ fontSize: '2.25rem' }}>{svc.icon}</div>
                    <h3 className="fw-bold text-white mb-2" style={{ fontSize: '1rem' }}>{svc.name}</h3>
                    <p className="text-secondary mb-4 flex-grow-1" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>{svc.desc}</p>
                    <div className="d-flex align-items-center justify-content-between mt-auto">
                      <span className="cert-badge">{svc.tag}</span>
                      <span className="text-brand-red fw-semibold" style={{ fontSize: '0.82rem' }}>Learn More →</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/services" className="btn-brand">View All Capabilities</Link>
          </div>
        </div>
      </section>

      {/* ── Capabilities Table ────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--dark-bg)' }}>
        <div className="container-xl">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <h2 className="section-title">Compare Our Services</h2>
              <p className="text-secondary mt-3" style={{ lineHeight: 1.7 }}>
                Our CNC machining services cover prototyping to production with consistent quality.
                Upload your CAD file to get pricing and lead time instantly.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link href="/dashboard/rfq/new" className="btn-brand">Get Instant Quote</Link>
                <Link href="/capabilities" className="btn-brand-outline">Full Spec Sheet</Link>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="dark-card overflow-hidden">
                <table className="table-dark-custom w-100">
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Lead Time</th>
                      <th>Tolerance</th>
                      <th>Max Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {capabilityCompare.map((row) => (
                      <tr key={row.service}>
                        <td className="fw-semibold">{row.service}</td>
                        <td className="text-brand-red fw-semibold">{row.leadTime}</td>
                        <td className="text-secondary">{row.tolerance}</td>
                        <td className="text-secondary">{row.maxSize}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Industries ────────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--dark-surface)' }}>
        <div className="container-xl">
          <div className="text-center mb-5">
            <h2 className="section-title">Industries We Serve</h2>
            <p className="section-subtitle mx-auto">From pharmaceutical GMP parts to defence-grade aerospace hardware</p>
          </div>
          <div className="row g-3 mb-4">
            {industries.map((ind) => (
              <div key={ind.name} className="col-6 col-sm-3 col-lg-auto flex-lg-fill">
                <Link href={ind.href} className="industry-pill h-100 d-flex flex-column align-items-center">
                  <div className="mb-2" style={{ fontSize: '2rem' }}>{ind.icon}</div>
                  <div className="text-secondary fw-semibold" style={{ fontSize: '0.78rem', lineHeight: 1.3 }}>{ind.name}</div>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/industries" className="btn-brand">View All Industries</Link>
          </div>
        </div>
      </section>

      {/* ── Photo Gallery ─────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--dark-bg)' }}>
        <div className="container-xl">
          <div className="text-center mb-5">
            <h2 className="section-title">Precision Work Gallery</h2>
            <p className="section-subtitle mx-auto">High-accuracy components delivered across pharma, defence, aerospace &amp; EV sectors</p>
          </div>
          <div className="row g-3">
            {galleryImages.map((img) => (
              <div key={img.label} className="col-6 col-md-3">
                <div className="position-relative rounded-xl overflow-hidden img-zoom" style={{ height: '220px' }}>
                  <img src={img.src} alt={img.alt} className="w-100 h-100 object-fit-cover" loading="lazy" style={{ objectFit: 'cover' }} />
                  <div className="img-overlay-bottom" />
                  <span className="position-absolute bottom-0 start-0 p-3 text-white fw-bold" style={{ fontSize: '0.875rem' }}>{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────── */}
      <section className="section-py bg-brand-navy">
        <div className="container-xl">
          <div className="text-center mb-5">
            <h2 className="text-white fw-black" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>How It Works</h2>
            <p className="text-secondary mt-2">From RFQ to delivered components in as fast as 3 days</p>
          </div>
          <div className="row g-4">
            {[
              { step: '01', title: 'Submit RFQ', desc: 'Register and upload your CAD files, material requirements, tolerance specs, and quantity.', icon: '📤' },
              { step: '02', title: 'Get Quote in 24hrs', desc: 'Our engineers review your design for manufacturability and send a detailed quote within 24 hours.', icon: '💬' },
              { step: '03', title: 'Production Begins', desc: 'Once you approve the quote, we schedule production on our VMC, lathe, or EDM machines.', icon: '🏭' },
              { step: '04', title: 'Delivery', desc: 'Parts are inspected, packed, and delivered to your facility. Track status from your dashboard.', icon: '📦' },
            ].map((step) => (
              <div key={step.step} className="col-sm-6 col-lg-3">
                <div className="dark-card p-4 h-100">
                  <div className="mb-3" style={{ fontSize: '2rem' }}>{step.icon}</div>
                  <div className="text-brand-red fw-black mb-2" style={{ fontSize: '0.8rem', letterSpacing: '0.1em' }}>{step.step}</div>
                  <h3 className="text-white fw-bold mb-2" style={{ fontSize: '1rem' }}>{step.title}</h3>
                  <p className="text-secondary mb-0" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link href="/dashboard/rfq/new" className="btn-brand">
              Start Your RFQ
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Clients ───────────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--dark-surface)' }}>
        <div className="container-xl">
          <div className="text-center mb-5">
            <p className="text-muted text-uppercase letter-wide fw-semibold mb-2" style={{ fontSize: '0.75rem' }}>Proudly Serving</p>
            <h2 className="section-title">Trusted by Industry Leaders</h2>
            <p className="section-subtitle mx-auto">Long-term partnerships with India&apos;s leading organizations for 20+ years</p>
          </div>
          <div className="row g-3 mb-4">
            {clients.map((client) => (
              <div key={client.name} className="col-6 col-sm-4 col-md-3 col-lg-auto flex-lg-fill">
                <div className="dark-card p-3 text-center h-100">
                  <div
                    className="rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center text-white fw-black"
                    style={{ width: 44, height: 44, background: 'var(--dark-elevated)', fontSize: '1.1rem', border: '1px solid var(--dark-border)' }}
                  >
                    {client.name[0]}
                  </div>
                  <div className="fw-semibold text-white" style={{ fontSize: '0.82rem' }}>{client.name}</div>
                  <div className="text-brand-red mt-1" style={{ fontSize: '0.72rem' }}>{client.sector}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/clients" className="btn-brand">View All Partners</Link>
          </div>
        </div>
      </section>

      {/* ── Manufacturing Lifecycle ──────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--dark-bg)' }}>
        <div className="container-xl">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h2 className="section-title">Manufacturing for Every Stage</h2>
              <p className="text-secondary mt-3 mb-4" style={{ lineHeight: 1.7 }}>
                Whether you need a single prototype component or a repeat production batch of 1,000 pieces,
                we deliver at every stage of your product lifecycle.
              </p>
              <div className="d-flex flex-column gap-3">
                {[
                  { title: 'Rapid Prototyping', desc: 'One-off parts in 3–7 days. Validate your design before committing to production.', icon: '🔬' },
                  { title: 'Bridge Production', desc: 'Low-to-medium volume batches while scaling up. Consistent quality, on-time delivery.', icon: '🔗' },
                  { title: 'Regular Production Supply', desc: 'Long-term supply contracts with dedicated scheduling. We supply Bharat Biotech monthly.', icon: '📦' },
                ].map((stage) => (
                  <div key={stage.title} className="dark-card p-4 d-flex gap-3 align-items-start">
                    <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{stage.icon}</div>
                    <div>
                      <h4 className="fw-semibold text-white mb-1" style={{ fontSize: '0.95rem' }}>{stage.title}</h4>
                      <p className="text-secondary mb-0" style={{ fontSize: '0.85rem' }}>{stage.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="dark-card p-4">
                <h3 className="text-brand-red fw-bold mb-4 text-uppercase letter-wide" style={{ fontSize: '0.85rem' }}>Our Machinery</h3>
                <div className="d-flex flex-column gap-3">
                  {[
                    { machine: 'CNC VMC Milling Machines', count: '×3', detail: 'Vertical Machining Centers — 3-axis' },
                    { machine: 'CNC Lathe / Turning Center', count: '×1', detail: 'Precision turning up to Ø300mm' },
                    { machine: 'Wire Cut EDM', count: '×1', detail: '±0.005mm on hardened metals' },
                    { machine: 'Die Sinking EDM', count: '×1', detail: 'Deep cavity, hardened tool steel' },
                    { machine: 'Conventional Setup', count: 'Full', detail: 'Milling, turning, grinding' },
                  ].map((m) => (
                    <div key={m.machine} className="d-flex justify-content-between align-items-center pb-3 border-bottom border-dark-custom">
                      <div>
                        <div className="text-white fw-medium" style={{ fontSize: '0.875rem' }}>{m.machine}</div>
                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>{m.detail}</div>
                      </div>
                      <span className="cert-badge">{m.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="section-py cta-red text-white">
        <div className="container-xl">
          <div className="text-center">
            <h2 className="fw-black text-white mb-3" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}>Ready to Get Started?</h2>
            <p className="mb-5 mx-auto" style={{ fontSize: '1.05rem', opacity: 0.85, maxWidth: '560px' }}>
              Upload your design files and receive a detailed quote within 24 hours. Our engineering team is ready.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link href="/dashboard/rfq/new" className="btn-ghost-white" style={{ border: '2px solid rgba(255,255,255,0.9)', background: 'white', color: 'var(--brand-red) !important' }}>
                <span style={{ color: 'var(--brand-red)', fontWeight: 800 }}>Get Instant Quote</span>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="var(--brand-red)"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="/contact" className="btn-ghost-white">Contact Engineers</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
