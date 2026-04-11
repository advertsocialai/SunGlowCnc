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
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '', company: '', phone: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          company: form.company,
          phone: form.phone,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registration failed')
        return
      }

      const result = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      })

      if (result?.ok) {
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel - dark brand panel like Protolabs */}
      <div className="hidden lg:flex lg:w-5/12 bg-brand-navy-800 flex-col p-10 justify-between">
        <div>
          {/* Logo */}
          <Link href="/" className="flex items-center mb-12">
            <div className="bg-white rounded-xl px-3 py-2">
              <Image src="/logo.png" alt="Sunglow CNC Technics" width={160} height={40} className="h-10 w-auto object-contain" />
            </div>
          </Link>

          {/* Value props */}
          <div className="mb-10">
            <h2 className="text-white text-2xl font-black mb-2">Precision machining,</h2>
            <h2 className="text-brand-red-400 text-2xl font-black mb-6">quoted in 24 hours.</h2>
            <div className="space-y-4">
              {[
                { icon: '⚡', text: 'Quote within 24 hours of RFQ submission' },
                { icon: '🎯', text: 'Tolerances down to ±0.01mm' },
                { icon: '🏭', text: '5 machine types — complete in-house capability' },
                { icon: '🔬', text: 'Pharma, Defence & Aerospace quality standards' },
                { icon: '📦', text: 'Prototype to production — no minimum order' },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <span className="text-slate-300 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trusted by */}
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold mb-3">Trusted by</p>
            <div className="flex flex-wrap gap-2">
              {trustedClients.map((client) => (
                <span key={client} className="bg-brand-navy-700 border border-brand-navy-600 text-slate-300 text-xs px-3 py-1.5 rounded-full">
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="pt-8 border-t border-brand-navy-700">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Quality Standards</p>
          <div className="flex flex-wrap gap-2">
            {['GMP Compliant', 'AS9100 Capable', 'ISO 9001', 'Defence Grade'].map((cert) => (
              <span key={cert} className="bg-brand-red-600/20 border border-brand-red-600/30 text-brand-red-400 text-xs px-2 py-1 rounded">{cert}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — registration form */}
      <div className="flex-1 flex items-center justify-center bg-white p-6 lg:p-10">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/">
              <Image src="/logo.png" alt="Sunglow CNC Technics" width={160} height={40} className="h-10 w-auto object-contain" />
            </Link>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Create an account</h1>
              <p className="text-sm text-slate-500 mt-1">to get a quote and track your orders</p>
            </div>
            <Link href="/login" className="text-sm text-brand-red-600 font-semibold hover:text-brand-red-700 hidden sm:block">
              Sign In
            </Link>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">First Name *</label>
                <input
                  type="text"
                  required
                  value={form.name.split(' ')[0]}
                  onChange={(e) => {
                    const lastName = form.name.split(' ').slice(1).join(' ')
                    setForm({ ...form, name: `${e.target.value}${lastName ? ' ' + lastName : ''}` })
                  }}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red-500 focus:border-transparent"
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Last Name</label>
                <input
                  type="text"
                  value={form.name.split(' ').slice(1).join(' ')}
                  onChange={(e) => {
                    const firstName = form.name.split(' ')[0] || ''
                    setForm({ ...form, name: `${firstName}${e.target.value ? ' ' + e.target.value : ''}` })
                  }}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red-500 focus:border-transparent"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Company</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red-500 focus:border-transparent"
                placeholder="Your company or organization"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Email *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red-500 focus:border-transparent"
                placeholder="work@company.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Create Password *</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red-500 focus:border-transparent"
                placeholder="Min 6 characters"
              />
              {form.password && (
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="flex gap-1 flex-1">
                    {[1,2,3].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full ${
                        form.password.length >= i * 3
                          ? form.password.length >= 10 ? 'bg-green-500'
                          : form.password.length >= 7 ? 'bg-yellow-500'
                          : 'bg-red-400'
                          : 'bg-slate-200'
                      }`} />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">
                    {form.password.length >= 10 ? 'Strong' : form.password.length >= 7 ? 'Good' : 'Weak'}
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Confirm Password *</label>
              <input
                type="password"
                required
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red-500 focus:border-transparent ${
                  form.confirmPassword && form.password !== form.confirmPassword
                    ? 'border-red-300 bg-red-50'
                    : 'border-slate-300'
                }`}
                placeholder="Repeat password"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">Phone Number</label>
              <div className="flex">
                <div className="flex items-center px-3 border border-r-0 border-slate-300 rounded-l-lg bg-slate-50 text-slate-500 text-sm">
                  +91
                </div>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="flex-1 border border-slate-300 rounded-r-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red-500 focus:border-transparent"
                  placeholder="98765 43210"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-red-600 hover:bg-brand-red-700 disabled:bg-brand-red-300 text-white font-bold py-3 px-6 rounded-lg transition-colors text-sm mt-2"
            >
              {loading ? 'Creating Account...' : 'Create Account & Get Quotes'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-red-600 hover:text-brand-red-700 font-semibold">
              Sign In
            </Link>
          </p>

          <p className="mt-4 text-xs text-center text-slate-400">
            By registering you agree to our Terms of Service and Privacy Policy.
          </p>

          <div className="mt-6 text-center">
            <Link href="/" className="text-slate-400 hover:text-slate-600 text-xs transition-colors">
              ← Back to Sunglow CNC Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
