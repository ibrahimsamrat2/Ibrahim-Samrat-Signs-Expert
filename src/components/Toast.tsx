import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';

export const ToastContainer: React.FC = () => {

  const { toasts, removeToast } = useCartWishlist();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all animate-in slide-in-from-bottom-3 duration-200 ${
            toast.type === 'success'
              ? 'bg-white/95 border-emerald-200 text-gray-900'
              : toast.type === 'error'
              ? 'bg-white/95 border-red-200 text-gray-900'
              : 'bg-white/95 border-purple-200 text-gray-900'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-[#6C3BFF]" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-xs sm:text-sm text-gray-900">{toast.title}</h4>
            <p className="text-xs text-gray-600 mt-0.5 leading-snug">{toast.message}</p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 hover:text-gray-600 p-1 shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export const Toast = ToastContainer;
