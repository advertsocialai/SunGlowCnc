import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Sunglow CNC Technics | Precision Machined Components Since 2003',
  description:
    'Leading CNC precision machining company in Hyderabad. Serving Pharma, Defence, Aerospace, EV & Automotive industries since 2003. Clients include Bharat Biotech, BEL, BHEL, Gland Pharma.',
  keywords:
    'CNC machining, precision components, Hyderabad, pharma components, defence hardware, aerospace machining, EV battery casings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
