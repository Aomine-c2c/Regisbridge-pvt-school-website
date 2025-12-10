'use client';

import { useState, useCallback } from 'react';
import { MapPin, Phone, Mail, Clock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { legalInformation } from '@/lib/seed-data-governance';
import InteractiveMap from '@/components/ui/InteractiveMap';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation function
  const validateField = useCallback((name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return undefined;
      default:
        return undefined;
    }
  }, []);

  // Handle input change with validation
  const handleInputChange = useCallback((name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setFormErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  // Handle blur to mark field as touched
  const handleBlur = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof typeof formData]);
    setFormErrors(prev => ({ ...prev, [name]: error }));
  }, [formData, validateField]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });
    
    // Validate all fields
    const errors: FormErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message)
    };
    
    setFormErrors(errors);
    
    // Check if there are any errors
    if (Object.values(errors).some(error => error)) {
      setError('Please fix the errors above before submitting');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call - replace with actual form submission service
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For demo purposes, we'll simulate a successful submission
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTouched({});
      setFormErrors({});

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateField]);

  return (
    <section id="contact" className="py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gradient-royal text-center mb-4 text-shadow-soft">
          Contact Us
        </h2>
        <div className="divider-animated w-32 h-1 mx-auto mb-16"></div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="animate-fade-in">
            <h3 className="text-2xl md:text-3xl font-bold text-gradient-royal mb-8">Get in Touch</h3>

            <div className="glass-card p-8 rounded-lg shadow-medium mb-10 space-y-6">
              <div className="flex items-start group">
                <MapPin className="text-gradient-gold mr-4 mt-1 flex-shrink-0 micro-bounce" size={24} />
                <div>
                  <p className="font-semibold text-lg mb-1 dark:text-white">Address</p>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{legalInformation.registeredAddress}</p>
                </div>
              </div>
              <div className="flex items-start group">
                <Phone className="text-gradient-gold mr-4 mt-1 flex-shrink-0 micro-bounce" size={24} />
                <div>
                  <p className="font-semibold text-lg mb-2 dark:text-white">Phone Numbers</p>
                  <p className="text-gray-600 dark:text-gray-300">Director: {legalInformation.alternatePhone}</p>
                  <p className="text-gray-600 dark:text-gray-300">School Head: +263 77 909 7410</p>
                  <p className="text-gray-600 dark:text-gray-300">Office: {legalInformation.phone}</p>
                </div>
              </div>
              <div className="flex items-start group">
                <Mail className="text-gradient-gold mr-4 mt-1 flex-shrink-0 micro-bounce" size={24} />
                <div>
                  <p className="font-semibold text-lg mb-1 dark:text-white">Email</p>
                  <p className="text-gray-600 dark:text-gray-300">regisbridgepvtsch@gmail.com</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{legalInformation.email}</p>
                </div>
              </div>
              <div className="flex items-start group">
                <Clock className="text-gradient-gold mr-4 mt-1 flex-shrink-0 micro-bounce" size={24} />
                <div>
                  <p className="font-semibold text-lg mb-1 dark:text-white">Office Hours</p>
                  <p className="text-gray-600 dark:text-gray-300">Monday - Friday: 7:00 AM - 4:00 PM</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Saturday: By appointment</p>
                </div>
              </div>
            </div>

            <InteractiveMap
              latitude={-18.679305556}
              longitude={30.28175}
              title="Regisbridge Private School"
              address={legalInformation.registeredAddress}
              className="animate-fade-in-delay-200 shadow-strong rounded-lg overflow-hidden"
            />
          </div>

          <div className="animate-fade-in-delay-400">
            <h3 className="text-2xl md:text-3xl font-bold text-gradient-royal mb-8">Send a Message</h3>

            {submitted ? (
              <div className="glass-card border-l-4 border-green-500 px-6 py-4 rounded-lg animate-fade-in flex items-start shadow-medium card-elevated">
                <CheckCircle className="mr-3 flex-shrink-0 mt-0.5 text-green-600 dark:text-green-400" size={20} />
                <div>
                  <p className="font-semibold mb-1 text-green-700 dark:text-green-300">Message sent successfully!</p>
                  <p className="text-sm text-green-600 dark:text-green-400">Thank you for contacting us. We'll respond within 24 hours.</p>
                </div>
              </div>
            ) : error && !Object.values(formErrors).some(e => e) ? (
              <div className="glass-card border-l-4 border-red-500 px-6 py-4 rounded-lg animate-fade-in flex items-start shadow-medium">
                <AlertCircle className="mr-3 flex-shrink-0 mt-0.5 text-red-600 dark:text-red-400" size={20} />
                <div>
                  <p className="font-semibold text-red-700 dark:text-red-300">{error}</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 rounded-lg shadow-strong space-y-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-3">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    aria-label="Your name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    className={`w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 glass-card-dark dark:text-white ${
                      formErrors.name && touched.name
                        ? 'border-red-500 focus:ring-red-500 focus:shadow-glow-gold'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-[#D4AF37] focus:border-transparent focus:shadow-glow-gold'
                    }`}
                  />
                  {formErrors.name && touched.name && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center animate-fade-in">
                      <AlertCircle size={14} className="mr-1" />
                      {formErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-3">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    aria-label="Your email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 glass-card-dark dark:text-white ${
                      formErrors.email && touched.email
                        ? 'border-red-500 focus:ring-red-500 focus:shadow-glow-gold'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-[#D4AF37] focus:border-transparent focus:shadow-glow-gold'
                    }`}
                  />
                  {formErrors.email && touched.email && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center animate-fade-in">
                      <AlertCircle size={14} className="mr-1" />
                      {formErrors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-3">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    aria-label="Your message"
                    placeholder="Write your message here (at least 10 characters)"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    className={`w-full px-5 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none transition-all duration-200 glass-card-dark dark:text-white ${
                      formErrors.message && touched.message
                        ? 'border-red-500 focus:ring-red-500 focus:shadow-glow-gold'
                        : 'border-gray-300 dark:border-gray-600 focus:ring-[#D4AF37] focus:border-transparent focus:shadow-glow-gold'
                    }`}
                  />
                  {formErrors.message && touched.message && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center animate-fade-in">
                      <AlertCircle size={14} className="mr-1" />
                      {formErrors.message}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {formData.message.length} / 10 characters minimum
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-gradient py-4 rounded-lg font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-glow-gold micro-bounce"
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
