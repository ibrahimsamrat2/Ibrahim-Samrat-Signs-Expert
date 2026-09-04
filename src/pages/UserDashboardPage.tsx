import React, { useState } from 'react';
import {
  Download,
  Receipt,
  Heart,
  Settings,
  LayoutDashboard,
  ShieldCheck,
  ShoppingBag,
  ExternalLink,
  Save,
  CheckCircle,
  Clock,
  Trash2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCartWishlist } from '../context/CartWishlistContext';
import { Product } from '../types';

interface UserDashboardPageProps {
  initialTab?: string;
  products: Product[];
  onNavigate: (view: string, param?: string) => void;
  onSelectProduct: (id: string) => void;
}

export const UserDashboardPage: React.FC<UserDashboardPageProps> = ({
  initialTab = 'overview',
  products,
  onNavigate,
  onSelectProduct,
}) => {
  const { currentUser, updateProfile } = useAuth();
  const { downloads, orders, wishlistIds, toggleWishlist, addToCart, showToast } =
    useCartWishlist();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'downloads' | 'orders' | 'wishlist' | 'settings'
  >(initialTab as any);

  // Settings form states
  const [displayName, setDisplayName] = useState(currentUser?.displayName || 'Alex Rivers');
  const [phone, setPhone] = useState(currentUser?.phone || '+44 20 7946 0912');
  const [location, setLocation] = useState(currentUser?.location || 'London, United Kingdom');
  const [bio, setBio] = useState(currentUser?.bio || 'Senior Art Director & Brand Designer.');
  const [isSaving, setIsSaving] = useState(false);

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateProfile({
      displayName,
      phone,
      location,
      bio,
    });
    setIsSaving(false);
    showToast('Profile Updated', 'Your customer information was saved successfully.', 'success');
  };

  const handleDownloadFile = (title: string) => {
    showToast(
      'Downloading File',
      `Starting instant download for "${title}". Package includes full PSD & Vector files.`,
      'success'
    );
  };

  return (
    <div id="user-dashboard-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Profile Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={
              currentUser?.photoURL ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
            }
            alt={currentUser?.displayName}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-purple-100"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-gray-950 tracking-tight">
                {currentUser?.displayName || 'Creative Designer'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-[#6C3BFF] text-[11px] font-bold">
                Customer Account
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{currentUser?.email}</p>
            <span className="text-[11px] text-gray-400">
              Member since {currentUser?.createdAt || '2026'} • 256-Bit SSL Protected
            </span>
          </div>
        </div>

        <button
          onClick={() => onNavigate('shop')}
          className="px-5 py-2.5 bg-[#6C3BFF] hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow transition-transform active:scale-95 flex items-center gap-2 self-start sm:self-center"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Browse Marketplace</span>
        </button>
      </div>

      {/* Main Grid: Navigation Sidebar + Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl p-3 border border-gray-200/80 shadow-xs space-y-1 text-xs font-bold">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'downloads', label: `My Downloads (${downloads.length})`, icon: Download },
              { id: 'orders', label: `Order History (${orders.length})`, icon: Receipt },
              { id: 'wishlist', label: `Saved Wishlist (${wishlistIds.length})`, icon: Heart },
              { id: 'settings', label: 'Account Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-left ${
                    isSelected
                      ? 'bg-[#6C3BFF] text-white shadow-md shadow-purple-500/20'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content (9 Cols) */}
        <div className="lg:col-span-9">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-white rounded-3xl border border-gray-200/80 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#6C3BFF] flex items-center justify-center mb-3">
                    <Download className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">Available Downloads</span>
                  <div className="text-2xl font-black text-gray-900 mt-1">{downloads.length}</div>
                </div>

                <div className="p-5 bg-white rounded-3xl border border-gray-200/80 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#6C3BFF] flex items-center justify-center mb-3">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">Completed Orders</span>
                  <div className="text-2xl font-black text-gray-900 mt-1">{orders.length}</div>
                </div>

                <div className="p-5 bg-white rounded-3xl border border-gray-200/80 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#6C3BFF] flex items-center justify-center mb-3">
                    <Heart className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">Saved Assets</span>
                  <div className="text-2xl font-black text-gray-900 mt-1">
                    {wishlistIds.length}
                  </div>
                </div>
              </div>

              {/* Recent Downloads Box */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="font-extrabold text-base text-gray-900">Recent Asset Purchases</h3>
                  <button
                    onClick={() => setActiveTab('downloads')}
                    className="text-xs font-bold text-[#6C3BFF] hover:underline"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {downloads.slice(0, 3).map((dl) => (
                    <div
                      key={dl.id}
                      className="p-3 bg-gray-50 rounded-2xl flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={dl.thumbnail}
                          alt={dl.productTitle}
                          className="w-12 h-12 rounded-xl object-cover bg-gray-200 shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 line-clamp-1">{dl.productTitle}</h4>
                          <span className="text-[11px] text-gray-500">
                            {dl.fileType} • {dl.fileSize}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDownloadFile(dl.productTitle)}
                        className="px-3.5 py-1.5 bg-[#6C3BFF] hover:bg-purple-700 text-white font-bold rounded-lg shrink-0 flex items-center gap-1.5"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MY DOWNLOADS */}
          {activeTab === 'downloads' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900">Your Download Vault</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Lifetime cloud storage for all your acquired creative assets.
                  </p>
                </div>
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Commercial Licenses Active
                </span>
              </div>

              {downloads.length === 0 ? (
                <div className="py-12 text-center text-xs text-gray-500">
                  No downloads available yet. Browse the marketplace to add resources.
                </div>
              ) : (
                <div className="space-y-3">
                  {downloads.map((dl) => (
                    <div
                      key={dl.id}
                      className="p-4 bg-gray-50 rounded-2xl border border-gray-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={dl.thumbnail}
                          alt={dl.productTitle}
                          className="w-16 h-16 rounded-xl object-cover bg-gray-200 shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-gray-900">{dl.productTitle}</h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            <span className="px-2 py-0.5 rounded bg-purple-100 text-[#6C3BFF] font-semibold text-[10px]">
                              {dl.category}
                            </span>
                            <span>{dl.fileType}</span>
                            <span>•</span>
                            <span>{dl.fileSize}</span>
                          </div>
                          <span className="text-[11px] text-gray-400 block mt-1">
                            Purchased: {dl.purchaseDate}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => handleDownloadFile(dl.productTitle)}
                          className="px-4 py-2 bg-[#6C3BFF] hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-transform active:scale-95"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Archive</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ORDER HISTORY */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900">Order History & Invoices</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    View official receipts and financial records for your tax reporting.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.orderId}
                    className="p-5 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs pb-2 border-b border-gray-200/60">
                      <div className="flex items-center gap-3">
                        <span className="font-extrabold text-gray-900">{ord.orderNumber}</span>
                        <span className="text-gray-400">{ord.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px] uppercase">
                          {ord.status}
                        </span>
                        <span className="font-extrabold text-sm text-[#6C3BFF]">
                          ${ord.totalAmount}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {ord.items.map((item) => (
                        <div
                          key={`${item.productId}-${item.license}`}
                          className="flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={item.thumbnail}
                              alt={item.productTitle}
                              className="w-8 h-8 rounded-lg object-cover bg-gray-200"
                            />
                            <span className="font-semibold text-gray-800 truncate max-w-xs">
                              {item.productTitle}
                            </span>
                            <span className="text-[10px] text-gray-400">({item.license})</span>
                          </div>
                          <span className="font-bold text-gray-900">${item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SAVED WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900">Your Saved Wishlist</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Assets you have bookmarked for upcoming creative assignments.
                  </p>
                </div>
              </div>

              {wishlistProducts.length === 0 ? (
                <div className="py-12 text-center text-xs text-gray-500">
                  You haven't saved any assets to your wishlist yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div
                        onClick={() => onSelectProduct(p.id)}
                        className="flex items-center gap-3 cursor-pointer min-w-0"
                      >
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="w-14 h-14 rounded-xl object-cover bg-gray-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-bold text-gray-900 truncate">{p.title}</h4>
                          <span className="text-[11px] text-gray-500">{p.category}</span>
                          <span className="font-black text-sm text-[#6C3BFF] block mt-0.5">
                            ${p.price}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 shrink-0">
                        <button
                          onClick={() => addToCart(p, 'commercial', 1)}
                          className="px-3 py-1.5 bg-[#6C3BFF] hover:bg-purple-700 text-white font-bold rounded-lg text-xs"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="text-gray-400 hover:text-red-500 text-[11px] text-center"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: ACCOUNT SETTINGS */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
              <div className="pb-4 border-b border-gray-100">
                <h3 className="font-extrabold text-lg text-gray-900">Account Preferences</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Update your contact details, billing region, and bio.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none font-semibold text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      disabled
                      value={currentUser?.email || ''}
                      className="w-full p-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none font-semibold text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none font-semibold text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Short Bio</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 bg-[#6C3BFF] hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow transition-transform active:scale-95 flex items-center gap-2"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{isSaving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
