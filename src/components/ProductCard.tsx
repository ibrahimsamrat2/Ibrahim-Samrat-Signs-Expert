import React, { useState } from 'react';
import { Heart, Eye, ShoppingCart, Star, Check } from 'lucide-react';
import { Product } from '../types';
import { useCartWishlist } from '../context/CartWishlistContext';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  const { addToCart, toggleWishlist, isInWishlist, openQuickView, cartItems } = useCartWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const isAlreadyInCart = cartItems.some((item) => item.product.id === product.id);

  // If there are multiple preview images, swap to secondary on hover
  const displayImage =
    isHovered && product.previewImages && product.previewImages.length > 1
      ? product.previewImages[1]
      : product.thumbnail;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 'commercial', 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectProduct(product.id)}
      className="product-card group bg-white rounded-2xl border border-[#E5E7EB] p-3 transition-all duration-300 cursor-pointer hover:shadow-xl hover:border-[#6C3BFF] flex flex-col relative"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[4/3] bg-[#F1F5F9] rounded-xl overflow-hidden mb-3">
        <img
          src={displayImage}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Badges on Top */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1 z-10">
          {product.isFree ? (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-emerald-500 text-white shadow-sm">
              Freebie
            </span>
          ) : product.originalPrice > product.price ? (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-amber-500 text-white shadow-sm">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          ) : null}

          {product.isBestSeller && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-[#6C3BFF] text-white shadow-sm">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={handleWishlistClick}
          title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 shadow-sm ${
            isFavorited
              ? 'bg-red-50 text-red-500 ring-2 ring-red-400'
              : 'bg-white/90 text-gray-600 hover:text-red-500 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Quick View and Quick Add Floating Action Bar */}
        <div className="absolute inset-x-2 bottom-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={handleQuickViewClick}
            type="button"
            className="flex-1 py-1.5 px-2 bg-white/95 backdrop-blur-sm hover:bg-white text-gray-800 text-xs font-semibold rounded-lg shadow-md flex items-center justify-center gap-1.5 transition-transform active:scale-95"
          >
            <Eye className="w-3.5 h-3.5 text-[#6C3BFF]" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            type="button"
            title="Add to cart"
            className={`p-2 rounded-lg text-white shadow-md transition-all active:scale-95 flex items-center justify-center ${
              addedAnimation
                ? 'bg-emerald-600'
                : 'bg-[#6C3BFF] hover:bg-purple-700'
            }`}
          >
            {addedAnimation ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Card Info */}
      <div className="px-1 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-bold text-sm text-[#111827] leading-tight mb-1 truncate group-hover:text-[#6C3BFF] transition-colors">
            {product.title}
          </h3>

          {/* Creator */}
          <p className="text-xs text-[#6B7280] mb-2 truncate">by {product.creatorName}</p>
        </div>

        {/* Pricing & Formats Row */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            {product.isFree ? (
              <span className="text-base font-extrabold text-emerald-600">FREE</span>
            ) : (
              <>
                <span className="text-lg font-extrabold text-[#6C3BFF]">
                  ${product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-1">
            {product.fileFormats.slice(0, 2).map((fmt) => (
              <span
                key={fmt}
                className="px-2 py-0.5 bg-slate-100 rounded-md text-[9px] font-bold uppercase text-slate-700"
              >
                {fmt}
              </span>
            ))}
            {product.fileFormats.length > 2 && (
              <span className="text-[9px] text-gray-400 font-bold px-1">
                +{product.fileFormats.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
