import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const services = [
  {
    id: '01',
    name: 'CNC Milling (VMC)',
    spec: '3-axis · 600 × 400 × 400 mm · ±0.05–0.01 mm',
    desc: 'Precision milling for complex metal and plastic components. Three in-house VMC machines for concurrent production.',
    leadTime: '3–7 days',
    href: '/services',
  },
  {
    id: '02',
    name: 'CNC Turning',
    spec: 'Ø300 × 600 mm · ±0.01 mm',
    desc: 'Turned shafts, flanges, bushings, and rotational components in all grades of metal and engineering plastics.',
    leadTime: '3–7 days',
    href: '/services',
  },
  {
    id: '03',
    name: 'Wire Cut EDM',
    spec: '400 × 300 mm · ±0.005 mm',
    desc: 'Wire cut for tight-tolerance contours and profiles. Die sinking EDM for hardened steel moulds and cavity work.',
    leadTime: '5–10 days',
    href: '/services',
  },
  {
    id: '04',
    name: 'Die & Mould Making',
    spec: 'Custom · cavity & core inserts · 3D contouring',
    desc: 'Injection mould tooling, textured mould plates, and cavity machining for production tooling.',
    leadTime: 'Custom quote',
    href: '/services',
  },
]

const capabilities = [
  { service: 'CNC VMC Milling', leadTime: '3–7 days', tolerance: '±0.05 / ±0.01 mm', maxSize: '600 × 400 × 400 mm' },
  { service: 'CNC Turning', leadTime: '3–7 days', tolerance: '±0.01 mm', maxSize: 'Ø300 × 600 mm' },
  { service: 'Wire Cut EDM', leadTime: '5–10 days', tolerance: '±0.005 mm', maxSize: '400 × 300 mm' },
  { service: 'Die Sinking EDM', leadTime: '5–10 days', tolerance: '±0.01 mm', maxSize: '300 × 200 × 200 mm' },
]

const industries = [
  { name: 'Aerospace', tag: 'AS9100' },
  { name: 'Automobile & EV', tag: 'Production' },
  { name: 'Pharma & Medical', tag: 'GMP' },
  { name: 'Defence', tag: 'ITAR-eligible' },
  { name: 'Electronics', tag: 'High-precision' },
  { name: 'Energy & Turbine', tag: 'High-temp alloys' },
  { name: 'Robotics & Drones', tag: 'Lightweight' },
  { name: 'Tool Room', tag: 'Custom tooling' },
]

const clients = [
  { name: 'Bharat Biotech', sector: 'Pharma' },
  { name: 'Sanofi', sector: 'Pharma' },
  { name: 'Gland Pharma', sector: 'Pharma' },
  { name: 'ICLEAN', sector: 'Pharma' },
  { name: 'BEL', sector: 'Defence' },
  { name: 'ECIL', sector: 'Defence' },
  { name: 'BHEL', sector: 'Energy' },
  { name: 'Avantel', sector: 'Defence' },
  { name: 'Zen Technologies', sector: 'Technology' },
  { name: 'T-Works Hub', sector: 'Technology' },
]

const machines = [
  { count: '3', name: 'CNC VMC Milling Centers', note: '3-axis vertical machining · concurrent production' },
  { count: '1', name: 'CNC Turning Center', note: 'Up to Ø300 mm · all metals and plastics' },
  { count: '1', name: 'Wire Cut EDM', note: '±0.005 mm · hardened tool steels' },
  { count: '1', name: 'Die Sinking EDM', note: 'Deep cavity · complex geometry' },
  { count: '—', name: 'Conventional Setup', note: 'Milling, turning, surface grinding' },
]

export default function HomePage() {
  return (
    <div style={{ background: 'var(--dark-bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="hero-v2">
        <div className="container-xl">
          <div className="hero-eyebrow">
            <span className="mono text-muted">Sunglow CNC Technics</span>
            <span className="text-muted" style={{ opacity: 0.3 }}>·</span>
            <span className="mono text-muted">Hyderabad, India</span>
            <span className="text-muted" style={{ opacity: 0.3 }}>·</span>
            <span className="mono text-muted">Est. 2003</span>
          </div>
          <hr className="hero-rule" />

          <div className="row g-4 g-lg-0">
            <div className="col-lg-7">
              <h1 className="hero-h1">
                CNC Precision<br />
                <span className="text-brand-red">Manufacturing</span>
                <br />Solutions
              </h1>
              <p className="hero-body">
                High-quality machined components for Pharma, Defence, Aerospace,
                EV &amp; Robotics. Trusted by Bharat Biotech, BEL, BHEL, Sanofi
                and 6+ more industry leaders since 2003.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link href="/dashboard/rfq/new" className="btn-brand">
                  Get Instant Quote
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/capabilities" className="btn-ghost-v2">View Capabilities</Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="hero-stats">
                {[
                  { value: '20+', label: 'Years in operation', sub: 'Since 2003' },
                  { value: '500+', label: 'Projects delivered', sub: 'On time' },
                  { value: '±0.005mm', label: 'Min. tolerance', sub: 'Wire EDM' },
                  { value: '10+', label: 'Industry sectors', sub: 'Active clients' },
                ].map((s) => (
                  <div key={s.label} className="hero-stat-item">
                    <div className="hero-stat-val mono">{s.value}</div>
                    <div>
                      <div className="hero-stat-lbl">{s.label}</div>
                      <div className="hero-stat-sub mono">{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <hr className="hero-rule" style={{ marginTop: '3.5rem', marginBottom: '1.5rem' }} />
          <div className="hero-certs">
            {['GMP Compliant', 'AS9100 Capable', 'ISO 9001 Quality', 'Defence Hardware', 'ITAR Eligible'].map((c) => (
              <span key={c} className="mono hero-cert">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--dark-surface)' }}>
        <div className="container-xl">
          <div className="sec-hdr">
            <div>
              <p className="sec-eye">Machining Services</p>
              <h2 className="sec-title">Complete In-House Capability</h2>
            </div>
            <Link href="/services" className="btn-ghost-v2 d-none d-md-inline-flex">All Services →</Link>
          </div>
          <div className="svc-grid">
            {services.map((svc) => (
              <Link key={svc.id} href={svc.href} className="svc-row">
                <span className="mono svc-num">{svc.id}</span>
                <div className="svc-body">
                  <div className="svc-top">
                    <span className="svc-name">{svc.name}</span>
                    <span className="mono svc-lead">{svc.leadTime}</span>
                  </div>
                  <p className="mono svc-spec">{svc.spec}</p>
                  <p className="svc-desc">{svc.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES TABLE ───────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--dark-bg)' }}>
        <div className="container-xl">
          <div className="row g-5 align-items-start">
            <div className="col-lg-4">
              <p className="sec-eye">Technical Specifications</p>
              <h2 className="sec-title">Tolerances &amp; Lead Times</h2>
              <p className="text-secondary mt-3" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
                Every process quoted with exact tolerances. Upload your CAD file for a precise quote in 24 hours.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link href="/dashboard/rfq/new" className="btn-brand">Get Quote</Link>
                <Link href="/capabilities" className="btn-ghost-v2">Full Spec Sheet</Link>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="cap-table-wrap">
                <div className="cap-table">
                  <div className="cap-head">
                    <span>Process</span>
                    <span>Lead Time</span>
                    <span>Tolerance</span>
                    <span>Max Size</span>
                  </div>
                  {capabilities.map((row) => (
                    <div key={row.service} className="cap-row">
                      <span className="fw-semibold text-white" style={{ fontSize: '0.875rem' }}>{row.service}</span>
                      <span className="mono text-brand-red" style={{ fontSize: '0.82rem' }}>{row.leadTime}</span>
                      <span className="mono text-secondary" style={{ fontSize: '0.82rem' }}>{row.tolerance}</span>
                      <span className="mono text-secondary" style={{ fontSize: '0.82rem' }}>{row.maxSize}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--dark-surface)' }}>
        <div className="container-xl">
          <div className="sec-hdr">
            <div>
              <p className="sec-eye">Market Coverage</p>
              <h2 className="sec-title">Industries We Serve</h2>
            </div>
          </div>
          <div className="ind-grid">
            {industries.map((ind) => (
              <Link key={ind.name} href="/industries" className="ind-item">
                <span className="ind-name">{ind.name}</span>
                <span className="mono ind-tag">{ind.tag}</span>
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/industries" className="btn-brand">Industry Solutions →</Link>
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--dark-bg)' }}>
        <div className="container-xl">
          <div className="row g-5">
            <div className="col-lg-4">
              <p className="sec-eye">Order Process</p>
              <h2 className="sec-title">From RFQ to Delivery</h2>
              <p className="text-secondary mt-3" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
                Quoted within 24 hours. Most orders shipped in under two weeks.
              </p>
              <div className="mt-4">
                <Link href="/dashboard/rfq/new" className="btn-brand">Start Your RFQ →</Link>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="proc-list">
                {[
                  { n: '01', title: 'Submit RFQ', desc: 'Register and upload CAD files, material specs, tolerance requirements, and quantity.' },
                  { n: '02', title: 'Quote in 24 Hours', desc: 'Our engineers review for manufacturability and send a detailed quote within one business day.' },
                  { n: '03', title: 'Production', desc: 'On approval, we schedule on VMC, lathe, or EDM machines. Status updates from your dashboard.' },
                  { n: '04', title: 'Inspection & Delivery', desc: 'Parts are CMM-inspected, packed, and delivered with full traceability documentation.' },
                ].map((step) => (
                  <div key={step.n} className="proc-item">
                    <span className="mono proc-num">{step.n}</span>
                    <div>
                      <h3 className="proc-title">{step.title}</h3>
                      <p className="proc-desc">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENTS ──────────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--dark-surface)' }}>
        <div className="container-xl">
          <div className="sec-hdr">
            <div>
              <p className="sec-eye">Our Clients</p>
              <h2 className="sec-title">Trusted by Industry Leaders</h2>
            </div>
            <Link href="/clients" className="btn-ghost-v2 d-none d-md-inline-flex">All Partners →</Link>
          </div>
          <div className="cli-grid">
            {clients.map((c) => (
              <div key={c.name} className="cli-item">
                <span className="cli-name">{c.name}</span>
                <span className="mono cli-sector">{c.sector}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MACHINERY ────────────────────────────────────────── */}
      <section className="section-py" style={{ background: 'var(--dark-bg)' }}>
        <div className="container-xl">
          <div className="row g-5 align-items-start">
            <div className="col-lg-5">
              <p className="sec-eye">In-House Equipment</p>
              <h2 className="sec-title">No Subcontracting.<br />Full Control.</h2>
              <p className="text-secondary mt-3" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
                Every order runs through our own floor. Three VMCs, a turning center,
                two EDM machines, and conventional setup — all under one roof in Hyderabad.
              </p>
              <div className="d-flex flex-wrap gap-3 mt-4">
                <Link href="/about" className="btn-brand">About Our Facility</Link>
                <Link href="/capabilities" className="btn-ghost-v2">Full Specs</Link>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="mach-table">
                {machines.map((m) => (
                  <div key={m.name} className="mach-row">
                    <span className="mono mach-count">{m.count}</span>
                    <div>
                      <div className="mach-name">{m.name}</div>
                      <div className="mono mach-note">{m.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="cta-band">
        <div className="container-xl">
          <div className="cta-inner">
            <div>
              <h2 className="cta-h">Ready to Get Started?</h2>
              <p className="cta-p">
                Upload your design files and receive a detailed quote within 24 hours.
              </p>
            </div>
            <div className="d-flex flex-wrap gap-3">
              <Link href="/dashboard/rfq/new" className="btn-brand">
                Get Instant Quote →
              </Link>
              <Link href="/contact" className="btn-ghost-v2">Talk to an Engineer</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
