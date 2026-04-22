import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const metalGroups = [
  {
    name: 'Aluminium Alloys',
    icon: '🔵',
    accentColor: '#60a5fa',
    materials: [
      { grade: 'Aluminium 6061-T6', desc: 'Most popular. Excellent machinability, good corrosion resistance. General-purpose structural parts.', uses: ['EV housings', 'Brackets', 'Fixtures'] },
      { grade: 'Aluminium 7075-T6', desc: 'Highest strength aluminium. Used in aerospace and defence for lightweight high-load parts.', uses: ['Aerospace frames', 'Drone components', 'Defence hardware'] },
      { grade: 'Aluminium 2024-T3', desc: 'High strength, fatigue resistant. Excellent for aircraft structures and fittings.', uses: ['Aircraft fittings', 'Structural panels'] },
      { grade: 'Aluminium 5052', desc: 'Marine grade. Excellent corrosion resistance in saltwater environments.', uses: ['Marine parts', 'Chemical tanks'] },
      { grade: 'Aluminium 6063', desc: 'Superior surface finish. Ideal for electronics enclosures and anodized products.', uses: ['Electronics housing', 'Heat sinks', 'Extrusions'] },
    ],
  },
  {
    name: 'Stainless Steel',
    icon: '⚪',
    accentColor: '#94a3b8',
    materials: [
      { grade: 'SS 304', desc: 'Standard austenitic stainless. Corrosion resistant, weldable, food safe.', uses: ['Food equipment', 'Fittings', 'General industrial'] },
      { grade: 'SS 316L', desc: 'Medical and pharma grade. Superior corrosion resistance with low carbon for welding.', uses: ['Pharma components', 'Surgical tools', 'Marine'] },
      { grade: 'SS 17-4 PH', desc: 'Precipitation hardened. High strength + good corrosion resistance for aerospace.', uses: ['Aerospace components', 'Pump shafts', 'Valve parts'] },
      { grade: 'SS 420', desc: 'High hardness martensitic steel. Used in tooling and moulds.', uses: ['Mould inserts', 'Cutting tools', 'Gauges'] },
      { grade: 'SS 630 (17-4 PH)', desc: 'Hardened via heat treatment. Combines toughness with corrosion resistance.', uses: ['Defence parts', 'Fasteners', 'Medical implants'] },
    ],
  },
  {
    name: 'Carbon & Tool Steel',
    icon: '🔶',
    accentColor: '#fbbf24',
    materials: [
      { grade: 'Mild Steel (EN8)', desc: 'Versatile carbon steel. Good machinability for general engineering parts.', uses: ['Shafts', 'Keys', 'Gears'] },
      { grade: 'Carbon Steel 4340', desc: 'High strength alloy steel. Excellent fatigue resistance for heavy engineering.', uses: ['Crankshafts', 'Gears', 'Engine parts'] },
      { grade: 'Tool Steel H13', desc: 'Hot work tool steel. Exceptional thermal fatigue resistance for moulds and dies.', uses: ['Injection mould cavities', 'Die casting dies'] },
      { grade: 'Tool Steel D2', desc: 'High chromium cold work tool steel. Excellent wear resistance for punches and dies.', uses: ['Punches', 'Blanking dies', 'Gauges'] },
      { grade: 'EN31 Bearing Steel', desc: 'High carbon chromium steel for bearings. High hardness and wear resistance.', uses: ['Bearings', 'Ball screws', 'Rollers'] },
    ],
  },
  {
    name: 'Titanium Alloys',
    icon: '🟣',
    accentColor: '#c084fc',
    materials: [
      { grade: 'Titanium Ti-6Al-4V (Grade 5)', desc: 'Most widely used titanium alloy. High strength-to-weight ratio for aerospace and medical.', uses: ['Orthopedic implants', 'Aerospace frames', 'Surgical tools'] },
      { grade: 'Titanium Grade 2 (CP)', desc: 'Commercially pure titanium. Superior corrosion resistance, biocompatible.', uses: ['Medical devices', 'Chemical processing', 'Marine'] },
    ],
  },
  {
    name: 'Copper, Brass & Bronze',
    icon: '🟠',
    accentColor: '#fb923c',
    materials: [
      { grade: 'Copper C101', desc: 'High conductivity copper for electrical and thermal applications.', uses: ['Heat sinks', 'Electrical contacts', 'RF components'] },
      { grade: 'Brass C360', desc: 'Free-machining brass. Excellent for precision turned parts and fittings.', uses: ['Connectors', 'Fittings', 'Valves', 'Waveguides'] },
      { grade: 'Phosphor Bronze', desc: 'High fatigue resistance and corrosion resistance. Used in springs and bearings.', uses: ['Springs', 'Bushings', 'Electrical contacts'] },
    ],
  },
  {
    name: 'Superalloys & Specialty',
    icon: '🔴',
    accentColor: '#f87171',
    materials: [
      { grade: 'Inconel 718', desc: 'Nickel superalloy. Exceptional strength and oxidation resistance at high temperatures.', uses: ['Turbine blades', 'Jet engines', 'Energy components'] },
      { grade: 'Hastelloy C-276', desc: 'Nickel-molybdenum alloy with outstanding corrosion resistance in harsh chemicals.', uses: ['Chemical processing', 'Pharma equipment'] },
      { grade: 'Monel 400', desc: 'Copper-nickel alloy with excellent sea water and acid resistance.', uses: ['Marine hardware', 'Valves', 'Pumps'] },
    ],
  },
]

const plasticMaterials = [
  { grade: 'PEEK', desc: 'Highest performance engineering plastic. Chemical resistant, biocompatible, replaces metal.', uses: ['Medical implants', 'Aerospace brackets', 'Chemical valves'] },
  { grade: 'Delrin / POM', desc: 'Excellent dimensional stability, low friction, self-lubricating. Precision parts.', uses: ['Gears', 'Cams', 'Valve bodies'] },
  { grade: 'Nylon 6 / 66', desc: 'Good toughness, impact resistance, wear resistance. Versatile engineering plastic.', uses: ['Gears', 'Bushings', 'Fixtures'] },
  { grade: 'Polycarbonate', desc: 'High impact strength and optical clarity. Excellent for covers and housings.', uses: ['Covers', 'Lenses', 'Electronic housings'] },
  { grade: 'ABS', desc: 'Good impact resistance, easy to machine. Popular for prototyping and enclosures.', uses: ['Prototypes', 'Enclosures', 'Consumer parts'] },
  { grade: 'PTFE (Teflon)', desc: 'Lowest friction coefficient, excellent chemical resistance. Non-stick applications.', uses: ['Seals', 'Bearings', 'Pharma parts'] },
  { grade: 'UHMW-PE', desc: 'Ultra-high molecular weight polyethylene. Extreme wear and impact resistance.', uses: ['Wear plates', 'Chute liners', 'Food processing'] },
  { grade: 'HDPE', desc: 'High-density polyethylene. Lightweight, chemical resistant, food safe.', uses: ['Tanks', 'Piping', 'Food equipment'] },
  { grade: 'Ultem / PEI', desc: 'High heat resistance engineering plastic. Used where PEEK cannot be afforded.', uses: ['Medical trays', 'Aerospace interior'] },
  { grade: 'Garolite / G10', desc: 'Fiberglass epoxy laminate. High dielectric strength for electrical applications.', uses: ['PCB substrates', 'Electrical insulators', 'Jigs'] },
]

const toleranceTable = [
  { feature: 'Standard Tolerance (Metals)', value: '±0.05mm (±0.002")', note: 'General parts' },
  { feature: 'Precision Tolerance (Metals)', value: '±0.01mm (±0.0004")', note: 'Critical fits' },
  { feature: 'Standard Tolerance (Plastics)', value: '±0.1mm (±0.004")', note: 'General parts' },
  { feature: 'Surface Finish (As-Machined)', value: 'Ra 1.6μm (63 μin)', note: 'Default finish' },
  { feature: 'Surface Finish (Fine)', value: 'Ra 0.4μm (16 μin)', note: 'On request' },
  { feature: 'Max VMC Part Size', value: '600 × 400 × 400 mm', note: 'Larger via EDM/Wire Cut' },
  { feature: 'Min Feature Size', value: '0.5mm', note: 'Depends on material' },
  { feature: 'Threads', value: 'M1.6 to M100+', note: 'All standard sizes' },
]

const finishes = [
  { name: 'As-Machined', desc: 'Standard finish. Ra 1.6μm. Tool marks visible. Most economical.' },
  { name: 'Bead Blast', desc: 'Uniform matte texture. Removes tool marks. Good for aesthetics.' },
  { name: 'Anodize Type II', desc: 'Aluminium only. Decorative. Corrosion and wear protection.' },
  { name: 'Hard Anodize (Type III)', desc: 'Aluminium only. Maximum hardness. For harsh environments.' },
  { name: 'Passivation', desc: 'Stainless steel. Removes free iron, improves corrosion resistance.' },
  { name: 'Electropolish', desc: 'Mirror-bright finish on stainless. Pharma-grade GMP requirement.' },
  { name: 'Powder Coat', desc: 'Durable colour coat. Excellent corrosion and UV protection.' },
  { name: 'Chrome / Nickel Plating', desc: 'Decorative and functional plating for wear and corrosion resistance.' },
]

export default function MaterialsPage() {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: 'var(--dark-bg)' }}>
      <Navbar />

      {/* Header */}
      <section className="page-header">
        <div className="container-xl">
          <p className="text-brand-red fw-semibold text-uppercase letter-wide mb-2" style={{ fontSize: '0.9rem' }}>Material Selection</p>
          <h1 className="fw-black text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Machining Materials</h1>
          <p className="text-secondary mb-4" style={{ maxWidth: '560px', fontSize: '1.05rem' }}>
            We machine 40+ metals and engineering plastics — from commodity aluminium to aerospace-grade titanium and Inconel superalloys.
          </p>
          <div className="d-flex flex-wrap gap-2">
            {['Metals: 25+ grades', 'Plastics: 10+ grades', 'Custom materials on request'].map(b => (
              <span key={b} className="badge-status" style={{ background: 'rgba(200,32,46,0.15)', color: '#fca5a5', border: '1px solid rgba(200,32,46,0.3)' }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Tolerance Reference */}
      <section className="py-4" style={{ background: 'rgba(200,32,46,0.06)', borderBottom: '1px solid rgba(200,32,46,0.2)' }}>
        <div className="container-xl">
          <h2 className="text-white fw-bold mb-3" style={{ fontSize: '1rem' }}>Quick Tolerance Reference</h2>
          <div className="table-responsive">
            <table className="table-dark-custom w-100" style={{ fontSize: '0.92rem' }}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Value</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {toleranceTable.map((row) => (
                  <tr key={row.feature}>
                    <td className="text-white fw-medium">{row.feature}</td>
                    <td style={{ color: 'var(--brand-red)', fontWeight: 600 }}>{row.value}</td>
                    <td className="text-muted">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Metal Materials */}
      <section className="section-py" style={{ background: 'var(--dark-surface)' }}>
        <div className="container-xl">
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="rounded d-flex align-items-center justify-content-center text-white fw-bold" style={{ width: 32, height: 32, background: 'var(--dark-elevated)', border: '1px solid var(--dark-border)', fontSize: '0.95rem' }}>M</div>
            <h2 className="text-white fw-bold mb-0" style={{ fontSize: '1.4rem' }}>Metal Materials</h2>
          </div>
          <div className="d-flex flex-column gap-4">
            {metalGroups.map((group) => (
              <div key={group.name} className="dark-card p-4" style={{ borderColor: group.accentColor + '44' }}>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <span style={{ fontSize: '1.5rem' }}>{group.icon}</span>
                  <h3 className="text-white fw-bold mb-0" style={{ fontSize: '1rem' }}>{group.name}</h3>
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}>{group.materials.length} grades</span>
                </div>
                <div className="row g-3">
                  {group.materials.map((mat) => (
                    <div key={mat.grade} className="col-sm-6 col-lg-4">
                      <div className="p-3 rounded h-100" style={{ background: 'var(--dark-elevated)', border: '1px solid var(--dark-border)' }}>
                        <div className="text-white fw-semibold mb-1" style={{ fontSize: '0.95rem' }}>{mat.grade}</div>
                        <p className="text-muted mb-2" style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{mat.desc}</p>
                        <div className="d-flex flex-wrap gap-1">
                          {mat.uses.map((use) => (
                            <span key={use} className="capability-chip" style={{ fontSize: '0.8rem', color: group.accentColor, background: group.accentColor + '18', borderColor: group.accentColor + '33' }}>{use}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Plastics */}
      <section className="section-py" style={{ background: 'var(--dark-bg)' }}>
        <div className="container-xl">
          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="rounded d-flex align-items-center justify-content-center text-white fw-bold" style={{ width: 32, height: 32, background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', fontSize: '0.95rem', color: '#4ade80' }}>P</div>
            <h2 className="text-white fw-bold mb-0" style={{ fontSize: '1.4rem' }}>Engineering Plastics</h2>
          </div>
          <div className="row g-3">
            {plasticMaterials.map((mat) => (
              <div key={mat.grade} className="col-sm-6 col-lg-3">
                <div className="dark-card p-3 h-100" style={{ borderColor: 'rgba(74,222,128,0.2)' }}>
                  <div className="text-white fw-semibold mb-1" style={{ fontSize: '0.95rem' }}>{mat.grade}</div>
                  <p className="text-muted mb-2" style={{ fontSize: '0.85rem', lineHeight: 1.5 }}>{mat.desc}</p>
                  <div className="d-flex flex-wrap gap-1">
                    {mat.uses.map((use) => (
                      <span key={use} className="capability-chip" style={{ fontSize: '0.8rem', color: '#4ade80', background: 'rgba(74,222,128,0.1)', borderColor: 'rgba(74,222,128,0.25)' }}>{use}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Surface Finishes */}
      <section className="section-py" style={{ background: 'var(--dark-surface)' }}>
        <div className="container-xl">
          <h2 className="text-white fw-bold mb-4" style={{ fontSize: '1.4rem' }}>Surface Finishes Available</h2>
          <div className="row g-3">
            {finishes.map((finish) => (
              <div key={finish.name} className="col-sm-6 col-lg-3">
                <div className="dark-card p-3 h-100">
                  <div className="text-white fw-semibold mb-1" style={{ fontSize: '0.95rem' }}>{finish.name}</div>
                  <p className="text-muted mb-0" style={{ fontSize: '0.88rem', lineHeight: 1.5 }}>{finish.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py cta-red text-white">
        <div className="container-xl text-center">
          <h2 className="fw-black text-white mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>Need a Specific Material or Grade?</h2>
          <p className="mb-5 mx-auto" style={{ opacity: 0.85, maxWidth: '480px' }}>
            We can source and machine exotic alloys and specialty plastics on request. Contact our team.
          </p>
          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <Link href="/dashboard/rfq/new" className="btn-ghost-white" style={{ background: 'white' }}>
              <span style={{ color: 'var(--brand-red)', fontWeight: 800 }}>Get a Quote</span>
            </Link>
            <Link href="/contact" className="btn-ghost-white">Contact Engineers</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
