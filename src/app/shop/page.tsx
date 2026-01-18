'use client';

import { useState } from 'react';
import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';

const SHOP_ITEMS = [
  { id: 1, name: 'School Blazer', price: 89.99, category: 'Uniform', image: 'blazer' },
  { id: 2, name: 'House Tie', price: 15.99, category: 'Uniform', image: 'tie' },
  { id: 3, name: 'School Hoodie', price: 34.99, category: 'Sportswear', image: 'hoodie' },
  { id: 4, name: 'PE Kit', price: 49.99, category: 'Sportswear', image: 'sports' },
  { id: 5, name: 'School Bag', price: 42.99, category: 'Accessories', image: 'backpack' },
  { id: 6, name: 'House Scarf', price: 18.99, category: 'Accessories', image: 'scarf' },
];

export default function SchoolShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white">
      <PremiumHeader />

      <main className="flex-grow py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">School Shop</h1>
            <p className="text-gray-600 mt-1">Official uniforms, sportswear, and school merchandise</p>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 mb-8">
            {['All', 'Uniform', 'Sportswear', 'Accessories'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-brand-navy text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SHOP_ITEMS.filter(
              (item) => selectedCategory === 'All' || item.category === selectedCategory
            ).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-gray-400 text-[80px]">
                    {item.image === 'blazer'
                      ? 'checkroom'
                      : item.image === 'tie'
                      ? 'emoji_objects'
                      : item.image === 'hoodie'
                      ? 'styler'
                      : item.image === 'sports'
                      ? 'sports'
                      : item.image === 'backpack'
                      ? 'backpack'
                      : 'volunteer_activism'}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-xs text-brand-navy font-bold uppercase">{item.category}</span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-3">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-brand-navy">£{item.price}</span>
                    <button className="bg-brand-gold hover:bg-brand-gold-dark text-brand-navy px-6 py-2 rounded-lg font-bold transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'local_shipping', title: 'Free Delivery', desc: 'On orders over £50' },
              { icon: 'replay', title: 'Easy Returns', desc: 'Within 30 days' },
              { icon: 'verified', title: 'Official Items', desc: 'Authentic school merchandise' },
            ].map((feature, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-14 h-14 rounded-full bg-brand-navy/10 flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-brand-navy text-[28px]">{feature.icon}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  );
}
