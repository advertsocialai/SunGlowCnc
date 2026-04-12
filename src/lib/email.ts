/**
 * Email notification service.
 *
 * Currently logs to console. To enable real email:
 * 1. npm install nodemailer @types/nodemailer
 * 2. Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS to .env.local
 * 3. Replace the console.log blocks below with nodemailer transporter.sendMail(...)
 *
 * Alternatively, use Resend (npm install resend) with RESEND_API_KEY.
 */

interface EmailPayload {
  to: string
  subject: string
  html: string
}

async function sendEmail(payload: EmailPayload): Promise<void> {
  // ── Production: replace this block with your email provider ──────────────
  // import nodemailer from 'nodemailer'
  // const transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: Number(process.env.SMTP_PORT),
  //   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  // })
  // await transporter.sendMail({ from: '"Sunglow CNC" <Sunglowcnctechnics@gmail.com>', ...payload })

  // ── Development stub ──────────────────────────────────────────────────────
  console.log('[EMAIL]', {
    to: payload.to,
    subject: payload.subject,
    preview: payload.html.replace(/<[^>]+>/g, '').slice(0, 120) + '...',
  })
}

// ── Notification helpers ───────────────────────────────────────────────────────

export async function notifyAdminNewRFQ(params: {
  adminEmail: string
  clientName: string
  clientCompany: string | null
  rfqTitle: string
  rfqId: string
}) {
  await sendEmail({
    to: params.adminEmail,
    subject: `New RFQ: ${params.rfqTitle}`,
    html: `
      <h2>New RFQ Received</h2>
      <p><strong>Client:</strong> ${params.clientName} ${params.clientCompany ? `(${params.clientCompany})` : ''}</p>
      <p><strong>Component:</strong> ${params.rfqTitle}</p>
      <p><strong>RFQ ID:</strong> ${params.rfqId}</p>
      <p><a href="${process.env.NEXTAUTH_URL}/dashboard/admin">View in Admin Dashboard →</a></p>
    `,
  })
}

export async function notifyClientQuoteReady(params: {
  clientEmail: string
  clientName: string
  rfqTitle: string
  quoteAmount: number
  validUntil: Date
}) {
  await sendEmail({
    to: params.clientEmail,
    subject: `Quote Ready: ${params.rfqTitle}`,
    html: `
      <h2>Your Quote is Ready</h2>
      <p>Dear ${params.clientName},</p>
      <p>We have reviewed your RFQ <strong>"${params.rfqTitle}"</strong> and prepared a quote.</p>
      <p><strong>Quote Amount:</strong> ₹${params.quoteAmount.toLocaleString('en-IN')}</p>
      <p><strong>Valid Until:</strong> ${params.validUntil.toLocaleDateString('en-IN')}</p>
      <p>Please log in to your dashboard to review and approve the quote.</p>
      <p><a href="${process.env.NEXTAUTH_URL}/dashboard/rfq">View Your Quote →</a></p>
      <br/>
      <p>Best regards,<br/>Sunglow CNC Technics Team</p>
    `,
  })
}

export async function notifyClientOrderUpdate(params: {
  clientEmail: string
  clientName: string
  rfqTitle: string
  orderNumber: string
  status: string
}) {
  const statusLabels: Record<string, string> = {
    in_production: 'In Production — our team has started manufacturing your components.',
    quality_check: 'Quality Check — your parts are undergoing final inspection.',
    shipped: 'Shipped — your order is on its way.',
    completed: 'Completed — your order has been delivered.',
  }

  await sendEmail({
    to: params.clientEmail,
    subject: `Order Update: ${params.orderNumber} — ${params.rfqTitle}`,
    html: `
      <h2>Order Status Update</h2>
      <p>Dear ${params.clientName},</p>
      <p>Your order <strong>${params.orderNumber}</strong> for <strong>"${params.rfqTitle}"</strong> has been updated.</p>
      <p><strong>Status:</strong> ${statusLabels[params.status] ?? params.status}</p>
      <p><a href="${process.env.NEXTAUTH_URL}/dashboard">View Order Status →</a></p>
      <br/>
      <p>Best regards,<br/>Sunglow CNC Technics Team</p>
    `,
  })
}

export async function notifyContactReceived(params: {
  adminEmail: string
  name: string
  email: string
  company: string | null
  message: string
}) {
  await sendEmail({
    to: params.adminEmail,
    subject: `New Contact Inquiry from ${params.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${params.name}</p>
      <p><strong>Email:</strong> ${params.email}</p>
      ${params.company ? `<p><strong>Company:</strong> ${params.company}</p>` : ''}
      <p><strong>Message:</strong><br/>${params.message}</p>
      <p><a href="${process.env.NEXTAUTH_URL}/dashboard/admin/contacts">View in Admin →</a></p>
    `,
  })
}
