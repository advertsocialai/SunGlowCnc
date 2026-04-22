import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const capabilityTable = [
  { service: 'CNC VMC Milling (3-Axis)', leadTime: '3–7 working days', materials: 'Metals & Plastics', tolerance: '±0.05mm standard / ±0.01mm precision', maxSize: '600 × 400 × 400 mm', machines: '3 VMC machines' },
  { service: 'CNC Turning / Lathe', leadTime: '3–7 working days', materials: 'Metals & Plastics', tolerance: '±0.01mm', maxSize: 'Ø300mm × 600mm L', machines: '1 CNC Lathe' },
  { service: 'Wire Cut EDM', leadTime: '5–10 working days', materials: 'All conductive metals', tolerance: '±0.005mm', maxSize: '400 × 300 × 200 mm', machines: '1 Wire Cut EDM' },
  { service: 'Die Sinking EDM', leadTime: '5–10 working days', materials: 'Hardened steels, carbide', tolerance: '±0.01mm', maxSize: '300 × 200 × 200 mm', machines: '1 EDM Machine' },
  { service: 'Conventional Machining', leadTime: '2–5 working days', materials: 'Metals', tolerance: '±0.1mm', maxSize: 'Varies', machines: 'Full conventional setup' },
]

const machiningFAQ = [
  { q: 'What is CNC machining?', a: 'CNC (Computer Numerical Control) machining uses automated high-speed cutting tools guided by digital programs (G-code) to precisely shape metal or plastic from raw stock. It is highly accurate, repeatable, and suitable for both prototypes and production runs.' },
  { q: 'What tolerances can you achieve?', a: 'Standard CNC milling achieves ±0.05mm for metals. For precision fits, bores, and critical dimensions, we achieve ±0.01mm. Wire Cut EDM reaches ±0.005mm for hardened materials. All tolerances are inspection-verified.' },
  { q: 'What is the minimum order quantity?', a: 'We accept orders from 1 piece (prototype) to large production batches. There is no minimum order quantity — we serve both one-off prototypes for T-Works startups and repeat bulk orders for Bharat Biotech and BEL.' },
  { q: 'Do you accept CAD files?', a: 'Yes. We accept STEP, STP, IGES, DXF, DWG, and PDF drawing files. Upload your file with your RFQ and our engineers will review and confirm manufacturability within 24 hours.' },
  { q: 'What surface finishes are available?', a: 'As-machined (Ra 1.6μm), bead blast, anodize Type II/III, hard anodize, passivation, electropolish, powder coat, chrome/nickel plating, and custom finishes. See our Materials page for a full list.' },
  { q: 'Can you machine hardened steel?', a: 'Yes. Our Wire Cut EDM and Die Sinking EDM machines work with hardened steels (H13, D2, EN31 etc.) up to 60+ HRC. This is essential for mould cavities, punches, and tool room applications.' },
  { q: 'Do you provide quality inspection reports?', a: 'Yes. We provide dimensional inspection using precision measuring instruments. For critical pharma and defence components, we provide full inspection reports with material certificates.' },
  { q: 'What industries do you serve?', a: 'Pharma (Bharat Biotech, Sanofi, Gland Pharma), Defence (BEL, ECIL, BHEL, Avantel), Technology (Zen Technologies, T-Works), EV/Automotive, Medical, Aerospace, Energy, and Robotics.' },
]

const designGuidelines = [
  { rule: 'Internal Corner Radii', desc: 'Add fillets ≥ 0.5mm to internal corners to allow tool clearance. Larger radii = faster machining = lower cost.' },
  { rule: 'Wall Thickness', desc: 'Maintain minimum wall thickness of 0.5mm for metals, 1mm for plastics to prevent vibration and deflection during machining.' },
  { rule: 'Hole Depth-to-Diameter Ratio', desc: 'Keep depth-to-diameter ratio below 8:1 for standard drills. Deeper holes require special extended tools.' },
  { rule: 'Thread Specification', desc: 'Specify thread standard (M series, UNC, UNF), depth, and class of fit. We accommodate all standard and custom threads.' },
  { rule: 'Tolerances', desc: 'Only apply tight tolerances where functionally required. Tighter tolerances increase machining time and cost.' },
  { rule: 'Surface Finish Callouts', desc: 'Specify Ra value and apply only to functional surfaces. Leaving other surfaces as-machined reduces cost.' },
  { rule: 'Undercuts', desc: 'Design undercuts accessible with standard tooling. Notify us if special undercut tools are needed for your geometry.' },
  { rule: 'Material Specification', desc: 'Always specify material grade and heat treatment condition (T6, annealed, hardened etc.) on your drawing.' },
]

export default function CapabilitiesPage() {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: 'var(--dark-bg)' }}>
      <Navbar />

      {/* Header */}
      <section className="page-header">
        <div className="container-xl">
          <p className="text-brand-red fw-semibold text-uppercase letter-wide mb-2" style={{ fontSize: '0.9rem' }}>Technical Specifications</p>
          <h1 className="fw-black text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Machining Capabilities</h1>
          <p className="text-secondary mb-4" style={{ maxWidth: '560px', fontSize: '1.05rem' }}>
            Complete specifications for our CNC machining services — tolerances, lead times, part sizes, and design guidelines.
          </p>
          <div className="d-flex flex-wrap gap-2">
            {['±0.01mm Precision', 'Pharma-Grade Finishing', 'Defence-Certified QC', 'CAD File Support'].map(b => (
              <span key={b} className="badge-status" style={{ background: 'rgba(200,32,46,0.15)', color: '#fca5a5', border: '1px solid rgba(200,32,46,0.3)' }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Capability Table */}
      <section className="section-py" style={{ background: 'var(--dark-surface)' }}>
        <div className="container-xl">
          <h2 className="text-white fw-bold mb-4" style={{ fontSize: '1.3rem' }}>Service Capabilities at a Glance</h2>
          <div className="dark-card overflow-hidden">
            <div className="table-responsive">
              <table className="table-dark-custom w-100">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Lead Time</th>
                    <th>Tolerance</th>
                    <th>Max Part Size</th>
                    <th>Equipment</th>
                  </tr>
                </thead>
                <tbody>
                  {capabilityTable.map((row) => (
                    <tr key={row.service}>
                      <td>
                        <div className="text-white fw-semibold" style={{ fontSize: '0.95rem' }}>{row.service}</div>
                        <div className="text-muted" style={{ fontSize: '0.85rem' }}>{row.materials}</div>
                      </td>
                      <td style={{ color: 'var(--brand-red)', fontWeight: 600, fontSize: '0.95rem' }}>{row.leadTime}</td>
                      <td className="text-white fw-semibold" style={{ fontSize: '0.95rem' }}>{row.tolerance}</td>
                      <td className="text-secondary" style={{ fontSize: '0.95rem' }}>{row.maxSize}</td>
                      <td className="text-secondary" style={{ fontSize: '0.95rem' }}>{row.machines}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-muted mt-2" style={{ fontSize: '0.85rem' }}>* Lead times are estimates and may vary based on complexity and current capacity. Contact us for urgent orders.</p>
        </div>
      </section>

      {/* DFM Guidelines */}
      <section className="section-py" style={{ background: 'var(--dark-bg)' }}>
        <div className="container-xl">
          <h2 className="text-white fw-bold mb-2" style={{ fontSize: '1.3rem' }}>Design for Manufacturability (DFM) Guidelines</h2>
          <p className="text-secondary mb-4" style={{ fontSize: '0.95rem' }}>
            Following these guidelines helps reduce machining cost, improve part quality, and speed up delivery.
          </p>
          <div className="row g-3 mb-4">
            {designGuidelines.map((g) => (
              <div key={g.rule} className="col-sm-6">
                <div className="dark-card p-3 d-flex gap-3 h-100">
                  <div
                    className="rounded d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{ width: 32, height: 32, background: 'rgba(200,32,46,0.15)', border: '1px solid rgba(200,32,46,0.3)', marginTop: '2px' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--brand-red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white fw-semibold mb-1" style={{ fontSize: '0.95rem' }}>{g.rule}</h4>
                    <p className="text-muted mb-0" style={{ fontSize: '0.88rem', lineHeight: 1.5 }}>{g.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded p-3" style={{ background: 'rgba(200,32,46,0.08)', border: '1px solid rgba(200,32,46,0.25)' }}>
            <p className="mb-0" style={{ fontSize: '0.95rem', color: '#fca5a5' }}>
              <strong>Free DFM Review:</strong> Upload your CAD file with your RFQ and our engineers will review your design for manufacturability and suggest cost-saving optimizations at no charge.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-py" style={{ background: 'var(--dark-surface)' }}>
        <div className="container-xl" style={{ maxWidth: '860px' }}>
          <h2 className="text-white fw-bold mb-4" style={{ fontSize: '1.3rem' }}>Frequently Asked Questions</h2>
          <div className="d-flex flex-column gap-3">
            {machiningFAQ.map((item) => (
              <div key={item.q} className="dark-card p-4">
                <h3 className="text-white fw-semibold mb-2" style={{ fontSize: '0.9rem' }}>{item.q}</h3>
                <p className="text-secondary mb-0" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py cta-red text-white">
        <div className="container-xl">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-4">
            <div>
              <h2 className="fw-black text-white mb-1" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}>Ready to Start Your Project?</h2>
              <p className="mb-0" style={{ opacity: 0.85 }}>Upload your design and get a quote in 24 hours.</p>
            </div>
            <div className="d-flex gap-3 flex-shrink-0">
              <Link href="/dashboard/rfq/new" className="btn-ghost-white" style={{ background: 'white' }}>
                <span style={{ color: 'var(--brand-red)', fontWeight: 800 }}>Get Instant Quote</span>
              </Link>
              <Link href="/contact" className="btn-ghost-white">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
