import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function ReachUsPage() {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: 'var(--dark-bg)' }}>
      <Navbar />

      {/* Header */}
      <section className="page-header">
        <div className="container-xl">
          <p className="text-brand-red fw-semibold text-uppercase letter-wide mb-2" style={{ fontSize: '0.8rem' }}>Get Directions</p>
          <h1 className="fw-black text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Reach Us</h1>
          <p className="text-secondary" style={{ maxWidth: '520px', fontSize: '1.05rem' }}>
            We are open 24 hours, 7 days a week. Visit our facility or reach out via phone, WhatsApp, or email.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="section-py flex-grow-1" style={{ background: 'var(--dark-surface)' }}>
        <div className="container-xl">
          <div className="row g-5">
            {/* Left: Contact details */}
            <div className="col-lg-5">
              <div className="d-flex flex-column gap-4">
                {/* Company identity */}
                <div className="bg-brand-navy rounded-xl p-4">
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="d-flex align-items-center justify-content-center rounded-xl text-white fw-black bg-brand-red flex-shrink-0" style={{ width: 60, height: 60, fontSize: '1.5rem' }}>
                      S
                    </div>
                    <div>
                      <h2 className="text-white fw-black mb-0" style={{ fontSize: '1.15rem' }}>Sunglow CNC Technics</h2>
                      <p className="text-brand-red mb-0" style={{ fontSize: '0.8rem' }}>CNC Milling Works · Since 2003</p>
                    </div>
                  </div>
                  {/* Google rating */}
                  <div className="d-flex align-items-center gap-2 p-3 rounded mb-3" style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <div style={{ color: '#fbbf24', fontSize: '1.1rem' }}>★★★★☆</div>
                    <span className="text-white fw-bold" style={{ fontSize: '0.875rem' }}>4.2</span>
                    <span className="text-muted" style={{ fontSize: '0.75rem' }}>(5 reviews on Google)</span>
                  </div>
                  <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded fw-semibold" style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.35)', color: '#4ade80', fontSize: '0.82rem' }}>
                    <span className="rounded-circle bg-success" style={{ width: 8, height: 8 }} />
                    Open 24 Hours · 7 Days a Week
                  </div>
                </div>

                {/* Address */}
                <div className="dark-card p-4">
                  <div className="d-flex gap-3">
                    <div className="d-flex align-items-center justify-content-center rounded flex-shrink-0" style={{ width: 44, height: 44, background: 'var(--brand-red-light)', color: 'var(--brand-red)', fontSize: '1.2rem' }}>📍</div>
                    <div>
                      <p className="text-muted text-uppercase letter-wide fw-semibold mb-1" style={{ fontSize: '0.7rem' }}>Address</p>
                      <p className="text-white fw-medium mb-2" style={{ fontSize: '0.875rem' }}>
                        6-2-102-78/A, Near Bethal Fans,<br />
                        Sai Baba Nagar, Balanagar,<br />
                        Hyderabad, Telangana 500042, India
                      </p>
                      <a
                        href="https://www.google.com/maps/search/Sai+Baba+Nagar+Balanagar+Hyderabad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-red text-decoration-none fw-semibold"
                        style={{ fontSize: '0.8rem' }}
                      >
                        Open in Google Maps →
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="dark-card p-4">
                  <div className="d-flex gap-3">
                    <div className="d-flex align-items-center justify-content-center rounded flex-shrink-0" style={{ width: 44, height: 44, background: 'var(--brand-red-light)', fontSize: '1.2rem' }}>📞</div>
                    <div className="flex-grow-1">
                      <p className="text-muted text-uppercase letter-wide fw-semibold mb-1" style={{ fontSize: '0.7rem' }}>Phone</p>
                      <p className="text-white fw-bold mb-3" style={{ fontSize: '1.05rem' }}>+91 92463 51511</p>
                      <div className="d-flex gap-2 flex-wrap">
                        <a href="tel:+919246351511" className="btn-brand" style={{ padding: '0.45rem 1.1rem', fontSize: '0.82rem' }}>
                          📞 Call Now
                        </a>
                        <a href="https://wa.me/919246351511" target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="dark-card p-4">
                  <div className="d-flex gap-3">
                    <div className="d-flex align-items-center justify-content-center rounded flex-shrink-0" style={{ width: 44, height: 44, background: 'var(--brand-red-light)', fontSize: '1.2rem' }}>✉</div>
                    <div>
                      <p className="text-muted text-uppercase letter-wide fw-semibold mb-1" style={{ fontSize: '0.7rem' }}>Email</p>
                      <a href="mailto:Sunglowcnctechnics@gmail.com" className="text-brand-red text-decoration-none fw-semibold" style={{ fontSize: '0.9rem' }}>
                        Sunglowcnctechnics@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Map */}
            <div className="col-lg-7">
              <h3 className="text-white fw-bold mb-3" style={{ fontSize: '1.1rem' }}>Find Us on the Map</h3>
              <iframe
                className="map-frame"
                src="https://www.google.com/maps?q=Sai+Baba+Nagar,+Balanagar,+Hyderabad,+Telangana+500042&output=embed"
                allowFullScreen
                loading="lazy"
                title="Sunglow CNC Technics location"
              />
              <div className="dark-card p-4 mt-4">
                <h4 className="text-brand-red fw-bold mb-2" style={{ fontSize: '1rem' }}>Get a Quote Online — Faster!</h4>
                <p className="text-secondary mb-3" style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
                  No need to visit in person. Upload your drawings online and get a quote in 24 hours.
                </p>
                <Link href="/dashboard/rfq/new" className="btn-brand" style={{ fontSize: '0.875rem' }}>
                  Submit RFQ Online →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
