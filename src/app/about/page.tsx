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
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-brand-navy-800 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-red-400 text-sm font-semibold uppercase tracking-wider mb-2">Our Story</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">A Legacy of Precision</h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Since 2003, Sunglow CNC Technics has been the trusted manufacturing partner for India&apos;s most
            critical industries — from pharmaceutical to defence.
          </p>
        </div>
      </section>

      {/* Facility photo strip */}
      <section className="bg-white">
        <div className="grid grid-cols-3 h-56 overflow-hidden">
          {[
            { src: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=600&q=80&fit=crop', alt: 'CNC milling in progress' },
            { src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80&fit=crop', alt: 'Industrial machining facility' },
            { src: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80&fit=crop', alt: 'Precision machined components' },
          ].map((img) => (
            <div key={img.src} className="relative overflow-hidden">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-brand-navy-800/20" />
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Starting in 2003, we set out to be the leading precision manufacturer for demanding industries
                that require zero-compromise quality and reliability. Two decades later, we continue to deliver
                on that promise.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                We believe that manufacturing is not just about cutting metal — it is about enabling breakthroughs
                in pharma, protecting national security through defence hardware, accelerating the EV revolution,
                and pushing the boundaries of robotics and aerospace.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: '20+', label: 'Years in Business' },
                  { val: '10+', label: 'Client Industries' },
                  { val: '500+', label: 'Projects Completed' },
                  { val: '5', label: 'Machine Types' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-brand-red-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-black text-brand-red-600">{stat.val}</div>
                    <div className="text-xs text-slate-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-brand-navy-800 rounded-2xl p-8 text-white">
              <h3 className="text-lg font-bold text-brand-red-400 mb-6 uppercase tracking-wider">Our Values</h3>
              <div className="space-y-5">
                {values.map((v) => (
                  <div key={v.title} className="flex gap-4">
                    <span className="text-2xl flex-shrink-0">{v.icon}</span>
                    <div>
                      <h4 className="font-semibold text-white">{v.title}</h4>
                      <p className="text-sm text-slate-400 mt-1">{v.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Machinery */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title">Our Facility & Machinery</h2>
            <p className="section-subtitle">Complete in-house manufacturing capability — no outsourcing</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {machinery.map((m) => (
              <div key={m.name} className="card p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-brand-red-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-brand-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="bg-brand-red-100 text-brand-red-700 font-bold text-sm px-3 py-1 rounded-full">
                    ×{m.qty}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{m.name}</h3>
                <p className="text-sm text-slate-600 mb-3">{m.detail}</p>
                <p className="text-xs text-brand-red-600 font-medium bg-brand-red-50 px-3 py-1.5 rounded-lg">
                  {m.capability}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-brand-red-200" />
            <div className="space-y-6">
              {milestones.map((m) => (
                <div key={m.year} className="flex gap-6 pl-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 bg-brand-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold z-10 relative">
                      ●
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl px-5 py-4 flex-1 -mt-1">
                    <span className="text-brand-red-600 font-black text-sm">{m.year}</span>
                    <p className="text-slate-700 text-sm mt-1">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black mb-4">Ready to Work With Us?</h2>
          <p className="text-brand-red-100 mb-6">20 years of precision — and we&apos;re just getting started.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-brand-red-600 hover:bg-brand-red-50 font-bold py-3 px-8 rounded-lg transition-colors">
              Contact Us
            </Link>
            <Link href="/register" className="border-2 border-white/50 text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg transition-colors">
              Request Quote
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
