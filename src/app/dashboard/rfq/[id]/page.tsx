'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { toast } from 'react-toastify'

interface Quote {
  amount: number
  currency: string
  validUntil: string
  notes?: string
}

interface Order {
  id: string
  orderNumber: string
  status: string
  amount: number
  currency: string
  notes?: string
  createdAt: string
  shippedAt?: string
  completedAt?: string
}

interface RFQDetail {
  id: string
  title: string
  description?: string
  material: string
  tolerance?: string
  quantity: number
  priority: string
  status: string
  notes?: string
  fileUrl?: string
  fileName?: string
  createdAt: string
  updatedAt: string
  quote?: Quote
  order?: Order
  user: { name: string; email: string; company?: string }
}

const statusColors: Record<string, { bg: string; color: string }> = {
  pending:      { bg: 'rgba(251,191,36,0.15)',  color: '#fbbf24' },
  quoted:       { bg: 'rgba(96,165,250,0.15)',  color: '#60a5fa' },
  approved:     { bg: 'rgba(74,222,128,0.15)',  color: '#4ade80' },
  in_production:{ bg: 'rgba(192,132,252,0.15)', color: '#c084fc' },
  quality_check:{ bg: 'rgba(167,139,250,0.15)', color: '#a78bfa' },
  shipped:      { bg: 'rgba(200,32,46,0.15)',   color: '#f87171' },
  completed:    { bg: 'rgba(148,163,184,0.15)', color: '#94a3b8' },
  rejected:     { bg: 'rgba(239,68,68,0.15)',   color: '#fca5a5' },
}

const priorityColors: Record<string, { bg: string; color: string }> = {
  low:    { bg: 'rgba(148,163,184,0.15)', color: '#94a3b8' },
  normal: { bg: 'rgba(96,165,250,0.15)',  color: '#60a5fa' },
  high:   { bg: 'rgba(200,32,46,0.15)',   color: '#fca5a5' },
  urgent: { bg: 'rgba(239,68,68,0.15)',   color: '#f87171' },
}

const orderSteps = [
  { key: 'in_production', label: 'In Production' },
  { key: 'quality_check', label: 'Quality Check' },
  { key: 'shipped',       label: 'Shipped' },
  { key: 'completed',     label: 'Completed' },
]

export default function RFQDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [rfq, setRfq] = useState<RFQDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [approving, setApproving] = useState(false)

  useEffect(() => {
    fetch(`/api/rfq/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setRfq(data.rfq ?? null)
        setLoading(false)
      })
      .catch(() => {
        toast.error('Failed to load RFQ')
        setLoading(false)
      })
  }, [id])

  const handleApprove = async () => {
    if (!rfq) return
    if (!confirm('Approve this quote and create an order? This cannot be undone.')) return
    setApproving(true)
    try {
      const res = await fetch(`/api/rfq/${id}/approve`, { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        toast.success(`Order ${data.order.orderNumber} created! Production starts now.`)
        setRfq((prev) => prev ? { ...prev, status: 'approved', order: data.order } : prev)
      } else {
        toast.error(data.error || 'Failed to approve quote')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setApproving(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border" style={{ color: 'var(--brand-red)', width: '2rem', height: '2rem' }} />
        </div>
      </DashboardLayout>
    )
  }

  if (!rfq) {
    return (
      <DashboardLayout>
        <div className="text-center py-5 text-secondary">RFQ not found.</div>
      </DashboardLayout>
    )
  }

  const currentOrderStep = rfq.order
    ? orderSteps.findIndex((s) => s.key === rfq.order!.status)
    : -1

  const sc = statusColors[rfq.status] ?? { bg: 'rgba(148,163,184,0.15)', color: '#94a3b8' }
  const pc = priorityColors[rfq.priority] ?? priorityColors.normal

  return (
    <DashboardLayout>
      <div style={{ maxWidth: '860px' }} className="mx-auto">
        {/* Header */}
        <div className="d-flex align-items-start justify-content-between mb-4">
          <div>
            <button
              onClick={() => router.back()}
              className="btn p-0 text-muted mb-2 d-flex align-items-center gap-1"
              style={{ fontSize: '0.85rem' }}
            >
              ← Back to RFQs
            </button>
            <h1 className="text-white fw-bold mb-1" style={{ fontSize: '1.4rem' }}>{rfq.title}</h1>
            <p className="text-muted mb-0" style={{ fontSize: '0.82rem' }}>
              Submitted {new Date(rfq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="d-flex flex-column align-items-end gap-2">
            <span className="badge-status" style={{ background: sc.bg, color: sc.color }}>
              {rfq.status.replace('_', ' ').toUpperCase()}
            </span>
            <span className="badge-status" style={{ background: pc.bg, color: pc.color }}>
              {rfq.priority.toUpperCase()} priority
            </span>
          </div>
        </div>

        {/* RFQ Details */}
        <div className="dark-card p-4 mb-4">
          <h2 className="text-white fw-semibold mb-3" style={{ fontSize: '0.95rem' }}>Component Details</h2>
          <div className="row g-3 mb-3" style={{ fontSize: '0.875rem' }}>
            <div className="col-sm-4">
              <p className="text-muted text-uppercase mb-1" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>Material</p>
              <p className="text-white fw-medium mb-0">{rfq.material}</p>
            </div>
            <div className="col-sm-4">
              <p className="text-muted text-uppercase mb-1" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>Quantity</p>
              <p className="text-white fw-medium mb-0">{rfq.quantity.toLocaleString()} pcs</p>
            </div>
            {rfq.tolerance && (
              <div className="col-sm-4">
                <p className="text-muted text-uppercase mb-1" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>Tolerance</p>
                <p className="text-white fw-medium mb-0">{rfq.tolerance}</p>
              </div>
            )}
          </div>
          {rfq.description && (
            <div className="pt-3" style={{ borderTop: '1px solid var(--dark-border)' }}>
              <p className="text-muted text-uppercase mb-1" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>Description</p>
              <p className="text-secondary mb-0" style={{ fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>{rfq.description}</p>
            </div>
          )}
          {rfq.notes && (
            <div className="pt-3 mt-3" style={{ borderTop: '1px solid var(--dark-border)' }}>
              <p className="text-muted text-uppercase mb-1" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>Notes</p>
              <p className="text-secondary mb-0" style={{ fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>{rfq.notes}</p>
            </div>
          )}
          {rfq.fileUrl && (
            <div className="pt-3 mt-3" style={{ borderTop: '1px solid var(--dark-border)' }}>
              <p className="text-muted text-uppercase mb-1" style={{ fontSize: '0.68rem', letterSpacing: '0.05em' }}>Attached File</p>
              <a href={rfq.fileUrl} target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--brand-red)', fontSize: '0.875rem', fontWeight: 500 }}>
                {rfq.fileName ?? 'Download file'} ↗
              </a>
            </div>
          )}
        </div>

        {/* Quote Card */}
        {rfq.quote && (
          <div className="dark-card p-4 mb-4" style={rfq.status === 'quoted' ? { borderColor: '#60a5fa66' } : {}}>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h2 className="text-white fw-semibold mb-0" style={{ fontSize: '0.95rem' }}>Quote from Sunglow CNC</h2>
              <span className="text-muted" style={{ fontSize: '0.78rem' }}>
                Valid until {new Date(rfq.quote.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <div className="d-flex align-items-center gap-4">
              <div>
                <p className="fw-black text-white mb-0" style={{ fontSize: '2.25rem' }}>
                  ₹{rfq.quote.amount.toLocaleString('en-IN')}
                </p>
                <p className="text-muted mb-0" style={{ fontSize: '0.75rem' }}>Inclusive of machining &amp; QC</p>
              </div>
              {rfq.status === 'quoted' && (
                <button
                  onClick={handleApprove}
                  disabled={approving}
                  className="btn-brand ms-auto"
                  style={{ opacity: approving ? 0.7 : 1 }}
                >
                  {approving ? 'Approving...' : 'Approve Quote & Place Order'}
                </button>
              )}
            </div>
            {rfq.quote.notes && (
              <p className="text-secondary mt-3 pt-3 mb-0" style={{ fontSize: '0.875rem', borderTop: '1px solid var(--dark-border)' }}>
                {rfq.quote.notes}
              </p>
            )}
          </div>
        )}

        {/* Pending quote notice */}
        {!rfq.quote && rfq.status === 'pending' && (
          <div className="rounded p-4 mb-4 text-center" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)' }}>
            <p className="fw-semibold mb-1" style={{ color: '#fbbf24', fontSize: '0.9rem' }}>Quote Pending</p>
            <p className="text-muted mb-0" style={{ fontSize: '0.82rem' }}>Our engineering team is reviewing your RFQ. You will be notified within 24 hours.</p>
          </div>
        )}

        {/* Order Tracker */}
        {rfq.order && (
          <div className="dark-card p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h2 className="text-white fw-semibold mb-1" style={{ fontSize: '0.95rem' }}>Order Tracker</h2>
                <p className="text-muted mb-0" style={{ fontSize: '0.78rem' }}>Order #{rfq.order.orderNumber}</p>
              </div>
              <span className="fw-bold" style={{ color: '#4ade80', fontSize: '1.1rem' }}>
                ₹{rfq.order.amount.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Step tracker */}
            <div className="d-flex align-items-start position-relative">
              {orderSteps.map((step, idx) => {
                const done = idx <= currentOrderStep
                const active = idx === currentOrderStep
                return (
                  <div key={step.key} className="flex-fill d-flex flex-column align-items-center position-relative">
                    {idx < orderSteps.length - 1 && (
                      <div
                        className="position-absolute"
                        style={{
                          top: '15px', left: '50%', width: '100%', height: '2px',
                          background: idx < currentOrderStep ? 'var(--brand-red)' : 'var(--dark-border)',
                        }}
                      />
                    )}
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center fw-bold position-relative"
                      style={{
                        width: 32, height: 32, fontSize: '0.75rem', zIndex: 1,
                        background: active ? 'var(--brand-red)' : done ? 'rgba(200,32,46,0.5)' : 'var(--dark-elevated)',
                        color: done || active ? '#fff' : '#6b7280',
                        boxShadow: active ? '0 0 0 4px rgba(200,32,46,0.2)' : 'none',
                        border: `1px solid ${done || active ? 'var(--brand-red)' : 'var(--dark-border)'}`,
                      }}
                    >
                      {done && !active ? '✓' : idx + 1}
                    </div>
                    <p className="text-center mt-2 mb-0" style={{
                      fontSize: '0.72rem', fontWeight: 500,
                      color: active ? 'var(--brand-red)' : done ? 'var(--text-secondary)' : '#6b7280',
                    }}>
                      {step.label}
                    </p>
                  </div>
                )
              })}
            </div>

            {rfq.order.notes && (
              <p className="text-secondary mt-4 pt-3 mb-0" style={{ fontSize: '0.875rem', borderTop: '1px solid var(--dark-border)' }}>
                {rfq.order.notes}
              </p>
            )}
            {rfq.order.shippedAt && (
              <p className="mt-2 mb-0" style={{ fontSize: '0.78rem', color: '#f87171' }}>
                Shipped on {new Date(rfq.order.shippedAt).toLocaleDateString('en-IN')}
              </p>
            )}
            {rfq.order.completedAt && (
              <p className="mt-1 mb-0" style={{ fontSize: '0.78rem', color: '#4ade80' }}>
                Completed on {new Date(rfq.order.completedAt).toLocaleDateString('en-IN')}
              </p>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
