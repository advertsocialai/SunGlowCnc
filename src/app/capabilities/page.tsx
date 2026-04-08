import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const capabilityTable = [
  {
    service: 'CNC VMC Milling (3-Axis)',
    leadTime: '3–7 working days',
    materials: 'Metals & Plastics',
    tolerance: '±0.05mm standard / ±0.01mm precision',
    maxSize: '600 × 400 × 400 mm',
    machines: '3 VMC machines',
  },
  {
    service: 'CNC Turning / Lathe',
    leadTime: '3–7 working days',
    materials: 'Metals & Plastics',
    tolerance: '±0.01mm',
    maxSize: 'Ø300mm × 600mm L',
    machines: '1 CNC Lathe',
  },
  {
    service: 'Wire Cut EDM',
    leadTime: '5–10 working days',
    materials: 'All conductive metals',
    tolerance: '±0.005mm',
    maxSize: '400 × 300 × 200 mm',
    machines: '1 Wire Cut EDM',
  },
  {
    service: 'Die Sinking EDM',
    leadTime: '5–10 working days',
    materials: 'Hardened steels, carbide',
    tolerance: '±0.01mm',
    maxSize: '300 × 200 × 200 mm',
    machines: '1 EDM Machine',
  },
  {
    service: 'Conventional Machining',
    leadTime: '2–5 working days',
    materials: 'Metals',
    tolerance: '±0.1mm',
    maxSize: 'Varies',
    machines: 'Full conventional setup',
  },
]

const machiningFAQ = [
  {
    q: 'What is CNC machining?',
    a: 'CNC (Computer Numerical Control) machining uses automated high-speed cutting tools guided by digital programs (G-code) to precisely shape metal or plastic from raw stock. It is highly accurate, repeatable, and suitable for both prototypes and production runs.',
  },
  {
    q: 'What tolerances can you achieve?',
    a: 'Standard CNC milling achieves ±0.05mm for metals. For precision fits, bores, and critical dimensions, we achieve ±0.01mm. Wire Cut EDM reaches ±0.005mm for hardened materials. All tolerances are inspection-verified.',
  },
  {
    q: 'What is the minimum order quantity?',
    a: 'We accept orders from 1 piece (prototype) to large production batches. There is no minimum order quantity — we serve both one-off prototypes for T-Works startups and repeat bulk orders for Bharat Biotech and BEL.',
  },
  {
    q: 'Do you accept CAD files?',
    a: 'Yes. We accept STEP, STP, IGES, DXF, DWG, and PDF drawing files. Upload your file with your RFQ and our engineers will review and confirm manufacturability within 24 hours.',
  },
  {
    q: 'What surface finishes are available?',
    a: 'As-machined (Ra 1.6μm), bead blast, anodize Type II/III, hard anodize, passivation, electropolish, powder coat, chrome/nickel plating, and custom finishes. See our Materials page for a full list.',
  },
  {
    q: 'Can you machine hardened steel?',
    a: 'Yes. Our Wire Cut EDM and Die Sinking EDM machines work with hardened steels (H13, D2, EN31 etc.) up to 60+ HRC. This is essential for mould cavities, punches, and tool room applications.',
  },
  {
    q: 'Do you provide quality inspection reports?',
    a: 'Yes. We provide dimensional inspection using precision measuring instruments. For critical pharma and defence components, we provide full inspection reports with material certificates.',
  },
  {
    q: 'What industries do you serve?',
    a: 'Pharma (Bharat Biotech, Sanofi, Gland Pharma), Defence (BEL, ECIL, BHEL, Avantel), Technology (Zen Technologies, T-Works), EV/Automotive, Medical, Aerospace, Energy, and Robotics.',
  },
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
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-wider mb-2">Technical Specifications</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Machining Capabilities</h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            Complete specifications for our CNC machining services — tolerances, lead times, part sizes, and design guidelines.
          </p>
          <div className="flex flex-wrap gap-2">
            {['±0.01mm Precision', 'Pharma-Grade Finishing', 'Defence-Certified QC', 'CAD File Support'].map((badge) => (
              <span key={badge} className="bg-orange-600/30 border border-orange-500/40 text-orange-300 text-sm px-4 py-1.5 rounded-full">{badge}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Capability Comparison Table */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Service Capabilities at a Glance</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-5 py-4 text-left text-sm font-semibold">Service</th>
                  <th className="px-5 py-4 text-left text-sm font-semibold">Lead Time</th>
                  <th className="px-5 py-4 text-left text-sm font-semibold">Tolerance</th>
                  <th className="px-5 py-4 text-left text-sm font-semibold">Max Part Size</th>
                  <th className="px-5 py-4 text-left text-sm font-semibold">Equipment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {capabilityTable.map((row, i) => (
                  <tr key={row.service} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900 text-sm">{row.service}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{row.materials}</div>
                    </td>
                    <td className="px-5 py-4 text-sm text-orange-700 font-medium">{row.leadTime}</td>
                    <td className="px-5 py-4 text-sm text-slate-700 font-semibold">{row.tolerance}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.maxSize}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{row.machines}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-3">* Lead times are estimates and may vary based on complexity and current capacity. Contact us for urgent orders.</p>
        </div>
      </section>

      {/* Design Guidelines */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Design for Manufacturability (DFM) Guidelines</h2>
          <p className="text-slate-600 mb-8">
            Following these guidelines helps reduce machining cost, improve part quality, and speed up delivery.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {designGuidelines.map((g) => (
              <div key={g.rule} className="bg-white rounded-xl p-5 shadow-sm flex gap-4">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">{g.rule}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-5">
            <p className="text-sm text-orange-800">
              <strong>Free DFM Review:</strong> Upload your CAD file with your RFQ and our engineers will review your design for manufacturability and suggest cost-saving optimizations at no charge.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {machiningFAQ.map((item) => (
              <div key={item.q} className="bg-slate-50 rounded-xl p-5">
                <h3 className="font-semibold text-slate-900 mb-2 text-sm">{item.q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-black">Ready to Start Your Project?</h2>
            <p className="text-orange-100 text-sm mt-1">Upload your design and get a quote in 24 hours.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/rfq/new" className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-3 px-6 rounded-lg transition-colors whitespace-nowrap">
              Get Instant Quote
            </Link>
            <Link href="/contact" className="border border-white/50 text-white hover:bg-white/10 font-bold py-3 px-6 rounded-lg transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
