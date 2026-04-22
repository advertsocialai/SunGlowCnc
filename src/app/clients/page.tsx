import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const clientGroups = [
  {
    sector: 'Pharmaceuticals & Healthcare',
    accentColor: '#4ade80',
    clients: [
      { name: 'Bharat Biotech', since: '2003', desc: "India's leading vaccine manufacturer. We supply star wheels, filling needles, fermenter templates and precision pharma components.", parts: ['Star wheels & guides', 'Filling needles', 'Fermenter templates'] },
      { name: 'Sanofi India', since: '2006', desc: 'Global pharma giant. We manufacture specialized pharma equipment parts meeting GMP standards for Hyderabad operations.', parts: ['Vacuum star wheels', 'Machine chain parts', 'TC Connectors'] },
      { name: 'Gland Pharma', since: '2010', desc: 'Leading injectable pharma company. High-precision stainless steel components for filling and washing operations.', parts: ['Washing needles', 'Y & Straight connectors', 'Guide assemblies'] },
      { name: 'ICLEAN', since: '2015', desc: 'Pharma cleaning solutions company. Precision-machined parts for cleanroom-compatible equipment.', parts: ['Stainless steel components', 'Custom fixtures'] },
    ],
  },
  {
    sector: 'Defence & Government',
    accentColor: '#f87171',
    clients: [
      { name: 'Bharat Electronics Limited (BEL)', since: '2005', desc: "India's premier defence electronics company. Critical precision components for defence electronics systems.", parts: ['Electronic enclosures', 'Precision housings', 'Structural brackets'] },
      { name: 'ECIL', since: '2007', desc: 'Electronics Corporation of India Ltd. Precision hardware for nuclear and defence electronics.', parts: ['Control system components', 'Custom enclosures'] },
      { name: 'BHEL', since: '2009', desc: "India's largest power equipment manufacturer. Turbine and power generation components.", parts: ['Turbine hardware', 'Valve bodies', 'Manifold components'] },
      { name: 'Avantel Limited', since: '2012', desc: 'Defence & space communications. Microwave and satellite communications hardware with AS9100 capability.', parts: ['Microwave hardware', 'Waveguide components', 'Cell jammer parts'] },
    ],
  },
  {
    sector: 'Technology & Innovation',
    accentColor: '#60a5fa',
    clients: [
      { name: 'Zen Technologies', since: '2016', desc: 'Defence simulation and training systems manufacturer. Precision components for simulators and training equipment.', parts: ['Simulator components', 'Precision assemblies'] },
      { name: 'T-Works Hub', since: '2018', desc: "India's largest prototyping facility. We provide rapid CNC machining support for innovators and startups.", parts: ['Prototype components', 'Custom parts', 'Short-run production'] },
    ],
  },
]

export default function ClientsPage() {
  const allClients = clientGroups.flatMap(g => g.clients)

  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: 'var(--dark-bg)' }}>
      <Navbar />

      {/* Header */}
      <section className="page-header">
        <div className="container-xl">
          <p className="text-brand-red fw-semibold text-uppercase letter-wide mb-2" style={{ fontSize: '0.9rem' }}>Trusted Partners</p>
          <h1 className="fw-black text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Our Clients</h1>
          <p className="text-secondary" style={{ maxWidth: '560px', fontSize: '1.05rem' }}>
            Long-term supply partnerships with India&apos;s most respected organizations across pharma, defence, and technology.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{ background: 'var(--brand-navy)', borderBottom: '1px solid var(--dark-border)' }}>
        <div className="container-xl py-4">
          <div className="row g-4 text-center">
            {[
              { val: '10+', label: 'Active Clients' },
              { val: '20+', label: 'Years of Service' },
              { val: '500+', label: 'Projects Delivered' },
              { val: '3', label: 'Industry Sectors' },
            ].map(s => (
              <div key={s.label} className="col-6 col-md-3">
                <div className="text-brand-red fw-black" style={{ fontSize: '1.75rem' }}>{s.val}</div>
                <div className="text-secondary" style={{ fontSize: '0.92rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client groups */}
      <section className="section-py" style={{ background: 'var(--dark-surface)' }}>
        <div className="container-xl">
          {clientGroups.map((group) => (
            <div key={group.sector} className="mb-5">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="rounded-pill" style={{ width: 12, height: 12, background: group.accentColor, flexShrink: 0 }} />
                <h2 className="text-white fw-bold mb-0" style={{ fontSize: '1.15rem' }}>{group.sector}</h2>
              </div>
              <div className="row g-4">
                {group.clients.map((client) => (
                  <div key={client.name} className="col-md-6">
                    <div className="dark-card p-4 h-100">
                      <div className="d-flex align-items-start justify-content-between mb-3">
                        <div
                          className="rounded d-flex align-items-center justify-content-center text-white fw-black flex-shrink-0"
                          style={{ width: 48, height: 48, background: 'var(--dark-elevated)', fontSize: '1.2rem', border: `1px solid ${group.accentColor}33` }}
                        >
                          {client.name[0]}
                        </div>
                        <span className="badge-status" style={{ background: `${group.accentColor}18`, color: group.accentColor }}>
                          Since {client.since}
                        </span>
                      </div>
                      <h3 className="text-white fw-bold mb-2" style={{ fontSize: '0.95rem' }}>{client.name}</h3>
                      <p className="text-secondary mb-3" style={{ fontSize: '0.83rem', lineHeight: 1.6 }}>{client.desc}</p>
                      <div className="d-flex flex-wrap gap-1">
                        {client.parts.map(p => (
                          <span key={p} className="capability-chip" style={{ fontSize: '0.85rem' }}>{p}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All clients logos strip */}
      <section className="py-4" style={{ background: 'var(--dark-bg)', borderTop: '1px solid var(--dark-border)' }}>
        <div className="container-xl">
          <p className="text-muted text-uppercase letter-wide fw-semibold text-center mb-3" style={{ fontSize: '0.82rem' }}>All Partners</p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {allClients.map(c => (
              <div key={c.name} className="dark-card px-4 py-2 text-center" style={{ borderRadius: '9999px' }}>
                <span className="text-secondary fw-medium" style={{ fontSize: '0.92rem' }}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py cta-red text-white">
        <div className="container-xl text-center">
          <h2 className="fw-black text-white mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>Become a Partner</h2>
          <p className="mb-5 mx-auto" style={{ opacity: 0.85, maxWidth: '480px' }}>
            Join India&apos;s leading organizations who trust Sunglow CNC for precision manufacturing.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link href="/register" className="btn-ghost-white" style={{ background: 'white' }}>
              <span style={{ color: 'var(--brand-red)', fontWeight: 800 }}>Get Started</span>
            </Link>
            <Link href="/contact" className="btn-ghost-white">Contact Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
