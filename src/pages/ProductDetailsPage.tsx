import React, { useState } from 'react';
import {
  Heart,
  ShoppingCart,
  Download,
  Star,
  CheckCircle,
  ShieldCheck,
  Share2,
  FileCheck,
  Layers,
  Sparkles,
  Maximize2,
  ArrowLeft,
  Calendar,
  HardDrive,
  Cpu,
  Info,
  Send,
} from 'lucide-react';
import { Product, LicenseType, Review } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useCartWishlist } from '../context/CartWishlistContext';
import { useAuth } from '../context/AuthContext';

interface ProductDetailsPageProps {
  product: Product;
  allProducts: Product[];
  onSelectProduct: (id: string) => void;
  onNavigate: (view: string, param?: string) => void;
  onNavigateCheckout: () => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  allProducts,
  onSelectProduct,
  onNavigate,
  onNavigateCheckout,
}) => {
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useCartWishlist();
  const { currentUser } = useAuth();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedLicense, setSelectedLicense] = useState<LicenseType>('commercial');
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'license' | 'reviews'>('description');

  // Customer reviews state with new review input
  const [reviews, setReviews] = useState<Review[]>(() => {
    return [
      {
        id: 'rev-1',
        productId: product.id,
        userName: 'Elena Rostova',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        comment:
          'Incredible file organization! The smart objects in the PSD made swapping brand assets instantaneous. Saved our agency at least 6 hours of production time.',
        createdAt: '2026-02-18',
        verifiedPurchase: true,
      },
      {
        id: 'rev-2',
        productId: product.id,
        userName: 'Marcus Thorne',
        userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
        rating: 5,
        comment:
          'Sharp, pristine typography and clean vector outlines. Ibrahim Samrat assets are simply standard-setting in quality.',
        createdAt: '2026-02-10',
        verifiedPurchase: true,
      },
    ];
  });

  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const images =
    product.previewImages && product.previewImages.length > 0
      ? product.previewImages
      : [product.thumbnail];

  const isFavorited = isInWishlist(product.id);

  const getPriceByLicense = (lic: LicenseType) => {
    if (product.isFree) return 0;
    if (lic === 'personal') return product.price;
    if (lic === 'commercial') return Math.round(product.price * 1.5);
    if (lic === 'extended') return Math.round(product.price * 3.2);
    return product.price;
  };

  const handleAddToCart = () => {
    addToCart(product, selectedLicense, 1);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedLicense, 1);
    onNavigateCheckout();
  };

  const handleFreeDownload = () => {
    addToCart(product, 'commercial', 1);
    showToast('Download Ready', `Added "${product.title}" to your downloads library.`, 'success');
    onNavigate('user-dashboard', 'downloads');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link Copied!', 'Product URL copied to clipboard.', 'info');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      productId: product.id,
      userId: currentUser?.uid || 'user-guest',
      userName: currentUser?.displayName || 'Creative Designer',
      userAvatar: currentUser?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: newRating,
      comment: newComment.trim(),
      createdAt: new Date().toISOString().split('T')[0],
      verifiedPurchase: true,
    };

    setReviews([newRev, ...reviews]);
    setNewComment('');
    showToast('Review Submitted', 'Thank you for your feedback on this asset!', 'success');
  };

  // Related products
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isTrending))
    .slice(0, 4);

  return (
    <div id="product-details-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumbs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <button onClick={() => onNavigate('home')} className="hover:text-black">
            Home
          </button>
          <span>/</span>
          <button onClick={() => onNavigate('shop')} className="hover:text-black">
            Shop
          </button>
          <span>/</span>
          <button
            onClick={() => onNavigate('category', product.category)}
            className="hover:text-black"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="text-gray-900 font-bold truncate max-w-xs">{product.title}</span>
        </div>

        <button
          onClick={() => onNavigate('shop')}
          className="text-xs font-bold text-[#6C3BFF] hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Catalog</span>
        </button>
      </div>

      {/* Main Hero Grid: Gallery Left + Purchase Box Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Gallery (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-gray-100 border border-gray-200 aspect-[4/3] shadow-md group">
            <img
              src={images[activeImageIndex] || product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
            />

            {/* Watermark overlay subtle label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-widest uppercase rotate-[-20deg] select-none">
                Ibrahim Samrat
              </span>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {product.isFree ? (
                <span className="px-3 py-1 bg-emerald-500 text-white font-extrabold text-xs rounded-lg uppercase tracking-wider shadow">
                  Free Resource
                </span>
              ) : (
                <span className="px-3 py-1 bg-[#6C3BFF] text-white font-extrabold text-xs rounded-lg uppercase tracking-wider shadow">
                  Premium Asset
                </span>
              )}
              {product.isBestSeller && (
                <span className="px-3 py-1 bg-amber-500 text-white font-extrabold text-xs rounded-lg uppercase tracking-wider shadow">
                  Bestseller
                </span>
              )}
            </div>

            {/* Action overlay */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleShare}
                title="Share link"
                className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 flex items-center justify-center shadow-md transition-all"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                title="Save to Wishlist"
                className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all ${
                  isFavorited
                    ? 'bg-red-50 text-red-500 ring-2 ring-red-400'
                    : 'bg-white/90 hover:bg-white text-gray-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Thumbnail Gallery Strip */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-24 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#6C3BFF] ring-2 ring-purple-400/30 scale-102 shadow-sm'
                      : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Highlights Quick Bar */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 text-center text-xs">
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-gray-400 block mb-0.5">Compatibility</span>
              <span className="font-bold text-gray-800">{product.fileFormats.join(' • ')}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-gray-400 block mb-0.5">Download Size</span>
              <span className="font-bold text-gray-800">{product.fileSize || '142 MB'}</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-gray-400 block mb-0.5">Smart Layers</span>
              <span className="font-bold text-emerald-600">100% Editable</span>
            </div>
          </div>
        </div>

        {/* Right Column: Information & Checkout Box (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-lg shadow-purple-900/5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#6C3BFF] uppercase tracking-wider mb-2">
                <span>{product.category}</span>
                <span>•</span>
                <span>{product.subcategory}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight leading-snug">
                {product.title}
              </h1>

              {/* Creator Card & Star Rating */}
              <div className="mt-3 flex items-center justify-between pb-4 border-b border-gray-100">
                <div
                  onClick={() => onNavigate('seller-profile')}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <img
                    src={product.creatorAvatar}
                    alt={product.creatorName}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-100 group-hover:ring-[#6C3BFF]"
                  />
                  <div>
                    <div className="text-xs font-bold text-gray-900 group-hover:text-[#6C3BFF] flex items-center gap-1">
                      <span>{product.creatorName}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-[#6C3BFF]" />
                    </div>
                    <span className="text-[11px] text-gray-400">Verified Marketplace Creator</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-gray-400 font-normal">({product.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* License Option Selector */}
            {!product.isFree && (
              <div className="space-y-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-gray-900 block">
                  Select License Agreement:
                </label>

                <div className="space-y-2.5">
                  {[
                    {
                      id: 'personal',
                      name: 'Personal License',
                      price: getPriceByLicense('personal'),
                      bullets: '1 Personal non-commercial project. No resale or advertising.',
                    },
                    {
                      id: 'commercial',
                      name: 'Commercial License (Recommended)',
                      price: getPriceByLicense('commercial'),
                      bullets: 'Up to 5,000 end sales, client projects & social marketing.',
                    },
                    {
                      id: 'extended',
                      name: 'Extended Commercial License',
                      price: getPriceByLicense('extended'),
                      bullets: 'Unlimited sales, broadcast, merchandise resale, app integration.',
                    },
                  ].map((lic) => {
                    const isSelected = selectedLicense === lic.id;
                    return (
                      <div
                        key={lic.id}
                        onClick={() => setSelectedLicense(lic.id as LicenseType)}
                        className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#6C3BFF] bg-purple-50/50 shadow-sm'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? 'border-[#6C3BFF] bg-[#6C3BFF]' : 'border-gray-400'
                              }`}
                            >
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <span className="font-extrabold text-xs text-gray-900">{lic.name}</span>
                          </div>
                          <span className="font-black text-sm text-gray-900">${lic.price}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-1 pl-6 leading-relaxed">
                          {lic.bullets}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price Row */}
            <div className="flex items-baseline justify-between pt-2">
              <div>
                <span className="text-xs text-gray-400 block font-medium">Total Investment</span>
                <div className="flex items-baseline gap-2">
                  {product.isFree ? (
                    <span className="text-3xl font-black text-emerald-600">FREE</span>
                  ) : (
                    <>
                      <span className="text-3xl font-black text-gray-950">
                        ${getPriceByLicense(selectedLicense)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through">
                          ${Math.round(product.originalPrice * 1.5)}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Instant Digital Delivery
                </span>
                <span className="text-[11px] text-gray-400">All updates included free</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              {product.isFree ? (
                <button
                  onClick={handleFreeDownload}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-extrabold text-sm shadow-md transition-transform active:scale-98 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Free Resource Now</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3.5 bg-[#6C3BFF] hover:bg-purple-700 text-white rounded-2xl font-extrabold text-sm shadow-lg shadow-purple-500/25 transition-transform active:scale-98 flex items-center justify-center gap-2"
                  >
                    <span>Buy Now & Download</span>
                  </button>

                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-2xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4 text-[#6C3BFF]" />
                    <span>Add to Shopping Cart</span>
                  </button>
                </>
              )}
            </div>

            {/* Guarantee / Security */}
            <div className="pt-2 border-t border-gray-100 text-center space-y-1">
              <span className="text-[11px] text-gray-500 block">
                🔒 Safe 256-Bit SSL Checkout • Card, PayPal & Apple Pay
              </span>
              <span className="text-[11px] text-gray-400 block">
                Have questions?{' '}
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-[#6C3BFF] underline font-medium"
                >
                  Contact Support
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Specifications, License, Reviews */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs p-6 sm:p-10 space-y-8">
        {/* Tab Headers */}
        <div className="flex border-b border-gray-200 gap-6 overflow-x-auto text-sm font-bold">
          {[
            { id: 'description', label: 'Description & Features' },
            { id: 'specs', label: 'File Specifications' },
            { id: 'license', label: 'License Comparison' },
            { id: 'reviews', label: `Customer Reviews (${reviews.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3.5 transition-colors whitespace-nowrap relative ${
                activeTab === tab.id
                  ? 'text-[#6C3BFF] border-b-2 border-[#6C3BFF]'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'description' && (
          <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-4xl">
            <div>
              <h3 className="font-extrabold text-lg text-gray-900 mb-2">About This Resource</h3>
              <p>{product.description}</p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-3">Key Features & Highlights:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-2">Tags:</h4>
              <div className="flex flex-wrap gap-1.5">
                {product.tags?.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl text-xs sm:text-sm">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-gray-400 block text-xs mb-1">Included Formats</span>
              <span className="font-bold text-gray-900">{product.fileFormats.join(', ')}</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-gray-400 block text-xs mb-1">Software Compatibility</span>
              <span className="font-bold text-gray-900">
                {product.softwareCompatibility?.join(', ') || 'Photoshop CC, Illustrator CC'}
              </span>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-gray-400 block text-xs mb-1">Layered & Organized</span>
              <span className="font-bold text-gray-900">{product.isLayered ? 'Yes (Named Groups & Color Coded)' : 'No'}</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-gray-400 block text-xs mb-1">Resolution</span>
              <span className="font-bold text-gray-900">{product.dimensions || '3000 × 2000 px (300 DPI)'}</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-gray-400 block text-xs mb-1">Color Profile</span>
              <span className="font-bold text-gray-900">CMYK / RGB Ready</span>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <span className="text-gray-400 block text-xs mb-1">Download Archive Size</span>
              <span className="font-bold text-gray-900">{product.fileSize || '142 MB'}</span>
            </div>
          </div>
        )}

        {activeTab === 'license' && (
          <div className="max-w-4xl space-y-6 text-xs sm:text-sm">
            <p className="text-gray-600">
              All Ibrahim Samrat Marketplace purchases grant a non-exclusive license. Read our summary below:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-900 text-xs uppercase font-extrabold">
                    <th className="py-3 px-4">Usage Rights</th>
                    <th className="py-3 px-4">Personal</th>
                    <th className="py-3 px-4 text-[#6C3BFF]">Commercial</th>
                    <th className="py-3 px-4">Extended</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600 text-xs">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-gray-800">Non-commercial projects</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">Unlimited</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">Unlimited</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-gray-800">Commercial end products for sale</td>
                    <td className="py-3 px-4 text-red-500 font-bold">None</td>
                    <td className="py-3 px-4 font-bold text-gray-900">Up to 5,000 units</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">Unlimited units</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-gray-800">Client design work</td>
                    <td className="py-3 px-4 text-red-500 font-bold">No</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">1 Client project</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">Unlimited clients</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-gray-800">Merchandise (POD / apparel)</td>
                    <td className="py-3 px-4 text-red-500 font-bold">No</td>
                    <td className="py-3 px-4 text-red-500 font-bold">No</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">Yes allowed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="max-w-3xl space-y-8">
            {/* Reviews List */}
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={rev.userAvatar}
                        alt={rev.userName}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-bold text-xs text-gray-900">{rev.userName}</div>
                        <span className="text-[10px] text-emerald-600 font-semibold">
                          Verified Purchaser • {rev.createdAt}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed pl-10">{rev.comment}</p>
                </div>
              ))}
            </div>

            {/* Add Review Form */}
            <form onSubmit={handleSubmitReview} className="p-6 bg-purple-50/40 rounded-3xl border border-purple-100 space-y-4">
              <h4 className="font-extrabold text-sm text-gray-900">Leave a Customer Review</h4>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-600 font-semibold">Rating:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewRating(s)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          s <= newRating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                required
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="How did this asset help your design project?"
                className="w-full p-3 text-xs bg-white border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none"
              />

              <button
                type="submit"
                className="px-5 py-2.5 bg-[#6C3BFF] text-white text-xs font-bold rounded-xl shadow hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Review</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Related Products Carousel / Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-950 tracking-tight">You May Also Like</h2>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold text-[#6C3BFF] hover:underline"
          >
            Explore Catalog →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} />
          ))}
        </div>
      </div>
    </div>
  );
};
