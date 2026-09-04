import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';

interface CartDrawerProps {
  onNavigateCheckout: () => void;
  onNavigateShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigateCheckout, onNavigateShop }) => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
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

  if (!isCartOpen) return null;

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

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    onNavigateCheckout();
  };

  return (
    <div
      id="cart-drawer-backdrop"
      onClick={() => setIsCartOpen(false)}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
    >
      <div
        id="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#6C3BFF]" />
            <h2 className="font-extrabold text-lg text-gray-900">Your Cart</h2>
            <span className="px-2 py-0.5 bg-purple-100 text-[#6C3BFF] text-xs font-bold rounded-full">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-50 text-[#6C3BFF] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="font-bold text-gray-800 text-base">Your cart is waiting for creativity.</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Explore thousands of high-converting PSDs, vectors, fonts, and mockups crafted by Ibrahim Samrat.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onNavigateShop();
                }}
                className="px-5 py-2.5 bg-[#6C3BFF] text-white text-xs font-bold rounded-full shadow hover:bg-purple-700 transition-transform active:scale-95"
              >
                Explore Marketplace
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.product.id}-${item.license}`}
                className="flex gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100 relative group"
              >
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0 bg-gray-200"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.license)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-purple-100 text-[#6C3BFF]">
                        {item.license} License
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {item.product.fileFormats.join(', ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200/60">
                    <div className="flex items-center gap-2 border border-gray-200 bg-white rounded-lg px-2 py-0.5 text-xs">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.license, item.quantity - 1)
                        }
                        className="text-gray-500 hover:text-black font-bold px-1"
                      >
                        -
                      </button>
                      <span className="font-semibold text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.license, item.quantity + 1)
                        }
                        className="text-gray-500 hover:text-black font-bold px-1"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-extrabold text-sm text-gray-900">
                      {item.product.isFree ? 'FREE' : `$${item.price * item.quantity}`}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Actions */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-gray-50/70 space-y-3">
            {/* Coupon input */}
            {couponCode ? (
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Coupon {couponCode} applied (-20%)</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-emerald-700 hover:text-red-600 font-bold text-[11px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  placeholder="Coupon code (e.g. CREATIVE20)"
                  className="flex-1 px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-xl outline-none focus:border-[#6C3BFF]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-xl"
                >
                  Apply
                </button>
              </form>
            )}

            {couponError && <div className="text-[11px] text-red-500">{couponError}</div>}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-gray-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">${subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-extrabold text-gray-900 pt-1 border-t border-gray-200">
                <span>Total</span>
                <span className="text-[#6C3BFF]">${totalAmount}</span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={handleCheckoutClick}
              className="w-full py-3 bg-[#6C3BFF] hover:bg-purple-700 text-white rounded-xl font-bold text-sm shadow-md shadow-purple-500/25 flex items-center justify-center gap-2 transition-transform active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Instant Download • Commercial License • Secure SSL</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
