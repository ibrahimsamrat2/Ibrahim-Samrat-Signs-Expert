import React, { useState } from 'react';
import {
  CreditCard,
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  Gift,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCartWishlist } from '../context/CartWishlistContext';
import { useAuth } from '../context/AuthContext';
import { OrderRecord } from '../types';

interface CheckoutPageProps {
  onNavigate: (view: string, param?: string) => void;
  onOrderCompleted: (order: OrderRecord) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate, onOrderCompleted }) => {
  const { cartItems, subtotal, discountAmount, totalAmount, createOrder, showToast } =
    useCartWishlist();
  const { currentUser } = useAuth();

  const [customerName, setCustomerName] = useState(currentUser?.displayName || 'Alex Rivers');
  const [customerEmail, setCustomerEmail] = useState(
    currentUser?.email || 'designer.alex@creativestudio.com'
  );
  const [country, setCountry] = useState('United Kingdom');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'stripe'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCVC, setCardCVC] = useState('888');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      showToast('Cart is Empty', 'Please add items before checking out.', 'error');
      return;
    }

    setIsProcessing(true);

    try {
      const order = await createOrder({
        customerName,
        customerEmail,
        country,
        paymentMethod,
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore confetti errors
      }

      showToast('Order Successful!', 'Your assets are ready for download.', 'success');
      onOrderCompleted(order);
    } catch (err) {
      console.error(err);
      showToast('Payment Error', 'Could not process transaction.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div id="checkout-page" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-950 tracking-tight">Checkout</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Complete your purchase to immediately download your files.
          </p>
        </div>

        <button
          onClick={() => onNavigate('cart')}
          className="text-xs font-bold text-[#6C3BFF] hover:underline flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </button>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Customer & Payment Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer Details Box */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-4">
            <h2 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-[#6C3BFF] text-xs font-black flex items-center justify-center">
                1
              </span>
              <span>Billing & Account Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Email (For Downloads & Invoice)</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-gray-700 block mb-1">Country / Region</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none font-semibold text-gray-800"
                >
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-4">
            <h2 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-[#6C3BFF] text-xs font-black flex items-center justify-center">
                2
              </span>
              <span>Select Payment Method</span>
            </h2>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'card', name: 'Credit Card', icon: '💳' },
                { id: 'paypal', name: 'PayPal', icon: '🅿️' },
                { id: 'stripe', name: 'Stripe Pay', icon: '⚡' },
              ].map((pm) => (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setPaymentMethod(pm.id as any)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentMethod === pm.id
                      ? 'border-[#6C3BFF] bg-purple-50 text-[#6C3BFF] font-bold ring-2 ring-purple-400/20'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl block mb-1">{pm.icon}</span>
                  <span className="text-xs">{pm.name}</span>
                </button>
              ))}
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-3 pt-2 text-xs">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none font-mono"
                    />
                    <CreditCard className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Expires (MM/YY)</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Security Code (CVC)</label>
                    <input
                      type="text"
                      required
                      value={cardCVC}
                      onChange={(e) => setCardCVC(e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 text-xs text-blue-900 flex items-center gap-3">
                <span className="text-2xl">🅿️</span>
                <span>You will be safely routed to PayPal to approve your digital asset payment.</span>
              </div>
            )}

            {paymentMethod === 'stripe' && (
              <div className="p-4 bg-purple-50/50 rounded-2xl border border-purple-100 text-xs text-purple-900 flex items-center gap-3">
                <span className="text-2xl">⚡</span>
                <span>Instant 1-click checkout secured by Stripe Elements.</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-gray-400 pt-2">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-bit encrypted checkout. We never store credit card numbers.</span>
            </div>
          </div>
        </div>

        {/* Right: Order Items & Pay CTA (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-5">
            <h2 className="font-extrabold text-base text-gray-900">
              Review Items ({cartItems.length})
            </h2>

            <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-gray-100 pr-1">
              {cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.license}`}
                  className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs"
                >
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="w-12 h-12 rounded-xl object-cover bg-gray-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate">{item.product.title}</h4>
                    <span className="text-[10px] text-gray-500 capitalize">
                      {item.license} License • Qty {item.quantity}
                    </span>
                  </div>
                  <span className="font-bold text-gray-900 shrink-0">
                    {item.product.isFree ? 'FREE' : `$${item.price * item.quantity}`}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-gray-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">${subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-black text-gray-950 pt-2 border-t border-gray-200">
                <span>Total Due</span>
                <span className="text-[#6C3BFF]">${totalAmount}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-[#6C3BFF] hover:bg-purple-700 text-white rounded-2xl font-extrabold text-sm shadow-xl shadow-purple-500/25 transition-transform active:scale-98 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Authorizing Payment...</span>
              ) : (
                <>
                  <span>Pay ${totalAmount} & Complete Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-center space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Instant Digital Download Available Immediately</span>
              </div>
              <p className="text-[10px] text-emerald-700">
                A download link & license receipt will also be sent to {customerEmail}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
