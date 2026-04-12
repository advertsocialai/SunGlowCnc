import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const guides = [
  {
    category: 'Design Guides',
    icon: '📐',
    accentColor: '#60a5fa',
    items: [
      { title: 'CNC Machining Design Guide', desc: 'Complete guide to designing parts for CNC milling and turning — tolerances, fillets, threads, and cost tips.', tag: 'Essential' },
      { title: 'Material Selection Guide', desc: 'How to choose the right metal or plastic for your application — strength, corrosion, temperature, and machinability.', tag: 'Beginner' },
      { title: 'Surface Finish Reference', desc: 'When to specify Ra values, which finishes work for pharma vs defence vs industrial applications.', tag: 'Reference' },
      { title: 'GD&T Quick Reference', desc: 'Practical guide to Geometric Dimensioning & Tolerancing symbols used on engineering drawings.', tag: 'Reference' },
    ],
  },
  {
    category: 'Industry Guides',
    icon: '🏭',
    accentColor: '#4ade80',
    items: [
      { title: 'Pharma Component Manufacturing', desc: 'GMP requirements, materials (SS316L, PEEK), surface finish standards for filling machines and fermenters.', tag: 'Pharma' },
      { title: 'Defence & Aerospace Machining', desc: 'AS9100 compliance, material traceability, and precision requirements for defence-grade components.', tag: 'Defence' },
      { title: 'EV Battery Casing Guide', desc: 'Design considerations for EV battery enclosures — thermal management, sealing, weight, and material selection.', tag: 'EV/Auto' },
      { title: 'Medical Device Machining Guide', desc: 'ISO 13485 requirements, biocompatible materials, and clinical-grade finishes for surgical and implant components.', tag: 'Medical' },
    ],
  },
  {
    category: 'Technical References',
    icon: '📊',
    accentColor: '#c084fc',
    items: [
      { title: 'Standard Thread Reference Chart', desc: 'Complete M-series metric, UNC and UNF thread dimensions, pitch, and drill sizes for machined holes.', tag: 'Reference' },
      { title: 'Material Hardness Conversion Chart', desc: 'HRC, HRB, HV, HB hardness conversions for all common tool steels and engineering metals.', tag: 'Reference' },
      { title: 'Tolerance & Fits Guide (ISO 286)', desc: 'Running fits, transition fits, interference fits — how to specify shaft and hole tolerances correctly.', tag: 'Advanced' },
      { title: 'Cutting Speed & Feed Reference', desc: 'Recommended cutting parameters for aluminium, steel, titanium, and plastics on VMC machines.', tag: 'Advanced' },
    ],
  },
]

const industryLinks = [
  { name: 'Pharma Manufacturing', icon: '💊' },
  { name: 'Defence Components', icon: '🛡' },
  { name: 'EV & Automotive', icon: '⚡' },
  { name: 'Aerospace Machining', icon: '✈' },
  { name: 'Medical Devices', icon: '🏥' },
  { name: 'Robotics & Drones', icon: '🤖' },
]

const certifications = [
  { name: 'ISO 9001:2015', desc: 'Quality Management System' },
  { name: 'GMP Compliance', desc: 'Good Manufacturing Practice for pharma' },
  { name: 'AS9100 Capable', desc: 'Aerospace quality standard' },
  { name: 'ITAR Eligible', desc: 'Defence hardware manufacturing' },
]

export default function ResourcesPage() {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: 'var(--dark-bg)' }}>
      <Navbar />

      {/* Header */}
      <section className="page-header">
        <div className="container-xl">
          <p className="text-brand-red fw-semibold text-uppercase letter-wide mb-2" style={{ fontSize: '0.8rem' }}>Knowledge Base</p>
          <h1 className="fw-black text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Manufacturing Resources</h1>
          <p className="text-secondary" style={{ maxWidth: '560px', fontSize: '1.05rem' }}>
            Free technical guides, design tips, material references, and industry-specific manufacturing knowledge from 20+ years of experience.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <div style={{ background: 'var(--dark-elevated)', borderBottom: '1px solid var(--dark-border)' }}>
        <div className="container-xl py-3">
          <div className="d-flex flex-wrap gap-2">
            {[
              { label: 'Design Guides', href: '#design-guides' },
              { label: 'Industry Guides', href: '#industry-guides' },
              { label: 'Technical References', href: '#tech-refs' },
              { label: 'Certifications', href: '#certs' },
              { label: 'Get a Quote', href: '/dashboard/rfq/new' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="btn px-3 py-1"
                style={{
                  fontSize: '0.82rem', color: 'var(--text-secondary)',
                  border: '1px solid var(--dark-border)', borderRadius: '6px',
                  background: 'var(--dark-card)', textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Guide Sections */}
      <section className="section-py" style={{ background: 'var(--dark-surface)' }}>
        <div className="container-xl">
          {guides.map((section, si) => (
            <div key={section.category} id={['design-guides', 'industry-guides', 'tech-refs'][si]} className="mb-5">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 40, height: 40, background: section.accentColor + '18', border: `1px solid ${section.accentColor}44`, fontSize: '1.2rem' }}
                >
                  {section.icon}
                </div>
                <h2 className="text-white fw-bold mb-0" style={{ fontSize: '1.15rem' }}>{section.category}</h2>
              </div>
              <div className="row g-3">
                {section.items.map((item) => (
                  <div key={item.title} className="col-sm-6 col-lg-3">
                    <div className="dark-card p-4 h-100" style={{ borderColor: section.accentColor + '33' }}>
                      <span className="text-muted text-uppercase fw-semibold d-block mb-2" style={{ fontSize: '0.65rem', letterSpacing: '0.08em' }}>{item.tag}</span>
                      <h3 className="text-white fw-bold mb-2" style={{ fontSize: '0.875rem', lineHeight: 1.4 }}>{item.title}</h3>
                      <p className="text-secondary mb-3" style={{ fontSize: '0.78rem', lineHeight: 1.6 }}>{item.desc}</p>
                      <button className="btn p-0 d-flex align-items-center gap-1" style={{ fontSize: '0.78rem', color: section.accentColor, fontWeight: 600 }}>
                        Download PDF
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section id="certs" className="section-py" style={{ background: 'var(--dark-bg)' }}>
        <div className="container-xl">
          <h2 className="text-white fw-bold mb-4" style={{ fontSize: '1.3rem' }}>Quality Certifications & Compliance</h2>
          <div className="row g-3">
            {certifications.map((cert) => (
              <div key={cert.name} className="col-sm-6 col-lg-3">
                <div className="dark-card p-4 text-center h-100" style={{ background: 'var(--brand-navy)' }}>
                  <div className="mb-2" style={{ fontSize: '2rem' }}>🏆</div>
                  <div className="fw-bold mb-1" style={{ color: 'var(--brand-red)', fontSize: '1rem' }}>{cert.name}</div>
                  <div className="text-secondary" style={{ fontSize: '0.82rem' }}>{cert.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Resources */}
      <section className="section-py" style={{ background: 'var(--dark-surface)' }}>
        <div className="container-xl">
          <h2 className="text-white fw-bold mb-4" style={{ fontSize: '1.3rem' }}>Resources by Industry</h2>
          <div className="row g-3">
            {industryLinks.map((ind) => (
              <div key={ind.name} className="col-6 col-sm-4 col-lg-2">
                <Link
                  href="/industries"
                  className="dark-card p-3 text-center d-flex flex-column align-items-center gap-2"
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{ fontSize: '1.75rem' }}>{ind.icon}</div>
                  <div className="text-secondary fw-medium" style={{ fontSize: '0.75rem', lineHeight: 1.3 }}>{ind.name}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py cta-red text-white">
        <div className="container-xl text-center">
          <h2 className="fw-black text-white mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>Ready to Manufacture?</h2>
          <p className="mb-5 mx-auto" style={{ opacity: 0.85, maxWidth: '480px' }}>
            Our engineers are available to answer technical questions and help design your components.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link href="/dashboard/rfq/new" className="btn-ghost-white" style={{ background: 'white' }}>
              <span style={{ color: 'var(--brand-red)', fontWeight: 800 }}>Get a Quote</span>
            </Link>
            <Link href="/contact" className="btn-ghost-white">Talk to Engineers</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
