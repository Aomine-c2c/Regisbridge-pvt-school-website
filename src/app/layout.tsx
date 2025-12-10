import type { Metadata } from 'next'
import { Playfair_Display, Poppins, Lato, Merriweather } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/AuthContext"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { PWAInstallPrompt } from "@/components/ui/PWAInstallPrompt"
import { ChatWidget } from "@/components/ui/ChatWidget"
import { VideoConferenceButton } from "@/components/ui/VideoConferenceButton"
import { QueryProvider } from "@/components/QueryProvider"
import ThemeToggle from "@/components/ThemeToggle"
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getAllStructuredData } from '@/lib/structured-data'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
})

const poppins = Poppins({ 
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
})

const lato = Lato({ 
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['300', '400', '700'],
})

const merriweather = Merriweather({ 
  subsets: ['latin'],
  variable: '--font-merriweather',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://regisbridge.page'),
  title: {
    default: 'Regisbridge Private School | Premier Education in Zimbabwe',
    template: '%s | Regisbridge Private School',
  },
  description: 'Regisbridge Private School - A distinguished private day and boarding school in Zimbabwe offering ECD A through Grade 7. 83.5% Grade 7 pass rate, modern facilities, Cambridge curriculum. Supervincimus - We Conquer Together.',
  keywords: [
    'private school Zimbabwe',
    'boarding school Zimbabwe',
    'Regisbridge School',
    'primary school Mhondoro',
    'Cambridge curriculum Zimbabwe',
    'day and boarding school',
    'quality education Zimbabwe',
    'Ngezi private school',
    'Grade 7 education',
    'ECD Zimbabwe',
  ],
  authors: [{ name: 'Regisbridge Private School', url: 'https://regisbridge.page' }],
  creator: 'Regisbridge Private School',
  publisher: 'Regisbridge Private School',
  
  openGraph: {
    type: 'website',
    locale: 'en_ZW',
    url: 'https://regisbridge.page',
    siteName: 'Regisbridge Private School',
    title: 'Regisbridge Private School | Premier Education in Zimbabwe',
    description: 'Distinguished private day and boarding school offering ECD A through Grade 7 with 83.5% pass rate. Modern facilities, Cambridge curriculum, holistic development.',
    images: [
      {
        url: 'https://regisbridge.page/logo.png',
        width: 1200,
        height: 630,
        alt: 'Regisbridge Private School Logo',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Regisbridge Private School | Premier Education in Zimbabwe',
    description: 'Distinguished private day and boarding school in Zimbabwe. ECD A - Grade 7. 83.5% pass rate. Modern facilities.',
    images: ['https://regisbridge.page/logo.png'],
    creator: '@RegisbridgeZW',
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
  
  verification: {
    google: 'P9TTQR09ciYWGHYyCB909tVQ_8wmAHUwmWP8WuyYnvI',
  },
  
  alternates: {
    canonical: 'https://regisbridge.page',
  },
  
  other: {
    'google-adsense-account': 'ca-pub-5031801301729089',
  },
  
  manifest: '/manifest.json',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
    shortcut: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = getAllStructuredData()
  
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} ${lato.variable} ${merriweather.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data (JSON-LD) */}
        {structuredData.map((schema, index) => (
          <script
            key={`schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        
        {/* AdCash AutoTag */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              aclib.runAutoTag({
                zoneId: 'aq4l1ugjce',
              });
            `
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ErrorBoundary>
          <ThemeProvider defaultTheme="light">
            <QueryProvider>
              <AuthProvider>
                <TooltipProvider>
                  {children}
                  <Toaster />
                  <PWAInstallPrompt />
                  <ChatWidget />
                  <VideoConferenceButton />
                  <ThemeToggle />
                </TooltipProvider>
              </AuthProvider>
            </QueryProvider>
          </ThemeProvider>
        </ErrorBoundary>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
