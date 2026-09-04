import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

interface FAQPageProps {
  onNavigate: (view: string, param?: string) => void;
}

const FAQS = [
  {
    q: 'What file formats are included with my digital asset purchase?',
    a: 'Each product listing clearly marks all included formats. The majority of our templates, graphics, and mockups include native Adobe Illustrator (.AI), Photoshop (.PSD with Smart Objects), Vector (.EPS), SVG, and transparent high-resolution PNG exports.',
  },
  {
    q: 'How does instant digital delivery work?',
    a: 'As soon as your checkout is confirmed, your files are immediately available on the order confirmation screen and automatically synchronized into your "My Downloads" library in your user dashboard. You also receive an email with direct download links.',
  },
  {
    q: 'Can I use these assets in client commercial work?',
    a: 'Yes! Both our Commercial License and Extended License allow usage in client deliverables. Commercial licenses allow up to 5,000 sales or single client deliverables, while Extended licenses permit unlimited commercial production runs and merchandise resale.',
  },
  {
    q: 'Do I need the latest version of Adobe Creative Cloud?',
    a: 'Our PSD and AI files are backward-compatible with Adobe Photoshop CC 2020+ and Illustrator CC 2020+. Many vector graphics also include universal .EPS and .SVG files that open seamlessly in Figma, Affinity Designer, and CorelDraw.',
  },
  {
    q: 'Are fonts included with flyer, resume, and social media templates?',
    a: 'Due to typeface copyright laws, font files themselves are not redistributed directly in the ZIP archive. However, all our templates exclusively use 100% free Google Fonts or open-source fonts, and include a direct download link sheet in the package.',
  },
  {
    q: 'How do I become a creator and sell on Ibrahim Samrat Marketplace?',
    a: 'Simply switch your profile or register as a Seller. You can immediately access the Seller Dashboard, configure your payout settings (PayPal or Bank transfer), and submit digital assets through our product upload tool.',
  },
  {
    q: 'What is your refund policy on digital goods?',
    a: 'Because digital files cannot be physically returned, all sales are generally final. However, if a file is genuinely corrupt or has missing layers that our support team cannot rectify within 24 hours, we offer a full credit or refund.',
  },
];

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div id="faq-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#6C3BFF] text-xs font-black uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Support Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
          Everything you need to know about licensing, downloads, file formats, and selling.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-extrabold text-sm text-gray-900 hover:text-[#6C3BFF]"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#6C3BFF]' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-purple-50 rounded-3xl p-8 text-center space-y-3 border border-purple-100">
        <h3 className="font-extrabold text-base text-gray-900">Still have questions?</h3>
        <p className="text-xs text-gray-600 max-w-sm mx-auto">
          Our design support specialists are ready to answer your technical questions.
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-2.5 bg-[#6C3BFF] text-white font-bold text-xs rounded-xl shadow hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
        >
          <span>Contact Our Team</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
