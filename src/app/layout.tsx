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
  title: 'Regisbridge Private School - Empowering Minds, Shaping Futures',
  description: 'Regisbridge Private School - A distinguished private day and boarding school in Zimbabwe offering Grades 1-7 and Forms 1-3. Supervincimus - We Conquer Together.',
  keywords: 'private school, boarding school, Zimbabwe, education, Regisbridge',
  authors: [{ name: 'Regisbridge Private School' }],
  openGraph: {
    title: 'Regisbridge School Website',
    description: 'Create a professional website for Regisbridge Private School, showcasing its academic and boarding offerings.',
    type: 'website',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/logo.png'],
  },
  other: {
    'google-adsense-account': 'ca-pub-5031801301729089',
    'google-site-verification': 'P9TTQR09ciYWGHYyCB909tVQ_8wmAHUwmWP8WuyYnvI',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/placeholder.svg',
    apple: '/placeholder.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} ${lato.variable} ${merriweather.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Regisbridge Private School",
              "description": "A distinguished private day and boarding school in Zimbabwe providing exceptional education",
              "url": "https://regisbridge.ac.zw",
              "logo": "https://regisbridge.ac.zw/logo.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "3502 Turf, Ngezi",
                "addressLocality": "Mhondoro",
                "addressCountry": "ZW"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+263-4-123-4567",
                "contactType": "admissions"
              }
            })
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
                </TooltipProvider>
              </AuthProvider>
            </QueryProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
