'use client'

import { useEffect } from 'react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center px-3" style={{ background: 'var(--dark-bg)' }}>
      <div className="text-center" style={{ maxWidth: '440px' }}>
        <div className="fw-black mb-4" style={{ fontSize: '4rem', color: 'var(--brand-red)' }}>!</div>
        <h1 className="text-white fw-bold mb-3" style={{ fontSize: '1.4rem' }}>Something went wrong</h1>
        <p className="text-secondary mb-5" style={{ fontSize: '0.9rem' }}>
          An unexpected error occurred. Please try again or contact support if the issue persists.
        </p>
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
          <button onClick={reset} className="btn-brand">
            Try Again
          </button>
          <a href="/" className="btn-brand-outline">
            Go Home
          </a>
        </div>
      </div>
    </div>
  )
}
