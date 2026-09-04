import React, { useState } from 'react';
import { ShoppingBag, Trash2, ArrowRight, ShieldCheck, Tag, ArrowLeft } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';

interface CartPageProps {
  onNavigate: (view: string, param?: string) => void;
  onNavigateCheckout: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate, onNavigateCheckout }) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    totalAmount,
    couponCode,
    applyCoupon,
    removeCoupon,
  } = useCartWishlist();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setInputCoupon('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-purple-50 text-[#6C3BFF] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10 opacity-70" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Your Cart is Empty</h1>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          You haven't added any creative assets to your cart yet. Explore thousands of vectors, mockups, and templates.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="px-6 py-3 bg-[#6C3BFF] hover:bg-purple-700 text-white font-bold text-sm rounded-xl shadow transition-all active:scale-95"
        >
          Explore Marketplace
        </button>
      </div>
    );
  }

  return (
    <div id="cart-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-950 tracking-tight">Shopping Cart</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Review your items and proceed to secure checkout.
          </p>
        </div>
        <button
          onClick={() => onNavigate('shop')}
          className="text-xs font-bold text-[#6C3BFF] hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Cart Items Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs divide-y divide-gray-100">
          {cartItems.map((item) => (
            <div
              key={`${item.product.id}-${item.license}`}
              className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="w-20 h-20 rounded-2xl object-cover bg-gray-100 shrink-0"
                />
                <div className="min-w-0">
                  <h3
                    onClick={() => onNavigate('product', item.product.id)}
                    className="font-extrabold text-sm sm:text-base text-gray-900 truncate hover:text-[#6C3BFF] cursor-pointer"
                  >
                    {item.product.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-[#6C3BFF]">
                      {item.license} license
                    </span>
                    <span className="text-xs text-gray-400">
                      {item.product.fileFormats.join(', ')}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-1">
                    Created by {item.product.creatorName}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                <div className="flex items-center gap-2 border border-gray-200 bg-gray-50 rounded-xl px-2 py-1 text-xs">
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.license, item.quantity - 1)
                    }
                    className="text-gray-500 hover:text-black font-bold px-1"
                  >
                    -
                  </button>
                  <span className="font-bold text-gray-900">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.license, item.quantity + 1)
                    }
                    className="text-gray-500 hover:text-black font-bold px-1"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <span className="font-black text-base text-gray-950 block">
                    {item.product.isFree ? 'FREE' : `$${item.price * item.quantity}`}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.license)}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 mt-0.5"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-5">
            <h2 className="font-extrabold text-lg text-gray-900">Order Summary</h2>

            {/* Coupon field */}
            {couponCode ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                  <Tag className="w-4 h-4" />
                  <span>Coupon {couponCode} applied</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-emerald-700 hover:text-red-600 font-bold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Coupon code (e.g. CREATIVE20)"
                    className="flex-1 px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#6C3BFF]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-xl"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-red-500">{couponError}</p>}
              </form>
            )}

            {/* Calculations */}
            <div className="space-y-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">${subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-black text-gray-950 pt-2 border-t border-gray-200">
                <span>Total Due</span>
                <span className="text-[#6C3BFF]">${totalAmount}</span>
              </div>
            </div>

            <button
              onClick={onNavigateCheckout}
              className="w-full py-3.5 bg-[#6C3BFF] hover:bg-purple-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-purple-500/25 transition-transform active:scale-98 flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Instant Digital Delivery • Commercial License</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
