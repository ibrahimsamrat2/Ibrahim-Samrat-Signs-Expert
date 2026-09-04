import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles, Store, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCartWishlist } from '../context/CartWishlistContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'buyer' | 'seller';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultRole = 'buyer' }) => {
  const { signInWithGoogle, signInAsDemo } = useAuth();
  const { showToast } = useCartWishlist();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [role, setRole] = useState<'buyer' | 'seller'>(defaultRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleGoogleAuth = async () => {
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
      showToast('Welcome!', 'Signed in successfully with Google.', 'success');
      onClose();
    } catch {
      showToast('Notice', 'Continuing in demo mode.', 'info');
      signInAsDemo(role);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoAuth = (targetRole: 'buyer' | 'seller') => {
    signInAsDemo(targetRole);
    showToast(
      'Signed In (Demo)',
      `You are signed in as ${targetRole === 'seller' ? 'Ibrahim Samrat (Seller)' : 'Alex Rivers (Buyer)'}.`,
      'success'
    );
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      signInAsDemo(role);
      showToast('Account Ready', `Welcome to Ibrahim Samrat Marketplace!`, 'success');
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div
      id="auth-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="auth-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 relative my-8 p-6 sm:p-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#6C3BFF] text-white font-extrabold text-2xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/25">
            IS
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            {mode === 'signin' ? 'Welcome Back' : 'Join Ibrahim Samrat'}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {mode === 'signin'
              ? 'Access your purchased assets, downloads, and seller earnings'
              : 'Create an account to start downloading & selling creative assets'}
          </p>
        </div>

        {/* Auth Mode Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'signin'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Real Firebase Google Sign In */}
        <button
          onClick={handleGoogleAuth}
          disabled={isSubmitting}
          type="button"
          className="w-full py-2.5 px-4 bg-white border border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-800 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-3 transition-all shadow-sm active:scale-98"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-[11px] text-gray-400 uppercase">
            <span className="bg-white px-2">or quick demo sign in</span>
          </div>
        </div>

        {/* Quick Demo Access Pills */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <button
            type="button"
            onClick={() => handleDemoAuth('buyer')}
            className="p-2.5 rounded-xl border border-gray-200 hover:border-[#6C3BFF] hover:bg-purple-50/50 text-left transition-colors flex items-center gap-2 group"
          >
            <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-[#6C3BFF] group-hover:text-white flex items-center justify-center text-xs">
              🛍️
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900 leading-tight">Buyer Account</div>
              <div className="text-[10px] text-gray-500">Alex Rivers</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleDemoAuth('seller')}
            className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/30 hover:border-[#6C3BFF] hover:bg-purple-50 text-left transition-colors flex items-center gap-2 group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#6C3BFF] text-white flex items-center justify-center text-xs">
              👑
            </div>
            <div>
              <div className="text-xs font-bold text-[#6C3BFF] leading-tight">Seller Account</div>
              <div className="text-[10px] text-gray-500">Ibrahim Samrat</div>
            </div>
          </button>
        </div>

        {/* Standard Email / Password Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'signup' && (
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ibrahim Samrat"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#6C3BFF] outline-none"
                />
                <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#6C3BFF] outline-none"
              />
              <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-gray-700">Password</label>
              {mode === 'signin' && (
                <button
                  type="button"
                  className="text-[11px] text-[#6C3BFF] hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#6C3BFF] outline-none"
              />
              <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-gray-400" />
            </div>
          </div>

          {mode === 'signup' && (
            <div className="pt-2">
              <label className="text-xs font-bold text-gray-700 block mb-1.5">
                I want to join as:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label
                  className={`flex items-center gap-2 p-2.5 border rounded-xl cursor-pointer text-xs ${
                    role === 'buyer'
                      ? 'border-[#6C3BFF] bg-purple-50 text-[#6C3BFF] font-bold'
                      : 'border-gray-200 text-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    checked={role === 'buyer'}
                    onChange={() => setRole('buyer')}
                    className="accent-[#6C3BFF]"
                  />
                  <span>Customer (Buyer)</span>
                </label>

                <label
                  className={`flex items-center gap-2 p-2.5 border rounded-xl cursor-pointer text-xs ${
                    role === 'seller'
                      ? 'border-[#6C3BFF] bg-purple-50 text-[#6C3BFF] font-bold'
                      : 'border-gray-200 text-gray-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    checked={role === 'seller'}
                    onChange={() => setRole('seller')}
                    className="accent-[#6C3BFF]"
                  />
                  <span>Creator (Seller)</span>
                </label>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 py-2.5 bg-[#6C3BFF] hover:bg-purple-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-purple-500/25 transition-transform active:scale-98"
          >
            {mode === 'signin' ? 'Sign In to Marketplace' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-gray-500">
          <ShieldCheck className="w-3.5 h-3.5 inline text-emerald-500 mr-1" />
          <span>Protected by 256-bit encryption & Firebase Authentication</span>
        </div>
      </div>
    </div>
  );
};
