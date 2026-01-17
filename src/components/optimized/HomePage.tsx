import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { GetStaticProps } from 'next'

interface HomePageProps {
  initialData?: {
    hero: {
      title: string
      subtitle: string
    }
    features: Array<{
      title: string
      description: string
      icon: string
    }>
  }
}

const HomePage: NextPage<HomePageProps> = ({ initialData }) => {
  return (
    <>
      <Head>
        <title>Regisbridge School - Excellence in Education</title>
        <meta name="description" content="Regisbridge Private School - Providing quality education with modern facilities and experienced faculty." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://regisbridge.page/" />
        <meta property="og:title" content="Regisbridge School - Excellence in Education" />
        <meta property="og:description" content="Regisbridge Private School - Providing quality education with modern facilities and experienced faculty." />
        <meta property="og:image" content="https://regisbridge.page/images/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://regisbridge.page/" />
        <meta property="twitter:title" content="Regisbridge School - Excellence in Education" />
        <meta property="twitter:description" content="Regisbridge Private School - Providing quality education with modern facilities and experienced faculty." />
        <meta property="twitter:image" content="https://regisbridge.page/images/og-image.jpg" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      </Head>

      <main className="min-h-screen">
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Skip to main content
        </a>

        {/* Hero Section */}
        <section id="hero" className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {initialData?.hero.title || 'Welcome to Regisbridge School'}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                {initialData?.hero.subtitle || 'Empowering students with excellence in education since 1985'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Enroll Now
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white" aria-labelledby="features-heading">
          <div className="container mx-auto px-6">
            <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Why Choose Regisbridge
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(initialData?.features || [
                { title: 'Academic Excellence', description: 'Rigorous curriculum with experienced faculty', icon: '📚' },
                { title: 'Modern Facilities', description: 'State-of-the-art classrooms and laboratories', icon: '🏫' },
                { title: 'Sports Programs', description: 'Comprehensive sports and athletic development', icon: '⚽' },
                { title: 'Technology Integration', description: 'Cutting-edge technology in education', icon: '💻' },
                { title: 'Arts & Culture', description: 'Rich arts and cultural programs', icon: '🎨' },
                { title: 'Community Focus', description: 'Strong community engagement and values', icon: '🤝' }
              ]).map((feature, index) => (
                <article key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4" aria-hidden="true">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section id="cta" className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Take the first step towards providing your child with quality education.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
              Start Application
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Regisbridge School</h3>
              <p className="text-gray-400">Excellence in education since 1985</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/academics" className="text-gray-400 hover:text-white transition-colors">Academics</a></li>
                <li><a href="/admissions" className="text-gray-400 hover:text-white transition-colors">Admissions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>123 Education Street</li>
                <li>City, State 12345</li>
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@regisbridge.page</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Regisbridge School. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

// Static generation for better performance
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // In a real application, this would fetch from a CMS or database
  const initialData = {
    hero: {
      title: 'Welcome to Regisbridge School',
      subtitle: 'Empowering students with excellence in education since 1985'
    },
    features: [
      { title: 'Academic Excellence', description: 'Rigorous curriculum with experienced faculty', icon: '📚' },
      { title: 'Modern Facilities', description: 'State-of-the-art classrooms and laboratories', icon: '🏫' },
      { title: 'Sports Programs', description: 'Comprehensive sports and athletic development', icon: '⚽' },
      { title: 'Technology Integration', description: 'Cutting-edge technology in education', icon: '💻' },
      { title: 'Arts & Culture', description: 'Rich arts and cultural programs', icon: '🎨' },
      { title: 'Community Focus', description: 'Strong community engagement and values', icon: '🤝' }
    ]
  }

  return {
    props: {
      initialData
    },
    revalidate: 3600 // Revalidate every hour
  }
}

export default HomePage
