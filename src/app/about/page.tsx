import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const machinery = [
  { name: 'CNC VMC Milling Machines', qty: 3, detail: 'Vertical Machining Centers — 3-axis high-speed milling', capability: 'Up to 600×400×400mm work envelope' },
  { name: 'CNC Lathe', qty: 1, detail: 'Precision CNC turning center', capability: 'Diameter up to Ø300mm' },
  { name: 'Wire Cut EDM', qty: 1, detail: 'Wire electrical discharge machine', capability: 'Complex contour cutting, hardened materials' },
  { name: 'EDM (Die Sinking)', qty: 1, detail: 'Electrical discharge machining', capability: 'Deep cavities, blind features' },
  { name: 'Conventional Mill & Lathe', qty: 1, detail: 'Traditional machining setup', capability: 'General turning and milling' },
]

const milestones = [
  { year: '2003', event: 'Founded Sunglow CNC Technics in Hyderabad' },
  { year: '2005', event: 'First defence contract with BEL — precision electronics components' },
  { year: '2006', event: 'Partnership with Bharat Biotech — pharma component supply begins' },
  { year: '2010', event: 'Expanded to 3 VMC machines — increased production capacity' },
  { year: '2012', event: 'Defence aerospace — Avantel microwave hardware supply' },
  { year: '2018', event: 'Collaboration with T-Works Hub — prototype machining support' },
  { year: '2019', event: 'Entered EV sector — battery casings and heat sinks' },
  { year: '2024', event: 'Celebrating 20+ years, launching digital CNC platform' },
]

const values = [
  { icon: '🎯', title: 'Zero-Compromise Precision', desc: 'Every component meets stringent dimensional and surface requirements before leaving our facility.' },
  { icon: '🤝', title: 'Long-Term Partnerships', desc: 'We build lasting relationships — most of our clients have trusted us for 10+ years.' },
  { icon: '🔬', title: 'Quality First', desc: 'Rigorous in-process and final inspection using precision measurement equipment.' },
  { icon: '⚡', title: 'Reliable Delivery', desc: 'On-time delivery backed by efficient production planning and dedicated client support.' },
]

export default function AboutPage() {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: 'var(--dark-bg)' }}>
      <Navbar />

      {/* Header */}
      <section className="page-header">
        <div className="container-xl">
          <p className="text-brand-red fw-semibold text-uppercase letter-wide mb-2" style={{ fontSize: '0.9rem' }}>Our Story</p>
          <h1 className="fw-black text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>A Legacy of Precision</h1>
          <p className="text-secondary" style={{ maxWidth: '560px', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Since 2003, Sunglow CNC Technics has been the trusted manufacturing partner for India&apos;s most
            critical industries — from pharmaceutical to defence.
          </p>
        </div>
      </section>

      {/* Facility photo strip */}
      <div className="row g-0" style={{ height: '220px', overflow: 'hidden' }}>
        {[
          { src: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80&fit=crop', alt: 'CNC milling' },
          { src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80&fit=crop', alt: 'Machining facility' },
          { src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80&fit=crop', alt: 'Precision components' },
        ].map((img) => (
          <div key={img.src} className="col-4 position-relative overflow-hidden img-zoom">
            <img src={img.src} alt={img.alt} className="w-100 h-100" style={{ objectFit: 'cover' }} loading="lazy" />
            <div className="position-absolute inset-0" style={{ inset: 0, background: 'rgba(28,43,94,0.3)' }} />
          </div>
        ))}
      </div>

      {/* Mission */}
      <section className="section-py" style={{ background: 'var(--dark-surface)' }}>
        <div className="container-xl">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <h2 className="section-title mb-4">Our Mission</h2>
              <p className="text-secondary mb-4" style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                Starting in 2003, we set out to be the leading precision manufacturer for demanding industries
                that require zero-compromise quality and reliability. Two decades later, we continue to deliver
                on that promise.
              </p>
              <p className="text-secondary mb-5" style={{ lineHeight: 1.8 }}>
                We believe that manufacturing is not just about cutting metal — it is about enabling breakthroughs
                in pharma, protecting national security through defence hardware, accelerating the EV revolution,
                and pushing the boundaries of robotics and aerospace.
              </p>
              <div className="row g-3">
                {[
                  { val: '20+', label: 'Years in Business' },
                  { val: '10+', label: 'Client Industries' },
                  { val: '500+', label: 'Projects Completed' },
                  { val: '5', label: 'Machine Types' },
                ].map((stat) => (
                  <div key={stat.label} className="col-6">
                    <div className="dark-card p-4 text-center">
                      <div className="text-brand-red fw-black" style={{ fontSize: '1.75rem' }}>{stat.val}</div>
                      <div className="text-secondary mt-1" style={{ fontSize: '0.9rem' }}>{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="bg-brand-navy rounded-xl p-4">
                <h3 className="text-brand-red fw-bold mb-4 text-uppercase letter-wide" style={{ fontSize: '0.95rem' }}>Our Values</h3>
                <div className="d-flex flex-column gap-4">
                  {values.map((v) => (
                    <div key={v.title} className="d-flex gap-3">
                      <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{v.icon}</span>
                      <div>
                        <h4 className="text-white fw-semibold mb-1" style={{ fontSize: '0.95rem' }}>{v.title}</h4>
                        <p className="text-secondary mb-0" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Machinery */}
      <section className="section-py" style={{ background: 'var(--dark-bg)' }}>
        <div className="container-xl">
          <div className="text-center mb-5">
            <h2 className="section-title">Our Facility &amp; Machinery</h2>
            <p className="section-subtitle mx-auto">Complete in-house manufacturing capability — no outsourcing</p>
          </div>
          <div className="row g-4">
            {machinery.map((m) => (
              <div key={m.name} className="col-md-6 col-lg-4">
                <div className="dark-card p-4 h-100">
                  <div className="d-flex align-items-start justify-content-between mb-3">
                    <div
                      className="rounded d-flex align-items-center justify-content-center"
                      style={{ width: 40, height: 40, background: 'var(--brand-red-light)', flexShrink: 0 }}
                    >
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="var(--brand-red)">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="cert-badge">×{m.qty}</span>
                  </div>
                  <h3 className="text-white fw-bold mb-1" style={{ fontSize: '0.95rem' }}>{m.name}</h3>
                  <p className="text-secondary mb-3" style={{ fontSize: '0.92rem' }}>{m.detail}</p>
                  <p className="text-brand-red fw-medium mb-0" style={{ fontSize: '0.88rem', background: 'var(--brand-red-light)', padding: '0.4rem 0.75rem', borderRadius: '0.4rem', display: 'inline-block' }}>
                    {m.capability}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-py" style={{ background: 'var(--dark-surface)' }}>
        <div className="container-xl">
          <h2 className="section-title text-center mb-5">Our Journey</h2>
          <div className="position-relative" style={{ maxWidth: '680px', margin: '0 auto' }}>
            <div className="timeline-line" />
            <div className="d-flex flex-column gap-4 ps-4">
              {milestones.map((m) => (
                <div key={m.year} className="d-flex gap-4 align-items-start">
                  <div className="timeline-dot flex-shrink-0">●</div>
                  <div className="dark-card p-4 flex-grow-1">
                    <span className="text-brand-red fw-black" style={{ fontSize: '0.95rem' }}>{m.year}</span>
                    <p className="text-secondary mb-0 mt-1" style={{ fontSize: '0.95rem' }}>{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py cta-red text-white">
        <div className="container-xl text-center">
          <h2 className="fw-black text-white mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>Ready to Work With Us?</h2>
          <p className="mb-5 mx-auto" style={{ opacity: 0.85, maxWidth: '500px' }}>20 years of precision — and we&apos;re just getting started.</p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link href="/contact" className="btn-ghost-white" style={{ background: 'white' }}>
              <span style={{ color: 'var(--brand-red)', fontWeight: 800 }}>Contact Us</span>
            </Link>
            <Link href="/register" className="btn-ghost-white">Request Quote</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
