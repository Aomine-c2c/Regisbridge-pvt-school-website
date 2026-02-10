import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { getSettings } from '@/lib/settings'

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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const schoolName = settings.schoolName || 'Regisbridge Academy';
  const motto = settings.motto || 'Excellence in Education';
  const estYear = settings.establishmentYear || '2015';

  return {
    metadataBase: new URL('https://regisbridge.page'),
    title: {
      default: `${schoolName} - ${motto} Since ${estYear}`,
      template: `%s | ${schoolName}`,
    },
    description: `${schoolName} offers world-class education from Early Childhood through A-Level with exceptional boarding facilities. 100% pass rate, 98% university acceptance. Apply now for excellence in education and character development.`,
    keywords: [
      schoolName,
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
    authors: [{ name: schoolName }],
    creator: schoolName,
    publisher: schoolName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://regisbridge.page',
      siteName: schoolName,
      title: `${schoolName} - Excellence in Education Since ${estYear}`,
      description: `World-class education from Early Childhood through A-Level. 100% pass rate, 98% university acceptance. Join our boarding community.`,
      images: [
        {
          url: 'https://regisbridge.page/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${schoolName} Campus`,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${schoolName} - Excellence in Education Since ${estYear}`,
      description: `World-class education from Early Childhood through A-Level. 100% pass rate, 98% university acceptance.`,
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
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSettings();
  const schoolName = settings.schoolName || 'Regisbridge Academy';
  const estYear = settings.establishmentYear || '2015';

  return (
    <html lang="en" className={`light ${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Preload critical assets */}
        <link rel="preload" href="/logo.png" as="image" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'EducationalOrganization',
              name: schoolName,
              alternateName: schoolName.includes(' Academy') 
                ? schoolName.replace(' Academy', ' School') 
                : schoolName.includes(' School') 
                  ? schoolName.replace(' School', ' Academy')
                  : schoolName,
              url: 'https://regisbridge.page',
              logo: 'https://regisbridge.page/logo.png',
              description: settings.motto || 'Premier boarding and day school offering education from Early Childhood through A-Level',
              foundingDate: estYear,
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'ZW',
                streetAddress: settings.schoolAddress,
              },
              sameAs: [
                settings.facebookUrl,
                settings.twitterUrl,
                settings.linkedinUrl,
                settings.instagramUrl,
              ].filter(Boolean),
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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
