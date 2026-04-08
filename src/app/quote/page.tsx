'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'react-toastify'

const materials = [
  { group: 'Aluminium', items: ['6061-T6', '7075-T6', '2024-T4', '5083'] },
  { group: 'Stainless Steel', items: ['304', '316L', '17-4 PH', '410', '420'] },
  { group: 'Carbon / Tool Steel', items: ['Mild Steel', '4340', 'H13', 'D2', 'EN31'] },
  { group: 'Titanium', items: ['Ti-6Al-4V (Grade 5)', 'Grade 2 Pure Ti'] },
  { group: 'Copper / Brass', items: ['C110 Copper', 'Brass 360', 'Bronze'] },
  { group: 'Plastics', items: ['PEEK', 'PTFE', 'Nylon 66', 'Delrin (POM)', 'ABS', 'Polycarbonate'] },
  { group: 'Superalloys', items: ['Inconel 718', 'Inconel 625', 'Hastelloy C-276', 'Monel 400'] },
]

const toleranceOptions = [
  { label: 'Standard ±0.1mm', value: '±0.1mm' },
  { label: 'Precision ±0.05mm', value: '±0.05mm' },
  { label: 'High Precision ±0.02mm', value: '±0.02mm' },
  { label: 'Ultra Precision ±0.01mm', value: '±0.01mm' },
  { label: 'Custom (specify in notes)', value: 'custom' },
]

const finishOptions = [
  'As-Machined', 'Anodised (Natural)', 'Anodised (Black)', 'Anodised (Colour)',
  'Hard Anodised', 'Electroless Nickel', 'Electroplated Zinc', 'Powder Coat',
  'Passivated (SS)', 'Polished', 'Bead Blasted',
]

export default function QuotePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    title: '',
    materialGroup: '',
    materialItem: '',
    tolerance: '±0.05mm',
    customTolerance: '',
    finish: 'As-Machined',
    quantity: '1',
    description: '',
    notes: '',
    fileUrl: '',
    fileName: '',
  })

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const selectedGroup = materials.find((m) => m.group === form.materialGroup)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok) {
        set('fileUrl', data.url)
        set('fileName', data.name)
        toast.success(`File uploaded: ${data.name}`)
      } else {
        toast.error(data.error || 'Upload failed')
      }
    } catch {
      toast.error('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async () => {
    if (!form.title || !form.materialGroup || !form.quantity) {
      toast.error('Please fill in all required fields')
      return
    }
    setSubmitting(true)
    try {
      const material = form.materialItem
        ? `${form.materialGroup} ${form.materialItem}`
        : form.materialGroup

      const tolerance = form.tolerance === 'custom' ? form.customTolerance : form.tolerance

      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          material,
          tolerance,
          quantity: parseInt(form.quantity),
          priority: 'normal',
          notes: `Surface Finish: ${form.finish}\n${form.notes}`,
          fileUrl: form.fileUrl || undefined,
          fileName: form.fileName || undefined,
        }),
      })

      if (res.ok) {
        setStep(3)
      } else {
        const data = await res.json()
        if (data.error === 'Unauthorized') {
          toast.error('Please log in to submit a quote request')
          router.push('/login?redirect=/quote')
        } else {
          toast.error(data.error || 'Failed to submit')
        }
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✓</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Quote Request Submitted!</h1>
          <p className="text-slate-500 text-sm mb-6">
            Our engineering team will review your requirements and send a detailed quote within <strong>24 hours</strong>.
            You&apos;ll receive an email notification once ready.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/dashboard/rfq"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Track Your RFQ
            </Link>
            <button
              onClick={() => { setStep(1); setForm({ title: '', materialGroup: '', materialItem: '', tolerance: '±0.05mm', customTolerance: '', finish: 'As-Machined', quantity: '1', description: '', notes: '', fileUrl: '', fileName: '' }) }}
              className="text-slate-500 hover:text-slate-700 text-sm py-2"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-orange-600 font-black text-xl">SUNGLOW</span>
          <span className="text-slate-600 font-light text-sm">CNC</span>
        </Link>
        <div className="text-sm text-slate-500">
          Have an account?{' '}
          <Link href="/login" className="text-orange-600 hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-orange-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                {step > s ? '✓' : s}
              </div>
              <span className={`text-sm font-medium ${step >= s ? 'text-slate-900' : 'text-slate-400'}`}>
                {s === 1 ? 'Component Details' : 'Files & Notes'}
              </span>
              {s < 2 && <div className="w-12 h-0.5 bg-slate-200 mx-1" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Get an Instant Quote</h1>
                <p className="text-slate-500 text-sm mt-1">Tell us about your component and we&apos;ll get back within 24 hours.</p>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Component Name / Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="e.g., Impeller Housing — 3-inch"
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Material */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Material Family *</label>
                  <select
                    value={form.materialGroup}
                    onChange={(e) => { set('materialGroup', e.target.value); set('materialItem', '') }}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option value="">Select...</option>
                    {materials.map((m) => (
                      <option key={m.group} value={m.group}>{m.group}</option>
                    ))}
                  </select>
                </div>
                {selectedGroup && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Grade / Alloy</label>
                    <select
                      value={form.materialItem}
                      onChange={(e) => set('materialItem', e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                    >
                      <option value="">Any / specify in notes</option>
                      {selectedGroup.items.map((i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Tolerance & Quantity */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tolerance</label>
                  <select
                    value={form.tolerance}
                    onChange={(e) => set('tolerance', e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    {toleranceOptions.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity *</label>
                  <input
                    type="number"
                    min={1}
                    value={form.quantity}
                    onChange={(e) => set('quantity', e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {form.tolerance === 'custom' && (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Custom Tolerance *</label>
                  <input
                    type="text"
                    value={form.customTolerance}
                    onChange={(e) => set('customTolerance', e.target.value)}
                    placeholder="e.g., H7/g6 shaft/hole fit"
                    className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              )}

              {/* Surface Finish */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Surface Finish</label>
                <div className="flex flex-wrap gap-2">
                  {finishOptions.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => set('finish', f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        form.finish === f
                          ? 'bg-orange-600 text-white border-orange-600'
                          : 'border-slate-200 text-slate-600 hover:border-orange-400 hover:text-orange-600'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!form.title || !form.materialGroup || !form.quantity}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-bold py-3 rounded-lg transition-colors"
              >
                Next: Add Files →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Upload Files &amp; Notes</h2>
                <p className="text-slate-500 text-sm mt-1">Attach your CAD or drawing files to get a more accurate quote.</p>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">CAD / Drawing File (optional)</label>
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                    form.fileUrl ? 'border-green-300 bg-green-50' : 'border-slate-300 hover:border-orange-400 hover:bg-orange-50'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {form.fileUrl ? (
                    <div>
                      <p className="text-green-700 font-semibold text-sm">✓ {form.fileName}</p>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); set('fileUrl', ''); set('fileName', '') }}
                        className="text-xs text-red-500 mt-2 hover:underline"
                      >
                        Remove file
                      </button>
                    </div>
                  ) : uploading ? (
                    <div className="flex items-center justify-center gap-2 text-slate-500">
                      <div className="w-5 h-5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm">Uploading...</span>
                    </div>
                  ) : (
                    <div>
                      <div className="text-4xl mb-3">📁</div>
                      <p className="text-slate-700 font-medium text-sm">Click or drag your file here</p>
                      <p className="text-slate-400 text-xs mt-1">STEP • STP • STL • DWG • DXF • IGES • PDF • PNG</p>
                      <p className="text-slate-400 text-xs">Maximum 50 MB</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".step,.stp,.stl,.iges,.igs,.dwg,.dxf,.sat,.ipt,.prt,.sldprt,.pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Component Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  placeholder="Describe the component function, any critical features, reference drawings..."
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Notes</label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  placeholder="Delivery timeline, special packaging, export compliance, inspection requirements..."
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 font-medium text-sm"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  {submitting ? 'Submitting...' : 'Submit Quote Request'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center text-xs text-slate-400">
          <span>✓ Response within 24 hours</span>
          <span>✓ No commitment quote</span>
          <span>✓ ISO 9001 processes</span>
          <span>✓ Trusted by Bharat Biotech, BEL & more</span>
        </div>
      </div>
    </div>
  )
}
