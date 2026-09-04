import React from 'react';
import { Sparkles, ShieldCheck, Users, Award, Heart, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (view: string, param?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div id="about-page" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Intro */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#6C3BFF] text-xs font-black uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-950 tracking-tight leading-tight">
          Empowering Creators Worldwide with World-Class Digital Assets.
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Ibrahim Samrat Marketplace was established to bridge the gap between world-class design standards and rapid execution for creative agencies, freelancers, and businesses.
        </p>
      </div>

      {/* Founder Section */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-xs flex flex-col md:flex-row items-center gap-10">
        <div className="relative shrink-0">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
            alt="Ibrahim Samrat"
            className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl object-cover shadow-xl ring-4 ring-purple-100"
          />
          <div className="absolute -bottom-3 -right-3 bg-[#6C3BFF] text-white p-2.5 rounded-2xl shadow-lg">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
          <div className="inline-block px-3 py-1 bg-purple-50 text-[#6C3BFF] font-bold rounded-lg text-xs">
            Founder & Creative Director
          </div>
          <h2 className="text-2xl font-black text-gray-900">Meet Ibrahim Samrat</h2>
          <p>
            With over 7 years of specialized expertise in visual branding, vector illustration, and digital asset engineering, Ibrahim Samrat created this marketplace with a simple premise: every file must be print-ready, layer-organized, and built to save design professionals hundreds of hours.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-gray-800">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#6C3BFF]" /> Dhaka, Bangladesh
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-[#6C3BFF]" /> coo.masconsultancy@gmail.com
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-[#6C3BFF]" /> +8801722604376
            </span>
          </div>
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-gray-950 text-center tracking-tight">
          The Ibrahim Samrat Standard
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-gray-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#6C3BFF] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-gray-900">Meticulous Craft</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every curve, anchor point, and Photoshop smart object is hand-verified for pristine production standards.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-gray-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#6C3BFF] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-gray-900">Transparent Licenses</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              No hidden fees, no restrictive print limitations, and lifetime access to future file updates.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-gray-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#6C3BFF] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-gray-900">Creator First</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We provide competitive revenue splits and dedicated support to digital asset creators worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-[#111827] text-white rounded-3xl p-8 sm:p-12 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black">Ready to Elevate Your Next Project?</h2>
        <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
          Explore our complete collection of vectors, PSD templates, and mockups.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-8 py-3.5 bg-[#6C3BFF] hover:bg-purple-600 text-white font-extrabold text-xs rounded-xl shadow-lg transition-transform active:scale-95 inline-flex items-center gap-2"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
