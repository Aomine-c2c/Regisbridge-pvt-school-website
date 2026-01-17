/**
 * Structured Data (JSON-LD) Generator
 * Creates schema.org markup for SEO optimization
 */

import { Organization, EducationalOrganization, Place, Course, Event, WithContext } from 'schema-dts'

/**
 * Main school organization schema
 */
export function getSchoolOrganizationSchema(): WithContext<EducationalOrganization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': 'https://regisbridge.page/#organization',
    name: 'Regisbridge Private School',
    alternateName: 'Regisbridge School',
    description: 'A distinguished private day and boarding school in Zimbabwe offering comprehensive education from ECD A through Grade 7, with exceptional academic results and holistic student development.',
    url: 'https://regisbridge.page',
    logo: 'https://regisbridge.page/logo.png',
    image: 'https://regisbridge.page/logo.png',
    foundingDate: '2020',
    slogan: 'Supervincimus - We Conquer Together',
    
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3502 Turf, Ngezi',
      addressLocality: 'Mhondoro',
      addressRegion: 'Mashonaland West',
      addressCountry: 'ZW',
    },
    
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+263-77-123-4567',
        contactType: 'admissions',
        areaServed: 'ZW',
        availableLanguage: ['English', 'Shona', 'Ndebele'],
      },
      {
        '@type': 'ContactPoint',
        email: 'info@regisbridge.ac.zw',
        contactType: 'customer service',
        areaServed: 'ZW',
      },
    ],
    
    sameAs: [
      'https://www.facebook.com/649025021870070',
      'https://regisbridge.ac.zw',
    ],
    
    areaServed: {
      '@type': 'Country',
      name: 'Zimbabwe',
    },
    
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Educational Programs',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Primary Education (ECD A - Grade 7)',
            description: 'Comprehensive primary education with Cambridge curriculum',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Boarding Facilities',
            description: 'Full boarding with modern dormitories and 24/7 supervision',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sports Programs',
            description: 'Football, netball, athletics, and other sporting activities',
          },
        },
      ],
    },
  }
}

/**
 * School location schema
 */
export function getSchoolPlaceSchema(): WithContext<Place> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': 'https://regisbridge.page/#place',
    name: 'Regisbridge Private School Campus',
    description: 'Modern school campus with boarding facilities, sports grounds, and academic buildings',
    
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3502 Turf, Ngezi',
      addressLocality: 'Mhondoro',
      addressRegion: 'Mashonaland West',
      postalCode: '',
      addressCountry: 'ZW',
    },
    
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -18.0833,
      longitude: 30.0833,
    },
    
    hasMap: 'https://www.google.com/maps/search/?api=1&query=Regisbridge+Private+School+Ngezi',
  }
}

/**
 * Academic courses schema
 */
export function getCoursesSchema(): WithContext<Course>[] {
  const baseUrl = 'https://regisbridge.page'
  
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      '@id': `${baseUrl}/#course-primary`,
      name: 'Primary Education (Grades 1-7)',
      description: 'Comprehensive primary education following the Cambridge International curriculum with focus on core subjects including Mathematics, English, Sciences, and Humanities.',
      provider: {
        '@type': 'EducationalOrganization',
        '@id': `${baseUrl}/#organization`,
        name: 'Regisbridge Private School',
      },
      educationalLevel: 'Primary Education',
      occupationalCredentialAwarded: 'Grade 7 Certificate',
      courseCode: 'PRIMARY-1-7',
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'onsite',
        courseWorkload: 'Full-time',
        instructor: {
          '@type': 'Person',
          name: 'Qualified Teachers',
          description: 'Experienced educators with specialized training',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Course',
      '@id': `${baseUrl}/#course-ecd`,
      name: 'Early Childhood Development (ECD A-B)',
      description: 'Foundation stage education for young learners focusing on play-based learning, basic literacy, numeracy, and social development.',
      provider: {
        '@type': 'EducationalOrganization',
        '@id': `${baseUrl}/#organization`,
        name: 'Regisbridge Private School',
      },
      educationalLevel: 'Early Childhood',
      courseCode: 'ECD-A-B',
    },
  ]
}

/**
 * Breadcrumb schema for navigation
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Event schema (for news/calendar items)
 */
export function getEventSchema(event: {
  name: string
  description: string
  startDate: string
  endDate?: string
  location?: string
}): WithContext<Event> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    location: event.location ? {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3502 Turf, Ngezi',
        addressLocality: 'Mhondoro',
        addressCountry: 'ZW',
      },
    } : undefined,
    organizer: {
      '@type': 'EducationalOrganization',
      '@id': 'https://regisbridge.page/#organization',
      name: 'Regisbridge Private School',
    },
  }
}

/**
 * FAQ schema for common questions
 */
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Combine all structured data for homepage
 */
export function getAllStructuredData() {
  return [
    getSchoolOrganizationSchema(),
    getSchoolPlaceSchema(),
    ...getCoursesSchema(),
  ]
}
