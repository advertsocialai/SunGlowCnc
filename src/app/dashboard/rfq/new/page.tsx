'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { toast } from 'react-toastify'

const materials = [
  'Aluminium 6061-T6', 'Aluminium 7075-T6', 'Aluminium 2024',
  'Stainless Steel 304', 'Stainless Steel 316L', 'Stainless Steel 17-4 PH',
  'Mild Steel', 'Carbon Steel 4340', 'Tool Steel H13', 'Tool Steel D2',
  'Titanium Ti-6Al-4V', 'Copper', 'Brass', 'Inconel 718',
  'PEEK', 'PTFE', 'Other (specify in notes)',
]

const industries = [
  'Pharma / Medical', 'Defence / Aerospace', 'Automobile / EV',
  'Electronics', 'Energy / Turbine', 'Robotics / Drones',
  'Die & Mould', 'Tool Room / Fixtures', 'General Industrial',
]

export default function NewRFQPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    material: '',
    customMaterial: '',
    tolerance: '',
    quantity: '',
    priority: 'normal',
    industry: '',
    notes: '',
  })

  const set = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.material || !form.quantity) {
      toast.error('Please fill in all required fields')
      return
    }
    setLoading(true)
    try {
      const material = form.material === 'Other (specify in notes)' ? form.customMaterial : form.material
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          material,
          tolerance: form.tolerance,
          quantity: parseInt(form.quantity),
          priority: form.priority,
          notes: `${form.industry ? `Industry: ${form.industry}\n` : ''}${form.notes}`,
        }),
      })

      if (res.ok) {
        toast.success('RFQ submitted successfully! We will review and provide a quote within 24 hours.')
        router.push('/dashboard/rfq')
      } else {
        const data = await res.json()
        toast.error(data.error || 'Failed to submit RFQ')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Submit New RFQ</h1>
          <p className="text-slate-500 text-sm mt-1">Request for Quotation — Our team will respond within 24 hours</p>
        </div>

        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex gap-3">
            <div className="text-blue-500 flex-shrink-0 mt-0.5">ℹ</div>
            <div>
              <p className="text-sm font-semibold text-blue-800">How It Works</p>
              <p className="text-xs text-blue-600 mt-1">
                Fill in your component requirements below. Our engineering team will review your RFQ and send a detailed quote
                within 24 hours. You can also attach CAD files by mentioning file names in the notes.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Component Title / Name *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="e.g., Star Wheel for Filling Machine - Batch 50"
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description / Specifications
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Describe the component, its function, any reference standards, dimensional overview..."
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Material & Industry */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Material *</label>
              <select
                required
                value={form.material}
                onChange={(e) => set('material', e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                <option value="">Select material...</option>
                {materials.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Industry Sector</label>
              <select
                value={form.industry}
                onChange={(e) => set('industry', e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
              >
                <option value="">Select industry...</option>
                {industries.map((i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
          </div>

          {form.material === 'Other (specify in notes)' && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Specify Material *</label>
              <input
                type="text"
                required
                value={form.customMaterial}
                onChange={(e) => set('customMaterial', e.target.value)}
                placeholder="e.g., Hastelloy C-276, Monel 400"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}

          {/* Tolerance & Quantity */}
          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Tolerance</label>
              <input
                type="text"
                value={form.tolerance}
                onChange={(e) => set('tolerance', e.target.value)}
                placeholder="e.g., ±0.01mm"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity *</label>
              <input
                type="number"
                required
                min={1}
                value={form.quantity}
                onChange={(e) => set('quantity', e.target.value)}
                placeholder="Number of pieces"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => set('priority', e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Notes / File References</label>
            <textarea
              rows={4}
              value={form.notes}
              onChange={(e) => set('notes', e.target.value)}
              placeholder="Any special requirements, surface finish specs, references to drawing files (e.g., DWG-001.STEP), delivery timeline requirements..."
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? 'Submitting RFQ...' : 'Submit RFQ'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
