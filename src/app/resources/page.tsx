import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const guides = [
  {
    category: 'Design Guides',
    icon: '📐',
    color: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-blue-100',
    items: [
      { title: 'CNC Machining Design Guide', desc: 'Complete guide to designing parts for CNC milling and turning — tolerances, fillets, threads, and cost tips.', tag: 'Essential' },
      { title: 'Material Selection Guide', desc: 'How to choose the right metal or plastic for your application — strength, corrosion, temperature, and machinability.', tag: 'Beginner' },
      { title: 'Surface Finish Reference', desc: 'When to specify Ra values, which finishes work for pharma vs defence vs industrial applications.', tag: 'Reference' },
      { title: 'GD&T Quick Reference', desc: 'Practical guide to Geometric Dimensioning & Tolerancing symbols used on engineering drawings.', tag: 'Reference' },
    ],
  },
  {
    category: 'Industry Guides',
    icon: '🏭',
    color: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-100',
    items: [
      { title: 'Pharma Component Manufacturing', desc: 'GMP requirements, materials (SS316L, PEEK), surface finish standards for filling machines and fermenters.', tag: 'Pharma' },
      { title: 'Defence & Aerospace Machining', desc: 'AS9100 compliance, material traceability, and precision requirements for defence-grade components.', tag: 'Defence' },
      { title: 'EV Battery Casing Guide', desc: 'Design considerations for EV battery enclosures — thermal management, sealing, weight, and material selection.', tag: 'EV/Auto' },
      { title: 'Medical Device Machining Guide', desc: 'ISO 13485 requirements, biocompatible materials, and clinical-grade finishes for surgical and implant components.', tag: 'Medical' },
    ],
  },
  {
    category: 'Technical References',
    icon: '📊',
    color: 'bg-purple-50 border-purple-200',
    iconBg: 'bg-purple-100',
    items: [
      { title: 'Standard Thread Reference Chart', desc: 'Complete M-series metric, UNC and UNF thread dimensions, pitch, and drill sizes for machined holes.', tag: 'Reference' },
      { title: 'Material Hardness Conversion Chart', desc: 'HRC, HRB, HV, HB hardness conversions for all common tool steels and engineering metals.', tag: 'Reference' },
      { title: 'Tolerance & Fits Guide (ISO 286)', desc: 'Running fits, transition fits, interference fits — how to specify shaft and hole tolerances correctly.', tag: 'Advanced' },
      { title: 'Cutting Speed & Feed Reference', desc: 'Recommended cutting parameters for aluminium, steel, titanium, and plastics on VMC machines.', tag: 'Advanced' },
    ],
  },
]

const industries = [
  { name: 'Pharma Manufacturing', link: '/industries', icon: '💊' },
  { name: 'Defence Components', link: '/industries', icon: '🛡' },
  { name: 'EV & Automotive', link: '/industries', icon: '⚡' },
  { name: 'Aerospace Machining', link: '/industries', icon: '✈' },
  { name: 'Medical Devices', link: '/industries', icon: '🏥' },
  { name: 'Robotics & Drones', link: '/industries', icon: '🤖' },
]

const certifications = [
  { name: 'ISO 9001:2015', desc: 'Quality Management System' },
  { name: 'GMP Compliance', desc: 'Good Manufacturing Practice for pharma' },
  { name: 'AS9100 Capable', desc: 'Aerospace quality standard' },
  { name: 'ITAR Eligible', desc: 'Defence hardware manufacturing' },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-orange-400 text-sm font-semibold uppercase tracking-wider mb-2">Knowledge Base</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Manufacturing Resources</h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Free technical guides, design tips, material references, and industry-specific manufacturing knowledge from 20+ years of experience.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Design Guides', href: '#design-guides' },
              { label: 'Industry Guides', href: '#industry-guides' },
              { label: 'Technical References', href: '#tech-refs' },
              { label: 'Certifications', href: '#certs' },
              { label: 'Get a Quote', href: '/dashboard/rfq/new' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-slate-600 hover:text-orange-600 border border-slate-200 hover:border-orange-300 px-4 py-2 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Guide Sections */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {guides.map((section, si) => (
            <div key={section.category} id={['design-guides', 'industry-guides', 'tech-refs'][si]}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 ${section.iconBg} rounded-xl flex items-center justify-center text-xl`}>
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{section.category}</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {section.items.map((item) => (
                  <div key={item.title} className={`rounded-xl border-2 ${section.color} p-5 hover:shadow-md transition-shadow`}>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{item.tag}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-2 leading-tight">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    <button className="mt-4 text-xs text-orange-600 font-semibold hover:text-orange-700 flex items-center gap-1">
                      Download PDF
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section id="certs" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Quality Certifications & Compliance</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certifications.map((cert) => (
              <div key={cert.name} className="bg-slate-900 rounded-xl p-6 text-white text-center">
                <div className="text-3xl mb-3">🏆</div>
                <div className="font-bold text-orange-400 text-lg mb-1">{cert.name}</div>
                <div className="text-sm text-slate-300">{cert.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Resources */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Resources by Industry</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((ind) => (
              <Link
                key={ind.name}
                href={ind.link}
                className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow border border-slate-100 group"
              >
                <div className="text-3xl mb-2">{ind.icon}</div>
                <div className="text-xs font-semibold text-slate-700 group-hover:text-orange-600 transition-colors">{ind.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-black mb-3">Ready to Manufacture?</h2>
          <p className="text-orange-100 mb-5 text-sm">Our engineers are available to answer technical questions and help design your components.</p>
          <div className="flex justify-center gap-3">
            <Link href="/dashboard/rfq/new" className="bg-white text-orange-600 hover:bg-orange-50 font-bold py-2.5 px-6 rounded-lg transition-colors text-sm">
              Get a Quote
            </Link>
            <Link href="/contact" className="border border-white/50 text-white hover:bg-white/10 font-bold py-2.5 px-6 rounded-lg transition-colors text-sm">
              Talk to Engineers
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
