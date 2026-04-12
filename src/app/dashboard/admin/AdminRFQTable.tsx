'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'

interface QuoteData {
  id: string
  amount: number
  validUntil: string
  notes?: string | null
}

interface RFQRow {
  id: string
  title: string
  description?: string | null
  material: string
  tolerance?: string | null
  quantity: number
  priority: string
  status: string
  notes?: string | null
  createdAt: string
  quote?: QuoteData | null
  user: { id: string; name: string; email: string; company?: string | null; phone?: string | null }
}

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'approved', label: 'Approved' },
  { value: 'in_production', label: 'In Production' },
  { value: 'quality_check', label: 'Quality Check' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'completed', label: 'Completed' },
  { value: 'rejected', label: 'Rejected' },
]

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: 'status-pending', quoted: 'status-quoted', approved: 'status-approved',
    in_production: 'status-production', quality_check: 'badge-status',
    shipped: 'status-shipped', completed: 'status-completed', rejected: 'status-rejected',
  }
  const labels: Record<string, string> = {
    pending: 'Pending', quoted: 'Quoted', approved: 'Approved',
    in_production: 'In Production', quality_check: 'Quality Check',
    shipped: 'Shipped', completed: 'Completed', rejected: 'Rejected',
  }
  const qcStyle = status === 'quality_check' ? { background: 'rgba(167,139,250,0.15)', color: '#a78bfa' } : undefined
  return <span className={`badge-status ${map[status] ?? 'badge-status'}`} style={qcStyle}>{labels[status] ?? status}</span>
}

export default function AdminRFQTable({ rfqs: initialRfqs }: { rfqs: RFQRow[] }) {
  const [rfqs, setRfqs] = useState(initialRfqs)
  const [selectedRfq, setSelectedRfq] = useState<RFQRow | null>(null)
  const [quoteForm, setQuoteForm] = useState({ amount: '', validDays: '30', notes: '' })
  const [updating, setUpdating] = useState(false)
  const [filter, setFilter] = useState('all')

  const filteredRfqs = filter === 'all' ? rfqs : rfqs.filter(r => r.status === filter)

  const updateStatus = async (rfqId: string, status: string) => {
    setUpdating(true)
    try {
      const res = await fetch(`/api/rfq/${rfqId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        setRfqs(prev => prev.map(r => r.id === rfqId ? { ...r, status } : r))
        toast.success(`Status updated to ${status}`)
      } else {
        toast.error('Failed to update status')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setUpdating(false)
    }
  }

  const addQuote = async (rfqId: string) => {
    if (!quoteForm.amount) {
      toast.error('Please enter a quote amount')
      return
    }
    setUpdating(true)
    try {
      const res = await fetch(`/api/rfq/${rfqId}/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(quoteForm.amount),
          validDays: parseInt(quoteForm.validDays),
          notes: quoteForm.notes,
        }),
      })
      if (res.ok) {
        const data = await res.json()
        setRfqs(prev => prev.map(r => r.id === rfqId ? { ...r, status: 'quoted', quote: data.quote } : r))
        setSelectedRfq(null)
        setQuoteForm({ amount: '', validDays: '30', notes: '' })
        toast.success('Quote submitted and client notified!')
      } else {
        toast.error('Failed to submit quote')
      }
    } catch {
      toast.error('Network error')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <>
      {/* Filter tabs */}
      <div className="d-flex gap-2 mb-4 overflow-x-auto pb-1 flex-wrap">
        {[{ value: 'all', label: 'All' }, ...statusOptions].map(s => (
          <button
            key={s.value}
            onClick={() => setFilter(s.value)}
            className="btn px-3 py-1 rounded-pill"
            style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              background: filter === s.value ? 'var(--brand-red)' : 'var(--dark-elevated)',
              color: filter === s.value ? '#fff' : 'var(--text-secondary)',
              border: filter === s.value ? '1px solid var(--brand-red)' : '1px solid var(--dark-border)',
              transition: 'all 0.2s',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="dark-card overflow-hidden">
        <div className="table-responsive">
          <table className="table-dark-custom w-100">
            <thead>
              <tr>
                <th>RFQ / Client</th>
                <th>Material / Qty</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Quote</th>
                <th>Actions</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredRfqs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-5 text-secondary" style={{ fontSize: '0.875rem' }}>
                    No RFQs found for this filter.
                  </td>
                </tr>
              ) : (
                filteredRfqs.map((rfq) => (
                  <tr key={rfq.id}>
                    <td>
                      <div className="text-white fw-medium" style={{ fontSize: '0.875rem' }}>{rfq.title}</div>
                      <div className="text-secondary" style={{ fontSize: '0.72rem' }}>{rfq.user.company ?? rfq.user.name}</div>
                      <div className="text-muted" style={{ fontSize: '0.72rem' }}>{rfq.user.email}</div>
                    </td>
                    <td>
                      <div className="text-secondary" style={{ fontSize: '0.875rem' }}>{rfq.material}</div>
                      <div className="text-muted" style={{ fontSize: '0.72rem' }}>Qty: {rfq.quantity}{rfq.tolerance ? ` · ${rfq.tolerance}` : ''}</div>
                    </td>
                    <td>
                      <span className="badge-status" style={{
                        background: rfq.priority === 'urgent' ? 'rgba(239,68,68,0.15)' :
                          rfq.priority === 'high' ? 'rgba(200,32,46,0.15)' :
                          rfq.priority === 'normal' ? 'rgba(96,165,250,0.15)' :
                          'rgba(148,163,184,0.15)',
                        color: rfq.priority === 'urgent' ? '#f87171' :
                          rfq.priority === 'high' ? '#fca5a5' :
                          rfq.priority === 'normal' ? '#60a5fa' :
                          '#94a3b8',
                      }}>
                        {rfq.priority}
                      </span>
                    </td>
                    <td>
                      <select
                        value={rfq.status}
                        onChange={(e) => updateStatus(rfq.id, e.target.value)}
                        disabled={updating}
                        className="form-control-dark"
                        style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem' }}
                      >
                        {statusOptions.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      {rfq.quote ? (
                        <div className="fw-semibold" style={{ color: '#4ade80', fontSize: '0.875rem' }}>
                          ₹{rfq.quote.amount.toLocaleString('en-IN')}
                        </div>
                      ) : (
                        <span className="text-muted" style={{ fontSize: '0.78rem' }}>No quote</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setSelectedRfq(rfq)
                          if (rfq.quote) {
                            setQuoteForm({ amount: String(rfq.quote.amount), validDays: '30', notes: rfq.quote.notes ?? '' })
                          }
                        }}
                        className="btn px-3 py-1"
                        style={{
                          fontSize: '0.75rem', fontWeight: 500,
                          background: 'rgba(200,32,46,0.12)', color: 'var(--brand-red)',
                          border: '1px solid rgba(200,32,46,0.3)', borderRadius: '6px',
                        }}
                      >
                        {rfq.quote ? 'View / Edit' : 'Add Quote'}
                      </button>
                    </td>
                    <td className="text-muted" style={{ fontSize: '0.78rem' }}>
                      {new Date(rfq.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Modal */}
      {selectedRfq && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ background: 'rgba(0,0,0,0.7)', zIndex: 9999, padding: '1rem' }}
        >
          <div className="dark-card w-100" style={{ maxWidth: '520px', borderRadius: '16px' }}>
            {/* Modal header */}
            <div className="d-flex justify-content-between align-items-start p-4" style={{ borderBottom: '1px solid var(--dark-border)' }}>
              <div>
                <h2 className="text-white fw-bold mb-1" style={{ fontSize: '1rem' }}>Submit Quote</h2>
                <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>{selectedRfq.title}</p>
              </div>
              <button
                onClick={() => { setSelectedRfq(null); setQuoteForm({ amount: '', validDays: '30', notes: '' }) }}
                className="btn p-0 text-secondary"
                style={{ fontSize: '1.4rem', lineHeight: 1 }}
              >
                ×
              </button>
            </div>

            {/* RFQ details */}
            <div className="px-4 py-3" style={{ background: 'var(--dark-elevated)', borderBottom: '1px solid var(--dark-border)' }}>
              <div className="row g-2" style={{ fontSize: '0.78rem' }}>
                <div className="col-6">
                  <span className="text-muted">Client: </span>
                  <span className="text-secondary fw-medium">{selectedRfq.user.company ?? selectedRfq.user.name}</span>
                </div>
                <div className="col-6">
                  <span className="text-muted">Material: </span>
                  <span className="text-secondary fw-medium">{selectedRfq.material}</span>
                </div>
                <div className="col-6">
                  <span className="text-muted">Quantity: </span>
                  <span className="text-secondary fw-medium">{selectedRfq.quantity} pcs</span>
                </div>
                <div className="col-6">
                  <span className="text-muted">Tolerance: </span>
                  <span className="text-secondary fw-medium">{selectedRfq.tolerance ?? 'Standard'}</span>
                </div>
              </div>
              {selectedRfq.notes && (
                <div className="mt-2 p-2 rounded" style={{ background: 'var(--dark-card)', fontSize: '0.75rem', color: 'var(--text-secondary)', border: '1px solid var(--dark-border)' }}>
                  <span className="fw-medium">Notes:</span> {selectedRfq.notes}
                </div>
              )}
            </div>

            <div className="p-4 d-flex flex-column gap-3">
              <div className="row g-3">
                <div className="col-6">
                  <label className="form-label-dark">Quote Amount (₹ INR) *</label>
                  <input
                    type="number"
                    min={0}
                    value={quoteForm.amount}
                    onChange={(e) => setQuoteForm(p => ({ ...p, amount: e.target.value }))}
                    className="form-control-dark"
                    placeholder="75000"
                  />
                </div>
                <div className="col-6">
                  <label className="form-label-dark">Valid For (days)</label>
                  <input
                    type="number"
                    min={1}
                    max={90}
                    value={quoteForm.validDays}
                    onChange={(e) => setQuoteForm(p => ({ ...p, validDays: e.target.value }))}
                    className="form-control-dark"
                  />
                </div>
              </div>
              <div>
                <label className="form-label-dark">Quote Notes / Breakdown</label>
                <textarea
                  rows={3}
                  value={quoteForm.notes}
                  onChange={(e) => setQuoteForm(p => ({ ...p, notes: e.target.value }))}
                  placeholder="Includes material, machining, finishing. Delivery in 15 working days..."
                  className="form-control-dark"
                  style={{ resize: 'none' }}
                />
              </div>
              <div className="d-flex gap-3">
                <button
                  onClick={() => addQuote(selectedRfq.id)}
                  disabled={updating}
                  className="btn-brand flex-grow-1 justify-content-center"
                  style={{ opacity: updating ? 0.7 : 1 }}
                >
                  {updating ? 'Submitting...' : 'Submit Quote'}
                </button>
                <button
                  onClick={() => { setSelectedRfq(null); setQuoteForm({ amount: '', validDays: '30', notes: '' }) }}
                  className="btn-brand-outline px-4"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
