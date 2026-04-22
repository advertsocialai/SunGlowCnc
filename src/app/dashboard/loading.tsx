export default function DashboardLoading() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'var(--dark-surface)' }}>
      <div className="d-flex flex-column align-items-center gap-4">
        <div
          className="rounded-circle"
          style={{
            width: 40, height: 40,
            border: '3px solid var(--dark-border)',
            borderTopColor: 'var(--brand-red)',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <p className="text-muted mb-0" style={{ fontSize: '0.95rem', fontWeight: 500 }}>Loading dashboard...</p>
      </div>
    </div>
  )
}
