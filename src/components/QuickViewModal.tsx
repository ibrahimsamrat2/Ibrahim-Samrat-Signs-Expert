import React, { useState } from 'react';
import { X, Star, Check, ShoppingCart, Heart, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';
import { LicenseType } from '../types';

interface QuickViewModalProps {
  onSelectProduct: (id: string) => void;
  onNavigateCheckout: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  onSelectProduct,
  onNavigateCheckout,
}) => {
  const { quickViewProduct, closeQuickView, addToCart, toggleWishlist, isInWishlist } =
    useCartWishlist();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedLicense, setSelectedLicense] = useState<LicenseType>('commercial');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const images =
    quickViewProduct.previewImages && quickViewProduct.previewImages.length > 0
      ? quickViewProduct.previewImages
      : [quickViewProduct.thumbnail];

  const getLicensePrice = (type: LicenseType) => {
    if (quickViewProduct.isFree) return 0;
    if (type === 'personal') return quickViewProduct.price;
    if (type === 'commercial') return Math.round(quickViewProduct.price * 1.5);
    if (type === 'extended') return Math.round(quickViewProduct.price * 3.2);
    return quickViewProduct.price;
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedLicense, quantity);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, selectedLicense, quantity);
    closeQuickView();
    onNavigateCheckout();
  };

  const isFavorited = isInWishlist(quickViewProduct.id);

  return (
    <div
      id="quick-view-modal-backdrop"
      onClick={closeQuickView}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="quick-view-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-gray-100 relative my-8"
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-gray-100 text-gray-700 flex items-center justify-center shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Gallery */}
          <div className="p-6 bg-gray-50 flex flex-col justify-between">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gray-200 shadow-inner mb-4 relative">
              <img
                src={images[selectedImageIndex] || quickViewProduct.thumbnail}
                alt={quickViewProduct.title}
                className="w-full h-full object-cover"
              />
              {quickViewProduct.isFree && (
                <span className="absolute top-3 left-3 px-3 py-1 bg-emerald-500 text-white font-bold text-xs rounded-lg uppercase tracking-wider shadow">
                  Free Resource
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-[#6C3BFF] scale-105 shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
              <span>{quickViewProduct.fileFormats.join(' • ')} Compatible</span>
              <span>{quickViewProduct.fileSize || 'Instant Digital Download'}</span>
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-1">
                <span className="text-[#6C3BFF] uppercase tracking-wider">
                  {quickViewProduct.category}
                </span>
                <span>•</span>
                <span>{quickViewProduct.subcategory}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-tight">
                {quickViewProduct.title}
              </h2>

              <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{quickViewProduct.rating}</span>
                </div>
                <span>({quickViewProduct.reviewCount} customer reviews)</span>
                <span>•</span>
                <span className="font-medium text-gray-900">
                  By {quickViewProduct.creatorName}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 mt-3 line-clamp-3 leading-relaxed">
                {quickViewProduct.shortDescription}
              </p>

              {/* License Selector */}
              {!quickViewProduct.isFree && (
                <div className="mt-5 space-y-2">
                  <label className="text-xs font-bold text-gray-900 block uppercase tracking-wider">
                    Select License Type:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'personal', label: 'Personal', desc: 'Single project' },
                      { id: 'commercial', label: 'Commercial', desc: 'Up to 5,000 sales' },
                      { id: 'extended', label: 'Extended', desc: 'Unlimited usage' },
                    ].map((lic) => (
                      <button
                        key={lic.id}
                        type="button"
                        onClick={() => setSelectedLicense(lic.id as LicenseType)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          selectedLicense === lic.id
                            ? 'border-[#6C3BFF] bg-purple-50/70 text-[#6C3BFF] ring-2 ring-purple-400/20'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <div className="font-bold text-xs capitalize">{lic.label}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{lic.desc}</div>
                        <div className="text-xs font-black mt-1 text-gray-900">
                          ${getLicensePrice(lic.id as LicenseType)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Display */}
              <div className="mt-6 flex items-baseline gap-3">
                {quickViewProduct.isFree ? (
                  <span className="text-3xl font-black text-emerald-600">FREE</span>
                ) : (
                  <>
                    <span className="text-3xl font-black text-gray-900">
                      ${getLicensePrice(selectedLicense)}
                    </span>
                    {quickViewProduct.originalPrice > quickViewProduct.price && (
                      <span className="text-sm text-gray-400 line-through">
                        ${Math.round(quickViewProduct.originalPrice * 1.5)}
                      </span>
                    )}
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-purple-100 text-[#6C3BFF]">
                      Lifetime Updates
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3 pt-4 border-t border-gray-100">
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  type="button"
                  className="flex-1 py-3 px-4 bg-[#6C3BFF] hover:bg-purple-700 text-white rounded-xl font-bold text-sm shadow-md shadow-purple-500/25 flex items-center justify-center gap-2 transition-transform active:scale-98"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>{quickViewProduct.isFree ? 'Add Freebie to Cart' : 'Add to Cart'}</span>
                </button>

                {!quickViewProduct.isFree && (
                  <button
                    onClick={handleBuyNow}
                    type="button"
                    className="flex-1 py-3 px-4 bg-[#111827] hover:bg-black text-white rounded-xl font-bold text-sm shadow flex items-center justify-center gap-2 transition-transform active:scale-98"
                  >
                    <span>Buy Now</span>
                  </button>
                )}

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  type="button"
                  title="Save to Wishlist"
                  className={`p-3 rounded-xl border flex items-center justify-center transition-colors ${
                    isFavorited
                      ? 'border-red-300 bg-red-50 text-red-500'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-500' : ''}`} />
                </button>
              </div>

              {/* View Full Product Page Link */}
              <button
                onClick={() => {
                  closeQuickView();
                  onSelectProduct(quickViewProduct.id);
                }}
                className="w-full py-2 text-center text-xs font-semibold text-[#6C3BFF] hover:underline flex items-center justify-center gap-1"
              >
                <span>View Full Product Details, Features & Reviews</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
