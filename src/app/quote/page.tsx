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
    title: '', materialGroup: '', materialItem: '',
    tolerance: '±0.05mm', customTolerance: '',
    finish: 'As-Machined', quantity: '1',
    description: '', notes: '', fileUrl: '', fileName: '',
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
      if (res.ok) { set('fileUrl', data.url); set('fileName', data.name); toast.success(`File uploaded: ${data.name}`) }
      else toast.error(data.error || 'Upload failed')
    } catch { toast.error('Upload failed. Please try again.') }
    finally { setUploading(false) }
  }

  const handleSubmit = async () => {
    if (!form.title || !form.materialGroup || !form.quantity) {
      toast.error('Please fill in all required fields')
      return
    }
    setSubmitting(true)
    try {
      const material = form.materialItem ? `${form.materialGroup} ${form.materialItem}` : form.materialGroup
      const tolerance = form.tolerance === 'custom' ? form.customTolerance : form.tolerance
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title, description: form.description, material, tolerance,
          quantity: parseInt(form.quantity), priority: 'normal',
          notes: `Surface Finish: ${form.finish}\n${form.notes}`,
          fileUrl: form.fileUrl || undefined, fileName: form.fileName || undefined,
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
    } catch { toast.error('Network error. Please try again.') }
    finally { setSubmitting(false) }
  }

  if (step === 3) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center px-3" style={{ background: 'var(--dark-bg)' }}>
        <div className="dark-card p-5 text-center w-100" style={{ maxWidth: '440px' }}>
          <div
            className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
            style={{ width: 64, height: 64, background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', fontSize: '1.75rem', color: '#4ade80' }}
          >
            ✓
          </div>
          <h1 className="text-white fw-bold mb-2" style={{ fontSize: '1.3rem' }}>Quote Request Submitted!</h1>
          <p className="text-secondary mb-4" style={{ fontSize: '0.95rem' }}>
            Our engineering team will review your requirements and send a detailed quote within <strong className="text-white">24 hours</strong>.
            You&apos;ll receive an email notification once ready.
          </p>
          <div className="d-flex flex-column gap-2">
            <Link href="/dashboard/rfq" className="btn-brand justify-content-center">
              Track Your RFQ
            </Link>
            <button
              onClick={() => { setStep(1); setForm({ title: '', materialGroup: '', materialItem: '', tolerance: '±0.05mm', customTolerance: '', finish: 'As-Machined', quantity: '1', description: '', notes: '', fileUrl: '', fileName: '' }) }}
              className="btn p-2 text-muted"
              style={{ fontSize: '0.95rem' }}
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-vh-100" style={{ background: 'var(--dark-bg)' }}>
      {/* Top bar */}
      <div style={{ background: 'var(--dark-card)', borderBottom: '1px solid var(--dark-border)' }}>
        <div className="container-xl py-3 d-flex align-items-center justify-content-between">
          <Link href="/" className="d-flex align-items-center gap-2 text-decoration-none">
            <span className="fw-black" style={{ color: 'var(--brand-red)', fontSize: '1.15rem' }}>SUNGLOW</span>
            <span className="text-muted" style={{ fontSize: '0.95rem', fontWeight: 300 }}>CNC</span>
          </Link>
          <div className="text-muted" style={{ fontSize: '0.95rem' }}>
            Have an account?{' '}
            <Link href="/login" className="fw-medium text-decoration-none" style={{ color: 'var(--brand-red)' }}>Sign in</Link>
          </div>
        </div>
      </div>

      <div className="container-xl py-5" style={{ maxWidth: '700px' }}>
        {/* Progress */}
        <div className="d-flex align-items-center gap-3 mb-5">
          {[1, 2].map((s) => (
            <div key={s} className="d-flex align-items-center gap-2">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                style={{
                  width: 32, height: 32, fontSize: '0.92rem',
                  background: step >= s ? 'var(--brand-red)' : 'var(--dark-elevated)',
                  color: step >= s ? '#fff' : '#6b7280',
                  border: `1px solid ${step >= s ? 'var(--brand-red)' : 'var(--dark-border)'}`,
                }}
              >
                {step > s ? '✓' : s}
              </div>
              <span className="fw-medium" style={{ fontSize: '0.95rem', color: step >= s ? '#fff' : '#6b7280' }}>
                {s === 1 ? 'Component Details' : 'Files & Notes'}
              </span>
              {s < 2 && <div style={{ width: 40, height: 2, background: 'var(--dark-border)', margin: '0 4px' }} />}
            </div>
          ))}
        </div>

        <div className="dark-card p-4 p-md-5">
          {step === 1 && (
            <div className="d-flex flex-column gap-4">
              <div>
                <h1 className="text-white fw-bold mb-1" style={{ fontSize: '1.4rem' }}>Get an Instant Quote</h1>
                <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>Tell us about your component and we&apos;ll get back within 24 hours.</p>
              </div>

              <div>
                <label className="form-label-dark">Component Name / Title *</label>
                <input
                  type="text" value={form.title} onChange={(e) => set('title', e.target.value)}
                  placeholder="e.g., Impeller Housing — 3-inch" className="form-control-dark"
                />
              </div>

              <div className="row g-3">
                <div className="col-sm-6">
                  <label className="form-label-dark">Material Family *</label>
                  <select value={form.materialGroup} onChange={(e) => { set('materialGroup', e.target.value); set('materialItem', '') }} className="form-control-dark">
                    <option value="">Select...</option>
                    {materials.map((m) => <option key={m.group} value={m.group}>{m.group}</option>)}
                  </select>
                </div>
                {selectedGroup && (
                  <div className="col-sm-6">
                    <label className="form-label-dark">Grade / Alloy</label>
                    <select value={form.materialItem} onChange={(e) => set('materialItem', e.target.value)} className="form-control-dark">
                      <option value="">Any / specify in notes</option>
                      {selectedGroup.items.map((i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </div>
                )}
              </div>

              <div className="row g-3">
                <div className="col-sm-6">
                  <label className="form-label-dark">Tolerance</label>
                  <select value={form.tolerance} onChange={(e) => set('tolerance', e.target.value)} className="form-control-dark">
                    {toleranceOptions.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div className="col-sm-6">
                  <label className="form-label-dark">Quantity *</label>
                  <input type="number" min={1} value={form.quantity} onChange={(e) => set('quantity', e.target.value)} className="form-control-dark" />
                </div>
              </div>

              {form.tolerance === 'custom' && (
                <div>
                  <label className="form-label-dark">Custom Tolerance *</label>
                  <input type="text" value={form.customTolerance} onChange={(e) => set('customTolerance', e.target.value)} placeholder="e.g., H7/g6 shaft/hole fit" className="form-control-dark" />
                </div>
              )}

              <div>
                <label className="form-label-dark">Surface Finish</label>
                <div className="d-flex flex-wrap gap-2">
                  {finishOptions.map((f) => (
                    <button
                      key={f} type="button" onClick={() => set('finish', f)}
                      className="btn px-3 py-1"
                      style={{
                        fontSize: '0.88rem', fontWeight: 500, borderRadius: '6px',
                        background: form.finish === f ? 'var(--brand-red)' : 'var(--dark-elevated)',
                        color: form.finish === f ? '#fff' : 'var(--text-secondary)',
                        border: `1px solid ${form.finish === f ? 'var(--brand-red)' : 'var(--dark-border)'}`,
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!form.title || !form.materialGroup || !form.quantity}
                className="btn-brand justify-content-center w-100"
                style={{ opacity: (!form.title || !form.materialGroup || !form.quantity) ? 0.5 : 1 }}
              >
                Next: Add Files →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="d-flex flex-column gap-4">
              <div>
                <h2 className="text-white fw-bold mb-1" style={{ fontSize: '1.2rem' }}>Upload Files &amp; Notes</h2>
                <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>Attach your CAD or drawing files to get a more accurate quote.</p>
              </div>

              <div>
                <label className="form-label-dark">CAD / Drawing File (optional)</label>
                <div
                  className="rounded text-center p-4"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `2px dashed ${form.fileUrl ? 'rgba(74,222,128,0.4)' : 'var(--dark-border)'}`,
                    background: form.fileUrl ? 'rgba(74,222,128,0.06)' : 'var(--dark-elevated)',
                    cursor: 'pointer',
                  }}
                >
                  {form.fileUrl ? (
                    <div>
                      <p className="fw-semibold mb-1" style={{ color: '#4ade80', fontSize: '0.95rem' }}>✓ {form.fileName}</p>
                      <button type="button" onClick={(e) => { e.stopPropagation(); set('fileUrl', ''); set('fileName', '') }} className="btn p-0 text-danger" style={{ fontSize: '0.88rem' }}>
                        Remove file
                      </button>
                    </div>
                  ) : uploading ? (
                    <div className="d-flex align-items-center justify-content-center gap-2 text-muted">
                      <div className="spinner-border spinner-border-sm" style={{ color: 'var(--brand-red)' }} />
                      <span style={{ fontSize: '0.95rem' }}>Uploading...</span>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-2" style={{ fontSize: '2rem' }}>📁</div>
                      <p className="text-secondary fw-medium mb-1" style={{ fontSize: '0.95rem' }}>Click or drag your file here</p>
                      <p className="text-muted mb-0" style={{ fontSize: '0.85rem' }}>STEP · STP · STL · DWG · DXF · IGES · PDF · PNG — max 50 MB</p>
                    </div>
                  )}
                </div>
                <input ref={fileInputRef} type="file" className="d-none"
                  accept=".step,.stp,.stl,.iges,.igs,.dwg,.dxf,.sat,.ipt,.prt,.sldprt,.pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange} />
              </div>

              <div>
                <label className="form-label-dark">Component Description</label>
                <textarea rows={3} value={form.description} onChange={(e) => set('description', e.target.value)}
                  placeholder="Describe the component function, any critical features, reference drawings..."
                  className="form-control-dark" style={{ resize: 'none' }} />
              </div>

              <div>
                <label className="form-label-dark">Additional Notes</label>
                <textarea rows={3} value={form.notes} onChange={(e) => set('notes', e.target.value)}
                  placeholder="Delivery timeline, special packaging, export compliance, inspection requirements..."
                  className="form-control-dark" style={{ resize: 'none' }} />
              </div>

              <div className="d-flex gap-3">
                <button onClick={() => setStep(1)} className="btn-brand-outline px-4">← Back</button>
                <button onClick={handleSubmit} disabled={submitting} className="btn-brand flex-grow-1 justify-content-center" style={{ opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? 'Submitting...' : 'Submit Quote Request'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Trust badges */}
        <div className="d-flex flex-wrap gap-3 justify-content-center mt-4 text-muted" style={{ fontSize: '0.88rem' }}>
          <span>✓ Response within 24 hours</span>
          <span>✓ No commitment quote</span>
          <span>✓ ISO 9001 processes</span>
          <span>✓ Trusted by Bharat Biotech, BEL &amp; more</span>
        </div>
      </div>
    </div>
  )
}
