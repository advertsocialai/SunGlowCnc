'use client'

import { useState, useRef } from 'react'
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
  const [uploading, setUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<{ url: string; name: string; size: number } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({
    title: '', description: '', material: '', customMaterial: '',
    tolerance: '', quantity: '', priority: 'normal', industry: '', notes: '',
  })

  const set = (key: string, val: string) => setForm(prev => ({ ...prev, [key]: val }))

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok) { setUploadedFile({ url: data.url, name: data.name, size: data.size }); toast.success(`File uploaded: ${data.name}`) }
      else toast.error(data.error || 'Upload failed')
    } catch { toast.error('Upload failed. Please try again.') }
    finally { setUploading(false) }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.material || !form.quantity) { toast.error('Please fill in all required fields'); return }
    setLoading(true)
    try {
      const material = form.material === 'Other (specify in notes)' ? form.customMaterial : form.material
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title, description: form.description, material, tolerance: form.tolerance,
          quantity: parseInt(form.quantity), priority: form.priority,
          notes: `${form.industry ? `Industry: ${form.industry}\n` : ''}${form.notes}`,
          fileUrl: uploadedFile?.url, fileName: uploadedFile?.name,
        }),
      })
      if (res.ok) { toast.success('RFQ submitted! We will quote within 24 hours.'); router.push('/dashboard/rfq') }
      else { const data = await res.json(); toast.error(data.error || 'Failed to submit RFQ') }
    } catch { toast.error('Network error. Please try again.') }
    finally { setLoading(false) }
  }

  return (
    <DashboardLayout>
      <div style={{ maxWidth: '760px' }}>
        <div className="mb-4">
          <h1 className="text-white fw-bold mb-1" style={{ fontSize: '1.4rem' }}>Submit New RFQ</h1>
          <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>Request for Quotation — Our team responds within 24 hours</p>
        </div>

        {/* Info banner */}
        <div className="p-3 rounded mb-4 d-flex gap-3" style={{ background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.25)' }}>
          <span style={{ color: '#60a5fa', flexShrink: 0 }}>ℹ</span>
          <div>
            <p className="fw-semibold mb-1" style={{ color: '#93c5fd', fontSize: '0.95rem' }}>How It Works</p>
            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
              Fill in your component requirements. Our engineering team will review and send a detailed quote within 24 hours. Attach CAD files to speed up the process.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="dark-card p-4 d-flex flex-column gap-4">
          {/* Title */}
          <div>
            <label className="form-label-dark">Component Title / Name *</label>
            <input type="text" required value={form.title} onChange={e => set('title', e.target.value)} className="form-control-dark" placeholder="e.g., Star Wheel for Filling Machine — Batch 50" />
          </div>

          {/* Description */}
          <div>
            <label className="form-label-dark">Description / Specifications</label>
            <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} className="form-control-dark" style={{ resize: 'none' }} placeholder="Describe the component, its function, any reference standards, dimensional overview..." />
          </div>

          {/* Material & Industry */}
          <div className="row g-3">
            <div className="col-sm-6">
              <label className="form-label-dark">Material *</label>
              <select required value={form.material} onChange={e => set('material', e.target.value)} className="form-control-dark">
                <option value="">Select material...</option>
                {materials.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div className="col-sm-6">
              <label className="form-label-dark">Industry Sector</label>
              <select value={form.industry} onChange={e => set('industry', e.target.value)} className="form-control-dark">
                <option value="">Select industry...</option>
                {industries.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>

          {form.material === 'Other (specify in notes)' && (
            <div>
              <label className="form-label-dark">Specify Material *</label>
              <input type="text" required value={form.customMaterial} onChange={e => set('customMaterial', e.target.value)} className="form-control-dark" placeholder="e.g., Hastelloy C-276, Monel 400" />
            </div>
          )}

          {/* Tolerance, Quantity, Priority */}
          <div className="row g-3">
            <div className="col-sm-4">
              <label className="form-label-dark">Tolerance</label>
              <input type="text" value={form.tolerance} onChange={e => set('tolerance', e.target.value)} className="form-control-dark" placeholder="e.g., ±0.01mm" />
            </div>
            <div className="col-sm-4">
              <label className="form-label-dark">Quantity *</label>
              <input type="number" required min={1} value={form.quantity} onChange={e => set('quantity', e.target.value)} className="form-control-dark" placeholder="No. of pieces" />
            </div>
            <div className="col-sm-4">
              <label className="form-label-dark">Priority</label>
              <select value={form.priority} onChange={e => set('priority', e.target.value)} className="form-control-dark">
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="form-label-dark">Attach CAD / Drawing File</label>
            <div
              className="rounded text-center p-4"
              style={{ border: '2px dashed var(--dark-border)', cursor: 'pointer', transition: 'border-color 0.2s', background: 'var(--dark-elevated)' }}
              onClick={() => fileInputRef.current?.click()}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--brand-red)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--dark-border)')}
            >
              {uploadedFile ? (
                <div className="text-secondary" style={{ fontSize: '0.95rem' }}>
                  <span style={{ color: '#4ade80' }}>✓ {uploadedFile.name}</span>
                  <span className="text-muted ms-2" style={{ fontSize: '0.88rem' }}>({(uploadedFile.size / 1024).toFixed(0)} KB)</span>
                  <button type="button" onClick={e => { e.stopPropagation(); setUploadedFile(null) }} className="btn btn-link text-danger p-0 ms-3" style={{ fontSize: '0.88rem' }}>Remove</button>
                </div>
              ) : uploading ? (
                <div className="d-flex align-items-center justify-content-center gap-2 text-muted" style={{ fontSize: '0.95rem' }}>
                  <div className="spinner-border spinner-border-sm text-brand-red" style={{ color: 'var(--brand-red)' }} />
                  Uploading...
                </div>
              ) : (
                <div>
                  <p className="text-secondary mb-1" style={{ fontSize: '0.95rem' }}>Click to upload or drag &amp; drop</p>
                  <p className="text-muted mb-0" style={{ fontSize: '0.88rem' }}>.STEP .STP .STL .DWG .DXF .PDF .IGES — max 50 MB</p>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" className="d-none"
              accept=".step,.stp,.stl,.iges,.igs,.dwg,.dxf,.sat,.ipt,.prt,.sldprt,.pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange} />
          </div>

          {/* Notes */}
          <div>
            <label className="form-label-dark">Additional Notes</label>
            <textarea rows={4} value={form.notes} onChange={e => set('notes', e.target.value)} className="form-control-dark" style={{ resize: 'none' }} placeholder="Special requirements, surface finish specs, delivery timeline..." />
          </div>

          {/* Actions */}
          <div className="d-flex gap-3">
            <button type="submit" disabled={loading} className="btn-brand flex-grow-1 justify-content-center" style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Submitting RFQ...' : 'Submit RFQ'}
            </button>
            <button type="button" onClick={() => router.back()} className="btn-brand-outline px-4">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
