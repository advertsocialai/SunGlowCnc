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
    in_production: 'status-production', quality_check: 'bg-indigo-100 text-indigo-800 badge',
    shipped: 'status-shipped', completed: 'status-completed', rejected: 'status-rejected',
  }
  const labels: Record<string, string> = {
    pending: 'Pending', quoted: 'Quoted', approved: 'Approved',
    in_production: 'In Production', quality_check: 'Quality Check',
    shipped: 'Shipped', completed: 'Completed', rejected: 'Rejected',
  }
  return <span className={map[status] ?? 'badge bg-slate-100 text-slate-600'}>{labels[status] ?? status}</span>
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
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {[{ v: 'all', l: 'All' }, ...statusOptions].map(s => (
          <button
            key={s.v}
            onClick={() => setFilter(s.v)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              filter === s.v ? 'bg-orange-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {s.l}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">RFQ / Client</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Material / Qty</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Priority</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Quote</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Actions</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRfqs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400 text-sm">
                    No RFQs found for this filter.
                  </td>
                </tr>
              ) : (
                filteredRfqs.map((rfq) => (
                  <tr key={rfq.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="font-medium text-slate-900 text-sm">{rfq.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {rfq.user.company ?? rfq.user.name}
                      </div>
                      <div className="text-xs text-slate-400">{rfq.user.email}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm text-slate-700">{rfq.material}</div>
                      <div className="text-xs text-slate-400">Qty: {rfq.quantity} {rfq.tolerance ? `· ${rfq.tolerance}` : ''}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`badge text-xs ${
                        rfq.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                        rfq.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                        rfq.priority === 'normal' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {rfq.priority}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={rfq.status}
                        onChange={(e) => updateStatus(rfq.id, e.target.value)}
                        disabled={updating}
                        className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                      >
                        {statusOptions.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      {rfq.quote ? (
                        <div className="text-sm font-semibold text-green-700">
                          ₹{rfq.quote.amount.toLocaleString('en-IN')}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">No quote</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => {
                          setSelectedRfq(rfq)
                          if (rfq.quote) {
                            setQuoteForm({ amount: String(rfq.quote.amount), validDays: '30', notes: rfq.quote.notes ?? '' })
                          }
                        }}
                        className="text-xs bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 px-3 py-1.5 rounded-lg transition-colors font-medium"
                      >
                        {rfq.quote ? 'View / Edit' : 'Add Quote'}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-400">
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="p-6 border-b border-slate-100">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-slate-900">Submit Quote</h2>
                  <p className="text-sm text-slate-500 mt-0.5">{selectedRfq.title}</p>
                </div>
                <button
                  onClick={() => { setSelectedRfq(null); setQuoteForm({ amount: '', validDays: '30', notes: '' }) }}
                  className="text-slate-400 hover:text-slate-600 text-xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>

            {/* RFQ details */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-slate-500">Client:</span> <span className="font-medium">{selectedRfq.user.company ?? selectedRfq.user.name}</span></div>
                <div><span className="text-slate-500">Material:</span> <span className="font-medium">{selectedRfq.material}</span></div>
                <div><span className="text-slate-500">Quantity:</span> <span className="font-medium">{selectedRfq.quantity} pcs</span></div>
                <div><span className="text-slate-500">Tolerance:</span> <span className="font-medium">{selectedRfq.tolerance ?? 'Standard'}</span></div>
              </div>
              {selectedRfq.notes && (
                <div className="mt-2 text-xs text-slate-600 bg-white rounded p-2 border border-slate-200">
                  <span className="font-medium">Notes:</span> {selectedRfq.notes}
                </div>
              )}
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Quote Amount (₹ INR) *</label>
                  <input
                    type="number"
                    min={0}
                    value={quoteForm.amount}
                    onChange={(e) => setQuoteForm(p => ({ ...p, amount: e.target.value }))}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="75000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Valid For (days)</label>
                  <input
                    type="number"
                    min={1}
                    max={90}
                    value={quoteForm.validDays}
                    onChange={(e) => setQuoteForm(p => ({ ...p, validDays: e.target.value }))}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Quote Notes / Breakdown</label>
                <textarea
                  rows={3}
                  value={quoteForm.notes}
                  onChange={(e) => setQuoteForm(p => ({ ...p, notes: e.target.value }))}
                  placeholder="Includes material, machining, finishing. Delivery in 15 working days..."
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => addQuote(selectedRfq.id)}
                  disabled={updating}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
                >
                  {updating ? 'Submitting...' : 'Submit Quote'}
                </button>
                <button
                  onClick={() => { setSelectedRfq(null); setQuoteForm({ amount: '', validDays: '30', notes: '' }) }}
                  className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 text-sm"
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
