import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const services = [
  {
    id: 'cnc',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&q=80&fit=crop',
    icon: '⚙',
    title: 'CNC Precision Machining',
    subtitle: 'Our Core Capability',
    desc: 'Using advanced Vertical Machining Centers (VMC), we deliver high-tolerance milling, turning, drilling, and finishing operations for complex components.',
    items: ['3-axis & multi-axis CNC milling', 'CNC turning and boring', 'Wire cut & EDM machining', 'Surface and cylindrical grinding', 'Tolerances down to ±0.01mm', 'Superior surface finishes (Ra 0.4 – 1.6)'],
    machinery: ['3× VMC Milling Machines', 'CNC Lathe', 'Wire Cut EDM', 'EDM Machine', 'Conventional Setup'],
    accentColor: '#3b82f6',
  },
  {
    id: 'pharma',
    image: 'https://images.unsplash.com/photo-1581092160607-ee67df30e7f2?w=800&q=80&fit=crop',
    icon: '💊',
    title: 'Pharma Component Manufacturing',
    subtitle: 'Regular Supplies to Leading Pharma Companies',
    desc: 'We are a trusted supplier of precision pharma components to Bharat Biotech, Sanofi, Gland Pharma, and ICLEAN — maintaining the highest hygiene and tolerance standards.',
    items: ['Star wheels and guides', 'Vacuum star wheels', 'Filling machine chain parts', 'Filling needles & washing needles', 'Fermenter templates', 'TC, Y & Straight connectors'],
    machinery: ['316L Stainless Steel capability', 'Electro-polished finishes', 'GMP-compliant components'],
    accentColor: '#22c55e',
  },
  {
    id: 'defence',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&fit=crop',
    icon: '🛡',
    title: 'Defence & Aerospace Hardware',
    subtitle: 'Critical Precision for National Security',
    desc: 'Trusted by BEL, ECIL, BHEL, and Avantel Limited for producing high-precision defence and aerospace hardware including microwave systems and jamming devices.',
    items: ['Microwave systems hardware', 'Cell jammer components', 'Aerospace structural brackets', 'Complex manifolds & fluid components', 'High-tolerance drilling', 'Lightweight structural parts'],
    machinery: ['Titanium & Aluminium alloy machining', 'High-speed milling', 'Aerospace-grade QC'],
    accentColor: '#ef4444',
  },
  {
    id: 'ev',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80&fit=crop',
    icon: '⚡',
    title: 'EV & Automotive Components',
    subtitle: "Powering India's EV Revolution",
    desc: 'From EV battery casings to heat sinks and engine parts, we manufacture precision automotive components that meet stringent performance and safety requirements.',
    items: ['EV battery casings', 'Thermal management heat sinks', 'Engine & powertrain parts', 'Connecting rods (precision-milled)', 'Alloy wheel prototypes', 'Transmission components'],
    machinery: ['Aluminium alloy machining', 'High-volume capability', 'Dimensional inspection'],
    accentColor: '#eab308',
  },
  {
    id: 'robotics',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80&fit=crop',
    icon: '🤖',
    title: 'Robotics & Drones',
    subtitle: 'Precision Parts for Future Technologies',
    desc: 'Supporting T-Works Hub and Zen Technologies with precision components for drone frames, robotic actuators, and motion control systems.',
    items: ['Drone frame structures', 'Robotic arm components', 'Actuator housings', 'Servo motor mounts', 'Landing gear parts', 'Custom precision parts'],
    machinery: ['Lightweight alloy machining', 'High-precision boring', 'Custom geometry capability'],
    accentColor: '#a855f7',
  },
  {
    id: 'medical',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80&fit=crop',
    icon: '🏥',
    title: 'Medical Devices',
    subtitle: 'Clinical-Grade Precision',
    desc: 'Manufacturing surgical instruments, guide rails, and orthopedic implants with biocompatible materials and clinical-grade surface finishes.',
    items: ['Surgical guide rails & instruments', 'Orthopedic implant components', 'Biocompatible material machining', 'Titanium & SS 316L capability', 'Complex geometry implants', 'High-polish surgical finishes'],
    machinery: ['Ti-6Al-4V machining', 'Medical-grade finishing', 'Dimensional traceability'],
    accentColor: '#14b8a6',
  },
]

export default function ServicesPage() {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: 'var(--dark-bg)' }}>
      <Navbar />

      {/* Header */}
      <section className="page-header">
        <div className="container-xl">
          <p className="text-brand-red fw-semibold text-uppercase letter-wide mb-2" style={{ fontSize: '0.9rem' }}>What We Do</p>
          <h1 className="fw-black text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Our Services &amp; Capabilities</h1>
          <p className="text-secondary" style={{ maxWidth: '520px', fontSize: '1.05rem' }}>
            Comprehensive CNC precision machining services for critical industries. From prototypes to production runs.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="section-py" style={{ background: 'var(--dark-surface)' }}>
        <div className="container-xl">
          <div className="d-flex flex-column gap-4">
            {services.map((svc) => (
              <div key={svc.id} className="dark-card overflow-hidden">
                {/* Image banner */}
                <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
                  <img src={svc.image} alt={svc.title} className="w-100 h-100" style={{ objectFit: 'cover' }} loading="lazy" />
                  <div className="img-overlay-dark" />
                  <div className="position-absolute bottom-0 start-0 p-4 d-flex align-items-center gap-3">
                    <span style={{ fontSize: '2.5rem' }}>{svc.icon}</span>
                    <div>
                      <p className="mb-0 text-brand-red fw-semibold text-uppercase letter-wide" style={{ fontSize: '0.85rem' }}>{svc.subtitle}</p>
                      <h2 className="text-white fw-black mb-0" style={{ fontSize: '1.4rem' }}>{svc.title}</h2>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <p className="text-secondary mb-4" style={{ lineHeight: 1.7 }}>{svc.desc}</p>
                      <h4 className="text-muted text-uppercase letter-wide fw-semibold mb-3" style={{ fontSize: '0.85rem' }}>Key Capabilities</h4>
                      <div className="d-flex flex-wrap gap-2">
                        {svc.machinery.map((m) => (
                          <span key={m} className="capability-chip">{m}</span>
                        ))}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h4 className="text-secondary text-uppercase letter-wide fw-semibold mb-3" style={{ fontSize: '0.85rem' }}>Components &amp; Parts</h4>
                      <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                        {svc.items.map((item) => (
                          <li key={item} className="d-flex align-items-start gap-2">
                            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="var(--brand-red)" className="flex-shrink-0 mt-1">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-secondary" style={{ fontSize: '0.95rem' }}>{item}</span>
                          </li>
                        ))}
                      </ul>
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
          <h2 className="fw-black text-white mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>Need a Custom Component?</h2>
          <p className="mb-5 mx-auto" style={{ opacity: 0.85, maxWidth: '480px' }}>
            Upload your design and our team will provide a detailed quote within 24 hours.
          </p>
          <Link href="/register" className="btn-ghost-white" style={{ background: 'white' }}>
            <span style={{ color: 'var(--brand-red)', fontWeight: 800 }}>Request a Quote</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
