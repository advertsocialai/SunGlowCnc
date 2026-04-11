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

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  quoted: 'bg-blue-100 text-blue-800',
  approved: 'bg-green-100 text-green-800',
  in_production: 'bg-brand-red-100 text-brand-red-800',
  quality_check: 'bg-purple-100 text-purple-800',
  shipped: 'bg-teal-100 text-teal-800',
  completed: 'bg-slate-200 text-slate-800',
  rejected: 'bg-red-100 text-red-800',
}

const priorityColors: Record<string, string> = {
  low: 'bg-slate-100 text-slate-600',
  normal: 'bg-blue-50 text-blue-600',
  high: 'bg-brand-red-100 text-brand-red-600',
  urgent: 'bg-red-100 text-red-700',
}

const orderSteps = [
  { key: 'in_production', label: 'In Production' },
  { key: 'quality_check', label: 'Quality Check' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'completed', label: 'Completed' },
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
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-brand-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    )
  }

  if (!rfq) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-slate-500">RFQ not found.</div>
      </DashboardLayout>
    )
  }

  const currentOrderStep = rfq.order
    ? orderSteps.findIndex((s) => s.key === rfq.order!.status)
    : -1

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <button
              onClick={() => router.back()}
              className="text-sm text-slate-500 hover:text-brand-red-600 mb-2 flex items-center gap-1"
            >
              ← Back to RFQs
            </button>
            <h1 className="text-2xl font-bold text-slate-900">{rfq.title}</h1>
            <p className="text-slate-400 text-sm mt-1">
              Submitted {new Date(rfq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[rfq.status] ?? 'bg-slate-100 text-slate-600'}`}>
              {rfq.status.replace('_', ' ').toUpperCase()}
            </span>
            <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${priorityColors[rfq.priority] ?? ''}`}>
              {rfq.priority.toUpperCase()} priority
            </span>
          </div>
        </div>

        {/* RFQ Details */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Component Details</h2>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Material</p>
              <p className="text-slate-800 font-medium">{rfq.material}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Quantity</p>
              <p className="text-slate-800 font-medium">{rfq.quantity.toLocaleString()} pcs</p>
            </div>
            {rfq.tolerance && (
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Tolerance</p>
                <p className="text-slate-800 font-medium">{rfq.tolerance}</p>
              </div>
            )}
          </div>
          {rfq.description && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Description</p>
              <p className="text-slate-700 text-sm whitespace-pre-wrap">{rfq.description}</p>
            </div>
          )}
          {rfq.notes && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Notes</p>
              <p className="text-slate-700 text-sm whitespace-pre-wrap">{rfq.notes}</p>
            </div>
          )}
          {rfq.fileUrl && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">Attached File</p>
              <a
                href={rfq.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-red-600 hover:underline text-sm font-medium"
              >
                {rfq.fileName ?? 'Download file'} ↗
              </a>
            </div>
          )}
        </div>

        {/* Quote Card */}
        {rfq.quote && (
          <div className={`rounded-xl shadow-sm p-6 ${rfq.status === 'quoted' ? 'bg-blue-50 border border-blue-200' : 'bg-white'}`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-slate-900">Quote from Sunglow CNC</h2>
              <span className="text-xs text-slate-500">
                Valid until {new Date(rfq.quote.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-3xl font-black text-slate-900">
                  ₹{rfq.quote.amount.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Inclusive of machining &amp; QC</p>
              </div>
              {rfq.status === 'quoted' && (
                <button
                  onClick={handleApprove}
                  disabled={approving}
                  className="ml-auto bg-brand-red-600 hover:bg-brand-red-700 disabled:bg-brand-red-300 text-white font-bold px-8 py-3 rounded-lg transition-colors text-sm"
                >
                  {approving ? 'Approving...' : 'Approve Quote & Place Order'}
                </button>
              )}
            </div>
            {rfq.quote.notes && (
              <p className="text-sm text-slate-600 mt-3 pt-3 border-t border-blue-200">{rfq.quote.notes}</p>
            )}
          </div>
        )}

        {/* No quote yet */}
        {!rfq.quote && rfq.status === 'pending' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
            <p className="text-yellow-800 font-semibold text-sm">Quote Pending</p>
            <p className="text-yellow-600 text-xs mt-1">Our engineering team is reviewing your RFQ. You will be notified within 24 hours.</p>
          </div>
        )}

        {/* Order Tracker */}
        {rfq.order && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-slate-900">Order Tracker</h2>
                <p className="text-xs text-slate-400 mt-0.5">Order #{rfq.order.orderNumber}</p>
              </div>
              <span className="text-lg font-bold text-brand-red-600">
                ₹{rfq.order.amount.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Step tracker */}
            <div className="flex items-center">
              {orderSteps.map((step, idx) => {
                const done = idx <= currentOrderStep
                const active = idx === currentOrderStep
                return (
                  <div key={step.key} className="flex-1 flex flex-col items-center relative">
                    {idx < orderSteps.length - 1 && (
                      <div className={`absolute top-4 left-1/2 w-full h-0.5 ${idx < currentOrderStep ? 'bg-brand-red-500' : 'bg-slate-200'}`} />
                    )}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 text-xs font-bold ${
                      active ? 'bg-brand-red-600 text-white ring-4 ring-brand-red-100'
                        : done ? 'bg-brand-red-500 text-white'
                        : 'bg-slate-200 text-slate-400'
                    }`}>
                      {done && !active ? '✓' : idx + 1}
                    </div>
                    <p className={`text-xs mt-2 font-medium text-center ${active ? 'text-brand-red-600' : done ? 'text-slate-600' : 'text-slate-400'}`}>
                      {step.label}
                    </p>
                  </div>
                )
              })}
            </div>

            {rfq.order.notes && (
              <p className="text-sm text-slate-600 mt-4 pt-4 border-t border-slate-100">{rfq.order.notes}</p>
            )}
            {rfq.order.shippedAt && (
              <p className="text-xs text-teal-600 mt-2">Shipped on {new Date(rfq.order.shippedAt).toLocaleDateString('en-IN')}</p>
            )}
            {rfq.order.completedAt && (
              <p className="text-xs text-green-600 mt-1">Completed on {new Date(rfq.order.completedAt).toLocaleDateString('en-IN')}</p>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
