import React from 'react';
import { ShieldCheck, Check, X, ArrowRight } from 'lucide-react';

interface LicensePageProps {
  onNavigate: (view: string, param?: string) => void;
}

export const LicensePage: React.FC<LicensePageProps> = ({ onNavigate }) => {
  return (
    <div id="license-page" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#6C3BFF] text-xs font-black uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Simple & Fair Licensing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
          License Terms & Usage Guidelines
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Every resource downloaded from Ibrahim Samrat Marketplace comes with transparent usage rights. Read our straightforward breakdown below.
        </p>
      </div>

      {/* 3 Columns License Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Tier 1</span>
            <h3 className="text-xl font-black text-gray-900 mt-1">Personal License</h3>
            <p className="text-xs text-gray-500 mt-1">
              For individual creative learning, portfolio experiments, and non-monetized work.
            </p>
          </div>

          <div className="space-y-2 text-xs pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-emerald-600 font-medium">
              <Check className="w-4 h-4 shrink-0" />
              <span>1 Personal project</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-medium">
              <Check className="w-4 h-4 shrink-0" />
              <span>Personal social media</span>
            </div>
            <div className="flex items-center gap-2 text-red-500">
              <X className="w-4 h-4 shrink-0" />
              <span>No client projects</span>
            </div>
            <div className="flex items-center gap-2 text-red-500">
              <X className="w-4 h-4 shrink-0" />
              <span>No end products for sale</span>
            </div>
          </div>
        </div>

        {/* Commercial */}
        <div className="bg-white rounded-3xl p-6 border-2 border-[#6C3BFF] shadow-lg shadow-purple-500/10 space-y-4 relative">
          <div className="absolute -top-3 right-6 bg-[#6C3BFF] text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-full">
            Most Popular
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6C3BFF]">Tier 2</span>
            <h3 className="text-xl font-black text-gray-900 mt-1">Commercial License</h3>
            <p className="text-xs text-gray-500 mt-1">
              For professional freelancers, agencies, client projects, and social marketing.
            </p>
          </div>

          <div className="space-y-2 text-xs pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <Check className="w-4 h-4 shrink-0" />
              <span>Up to 5,000 end sales</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <Check className="w-4 h-4 shrink-0" />
              <span>1 Client design project</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <Check className="w-4 h-4 shrink-0" />
              <span>Digital ads & paid media</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <Check className="w-4 h-4 shrink-0" />
              <span>Lifetime file updates</span>
            </div>
          </div>
        </div>

        {/* Extended */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Tier 3</span>
            <h3 className="text-xl font-black text-gray-900 mt-1">Extended License</h3>
            <p className="text-xs text-gray-500 mt-1">
              For mass production, merchandise resale, software apps, and broadcast.
            </p>
          </div>

          <div className="space-y-2 text-xs pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <Check className="w-4 h-4 shrink-0" />
              <span>Unlimited physical end sales</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <Check className="w-4 h-4 shrink-0" />
              <span>Merchandise for resale</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <Check className="w-4 h-4 shrink-0" />
              <span>Unlimited client deliverables</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <Check className="w-4 h-4 shrink-0" />
              <span>TV, web & cinema broadcast</span>
            </div>
          </div>
        </div>
      </div>

      {/* Strict Restrictions Box */}
      <div className="bg-red-50 rounded-3xl p-6 sm:p-8 border border-red-200 space-y-3 text-xs text-red-900">
        <h3 className="font-extrabold text-sm text-red-950">Strict Prohibitions Under All Licenses:</h3>
        <ul className="list-disc pl-5 space-y-1 text-red-800">
          <li>You may NOT sub-license, resell, share, or redistribute the source files (PSD, AI, EPS, font files) directly.</li>
          <li>You may NOT upload raw vector or PSD files to stock marketplaces or peer-to-peer sharing networks.</li>
          <li>You may NOT register trademarks using pre-made logo marks as-is without customized adaptation.</li>
        </ul>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => onNavigate('shop')}
          className="px-8 py-3.5 bg-[#6C3BFF] hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow inline-flex items-center gap-2"
        >
          <span>Browse Licensed Assets</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
