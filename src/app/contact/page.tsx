'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { toast } from 'react-toastify'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        toast.success('Message sent! We will get back to you within 24 hours.')
        setForm({ name: '', email: '', phone: '', company: '', message: '' })
      } else {
        toast.error('Failed to send message. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100" style={{ background: 'var(--dark-bg)' }}>
      <Navbar />

      {/* Header */}
      <section className="page-header">
        <div className="container-xl">
          <p className="text-brand-red fw-semibold text-uppercase letter-wide mb-2" style={{ fontSize: '0.9rem' }}>Get In Touch</p>
          <h1 className="fw-black text-white mb-3" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Contact Us</h1>
          <p className="text-secondary" style={{ maxWidth: '520px', fontSize: '1.05rem' }}>
            Have a project in mind? Send us your requirements and we&apos;ll respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="section-py flex-grow-1" style={{ background: 'var(--dark-surface)' }}>
        <div className="container-xl">
          <div className="row g-5">
            {/* Form */}
            <div className="col-lg-7">
              <h2 className="text-white fw-bold mb-4" style={{ fontSize: '1.4rem' }}>Send a Message</h2>
              <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label className="form-label-dark">Full Name *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="form-control-dark" placeholder="Your name" />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label-dark">Email *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="form-control-dark" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label className="form-label-dark">Phone</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="form-control-dark" placeholder="+91 98765 43210" />
                  </div>
                  <div className="col-sm-6">
                    <label className="form-label-dark">Company</label>
                    <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="form-control-dark" placeholder="Your company name" />
                  </div>
                </div>
                <div>
                  <label className="form-label-dark">Message / Requirements *</label>
                  <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="form-control-dark" placeholder="Describe your project, required components, material, quantities, tolerances..." style={{ resize: 'none' }} />
                </div>
                <button type="submit" disabled={loading} className="btn-brand w-100 justify-content-center" style={{ opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="col-lg-5">
              <h2 className="text-white fw-bold mb-4" style={{ fontSize: '1.4rem' }}>Contact Information</h2>
              <div className="d-flex flex-column gap-3 mb-4">
                {[
                  { icon: '📍', label: 'Address', value: '6-2-102-78/A, Near Bethal Fans, Sai Baba Nagar, Balanagar, Hyderabad, Telangana 500042, India' },
                  { icon: '📞', label: 'Phone', value: '+91 92463 51511' },
                  { icon: '✉', label: 'Email', value: 'Sunglowcnctechnics@gmail.com' },
                  { icon: '🕐', label: 'Working Hours', value: 'Open 24 Hours · 7 Days a Week' },
                ].map((info) => (
                  <div key={info.label} className="dark-card p-4 d-flex gap-3">
                    <div
                      className="d-flex align-items-center justify-content-center rounded flex-shrink-0"
                      style={{ width: 40, height: 40, background: 'var(--brand-red-light)', fontSize: '1.1rem' }}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-muted text-uppercase letter-wide fw-semibold mb-1" style={{ fontSize: '0.82rem' }}>{info.label}</p>
                      <p className="text-white fw-medium mb-0" style={{ fontSize: '0.95rem' }}>{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick RFQ */}
              <div className="dark-card p-4" style={{ borderColor: 'rgba(200,32,46,0.4)' }}>
                <h3 className="text-brand-red fw-bold mb-2" style={{ fontSize: '1rem' }}>Want a Faster Quote?</h3>
                <p className="text-secondary mb-3" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                  Register on our platform and upload your CAD files, material requirements, and quantities for a detailed quote in 24 hours.
                </p>
                <a href="/register" className="text-brand-red fw-semibold text-decoration-none" style={{ fontSize: '0.95rem' }}>
                  Register &amp; Upload RFQ →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
