import React from 'react';
import { ShieldCheck, FileText, Lock } from 'lucide-react';

interface LegalPageProps {
  type: 'terms' | 'privacy' | 'refund';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  return (
    <div id="legal-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wider mb-2">
          <FileText className="w-3.5 h-3.5 text-[#6C3BFF]" />
          <span>Official Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
          {type === 'terms' && 'Terms and Conditions'}
          {type === 'privacy' && 'Privacy Policy & Data Security'}
          {type === 'refund' && 'Digital Goods Refund Policy'}
        </h1>
        <p className="text-xs text-gray-400 mt-1">Last revised: February 2026 • www.ibrahimsamrat.com</p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-xs space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
        {type === 'terms' && (
          <>
            <section className="space-y-2">
              <h2 className="font-extrabold text-base text-gray-900">1. Acceptance of Terms</h2>
              <p>
                By accessing www.ibrahimsamrat.com and downloading digital assets, you agree to comply with and be legally bound by these Terms of Service. If you disagree with any portion of these terms, you must discontinue using our marketplace.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-extrabold text-base text-gray-900">2. Intellectual Property Rights</h2>
              <p>
                All creative assets, including vector artworks, Photoshop mockups, font files, and visual illustrations remain the intellectual property of Ibrahim Samrat Studio and their respective creators. You purchase a usage license, not copyright ownership.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-extrabold text-base text-gray-900">3. User Accounts & Security</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Ibrahim Samrat reserves the right to terminate accounts that distribute illicit files or infringe creator copyrights.
              </p>
            </section>
          </>
        )}

        {type === 'privacy' && (
          <>
            <section className="space-y-2">
              <h2 className="font-extrabold text-base text-gray-900">1. Information We Collect</h2>
              <p>
                We collect your name, email address, country, and transaction history to securely process orders and provide your download links. We do not store raw credit card numbers on our servers; payments are processed directly through 256-bit SSL encrypted gateways.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-extrabold text-base text-gray-900">2. How We Use Data</h2>
              <p>
                Your data is used solely to authenticate your account, fulfill your digital asset downloads, process creator payouts, and deliver transactional receipts. We never sell or rent your personal information to third-party data brokers.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-extrabold text-base text-gray-900">3. Cookies & Local Storage</h2>
              <p>
                Our platform uses industry-standard cookies and local state to preserve your active shopping cart items, saved favorites in your wishlist, and account session state.
              </p>
            </section>
          </>
        )}

        {type === 'refund' && (
          <>
            <section className="space-y-2">
              <h2 className="font-extrabold text-base text-gray-900">1. Digital Nature of Products</h2>
              <p>
                Because digital goods are irrevocable and immediately accessible upon purchase, refunds are generally not permitted once a digital file has been downloaded.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-extrabold text-base text-gray-900">2. Defective File Guarantee</h2>
              <p>
                If a file archive is corrupted, contains missing layers, or fails to open in the declared compatible software (e.g. Photoshop or Illustrator), our technical team will remedy or replace the file. If an issue cannot be resolved within 48 hours, a full refund will be issued.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-extrabold text-base text-gray-900">3. Contacting Support</h2>
              <p>
                For refund inquiries, contact our team at <strong>coo.masconsultancy@gmail.com</strong> with your order number.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};
