import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Loader2 } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call - replace with actual form submission service
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For demo purposes, we'll simulate a successful submission
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[#1C1A75] text-center mb-6">
          Contact Us
        </h2>
        <div className="w-32 h-1 bg-[#D4AF37] mx-auto mb-16"></div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="animate-fade-in">
            <h3 className="text-2xl md:text-3xl font-bold text-[#1C1A75] mb-8">Get in Touch</h3>

            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <MapPin className="text-[#D4AF37] mr-4 mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-lg mb-1">Address</p>
                  <p className="text-gray-600 leading-relaxed">3502 Turf, Ngezi, Mhondoro, Zimbabwe</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="text-[#D4AF37] mr-4 mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-lg mb-1">Phone</p>
                  <p className="text-gray-600">+263 779 097 410</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="text-[#D4AF37] mr-4 mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-lg mb-1">Email</p>
                  <p className="text-gray-600">regisbridgepvtsch@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="text-[#D4AF37] mr-4 mt-1 flex-shrink-0" size={24} />
                <div>
                  <p className="font-semibold text-lg mb-1">Office Hours</p>
                  <p className="text-gray-600">Monday - Friday: 7:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-200">
                <iframe
                  title="Regisbridge location"
                  className="w-full h-full border-0"
                  loading="lazy"
                  src={`https://www.google.com/maps?q=-18.679305556,30.28175&z=16&output=embed`}
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-3 bg-white">
                <p className="text-sm text-gray-600">Coordinates: 18°40'45.5"S 30°16'54.3"E</p>
                <a
                  className="text-sm text-[#1C1A75] font-semibold hover:underline"
                  href={`https://www.google.com/maps/search/?api=1&query=-18.679305556,30.28175`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-2xl md:text-3xl font-bold text-[#1C1A75] mb-8">Send a Message</h3>

            {submitted ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg animate-fade-in">
                Thank you! We'll respond within 24 hours.
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg animate-fade-in">
                {error}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-3">Name</label>
                  <input
                    type="text"
                    required
                    aria-label="Your name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-3">Email</label>
                  <input
                    type="email"
                    required
                    aria-label="Your email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-3">Message</label>
                  <textarea
                    required
                    rows={6}
                    aria-label="Your message"
                    placeholder="Write your message here"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1A75] focus:border-transparent resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#1C1A75] text-white py-4 rounded-lg font-semibold text-lg hover:bg-[#D4AF37] hover:text-[#1C1A75] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
