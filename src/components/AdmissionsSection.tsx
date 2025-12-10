import { useMemo, useCallback } from 'react';
import { scrollToSection } from '@/utils/navigation';
import { Search, Calendar, FileText, ClipboardCheck, CheckCircle } from 'lucide-react';
import './AdmissionsSection.css';
import { agm2021, transportFees, bankingDetails, transportSchedule } from '@/lib/seed-data-operations';

export default function AdmissionsSection() {
  const steps = useMemo(() => [
    { icon: Search, title: '1. Inquiry', description: 'Contact us to learn more' },
    { icon: Calendar, title: '2. School Tour', description: 'Visit our campus' },
    { icon: FileText, title: '3. Application', description: 'Submit your application' },
    { icon: ClipboardCheck, title: '4. Assessment', description: 'Student evaluation' },
    { icon: CheckCircle, title: '5. Enrollment', description: 'Welcome to Regisbridge!' }
  ], []);

  const scrollToContact = useCallback(() => scrollToSection('contact'), []);

  return (
    <section id="admissions" className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif font-bold text-gradient-royal text-center mb-4 text-shadow-soft">
          Join Regisbridge
        </h2>
        <div className="divider-animated w-24 h-1 mx-auto mb-12"></div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-6 mb-12">
            {steps.map((step, index) => (
              <div key={index} className={`text-center admissions-step admissions-step-${index}`}>
                <div className="relative">
                  <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 card-elevated shadow-glow-gold micro-bounce">
                    <step.icon className="text-[#D4AF37]" size={28} />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-12 h-0.5 bg-[#D4AF37] animate-pulse"></div>
                  )}
                </div>
                <h3 className="font-bold text-[#1C1A75] dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                  <div
                    className={`gradient-gold h-2 rounded-full progress-bar progress-bar-${index}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card p-8 rounded-lg shadow-strong mb-8 border border-white/20 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gradient-royal mb-6">Admissions Information</h3>
            
            {/* Fees Section */}
            <div className="gradient-royal text-white p-6 rounded-lg mb-6 shadow-medium card-elevated">
              <h4 className="text-xl font-bold mb-3 text-gradient-gold">School Fees (Per Term)</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="glass-card-dark p-4 rounded-lg micro-float">
                  <div className="text-3xl font-bold">${agm2021.feesApproved?.grade1to7}</div>
                  <div className="text-sm opacity-90">Grade 1-7</div>
                </div>
                <div className="glass-card-dark p-4 rounded-lg micro-float" style={{ animationDelay: '0.1s' }}>
                  <div className="text-3xl font-bold">${agm2021.feesApproved?.ecd}</div>
                  <div className="text-sm opacity-90">ECD</div>
                </div>
              </div>
              <p className="text-sm opacity-90">Fees approved at AGM on {new Date(agm2021.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            
            {/* Banking Details */}
            <div className="glass-card border-l-4 border-[#1C1A75] p-4 mb-6 shadow-soft">
              <h4 className="font-bold text-gradient-royal mb-2">Payment Methods</h4>
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <p><strong>Accepted:</strong> Cash USD, RTGS, Internal Bank Transfers</p>
                <div>
                  <strong>Bank Accounts:</strong>
                  <div className="ml-4 mt-1">
                    <p>• {bankingDetails[0].bankName}: {bankingDetails[0].accountNumber}</p>
                    <p>• {bankingDetails[1].bankName}: {bankingDetails[1].accountNumber}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Transport */}
            <div className="gradient-gold bg-opacity-10 border border-[#D4AF37] p-4 rounded-lg mb-6 shadow-soft card-elevated">
              <h4 className="font-bold text-[#1C1A75] dark:text-white mb-3">Transport Service</h4>
              <div className="mb-3">
                <span className="text-2xl font-bold text-gradient-gold">${transportFees.monthly}/month</span>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">(Payment due by 3rd of each month)</span>
              </div>
              
              <div className="grid md:grid-cols-2 gap-3 mt-3">
                {transportSchedule.map((schedule, idx) => (
                  <div key={idx} className="glass-card p-3 rounded shadow-medium micro-float" style={{ animationDelay: `${idx * 0.05}s` }}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#1C1A75] dark:text-white">{schedule.level}</span>
                      <span className="text-xs gradient-primary text-white px-2 py-1 rounded">{schedule.pickupArea}</span>
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">🕐 {schedule.pickupTime}</div>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-gray-600 mt-3">
                ✓ Safe transport with SDC Chairperson oversight • Pickup from Bedrooms and Co-house areas
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
              <div className="glass-card p-4 rounded-lg shadow-soft">
                <h4 className="font-semibold mb-2 text-[#1C1A75] dark:text-white">Application Requirements:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Completed application form</li>
                  <li>Birth certificate copy</li>
                  <li>Previous school reports</li>
                  <li>Passport-size photos</li>
                </ul>
              </div>
              <div className="glass-card p-4 rounded-lg shadow-soft">
                <h4 className="font-semibold mb-2 text-[#1C1A75] dark:text-white">What We Offer:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Day and boarding facilities</li>
                  <li>15 qualified teachers (all Diploma-B.Ed)</li>
                  <li>ZIMSEC examination centre</li>
                  <li>French language program</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={scrollToContact}
              className="btn-gold px-8 py-4 rounded-lg font-semibold text-lg shadow-glow-gold micro-bounce text-[#1C1A75]"
            >
              Schedule a School Tour
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
