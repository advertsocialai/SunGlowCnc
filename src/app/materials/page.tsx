import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const metalGroups = [
  {
    name: 'Aluminium Alloys',
    icon: '🔵',
    color: 'bg-blue-50 border-blue-200',
    tagColor: 'bg-blue-100 text-blue-800',
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
    color: 'bg-slate-50 border-slate-200',
    tagColor: 'bg-slate-100 text-slate-700',
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
    color: 'bg-amber-50 border-amber-200',
    tagColor: 'bg-amber-100 text-amber-800',
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
    color: 'bg-purple-50 border-purple-200',
    tagColor: 'bg-purple-100 text-purple-800',
    materials: [
      { grade: 'Titanium Ti-6Al-4V (Grade 5)', desc: 'Most widely used titanium alloy. High strength-to-weight ratio for aerospace and medical.', uses: ['Orthopedic implants', 'Aerospace frames', 'Surgical tools'] },
      { grade: 'Titanium Grade 2 (CP)', desc: 'Commercially pure titanium. Superior corrosion resistance, biocompatible.', uses: ['Medical devices', 'Chemical processing', 'Marine'] },
    ],
  },
  {
    name: 'Copper, Brass & Bronze',
    icon: '🟠',
    color: 'bg-brand-red-50 border-brand-red-200',
    tagColor: 'bg-brand-red-100 text-brand-red-800',
    materials: [
      { grade: 'Copper C101', desc: 'High conductivity copper for electrical and thermal applications.', uses: ['Heat sinks', 'Electrical contacts', 'RF components'] },
      { grade: 'Brass C360', desc: 'Free-machining brass. Excellent for precision turned parts and fittings.', uses: ['Connectors', 'Fittings', 'Valves', 'Waveguides'] },
      { grade: 'Phosphor Bronze', desc: 'High fatigue resistance and corrosion resistance. Used in springs and bearings.', uses: ['Springs', 'Bushings', 'Electrical contacts'] },
    ],
  },
  {
    name: 'Superalloys & Specialty',
    icon: '🔴',
    color: 'bg-red-50 border-red-200',
    tagColor: 'bg-red-100 text-red-800',
    materials: [
      { grade: 'Inconel 718', desc: 'Nickel superalloy. Exceptional strength and oxidation resistance at high temperatures.', uses: ['Turbine blades', 'Jet engines', 'Energy components'] },
      { grade: 'Hastelloy C-276', desc: 'Nickel-molybdenum alloy with outstanding corrosion resistance in harsh chemicals.', uses: ['Chemical processing', 'Pharma equipment'] },
      { grade: 'Monel 400', desc: 'Copper-nickel alloy with excellent sea water and acid resistance.', uses: ['Marine hardware', 'Valves', 'Pumps'] },
    ],
  },
]

const plasticGroups = [
  {
    name: 'Engineering Plastics',
    materials: [
      { grade: 'PEEK', desc: 'Highest performance engineering plastic. Chemical resistant, biocompatible, replaces metal.', uses: ['Medical implants', 'Aerospace brackets', 'Chemical valves'] },
      { grade: 'Delrin / POM (Acetal)', desc: 'Excellent dimensional stability, low friction, self-lubricating. Precision parts.', uses: ['Gears', 'Cams', 'Valve bodies', 'Bearings'] },
      { grade: 'Nylon 6 / Nylon 66', desc: 'Good toughness, impact resistance, wear resistance. Versatile engineering plastic.', uses: ['Gears', 'Bushings', 'Fixtures', 'Structural parts'] },
      { grade: 'Polycarbonate (PC)', desc: 'High impact strength and optical clarity. Excellent for covers and housings.', uses: ['Covers', 'Lenses', 'Electronic housings'] },
      { grade: 'ABS', desc: 'Good impact resistance, easy to machine. Popular for prototyping and enclosures.', uses: ['Prototypes', 'Enclosures', 'Consumer parts'] },
      { grade: 'PTFE (Teflon)', desc: 'Lowest friction coefficient, excellent chemical resistance. Non-stick applications.', uses: ['Seals', 'Bearings', 'Chemical vessels', 'Pharma parts'] },
      { grade: 'UHMW-PE', desc: 'Ultra-high molecular weight polyethylene. Extreme wear and impact resistance.', uses: ['Wear plates', 'Chute liners', 'Food processing'] },
      { grade: 'HDPE', desc: 'High-density polyethylene. Lightweight, chemical resistant, food safe.', uses: ['Tanks', 'Piping', 'Food equipment'] },
      { grade: 'Ultem / PEI', desc: 'High heat resistance engineering plastic. Used where PEEK cannot be afforded.', uses: ['Medical trays', 'Aerospace interior', 'Electronic parts'] },
      { grade: 'Garolite / G10', desc: 'Fiberglass epoxy laminate. High dielectric strength for electrical applications.', uses: ['PCB substrates', 'Electrical insulators', 'Jigs'] },
    ],
  },
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

export default function MaterialsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header Banner */}
      <section className="bg-gradient-to-r from-brand-navy-800 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-red-400 text-sm font-semibold uppercase tracking-wider mb-2">Material Selection</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Machining Materials</h1>
          <p className="text-lg text-slate-300 max-w-2xl mb-6">
            We machine 40+ metals and engineering plastics — from commodity aluminium to aerospace-grade titanium and Inconel superalloys.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="bg-brand-red-600/30 border border-brand-red-500/40 text-brand-red-300 text-sm px-4 py-1.5 rounded-full">Metals: 25+ grades</span>
            <span className="bg-brand-red-600/30 border border-brand-red-500/40 text-brand-red-300 text-sm px-4 py-1.5 rounded-full">Plastics: 10+ grades</span>
            <span className="bg-brand-red-600/30 border border-brand-red-500/40 text-brand-red-300 text-sm px-4 py-1.5 rounded-full">Custom materials on request</span>
          </div>
        </div>
      </section>

      {/* Tolerance Reference */}
      <section className="bg-brand-red-50 border-b border-brand-red-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Tolerance Reference</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white">
                  <th className="px-4 py-2.5 text-left font-semibold text-slate-700 border border-slate-200">Feature</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-slate-700 border border-slate-200">Value</th>
                  <th className="px-4 py-2.5 text-left font-semibold text-slate-700 border border-slate-200">Note</th>
                </tr>
              </thead>
              <tbody>
                {toleranceTable.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-brand-red-50/50'}>
                    <td className="px-4 py-2 text-slate-800 border border-slate-200 font-medium">{row.feature}</td>
                    <td className="px-4 py-2 text-brand-red-700 border border-slate-200 font-semibold">{row.value}</td>
                    <td className="px-4 py-2 text-slate-500 border border-slate-200">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Metal Materials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">M</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Metal Materials</h2>
          </div>
          <div className="space-y-8">
            {metalGroups.map((group) => (
              <div key={group.name} className={`rounded-2xl border-2 ${group.color} p-6`}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{group.icon}</span>
                  <h3 className="text-xl font-bold text-slate-900">{group.name}</h3>
                  <span className="text-xs text-slate-500">{group.materials.length} grades</span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.materials.map((mat) => (
                    <div key={mat.grade} className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="font-bold text-slate-900 text-sm mb-1">{mat.grade}</div>
                      <p className="text-xs text-slate-600 mb-3 leading-relaxed">{mat.desc}</p>
                      <div className="flex flex-wrap gap-1">
                        {mat.uses.map((use) => (
                          <span key={use} className={`text-xs px-2 py-0.5 rounded ${group.tagColor}`}>{use}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plastic Materials */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">P</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Engineering Plastics</h2>
          </div>
          {plasticGroups.map((group) => (
            <div key={group.name}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {group.materials.map((mat) => (
                  <div key={mat.grade} className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
                    <div className="font-bold text-slate-900 text-sm mb-1">{mat.grade}</div>
                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">{mat.desc}</p>
                    <div className="flex flex-wrap gap-1">
                      {mat.uses.map((use) => (
                        <span key={use} className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800">{use}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Finishes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Surface Finishes Available</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'As-Machined', desc: 'Standard finish. Ra 1.6μm. Tool marks visible. Most economical.', color: 'bg-slate-50' },
              { name: 'Bead Blast', desc: 'Uniform matte texture. Removes tool marks. Good for aesthetics.', color: 'bg-slate-50' },
              { name: 'Anodize Type II', desc: 'Aluminium only. Decorative. Corrosion and wear protection.', color: 'bg-blue-50' },
              { name: 'Hard Anodize (Type III)', desc: 'Aluminium only. Maximum hardness and wear resistance. For harsh environments.', color: 'bg-blue-50' },
              { name: 'Passivation', desc: 'Stainless steel. Removes free iron, improves corrosion resistance. Pharma/medical standard.', color: 'bg-green-50' },
              { name: 'Electropolish', desc: 'Mirror-bright finish on stainless. Pharma-grade GMP requirement. Reduces bacterial adhesion.', color: 'bg-green-50' },
              { name: 'Powder Coat', desc: 'Durable colour coat. Excellent corrosion and UV protection. Many colours.', color: 'bg-yellow-50' },
              { name: 'Chrome / Nickel Plating', desc: 'Decorative and functional plating for wear and corrosion resistance.', color: 'bg-brand-red-50' },
            ].map((finish) => (
              <div key={finish.name} className={`${finish.color} rounded-xl p-4 border border-slate-200`}>
                <div className="font-bold text-slate-900 text-sm mb-2">{finish.name}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{finish.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-brand-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-black mb-3">Need a Specific Material or Grade?</h2>
          <p className="text-brand-red-100 mb-5 text-sm">We can source and machine exotic alloys and specialty plastics on request. Contact our team.</p>
          <div className="flex justify-center gap-3">
            <Link href="/dashboard/rfq/new" className="bg-white text-brand-red-600 hover:bg-brand-red-50 font-bold py-2.5 px-6 rounded-lg transition-colors text-sm">
              Get a Quote
            </Link>
            <Link href="/contact" className="border border-white/50 text-white hover:bg-white/10 font-bold py-2.5 px-6 rounded-lg transition-colors text-sm">
              Contact Engineers
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
