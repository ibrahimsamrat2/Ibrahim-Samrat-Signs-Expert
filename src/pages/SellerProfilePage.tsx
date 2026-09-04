import React from 'react';
import { CheckCircle2, Star, Download, Mail, Phone, MapPin, Share2 } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useCartWishlist } from '../context/CartWishlistContext';

interface SellerProfilePageProps {
  products: Product[];
  onSelectProduct: (id: string) => void;
  onNavigate: (view: string, param?: string) => void;
}

export const SellerProfilePage: React.FC<SellerProfilePageProps> = ({
  products,
  onSelectProduct,
  onNavigate,
}) => {
  const { showToast } = useCartWishlist();
  const sellerProducts = products;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link Copied', 'Creator profile URL copied to clipboard.', 'info');
  };

  return (
    <div id="seller-profile-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Hero Storefront Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 border border-purple-800/40 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#6C3BFF] flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-xl shadow-purple-500/30 border-2 border-white/20 shrink-0">
              IS
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight">Ibrahim Samrat</h1>
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B5CF6]" />
              </div>
              <p className="text-sm text-purple-200 mt-1 font-medium">
                Founder & Lead Designer at Ibrahim Samrat Studio
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" /> Dhaka, Bangladesh
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-purple-400" /> coo.masconsultancy@gmail.com
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-purple-400" /> +8801722604376
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-2.5 bg-[#6C3BFF] hover:bg-purple-600 text-white font-extrabold text-xs rounded-xl shadow transition-transform active:scale-95"
            >
              Contact Creator
            </button>
            <button
              onClick={handleShare}
              className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
              title="Share profile"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-gray-400">Total Assets</span>
            <div className="text-xl font-black text-white mt-0.5">{sellerProducts.length} Items</div>
          </div>
          <div>
            <span className="text-gray-400">Total Sales</span>
            <div className="text-xl font-black text-white mt-0.5">1,248+</div>
          </div>
          <div>
            <span className="text-gray-400">Average Rating</span>
            <div className="text-xl font-black text-amber-400 mt-0.5 flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400" /> 4.98
            </div>
          </div>
          <div>
            <span className="text-gray-400">Response Rate</span>
            <div className="text-xl font-black text-emerald-400 mt-0.5">100% (&lt; 2h)</div>
          </div>
        </div>
      </div>

      {/* Products Catalog by Ibrahim Samrat */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-gray-950 tracking-tight">
              Assets by Ibrahim Samrat
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Carefully designed with editable vector layers and smart objects.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sellerProducts.map((p) => (
            <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} />
          ))}
        </div>
      </div>
    </div>
  );
};
