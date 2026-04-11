import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const industries = [
  {
    name: 'Aerospace',
    icon: '✈',
    color: 'from-sky-500 to-blue-700',
    components: [
      { title: 'Airframe Structural Components', desc: 'Lightweight, high-strength brackets and mounts with complex geometry milled from aerospace-grade aluminum alloys.' },
      { title: 'Complex Manifolds', desc: 'Intricate fluid and gas flow components with high-tolerance drilling and precision-bored passages.' },
    ],
    materials: ['Aluminum 7075-T6', 'Titanium Ti-6Al-4V', 'Stainless Steel 17-4 PH'],
  },
  {
    name: 'Automobile & EV',
    icon: '⚡',
    color: 'from-yellow-500 to-brand-red-600',
    components: [
      { title: 'EV Battery Casings', desc: 'Precision-machined battery enclosures with thermal management features for electric vehicles.' },
      { title: 'Engine & Powertrain Parts', desc: 'Connecting rods, transmission components, and housing machined to tight tolerances.' },
      { title: 'Heat Sinks', desc: 'High-performance thermal management components for EV power electronics and battery systems.' },
      { title: 'Alloy Wheel Prototypes', desc: 'Detailed aesthetic and structural machining for wheel hubs and spoke designs.' },
    ],
    materials: ['Aluminum 6061-T6', 'Cast Iron', 'Steel 4340'],
  },
  {
    name: 'Die & Mould',
    icon: '🔧',
    color: 'from-slate-500 to-slate-700',
    components: [
      { title: 'Textured Mould Plates', desc: 'High-detail surface texturing for plastic and rubber moulding applications.' },
      { title: 'Cavity & Core Inserts', desc: 'Precision 3D contouring for complex injection moulding dies with mirror-finish surfaces.' },
    ],
    materials: ['P20 Tool Steel', 'H13 Steel', 'D2 Steel', 'Stainless 420'],
  },
  {
    name: 'Electronics',
    icon: '💻',
    color: 'from-indigo-500 to-purple-700',
    components: [
      { title: 'Consumer Device Housing', desc: 'Finished aluminum casings for smartphones and tablets — iPhone-style precision milling.' },
      { title: 'Heat Sinks & Connector Blocks', desc: 'Multi-ported electronic housings and thermal management components.' },
    ],
    materials: ['Aluminum 6063', 'Copper', 'Stainless Steel 304'],
  },
  {
    name: 'Energy & Turbine',
    icon: '⚙',
    color: 'from-green-500 to-emerald-700',
    components: [
      { title: 'Turbine Blades', desc: 'High-precision aerodynamic profiles for power generation with complex 3D curved surfaces.' },
      { title: 'Stator & Rotor Components', desc: 'Durable components designed for high-stress, high-temperature energy environments.' },
    ],
    materials: ['Inconel 718', 'Stainless Steel 316', 'Titanium alloys'],
  },
  {
    name: 'Pharma & Medical',
    icon: '💊',
    color: 'from-teal-500 to-cyan-700',
    components: [
      { title: 'Star Wheels & Guides', desc: 'Precision star wheels and linear guides for pharmaceutical filling machines.' },
      { title: 'Surgical Instrumentation', desc: 'Specialized guide rails and tools with clinical-grade electro-polished finishes.' },
      { title: 'Orthopedic Implants', desc: 'Biocompatible structural components with complex geometry in Ti-6Al-4V and SS 316L.' },
      { title: 'Filling & Washing Needles', desc: 'High-precision needles for pharmaceutical filling operations — GMP compliant.' },
    ],
    materials: ['SS 316L', 'Titanium Ti-6Al-4V', 'PEEK', 'Hastelloy'],
  },
  {
    name: 'Defence & Government',
    icon: '🛡',
    color: 'from-red-600 to-rose-800',
    components: [
      { title: 'Microwave Systems Hardware', desc: 'Precision waveguide components and housings for microwave communication systems (Avantel).' },
      { title: 'Cell Jammer Components', desc: 'Critical RF hardware components for electronic warfare and jamming systems.' },
      { title: 'BEL & ECIL Components', desc: 'High-reliability precision parts for Bharat Electronics Limited and ECIL systems.' },
    ],
    materials: ['Aluminum alloys', 'Brass', 'Copper', 'PTFE', 'Stainless Steel'],
  },
  {
    name: 'Industrial Production',
    icon: '🏭',
    color: 'from-brand-red-500 to-amber-700',
    components: [
      { title: 'Engine Block Casings', desc: 'Heavy-duty, multi-axis machined cylinder heads and gearbox housings.' },
      { title: 'Mechanical Housing', desc: 'Rugged enclosures for industrial machinery with complex bore patterns.' },
    ],
    materials: ['Cast Iron', 'Ductile Iron', 'Carbon Steel', 'Stainless Steel'],
  },
  {
    name: 'Tool Room',
    icon: '🔩',
    color: 'from-zinc-500 to-zinc-700',
    components: [
      { title: 'Custom Jigs & Fixtures', desc: 'Precision-aligned tooling for manufacturing assembly lines and QC operations.' },
      { title: 'Multi-Point Cutting Tools', desc: 'High-hardness tool holders and specialized machining bits for production use.' },
    ],
    materials: ['HSS', 'Carbide', 'Tool Steel D2/H13', 'EN31'],
  },
  {
    name: 'Robotics & Drones',
    icon: '🤖',
    color: 'from-violet-500 to-purple-700',
    components: [
      { title: 'Drone Frame Components', desc: 'Lightweight structural frames and mounts for UAV systems — carbon fibre compatible.' },
      { title: 'Robotic Actuator Parts', desc: 'Precision actuator bodies, motor mounts, and gear housings for industrial robots.' },
    ],
    materials: ['Aluminum 7075', 'Titanium', 'CFRP inserts', 'Stainless Steel'],
  },
]

export default function IndustriesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-brand-navy-800 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-red-400 text-sm font-semibold uppercase tracking-wider mb-2">Sectors We Serve</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Industries</h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            From pharmaceutical precision to aerospace engineering — our VMC capabilities cover the most demanding industrial sectors.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {industries.map((ind) => (
              <div key={ind.name} className="card overflow-hidden">
                {/* Header bar */}
                <div className={`bg-gradient-to-r ${ind.color} p-5 flex items-center gap-4`}>
                  <div className="text-4xl">{ind.icon}</div>
                  <h2 className="text-xl font-bold text-white">{ind.name}</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4 mb-5">
                    {ind.components.map((comp) => (
                      <div key={comp.title}>
                        <h4 className="font-semibold text-slate-900 text-sm">{comp.title}</h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{comp.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">Materials</p>
                    <div className="flex flex-wrap gap-1.5">
                      {ind.materials.map((m) => (
                        <span key={m} className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black mb-4">Don&apos;t See Your Industry?</h2>
          <p className="text-brand-red-100 mb-6">
            Our capabilities extend beyond the listed sectors. Contact us with your requirements.
          </p>
          <Link href="/contact" className="bg-white text-brand-red-600 hover:bg-brand-red-50 font-bold py-3 px-8 rounded-lg transition-colors inline-block">
            Talk to Our Engineers
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
