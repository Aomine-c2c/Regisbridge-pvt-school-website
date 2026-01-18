import PremiumHeader from '@/components/layout/PremiumHeader';
import PremiumFooter from '@/components/layout/PremiumFooter';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="relative flex w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
      <PremiumHeader />

      {/* Hero Section */}
      <div className="@container w-full bg-white dark:bg-background-dark">
        <div className="flex min-h-[200px] flex-col gap-4 items-center justify-center p-8 md:p-16 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="relative z-10 flex flex-col gap-4 text-center max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap justify-center gap-2 mb-2 text-slate-500 dark:text-slate-400 text-sm font-medium">
              <Link href="/" className="hover:text-[#1152d4] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-slate-900 dark:text-white">Terms of Service</span>
            </div>
            <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
              Terms of Service
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Last updated: January 17, 2026
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[900px] mx-auto px-6 py-16">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Agreement to Terms</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              These Terms of Service constitute a legally binding agreement between you and Regisbridge Academy ("we," "our," or "us") concerning your access to and use of our website and services. By accessing our website, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the website.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Use of Our Services</h2>
            
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 mt-6">Acceptable Use</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              You agree to use our website and services only for lawful purposes. You must not use our website:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300 mb-4">
              <li>In any way that violates any applicable local, national, or international law or regulation</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
              <li>To impersonate or attempt to impersonate Regisbridge Academy, an employee, another user, or any other person or entity</li>
              <li>In any way that infringes upon the rights of others, or restricts or inhibits anyone's use of the website</li>
              <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 mt-6">User Accounts</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms. You are responsible for safeguarding your password and for all activities that occur under your account.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Intellectual Property Rights</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              The website and its original content, features, and functionality are and will remain the exclusive property of Regisbridge Academy and its licensors. The website is protected by copyright, trademark, and other laws.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Regisbridge Academy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Admissions and Enrollment</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Submitting an application for admission does not guarantee enrollment. All admissions decisions are at the sole discretion of Regisbridge Academy.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Once enrolled, students and parents/guardians must comply with all school policies, procedures, and codes of conduct as outlined in our Student Handbook and other official school documents.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Payment Terms</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Tuition and fees are due as specified in your enrollment agreement. Late payments may result in:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
              <li>Late payment fees as outlined in the fee schedule</li>
              <li>Suspension of access to certain services and facilities</li>
              <li>Withholding of transcripts and certificates</li>
              <li>Termination of enrollment in accordance with school policy</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Limitation of Liability</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              To the maximum extent permitted by applicable law, in no event shall Regisbridge Academy, its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Indemnification</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              You agree to defend, indemnify, and hold harmless Regisbridge Academy and its licensors and licensees, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses arising from your use of and access to the website or services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Termination</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              We may terminate or suspend your account and access to the website immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the website will immediately cease.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Governing Law</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Regisbridge Academy operates, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Changes to Terms</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the website following the posting of any changes constitutes acceptance of those changes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Disclaimer</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              The website and services are provided on an "AS IS" and "AS AVAILABLE" basis. Regisbridge Academy makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-slate-600 dark:text-slate-300">
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1152d4] text-sm">mail</span>
                <span>legal@regisbridge.edu</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1152d4] text-sm">call</span>
                <span>+1 (555) 123-4567</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[#1152d4] text-sm mt-1">location_on</span>
                <span>123 Academic Avenue, Scholars District, Cityville</span>
              </p>
            </div>
          </section>
        </div>
      </div>

      <PremiumFooter />
    </div>
  );
}
