import type { Metadata } from 'next'
import { Cairo, IBM_Plex_Sans_Arabic } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cairo = Cairo({ 
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo"
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({ 
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans-arabic"
});

export const metadata: Metadata = {
  title: 'بصمة الإدراك | Basmat Alidrak',
  description: 'حلول تكنولوجيا معلومات متكاملة - Web Development, Hosting, Cybersecurity Solutions',
  generator: 'Next.js',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${ibmPlexSansArabic.variable}`}>
      <body className="font-cairo antialiased overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
