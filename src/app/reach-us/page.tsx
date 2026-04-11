import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function ReachUsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-r from-brand-navy-800 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-red-400 text-sm font-semibold uppercase tracking-wider mb-2">Get Directions</p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Reach Us</h1>
          <p className="text-lg text-slate-300 max-w-2xl">
            We are open 24 hours, 7 days a week. Visit our facility or reach out via phone, WhatsApp, or email.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-white flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">

            {/* Left: Contact details */}
            <div className="space-y-6">
              {/* Company identity */}
              <div className="bg-brand-navy-800 text-white rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-brand-red-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl">
                    S
                  </div>
                  <div>
                    <h2 className="text-xl font-black">Sunglow CNC Technics</h2>
                    <p className="text-brand-red-400 text-sm font-semibold">CNC Milling Works · Since 2003</p>
                  </div>
                </div>
                {/* Google rating */}
                <div className="flex items-center gap-2 mb-4 bg-brand-navy-700 rounded-xl px-4 py-3">
                  <div className="flex text-yellow-400 text-lg">★★★★☆</div>
                  <span className="text-white font-bold text-sm">4.2</span>
                  <span className="text-slate-400 text-xs">(5 reviews on Google)</span>
                </div>
                <div className="bg-green-500/20 border border-green-500/40 text-green-400 text-sm font-semibold px-3 py-1.5 rounded-lg inline-flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Open 24 Hours · 7 Days a Week
                </div>
              </div>

              {/* Address */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-brand-red-100 rounded-xl flex items-center justify-center text-brand-red-600 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Factory Address</p>
                    <p className="text-slate-900 font-semibold leading-relaxed">
                      6-2-102-78/A, Near Bethal Fans,<br />
                      Sai Baba Nagar, Balanagar,<br />
                      Hyderabad, Telangana 500042,<br />
                      India
                    </p>
                    <a
                      href="https://maps.google.com/?q=Sai+Baba+Nagar+Balanagar+Hyderabad+Telangana+500042"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-brand-red-600 text-sm font-semibold mt-3 hover:text-brand-red-700"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-brand-red-100 rounded-xl flex items-center justify-center text-brand-red-600 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone / WhatsApp</p>
                    <p className="text-slate-900 font-bold text-xl">+91 92463 51511</p>
                    <div className="flex gap-3 mt-3">
                      <a
                        href="tel:+919246351511"
                        className="flex-1 bg-brand-navy-800 text-white font-semibold py-2.5 px-4 rounded-xl text-sm text-center hover:bg-brand-navy-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Call Now
                      </a>
                      <a
                        href="https://wa.me/919246351511"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-500 text-white font-semibold py-2.5 px-4 rounded-xl text-sm text-center hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.529 5.849L0 24l6.335-1.499A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.822 9.822 0 01-5.007-1.368l-.36-.214-3.727.881.898-3.634-.235-.374A9.822 9.822 0 012.182 12C2.182 6.567 6.567 2.182 12 2.182S21.818 6.567 21.818 12 17.433 21.818 12 21.818z" />
                        </svg>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-brand-red-100 rounded-xl flex items-center justify-center text-brand-red-600 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:info@sunglowcnc.com" className="text-slate-900 font-bold text-lg hover:text-brand-red-600 transition-colors">
                      info@sunglowcnc.com
                    </a>
                    <p className="text-slate-500 text-xs mt-1">We respond within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Map */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Find Us on Map</h2>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 mb-6">
                <iframe
                  src="https://www.google.com/maps?q=Sai+Baba+Nagar,+Balanagar,+Hyderabad,+Telangana+500042,+India&output=embed"
                  width="100%"
                  height="420"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sunglow CNC Technics Location"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://maps.google.com/?q=Sai+Baba+Nagar+Balanagar+Hyderabad+Telangana+500042"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-red-600 hover:bg-brand-red-700 text-white font-semibold py-3 px-5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  Open in Google Maps
                </a>
                <Link
                  href="/contact"
                  className="bg-brand-navy-800 hover:bg-brand-navy-700 text-white font-semibold py-3 px-5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Send Message
                </Link>
              </div>

              {/* Nearby landmark */}
              <div className="mt-6 bg-brand-red-50 border border-brand-red-200 rounded-xl p-4 flex gap-3">
                <div className="text-2xl flex-shrink-0">📍</div>
                <div>
                  <p className="font-semibold text-brand-red-800 text-sm">Landmark: Near Bethal Fans</p>
                  <p className="text-brand-red-700 text-xs mt-0.5">
                    Located in Sai Baba Nagar, Balanagar — close to Balanagar Main Road, Hyderabad.
                    Near T-Works Hub, BHEL township area.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick contact CTA strip */}
      <section className="py-12 bg-brand-navy-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-black mb-1">Ready to place an order or get a quote?</h3>
              <p className="text-slate-400 text-sm">Call us directly or submit an RFQ online. We respond fast.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+919246351511"
                className="bg-brand-red-600 hover:bg-brand-red-700 text-white font-bold py-3 px-8 rounded-xl transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +91 92463 51511
              </a>
              <Link
                href="/dashboard/rfq/new"
                className="border-2 border-white/40 text-white hover:bg-white/10 font-bold py-3 px-8 rounded-xl transition-colors"
              >
                Submit RFQ Online
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
