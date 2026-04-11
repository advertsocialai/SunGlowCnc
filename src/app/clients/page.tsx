import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const clientGroups = [
  {
    sector: 'Pharmaceuticals & Healthcare',
    color: 'bg-green-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    clients: [
      {
        name: 'Bharat Biotech',
        desc: 'One of India\'s leading vaccine manufacturers. We supply precision pharma components including star wheels, filling needles, and fermenter templates.',
        since: '2003',
        parts: ['Star wheels & guides', 'Filling needles', 'Fermenter templates'],
      },
      {
        name: 'Sanofi India',
        desc: 'Global pharmaceutical giant. We manufacture specialized pharma equipment parts meeting GMP standards for their Hyderabad operations.',
        since: '2006',
        parts: ['Vacuum star wheels', 'Machine chain parts', 'TC Connectors'],
      },
      {
        name: 'Gland Pharma',
        desc: 'Leading injectable pharma company. We provide high-precision stainless steel components for their filling and washing operations.',
        since: '2010',
        parts: ['Washing needles', 'Y & Straight connectors', 'Guide assemblies'],
      },
      {
        name: 'ICLEAN',
        desc: 'Specialized pharma cleaning solutions company. Precision-machined parts for cleanroom-compatible equipment.',
        since: '2015',
        parts: ['Stainless steel components', 'Custom fixtures'],
      },
    ],
  },
  {
    sector: 'Defence & Government',
    color: 'bg-red-600',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    clients: [
      {
        name: 'Bharat Electronics Limited (BEL)',
        desc: 'India\'s premier defence electronics company. We manufacture critical precision components for defence electronics systems under strict quality standards.',
        since: '2005',
        parts: ['Electronic enclosures', 'Precision housings', 'Structural brackets'],
      },
      {
        name: 'ECIL',
        desc: 'Electronics Corporation of India Ltd. Supplying high-accuracy mechanical parts for their strategic electronics and nuclear instrumentation division.',
        since: '2008',
        parts: ['Instrument housings', 'Precision brackets', 'Custom fixtures'],
      },
      {
        name: 'BHEL',
        desc: 'Bharat Heavy Electricals Limited. Manufacturing turbine and heavy engineering components for one of India\'s largest engineering companies.',
        since: '2007',
        parts: ['Turbine components', 'Structural parts', 'Industrial housings'],
      },
      {
        name: 'Avantel Limited',
        desc: 'Specializing in microwave systems hardware and cell jammers. We produce precision waveguide components and RF hardware for their defence-grade systems.',
        since: '2012',
        parts: ['Waveguide components', 'RF hardware', 'Cell jammer parts', 'Microwave housings'],
      },
    ],
  },
  {
    sector: 'Technology & Innovation',
    color: 'bg-purple-600',
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    clients: [
      {
        name: 'Zen Technologies',
        desc: 'Defence simulation and training solutions provider. We manufacture precision mechanical components for their advanced defence training simulators and drone systems.',
        since: '2014',
        parts: ['Simulator components', 'Drone parts', 'Precision mechanisms'],
      },
      {
        name: 'T-Works Hub',
        desc: 'India\'s largest prototyping centre, Hyderabad. Supporting their ecosystem with high-precision prototype machining for startups and researchers.',
        since: '2018',
        parts: ['Prototypes', 'Custom components', 'Research parts'],
      },
    ],
  },
  {
    sector: 'EV & Automotive',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    clients: [
      {
        name: 'EV OEMs & Tier-1 Suppliers',
        desc: 'Manufacturing precision EV battery casings, heat sinks, and thermal management components for India\'s growing electric vehicle sector.',
        since: '2019',
        parts: ['EV battery casings', 'Heat sinks', 'Motor housings', 'Power electronics enclosures'],
      },
    ],
  },
]

const testimonials = [
  {
    quote: 'Sunglow CNC has been our trusted partner for over 15 years. Their precision and reliability in delivering pharma-grade components is unmatched.',
    company: 'Senior Engineer, Bharat Biotech',
  },
  {
    quote: 'The quality of defence components we receive from Sunglow consistently meets our stringent BEL standards. Highly recommended.',
    company: 'Procurement Manager, BEL Hyderabad',
  },
  {
    quote: 'For our T-Works prototyping facility, Sunglow CNC is our go-to partner. Fast turnaround and excellent precision.',
    company: 'Operations Lead, T-Works Hub',
  },
]

export default function ClientsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-brand-navy-800 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-red-400 text-sm font-semibold uppercase tracking-wider mb-2">20+ Years of Partnership</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Our Valued Clients</h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            Trusted by India&apos;s leading organizations in Pharma, Defence, Technology, and EV sectors since 2003.
          </p>
        </div>
      </section>

      {/* Client Groups */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {clientGroups.map((group) => (
            <div key={group.sector} className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className={`w-4 h-4 rounded-full ${group.color}`} />
                <h2 className="text-2xl font-bold text-slate-900">{group.sector}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {group.clients.map((client) => (
                  <div key={client.name} className={`rounded-xl border-2 ${group.borderColor} ${group.bgColor} p-6`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 ${group.color} rounded-xl flex items-center justify-center`}>
                          <span className="text-white font-black text-lg">{client.name[0]}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{client.name}</h3>
                          <span className={`text-xs ${group.textColor} font-semibold`}>Since {client.since}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">{client.desc}</p>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Components Supplied</p>
                      <div className="flex flex-wrap gap-1.5">
                        {client.parts.map((part) => (
                          <span key={part} className="bg-white border border-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded">
                            {part}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center section-title mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-brand-red-500 text-4xl mb-4">&ldquo;</div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4 italic">{t.quote}</p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black mb-4">Become Our Next Partner</h2>
          <p className="text-brand-red-100 mb-6">Join India&apos;s most trusted CNC manufacturing network.</p>
          <Link href="/contact" className="bg-white text-brand-red-600 hover:bg-brand-red-50 font-bold py-3 px-8 rounded-lg transition-colors inline-block">
            Get In Touch
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
