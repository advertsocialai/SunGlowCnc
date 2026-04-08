import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const industries = [
  { name: 'Aerospace', icon: '✈', desc: 'Structural brackets, manifolds, high-tolerance drilling' },
  { name: 'Automobile & EV', icon: '⚡', desc: 'EV battery casings, heat sinks, transmission parts' },
  { name: 'Pharma & Medical', icon: '💊', desc: 'Star wheels, filling needles, orthopedic implants' },
  { name: 'Defence', icon: '🛡', desc: 'Microwave hardware, cell jammers, BEL/ECIL components' },
  { name: 'Die & Mould', icon: '🔧', desc: 'Cavity inserts, textured mold plates, 3D contouring' },
  { name: 'Energy & Turbine', icon: '⚙', desc: 'Turbine blades, stator/rotor, high-stress components' },
  { name: 'Robotics & Drones', icon: '🤖', desc: 'Precision structural and motion components' },
  { name: 'Tool Room', icon: '🔩', desc: 'Custom jigs, fixtures, multi-point cutting tools' },
]

const clients = [
  { name: 'Bharat Biotech', sector: 'Pharma' },
  { name: 'Sanofi', sector: 'Pharma' },
  { name: 'Gland Pharma', sector: 'Pharma' },
  { name: 'ICLEAN', sector: 'Pharma' },
  { name: 'BEL', sector: 'Defence' },
  { name: 'ECIL', sector: 'Defence' },
  { name: 'BHEL', sector: 'Defence' },
  { name: 'Avantel Limited', sector: 'Defence' },
  { name: 'Zen Technologies', sector: 'Technology' },
  { name: 'T-Works Hub', sector: 'Technology' },
]

const stats = [
  { value: '20+', label: 'Years Experience' },
  { value: '500+', label: 'Projects Delivered' },
  { value: '10+', label: 'Industry Sectors' },
  { value: '3', label: 'CNC VMC Machines' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-600 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-orange-600/20 border border-orange-500/30 text-orange-300 text-sm px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              Precision Engineering Since 2003
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              Precision CNC
              <span className="text-orange-500"> Manufacturing</span>
              <br />Solutions
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              Delivering high-quality machined components for Pharma, Defence, Aerospace, EV & Robotics industries.
              Trusted by India&apos;s leading organizations for over 20 years.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="btn-primary text-base">
                Request a Quote
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/services" className="btn-secondary text-base border-slate-400 text-slate-300 hover:border-orange-500 hover:text-white">
                Our Capabilities
              </Link>
            </div>
          </div>
        </div>
        {/* Stats bar */}
        <div className="relative border-t border-slate-700/50 bg-slate-900/50 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-black text-orange-500">{stat.value}</div>
                  <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Industries We Serve</h2>
            <p className="section-subtitle">
              Precision-machined components for the most demanding sectors
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((ind) => (
              <div key={ind.name} className="card p-6 group hover:border-l-4 hover:border-orange-500 transition-all">
                <div className="text-4xl mb-3">{ind.icon}</div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{ind.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/industries" className="btn-primary">
              View All Capabilities
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-title mb-6">Why Sunglow CNC?</h2>
              <div className="space-y-5">
                {[
                  { title: '20+ Years of Expertise', desc: 'Since 2003, we have served India\'s most demanding industries with unwavering quality.' },
                  { title: 'Advanced Machinery', desc: '3 VMC Milling Machines + CNC Lathe, Wire Cut & EDM — complete in-house capabilities.' },
                  { title: 'Tight Tolerances', desc: 'Achieve precision down to ±0.01mm for critical pharma, defence, and aerospace components.' },
                  { title: 'Trusted by Industry Leaders', desc: 'Long-term partnerships with Bharat Biotech, BEL, BHEL, Sanofi, Gland Pharma, and more.' },
                  { title: 'Multi-Industry Expertise', desc: 'From pharma fills to microwave defence hardware — we manufacture across 8+ sectors.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6 text-orange-400">Our Machinery</h3>
              <div className="space-y-4">
                {[
                  { machine: 'CNC VMC Milling Machines', count: '3 Units', detail: 'Vertical Machining Centers' },
                  { machine: 'CNC Lathe', count: '1 Unit', detail: 'Precision turning' },
                  { machine: 'Wire Cut EDM', count: '1 Unit', detail: 'Complex contour cutting' },
                  { machine: 'EDM Machine', count: '1 Unit', detail: 'Electrical discharge machining' },
                  { machine: 'Conventional Setup', count: 'Full Set', detail: 'Milling, turning, grinding' },
                ].map((m) => (
                  <div key={m.machine} className="flex justify-between items-center border-b border-slate-700 pb-3">
                    <div>
                      <div className="font-medium text-sm">{m.machine}</div>
                      <div className="text-xs text-slate-400">{m.detail}</div>
                    </div>
                    <span className="bg-orange-600/30 text-orange-300 text-xs px-3 py-1 rounded-full font-semibold">
                      {m.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Trusted by Industry Leaders</h2>
            <p className="section-subtitle">
              Proudly serving leading organizations across India for 20+ years
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {clients.map((client) => (
              <div
                key={client.name}
                className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow border border-slate-100"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-slate-600 font-bold text-lg">{client.name[0]}</span>
                </div>
                <div className="font-semibold text-slate-800 text-sm">{client.name}</div>
                <div className="text-xs text-orange-600 mt-1">{client.sector}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/clients" className="btn-primary">
              View All Partners
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
            Upload your design files and receive a detailed quote within 24 hours.
            Our engineering team is ready to deliver precision components for your industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              Request a Quote
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white/50 text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
