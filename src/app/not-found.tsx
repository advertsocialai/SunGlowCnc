import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center px-3" style={{ background: 'var(--dark-bg)' }}>
      <div className="text-center" style={{ maxWidth: '440px' }}>
        <div className="fw-black mb-4" style={{ fontSize: '5rem', color: 'var(--brand-red)' }}>404</div>
        <h1 className="text-white fw-bold mb-3" style={{ fontSize: '1.4rem' }}>Page Not Found</h1>
        <p className="text-secondary mb-5" style={{ fontSize: '0.9rem' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
          <Link href="/" className="btn-brand">
            Go Home
          </Link>
          <Link href="/dashboard" className="btn-brand-outline">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
