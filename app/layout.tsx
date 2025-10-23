import type { Metadata } from 'next'
import { Inter, Dancing_Script } from 'next/font/google'
import './globals.css'
import { business } from '@/lib/settings'
import FixedCtas from '@/components/FixedCtas'

const inter = Inter({ subsets: ['latin'] })
const script = Dancing_Script({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-script' })

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    template: '%s | ' + business.name,
    default: `${business.name} – Güzellik ve Bakım`,
  },
  description: `Mobil öncelikli randevu ile ${business.name}. Cilt bakımı, lazer epilasyon ve daha fazlası.`,
  openGraph: {
    title: `${business.name} – Güzellik ve Bakım`,
    description: `${business.name}'de cilt bakımı, lazer epilasyon ve daha fazlası. Hızlıca randevu alın.`,
    url: business.baseUrl,
    siteName: business.name,
    type: 'website',
    locale: 'tr_TR',
  },
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 1 },
}

import NavBar from '@/components/NavBar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={script.variable}>
      <body className={inter.className}>
        <NavBar />
        {children}
        <FixedCtas />
      </body>
    </html>
  )
}
