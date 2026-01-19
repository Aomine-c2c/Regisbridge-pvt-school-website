'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

// This would normally come from a database or CMS
const ARTICLES: Record<string, any> = {
  'rugby-championship': {
    title: 'Rugby First XV Wins National Championship',
    date: 'January 15, 2026',
    author: 'Sports Department',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1200',
    content: [
      'In a thrilling final match that kept spectators on the edge of their seats, our Rugby First XV team secured the National Championship title with a commanding 28-21 victory over St. Johns Academy.',
      'The match, played at the National Sports Stadium, showcased the exceptional talent and determination of our team. Captain James Mitchell led from the front with two crucial tries, while fly-half Sarah Chen\'s precise kicking kept the scoreboard ticking.',
      'Coach Anderson praised the team\'s resilience: "This victory is the result of months of dedicated training and unwavering commitment. The boys showed incredible character, especially in the final quarter when the pressure was immense."',
      'The championship win caps off an undefeated season for the First XV, with 12 wins from 12 matches. This is Regisbridge Academy\'s third national title in the past decade.',
      'Congratulations to all the players, coaches, and supporters who made this achievement possible!',
    ],
  },
};

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main>
        {/* Article Header */}
        <article className="max-w-[900px] mx-auto px-4 sm:px-10 py-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-brand-navy">Home</Link>
            <span>/</span>
            <Link href="/news" className="hover:text-brand-navy">News</Link>
            <span>/</span>
            <span className="text-gray-900">{article.title}</span>
          </nav>

          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-brand-navy text-white text-xs font-bold rounded-full uppercase tracking-wide">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-6 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">person</span>
              <span>{article.author}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden mb-10">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {article.content.map((paragraph: string, index: number) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Share this article</h3>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full bg-brand-navy/10 text-brand-navy hover:bg-brand-navy hover:text-white transition-colors flex items-center justify-center">
                <span className="text-sm font-bold">FB</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-brand-navy/10 text-brand-navy hover:bg-brand-navy hover:text-white transition-colors flex items-center justify-center">
                <span className="text-sm font-bold">TW</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-brand-navy/10 text-brand-navy hover:bg-brand-navy hover:text-white transition-colors flex items-center justify-center">
                <span className="text-sm font-bold">LN</span>
              </button>
            </div>
          </div>

          {/* Back to News */}
          <div className="mt-10">
            <Link
              href="/news"
              className="inline-flex items-center text-brand-navy font-bold hover:underline"
            >
              <span className="material-symbols-outlined mr-2">arrow_back</span>
              Back to News
            </Link>
          </div>
        </article>

        {/* Related Articles */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <span className="text-xs text-brand-navy font-bold uppercase">Sports</span>
                    <h3 className="font-bold text-gray-900 mt-2 mb-3">Related Article Title</h3>
                    <p className="text-sm text-gray-600">Excerpt of the article...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PremiumFooter />
    </div>
  );
}
