'use client'

import { useState } from 'react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const trustedClients = [
  'Bharat Biotech', 'Sanofi', 'BEL', 'BHEL', 'ECIL',
  'Gland Pharma', 'Avantel', 'Zen Technologies', 'T-Works',
]

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', company: '', phone: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password, company: form.company, phone: form.phone }),
      })

      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Registration failed'); return }

      const result = await signIn('credentials', { email: form.email, password: form.password, redirect: false })
      router.push(result?.ok ? '/dashboard' : '/login')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const passwordStrength = form.password.length >= 10 ? 'Strong' : form.password.length >= 7 ? 'Good' : 'Weak'
  const strengthColor = form.password.length >= 10 ? '#4ade80' : form.password.length >= 7 ? '#fbbf24' : '#f87171'

  return (
    <div className="d-flex min-vh-100" style={{ background: 'var(--dark-bg)' }}>
      {/* Left panel */}
      <div className="d-none d-lg-flex flex-column justify-content-between p-5 bg-brand-navy" style={{ width: '420px', flexShrink: 0 }}>
        <div>
          <Link href="/" className="d-inline-block mb-5 text-decoration-none">
            <div className="bg-white rounded px-3 py-2">
              <Image src="/logo.png" alt="Sunglow CNC Technics" width={160} height={40} style={{ height: '36px', width: 'auto' }} unoptimized />
            </div>
          </Link>

          <h2 className="text-white fw-black mb-1" style={{ fontSize: '1.5rem' }}>Precision machining,</h2>
          <h2 className="text-brand-red fw-black mb-5" style={{ fontSize: '1.5rem' }}>quoted in 24 hours.</h2>

          <div className="d-flex flex-column gap-3 mb-5">
            {[
              { icon: '⚡', text: 'Quote within 24 hours of RFQ submission' },
              { icon: '🎯', text: 'Tolerances down to ±0.01mm' },
              { icon: '🏭', text: '5 machine types — complete in-house capability' },
              { icon: '🔬', text: 'Pharma, Defence & Aerospace quality standards' },
              { icon: '📦', text: 'Prototype to production — no minimum order' },
            ].map((item) => (
              <div key={item.text} className="d-flex align-items-start gap-3">
                <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{item.icon}</span>
                <span className="text-secondary" style={{ fontSize: '0.95rem' }}>{item.text}</span>
              </div>
            ))}
          </div>

          <div>
            <p className="text-muted text-uppercase letter-wide fw-semibold mb-2" style={{ fontSize: '0.82rem' }}>Trusted by</p>
            <div className="d-flex flex-wrap gap-2">
              {trustedClients.map((client) => (
                <span key={client} className="capability-chip">{client}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-top border-dark-custom pt-4">
          <p className="text-muted text-uppercase letter-wide fw-semibold mb-2" style={{ fontSize: '0.82rem' }}>Quality Standards</p>
          <div className="d-flex flex-wrap gap-2">
            {['GMP Compliant', 'AS9100 Capable', 'ISO 9001', 'Defence Grade'].map((cert) => (
              <span key={cert} className="cert-badge">{cert}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center p-4 p-lg-5" style={{ background: 'var(--dark-surface)' }}>
        <div className="w-100" style={{ maxWidth: '480px' }}>
          {/* Mobile logo */}
          <div className="d-lg-none text-center mb-4">
            <Link href="/">
              <div className="bg-white rounded px-3 py-2 d-inline-block">
                <Image src="/logo.png" alt="Sunglow CNC Technics" width={160} height={40} style={{ height: '36px', width: 'auto' }} unoptimized />
              </div>
            </Link>
          </div>

          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <h1 className="text-white fw-black mb-1" style={{ fontSize: '1.5rem' }}>Create an account</h1>
              <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>to get a quote and track your orders</p>
            </div>
            <Link href="/login" className="text-brand-red text-decoration-none fw-semibold d-none d-sm-block" style={{ fontSize: '0.95rem', whiteSpace: 'nowrap' }}>
              Sign In
            </Link>
          </div>

          {error && (
            <div className="p-3 rounded mb-4" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: '0.95rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <div className="row g-3">
              <div className="col-6">
                <label className="form-label-dark">First Name *</label>
                <input type="text" required value={form.name.split(' ')[0]} onChange={(e) => {
                  const last = form.name.split(' ').slice(1).join(' ')
                  setForm({ ...form, name: `${e.target.value}${last ? ' ' + last : ''}` })
                }} className="form-control-dark" placeholder="First name" />
              </div>
              <div className="col-6">
                <label className="form-label-dark">Last Name</label>
                <input type="text" value={form.name.split(' ').slice(1).join(' ')} onChange={(e) => {
                  const first = form.name.split(' ')[0] || ''
                  setForm({ ...form, name: `${first}${e.target.value ? ' ' + e.target.value : ''}` })
                }} className="form-control-dark" placeholder="Last name" />
              </div>
            </div>

            <div>
              <label className="form-label-dark">Company</label>
              <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="form-control-dark" placeholder="Your company or organization" />
            </div>

            <div>
              <label className="form-label-dark">Email *</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="form-control-dark" placeholder="work@company.com" />
            </div>

            <div>
              <label className="form-label-dark">Create Password *</label>
              <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="form-control-dark" placeholder="Min 6 characters" />
              {form.password && (
                <div className="d-flex align-items-center gap-2 mt-2">
                  <div className="d-flex gap-1 flex-grow-1">
                    {[1,2,3].map((i) => (
                      <div key={i} className="rounded-pill flex-grow-1" style={{ height: 4, background: form.password.length >= i * 3 ? strengthColor : 'var(--dark-border)' }} />
                    ))}
                  </div>
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}>{passwordStrength}</span>
                </div>
              )}
            </div>

            <div>
              <label className="form-label-dark">Confirm Password *</label>
              <input type="password" required value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className="form-control-dark" placeholder="Repeat password" style={{ borderColor: form.confirmPassword && form.password !== form.confirmPassword ? '#f87171' : undefined }} />
            </div>

            <div>
              <label className="form-label-dark">Phone Number</label>
              <div className="d-flex">
                <div className="d-flex align-items-center px-3 text-muted fw-medium flex-shrink-0" style={{ background: 'var(--dark-elevated)', border: '1px solid var(--dark-border)', borderRight: 'none', borderRadius: '0.5rem 0 0 0.5rem', fontSize: '0.95rem' }}>
                  +91
                </div>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="form-control-dark flex-grow-1" placeholder="98765 43210" style={{ borderRadius: '0 0.5rem 0.5rem 0' }} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-brand w-100 justify-content-center mt-2" style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Creating Account...' : 'Create Account & Get Quotes'}
            </button>
          </form>

          <p className="text-center text-muted mt-4 mb-2" style={{ fontSize: '0.95rem' }}>
            Already have an account?{' '}
            <Link href="/login" className="text-brand-red text-decoration-none fw-semibold">Sign In</Link>
          </p>
          <p className="text-center text-muted" style={{ fontSize: '0.85rem' }}>
            By registering you agree to our Terms of Service and Privacy Policy.
          </p>
          <div className="text-center mt-3">
            <Link href="/" className="text-muted text-decoration-none" style={{ fontSize: '0.88rem' }}>← Back to Sunglow CNC Website</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
