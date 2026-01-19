import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'

// Optimized font loading
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://regisbridge.page'),
  title: {
    default: 'Regisbridge Academy - Excellence in Education Since 1974',
    template: '%s | Regisbridge Academy',
  },
  description: 'Regisbridge Academy offers world-class education from Early Childhood through A-Level with exceptional boarding facilities. 100% pass rate, 98% university acceptance. Apply now for excellence in education and character development.',
  keywords: [
    'Regisbridge Academy',
    'private school Zimbabwe',
    'boarding school',
    'A-Level education',
    'early childhood development',
    'primary school',
    'high school',
    'international education',
    'best school Zimbabwe',
    'academic excellence',
  ],
  authors: [{ name: 'Regisbridge Academy' }],
  creator: 'Regisbridge Academy',
  publisher: 'Regisbridge Academy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://regisbridge.page',
    siteName: 'Regisbridge Academy',
    title: 'Regisbridge Academy - Excellence in Education Since 1974',
    description: 'World-class education from Early Childhood through A-Level. 100% pass rate, 98% university acceptance. Join our boarding community.',
    images: [
      {
        url: 'https://regisbridge.page/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Regisbridge Academy Campus',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regisbridge Academy - Excellence in Education Since 1974',
    description: 'World-class education from Early Childhood through A-Level. 100% pass rate, 98% university acceptance.',
    images: ['https://regisbridge.page/og-image.jpg'],
    creator: '@regisbridgeacademy',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'verification-token',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`light ${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/logo.png" as="image" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: 'Regisbridge Academy',
              alternateName: 'Regisbridge School',
              url: 'https://regisbridge.page',
              logo: 'https://regisbridge.page/logo.png',
              description: 'Premier boarding and day school offering education from Early Childhood through A-Level',
              foundingDate: '1974',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'ZW',
              },
              sameAs: [
                'https://facebook.com/regisbridgeacademy',
                'https://twitter.com/regisbridgeacademy',
                'https://linkedin.com/school/regisbridge-academy',
              ],
              offers: {
                '@type': 'Offer',
                category: 'Education',
                description: 'Comprehensive education programs from Early Childhood Development through A-Level',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
