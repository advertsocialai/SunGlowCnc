import nodemailer from 'nodemailer'

interface EmailPayload {
  to: string
  subject: string
  html: string
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

async function sendEmail(payload: EmailPayload): Promise<void> {
  try {
    await transporter.sendMail({
      from: `"Sun Glow CNC Technics" <${process.env.SMTP_USER}>`,
      ...payload,
    })
    console.log('[EMAIL SENT]', { to: payload.to, subject: payload.subject })
  } catch (error) {
    console.error('[EMAIL ERROR]', error)
  }
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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0a1628; padding: 20px; text-align: center;">
          <h1 style="color: #c8202e; margin: 0;">Sun Glow CNC Technics</h1>
        </div>
        <div style="padding: 24px; background: #f9f9f9;">
          <h2 style="color: #0a1628;">New RFQ Received</h2>
          <p><strong>Client:</strong> ${params.clientName} ${params.clientCompany ? `(${params.clientCompany})` : ''}</p>
          <p><strong>Component:</strong> ${params.rfqTitle}</p>
          <p><strong>RFQ ID:</strong> ${params.rfqId}</p>
          <p style="margin-top: 20px;">
            <a href="${process.env.NEXTAUTH_URL}/dashboard/admin" style="background: #c8202e; color: white; padding: 10px 24px; text-decoration: none; border-radius: 4px;">View in Admin Dashboard</a>
          </p>
        </div>
      </div>
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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0a1628; padding: 20px; text-align: center;">
          <h1 style="color: #c8202e; margin: 0;">Sun Glow CNC Technics</h1>
        </div>
        <div style="padding: 24px; background: #f9f9f9;">
          <h2 style="color: #0a1628;">Your Quote is Ready</h2>
          <p>Dear ${params.clientName},</p>
          <p>We have reviewed your RFQ <strong>"${params.rfqTitle}"</strong> and prepared a quote.</p>
          <p><strong>Quote Amount:</strong> ₹${params.quoteAmount.toLocaleString('en-IN')}</p>
          <p><strong>Valid Until:</strong> ${params.validUntil.toLocaleDateString('en-IN')}</p>
          <p>Please log in to your dashboard to review and approve the quote.</p>
          <p style="margin-top: 20px;">
            <a href="${process.env.NEXTAUTH_URL}/dashboard/rfq" style="background: #c8202e; color: white; padding: 10px 24px; text-decoration: none; border-radius: 4px;">View Your Quote</a>
          </p>
          <br/>
          <p>Best regards,<br/>Sun Glow CNC Technics Team</p>
        </div>
      </div>
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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0a1628; padding: 20px; text-align: center;">
          <h1 style="color: #c8202e; margin: 0;">Sun Glow CNC Technics</h1>
        </div>
        <div style="padding: 24px; background: #f9f9f9;">
          <h2 style="color: #0a1628;">Order Status Update</h2>
          <p>Dear ${params.clientName},</p>
          <p>Your order <strong>${params.orderNumber}</strong> for <strong>"${params.rfqTitle}"</strong> has been updated.</p>
          <p><strong>Status:</strong> ${statusLabels[params.status] ?? params.status}</p>
          <p style="margin-top: 20px;">
            <a href="${process.env.NEXTAUTH_URL}/dashboard" style="background: #c8202e; color: white; padding: 10px 24px; text-decoration: none; border-radius: 4px;">View Order Status</a>
          </p>
          <br/>
          <p>Best regards,<br/>Sun Glow CNC Technics Team</p>
        </div>
      </div>
    `,
  })
}

export async function notifyContactReceived(params: {
  adminEmail: string
  name: string
  email: string
  phone: string | null
  company: string | null
  message: string
}) {
  await sendEmail({
    to: params.adminEmail,
    subject: `New Contact Inquiry from ${params.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0a1628; padding: 20px; text-align: center;">
          <h1 style="color: #c8202e; margin: 0;">Sun Glow CNC Technics</h1>
        </div>
        <div style="padding: 24px; background: #f9f9f9;">
          <h2 style="color: #0a1628;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${params.name}</p>
          <p><strong>Email:</strong> ${params.email}</p>
          ${params.phone ? `<p><strong>Phone:</strong> ${params.phone}</p>` : ''}
          ${params.company ? `<p><strong>Company:</strong> ${params.company}</p>` : ''}
          <p><strong>Message:</strong></p>
          <div style="background: white; padding: 12px; border-left: 3px solid #c8202e; margin: 8px 0;">${params.message}</div>
          <p style="margin-top: 20px;">
            <a href="mailto:${params.email}" style="background: #c8202e; color: white; padding: 10px 24px; text-decoration: none; border-radius: 4px;">Reply to ${params.name}</a>
          </p>
        </div>
      </div>
    `,
  })
}
