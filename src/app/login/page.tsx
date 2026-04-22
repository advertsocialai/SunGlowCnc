'use client'

import { Suspense, useState } from 'react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError(result.error)
    } else {
      router.push(callbackUrl)
      router.refresh()
    }
  }

  return (
    <div className="dark-card p-4 p-md-5">
      <h1 className="text-white fw-bold mb-1" style={{ fontSize: '1.4rem' }}>Welcome back</h1>
      <p className="text-muted mb-4" style={{ fontSize: '0.95rem' }}>Sign in to your account to continue</p>

      {error && (
        <div className="p-3 rounded mb-4" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: '0.95rem' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
        <div>
          <label className="form-label-dark">Email Address</label>
          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="form-control-dark" placeholder="your@company.com" />
        </div>
        <div>
          <label className="form-label-dark">Password</label>
          <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="form-control-dark" placeholder="••••••••" />
        </div>
        <button type="submit" disabled={loading} className="btn-brand w-100 justify-content-center" style={{ opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="text-muted" style={{ fontSize: '0.95rem' }}>
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-brand-red text-decoration-none fw-semibold">Register here</Link>
        </p>
      </div>

      {/* Demo credentials */}
      <div className="dark-card-elevated p-3 mt-4" style={{ border: '1px solid var(--dark-border)' }}>
        <p className="text-muted text-uppercase letter-wide fw-semibold mb-2" style={{ fontSize: '0.82rem' }}>Demo Credentials</p>
        <div className="d-flex flex-column gap-2">
          <div className="text-secondary" style={{ fontSize: '0.9rem' }}>
            <span className="fw-semibold text-white">Admin:</span> admin@sunglowcnc.com / admin123
          </div>
          <div className="text-secondary" style={{ fontSize: '0.9rem' }}>
            <span className="fw-semibold text-white">Client:</span> client@bharatbiotech.com / client123
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 p-4" style={{ background: 'linear-gradient(135deg, var(--dark-bg) 0%, var(--brand-navy-dark) 50%, var(--dark-bg) 100%)' }}>
      <div className="w-100" style={{ maxWidth: '440px' }}>
        {/* Logo */}
        <div className="text-center mb-4">
          <Link href="/" className="d-inline-block">
            <div className="bg-white rounded px-4 py-2 d-inline-block shadow">
              <Image src="/logo.png" alt="Sunglow CNC Technics" width={200} height={50} style={{ height: '44px', width: 'auto' }} unoptimized />
            </div>
          </Link>
        </div>

        <Suspense fallback={<div className="dark-card p-5 text-center text-muted" style={{ fontSize: '0.95rem' }}>Loading...</div>}>
          <LoginForm />
        </Suspense>

        <div className="text-center mt-4">
          <Link href="/" className="text-muted text-decoration-none" style={{ fontSize: '0.95rem' }}>
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  )
}
