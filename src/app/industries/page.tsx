import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const industries = [
  {
    name: 'Aerospace',
    icon: '✈',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80&fit=crop',
    components: [
      { title: 'Airframe Structural Components', desc: 'Lightweight, high-strength brackets and mounts with complex geometry milled from aerospace-grade aluminum alloys.' },
      { title: 'Complex Manifolds', desc: 'Intricate fluid and gas flow components with high-tolerance drilling and precision-bored passages.' },
    ],
    materials: ['Aluminum 7075-T6', 'Titanium Ti-6Al-4V', 'Stainless Steel 17-4 PH'],
  },
  {
    name: 'Automobile & EV',
    icon: '⚡',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80&fit=crop',
    components: [
      { title: 'EV Battery Casings', desc: 'Precision-machined battery enclosures with thermal management features for electric vehicles.' },
      { title: 'Engine & Powertrain Parts', desc: 'Connecting rods, transmission components, and housing machined to tight tolerances.' },
      { title: 'Heat Sinks', desc: 'High-performance thermal management components for EV power electronics.' },
    ],
    materials: ['Aluminum 6061-T6', 'Cast Iron', 'Steel 4340'],
  },
  {
    name: 'Pharma & Medical',
    icon: '💊',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80&fit=crop',
    components: [
      { title: 'Star Wheels & Guides', desc: 'GMP-grade rotary components for pharmaceutical filling and packaging lines.' },
      { title: 'Filling & Washing Needles', desc: 'Precision-turned SS 316L needles for injectable drug filling machines.' },
      { title: 'Fermenter Templates', desc: 'Stainless steel components for bioreactor and fermenter assemblies.' },
    ],
    materials: ['SS 316L', 'SS 304', 'PEEK', 'PTFE'],
  },
  {
    name: 'Defence',
    icon: '🛡',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80&fit=crop',
    components: [
      { title: 'Microwave Systems Hardware', desc: 'Precision waveguide components and housings for radar and communication systems.' },
      { title: 'Cell Jammer Components', desc: 'High-tolerance aluminum and steel parts for electronic warfare systems.' },
      { title: 'Structural Brackets', desc: 'Aircraft and vehicle-grade structural mounts for defence platforms.' },
    ],
    materials: ['Aluminum 7075', 'Titanium', 'Stainless 17-4 PH'],
  },
  {
    name: 'Electronics',
    icon: '💻',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80&fit=crop',
    components: [
      { title: 'Device Housings', desc: 'Finished aluminum casings for electronics — iPhone-style precision milling.' },
      { title: 'Heat Sinks & Connector Blocks', desc: 'Multi-ported electronic housings and thermal management components.' },
    ],
    materials: ['Aluminum 6063', 'Copper', 'Stainless Steel 304'],
  },
  {
    name: 'Energy & Turbine',
    icon: '⚙',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80&fit=crop',
    components: [
      { title: 'Turbine Blades & Vanes', desc: 'Precision 5-axis machined turbine components from Inconel and titanium alloys.' },
      { title: 'Valve Bodies & Manifolds', desc: 'High-pressure valve components with precision-bored passages for energy systems.' },
    ],
    materials: ['Inconel 718', 'Titanium', 'Duplex Stainless'],
  },
  {
    name: 'Robotics & Drones',
    icon: '🤖',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80&fit=crop',
    components: [
      { title: 'Drone Frames & Arms', desc: 'Lightweight aluminum and carbon-fiber-insert frames for UAV platforms.' },
      { title: 'Robotic Arm Components', desc: 'Actuator housings, servo mounts, and precision linkages for industrial robots.' },
    ],
    materials: ['Aluminum 7075', 'Titanium', 'ABS', 'PEEK'],
  },
  {
    name: 'Die & Mould',
    icon: '🔧',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80&fit=crop',
    components: [
      { title: 'Cavity & Core Inserts', desc: 'Precision 3D contouring for complex injection moulding dies with mirror-finish surfaces.' },
      { title: 'Textured Mould Plates', desc: 'High-detail surface texturing for plastic and rubber moulding applications.' },
    ],
    materials: ['P20 Tool Steel', 'H13 Steel', 'D2 Steel'],
  },
]

export default function IndustriesPage() {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: 'var(--dark-bg)' }}>
      <Navbar />

      {/* Header */}
      <section className="page-header">
        <div className="container-xl">
          <p className="text-brand-red fw-semibold text-uppercase letter-wide mb-2" style={{ fontSize: '0.8rem' }}>Markets We Serve</p>
          <h1 className="fw-black text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Industries We Serve</h1>
          <p className="text-secondary" style={{ maxWidth: '560px', fontSize: '1.05rem' }}>
            Precision CNC machining for India&apos;s most demanding sectors — from GMP pharma components to defence-grade aerospace hardware.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="section-py" style={{ background: 'var(--dark-surface)' }}>
        <div className="container-xl">
          <div className="row g-4">
            {industries.map((ind) => (
              <div key={ind.name} className="col-md-6 col-lg-4">
                <div className="dark-card h-100 overflow-hidden">
                  {/* Image header */}
                  <div className="position-relative overflow-hidden" style={{ height: '160px' }}>
                    <img src={ind.image} alt={ind.name} className="w-100 h-100" style={{ objectFit: 'cover' }} loading="lazy" />
                    <div className="img-overlay-dark" />
                    <div className="position-absolute bottom-0 start-0 p-3 d-flex align-items-center gap-2">
                      <span style={{ fontSize: '1.75rem' }}>{ind.icon}</span>
                      <h2 className="text-white fw-black mb-0" style={{ fontSize: '1.1rem' }}>{ind.name}</h2>
                    </div>
                  </div>

                  <div className="p-4">
                    {/* Components */}
                    <div className="d-flex flex-column gap-3 mb-4">
                      {ind.components.map((c) => (
                        <div key={c.title}>
                          <h4 className="text-white fw-semibold mb-1" style={{ fontSize: '0.85rem' }}>{c.title}</h4>
                          <p className="text-secondary mb-0" style={{ fontSize: '0.8rem', lineHeight: 1.5 }}>{c.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Materials */}
                    <div>
                      <p className="text-muted text-uppercase letter-wide fw-semibold mb-2" style={{ fontSize: '0.68rem' }}>Materials</p>
                      <div className="d-flex flex-wrap gap-1">
                        {ind.materials.map((m) => (
                          <span key={m} className="capability-chip" style={{ fontSize: '0.72rem' }}>{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py cta-red text-white">
        <div className="container-xl text-center">
          <h2 className="fw-black text-white mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>Don&apos;t See Your Industry?</h2>
          <p className="mb-5 mx-auto" style={{ opacity: 0.85, maxWidth: '480px' }}>
            We work across many sectors. Contact us with your requirements and we&apos;ll confirm our capability.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link href="/contact" className="btn-ghost-white" style={{ background: 'white' }}>
              <span style={{ color: 'var(--brand-red)', fontWeight: 800 }}>Contact Us</span>
            </Link>
            <Link href="/dashboard/rfq/new" className="btn-ghost-white">Submit RFQ</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
