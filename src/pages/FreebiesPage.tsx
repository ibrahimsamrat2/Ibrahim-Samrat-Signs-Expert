import React from 'react';
import { Gift, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

interface FreebiesPageProps {
  products: Product[];
  onSelectProduct: (id: string) => void;
  onNavigate: (view: string, param?: string) => void;
}

export const FreebiesPage: React.FC<FreebiesPageProps> = ({
  products,
  onSelectProduct,
  onNavigate,
}) => {
  const freeProducts = products.filter((p) => p.isFree);

  return (
    <div id="freebies-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-[#6C3BFF] rounded-3xl p-8 sm:p-14 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5" />
            <span>100% Free Creative Downloads</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Premium Assets at Zero Cost
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
            Download professional vectors, editable templates, PSD mockups, and fonts crafted by Ibrahim Samrat. All freebies include standard commercial licenses.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-xs space-y-2 max-w-xs shrink-0">
          <div className="flex items-center gap-2 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span>Commercial Rights Included</span>
          </div>
          <p className="text-emerald-100 text-[11px] leading-snug">
            Use in personal and commercial client deliverables without royalty payments.
          </p>
        </div>
      </div>

      {/* Freebies Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-gray-950 tracking-tight">Available Freebies</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Showing {freeProducts.length} high-resolution free items ready for immediate download.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {freeProducts.map((p) => (
            <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} />
          ))}
        </div>
      </div>
    </div>
  );
};
