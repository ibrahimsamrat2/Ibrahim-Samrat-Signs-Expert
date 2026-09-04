import React from 'react';
import { CheckCircle2, Download, Receipt, ArrowRight, ShieldCheck, FileCheck } from 'lucide-react';
import { OrderRecord } from '../types';
import { useCartWishlist } from '../context/CartWishlistContext';

interface OrderSuccessPageProps {
  order: OrderRecord;
  onNavigate: (view: string, param?: string) => void;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ order, onNavigate }) => {
  const { showToast } = useCartWishlist();

  const handleSimulateDownload = (title: string) => {
    showToast(
      'Download Started',
      `Downloading production package for "${title}". Your commercial license is active.`,
      'success'
    );
  };

  return (
    <div id="order-success-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      {/* Success Hero */}
      <div className="text-center space-y-4 bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-xl shadow-purple-900/5">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
          Payment Confirmed & Files Ready!
        </h1>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          Thank you for supporting Ibrahim Samrat Marketplace. Your digital resources and commercial licenses are immediately accessible below.
        </p>

        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gray-50 border border-gray-200 text-xs text-gray-700">
          <span>
            Order Number: <strong className="text-gray-950">{order.orderNumber}</strong>
          </span>
          <span>•</span>
          <span>Date: {order.createdAt}</span>
          <span>•</span>
          <span className="font-bold text-[#6C3BFF]">Total: ${order.totalAmount}</span>
        </div>
      </div>

      {/* Purchased Downloads List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h2 className="text-lg font-extrabold text-gray-900 flex items-center gap-2">
            <Download className="w-5 h-5 text-[#6C3BFF]" />
            <span>Instant Digital Downloads</span>
          </h2>
          <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> Lifetime Access
          </span>
        </div>

        <div className="space-y-3">
          {order.items.map((item) => (
            <div
              key={`${item.productId}-${item.license}`}
              className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.thumbnail}
                  alt={item.productTitle}
                  className="w-16 h-16 rounded-xl object-cover bg-gray-200 shrink-0"
                />
                <div>
                  <h3 className="font-bold text-sm text-gray-900">{item.productTitle}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-100 text-[#6C3BFF]">
                      {item.license} License
                    </span>
                    <span className="text-[10px] text-gray-400">
                      Formats: {item.fileFormats.join(', ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => handleSimulateDownload(item.productTitle)}
                  className="px-4 py-2.5 bg-[#6C3BFF] hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm transition-transform active:scale-95 flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Archive (.ZIP)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation and Next Steps */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <button
          onClick={() => onNavigate('user-dashboard', 'downloads')}
          className="w-full sm:w-auto px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2"
        >
          <Receipt className="w-4 h-4" />
          <span>View In Customer Library</span>
        </button>

        <button
          onClick={() => onNavigate('shop')}
          className="w-full sm:w-auto px-6 py-3 bg-purple-50 hover:bg-purple-100 text-[#6C3BFF] rounded-xl font-bold text-xs flex items-center justify-center gap-2"
        >
          <span>Continue Exploring Assets</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
