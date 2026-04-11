import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

const services = [
  {
    id: 'cnc',
    icon: '⚙',
    title: 'CNC Precision Machining',
    subtitle: 'Our Core Capability',
    desc: 'Using advanced Vertical Machining Centers (VMC), we deliver high-tolerance milling, turning, drilling, and finishing operations for complex components.',
    items: [
      '3-axis & multi-axis CNC milling',
      'CNC turning and boring',
      'Wire cut & EDM machining',
      'Surface and cylindrical grinding',
      'Tolerances down to ±0.01mm',
      'Superior surface finishes (Ra 0.4 – 1.6)',
    ],
    machinery: ['3× VMC Milling Machines', 'CNC Lathe', 'Wire Cut EDM', 'EDM Machine', 'Conventional Setup'],
    color: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
  },
  {
    id: 'pharma',
    icon: '💊',
    title: 'Pharma Component Manufacturing',
    subtitle: 'Regular Supplies to Leading Pharma Companies',
    desc: 'We are a trusted supplier of precision pharma components to Bharat Biotech, Sanofi, Gland Pharma, and ICLEAN — maintaining the highest hygiene and tolerance standards.',
    items: [
      'Star wheels and guides',
      'Vacuum star wheels',
      'Filling machine chain parts',
      'Filling needles & washing needles',
      'Fermenter templates',
      'TC, Y & Straight connectors',
    ],
    machinery: ['316L Stainless Steel capability', 'Electro-polished finishes', 'GMP-compliant components'],
    color: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
  },
  {
    id: 'defence',
    icon: '🛡',
    title: 'Defence & Aerospace Hardware',
    subtitle: 'Critical Precision for National Security',
    desc: 'Trusted by BEL, ECIL, BHEL, and Avantel Limited for producing high-precision defence and aerospace hardware including microwave systems and jamming devices.',
    items: [
      'Microwave systems hardware',
      'Cell jammer components',
      'Aerospace structural brackets',
      'Complex manifolds & fluid components',
      'High-tolerance drilling',
      'Lightweight structural parts',
    ],
    machinery: ['Titanium & Aluminium alloy machining', 'High-speed milling', 'Aerospace-grade QC'],
    color: 'bg-red-50 border-red-200',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-700',
  },
  {
    id: 'ev',
    icon: '⚡',
    title: 'EV & Automotive Components',
    subtitle: 'Powering India\'s EV Revolution',
    desc: 'From EV battery casings to heat sinks and engine parts, we manufacture precision automotive components that meet stringent performance and safety requirements.',
    items: [
      'EV battery casings',
      'Thermal management heat sinks',
      'Engine & powertrain parts',
      'Connecting rods (precision-milled)',
      'Alloy wheel prototypes',
      'Transmission components',
    ],
    machinery: ['Aluminium alloy machining', 'High-volume capability', 'Dimensional inspection'],
    color: 'bg-yellow-50 border-yellow-200',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-700',
  },
  {
    id: 'robotics',
    icon: '🤖',
    title: 'Robotics & Drones',
    subtitle: 'Precision Parts for Future Technologies',
    desc: 'Supporting T-Works Hub and Zen Technologies with precision components for drone frames, robotic actuators, and motion control systems.',
    items: [
      'Drone frame structures',
      'Robotic arm components',
      'Actuator housings',
      'Servo motor mounts',
      'Landing gear parts',
      'Custom precision parts',
    ],
    machinery: ['Lightweight alloy machining', 'High-precision boring', 'Custom geometry capability'],
    color: 'bg-purple-50 border-purple-200',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-700',
  },
  {
    id: 'medical',
    icon: '🏥',
    title: 'Medical Devices',
    subtitle: 'Clinical-Grade Precision',
    desc: 'Manufacturing surgical instruments, guide rails, and orthopedic implants with biocompatible materials and clinical-grade surface finishes.',
    items: [
      'Surgical guide rails & instruments',
      'Orthopedic implant components',
      'Biocompatible material machining',
      'Titanium & SS 316L capability',
      'Complex geometry implants',
      'High-polish surgical finishes',
    ],
    machinery: ['Ti-6Al-4V machining', 'Medical-grade finishing', 'Dimensional traceability'],
    color: 'bg-teal-50 border-teal-200',
    iconBg: 'bg-teal-100',
    iconColor: 'text-teal-700',
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-brand-navy-800 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-brand-red-400 text-sm font-semibold uppercase tracking-wider mb-2">What We Do</p>
            <h1 className="text-4xl md:text-5xl font-black mb-4">Our Services &amp; Capabilities</h1>
            <p className="text-lg text-slate-300">
              Comprehensive CNC precision machining services for critical industries. From prototypes to production runs.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((svc, i) => (
              <div
                key={svc.id}
                className={`rounded-2xl border-2 p-8 ${svc.color} ${i % 2 === 0 ? '' : ''}`}
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className={`w-14 h-14 ${svc.iconBg} rounded-2xl flex items-center justify-center text-3xl mb-4`}>
                      {svc.icon}
                    </div>
                    <p className={`text-sm font-semibold uppercase tracking-wider ${svc.iconColor} mb-1`}>{svc.subtitle}</p>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">{svc.title}</h2>
                    <p className="text-slate-600 leading-relaxed">{svc.desc}</p>
                    <div className="mt-4">
                      <h4 className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Key Capabilities</h4>
                      <div className="flex flex-wrap gap-2">
                        {svc.machinery.map((m) => (
                          <span key={m} className="bg-white/70 border border-slate-200 text-slate-700 text-xs px-3 py-1 rounded-full">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wider">Components & Parts</h4>
                    <ul className="space-y-2">
                      {svc.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${svc.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
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
          <h2 className="text-3xl font-black mb-4">Need a Custom Component?</h2>
          <p className="text-brand-red-100 mb-6">Upload your design and our team will provide a detailed quote within 24 hours.</p>
          <Link href="/register" className="bg-white text-brand-red-600 hover:bg-brand-red-50 font-bold py-3 px-8 rounded-lg transition-colors inline-block">
            Request a Quote
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
