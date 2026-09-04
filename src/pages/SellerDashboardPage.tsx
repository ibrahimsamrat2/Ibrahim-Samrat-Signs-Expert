import React, { useState } from 'react';
import {
  UploadCloud,
  DollarSign,
  Package,
  TrendingUp,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Wallet,
  ArrowDownRight,
  Eye,
  Store,
  Save,
} from 'lucide-react';
import { Product, AssetCategory, FileFormat } from '../types';
import { useAuth } from '../context/AuthContext';
import { useCartWishlist } from '../context/CartWishlistContext';

interface SellerDashboardPageProps {
  initialTab?: string;
  sellerProducts: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onNavigate: (view: string, param?: string) => void;
  onSelectProduct: (id: string) => void;
}

export const SellerDashboardPage: React.FC<SellerDashboardPageProps> = ({
  initialTab = 'overview',
  sellerProducts,
  onAddProduct,
  onDeleteProduct,
  onNavigate,
  onSelectProduct,
}) => {
  const { currentUser } = useAuth();
  const { showToast } = useCartWishlist();

  const [activeTab, setActiveTab] = useState<'overview' | 'upload' | 'products' | 'earnings' | 'store'>(
    initialTab as any
  );

  // New product form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<AssetCategory>('Templates');
  const [subcategory, setSubcategory] = useState('Flyers');
  const [price, setPrice] = useState('14');
  const [originalPrice, setOriginalPrice] = useState('22');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFormats, setSelectedFormats] = useState<FileFormat[]>(['PSD', 'AI']);
  const [tags, setTags] = useState('flyer, corporate, branding, modern');
  const [thumbnailUrl, setThumbnailUrl] = useState(
    'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=600&q=80'
  );
  const [isFree, setIsFree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Payout request modal state
  const [payoutAmount, setPayoutAmount] = useState('500');
  const [payoutMethod, setPayoutMethod] = useState<'paypal' | 'bank'>('paypal');
  const [isRequestingPayout, setIsRequestingPayout] = useState(false);

  const toggleFormat = (fmt: FileFormat) => {
    setSelectedFormats((prev) =>
      prev.includes(fmt) ? prev.filter((f) => f !== fmt) : [...prev, fmt]
    );
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !shortDescription.trim()) {
      showToast('Validation Error', 'Please complete title and description.', 'error');
      return;
    }

    setIsSubmitting(true);

    const newProd: Product = {
      id: 'prod-' + Date.now(),
      title: title.trim(),
      category,
      subcategory,
      price: isFree ? 0 : Number(price) || 12,
      originalPrice: isFree ? 0 : Number(originalPrice) || 20,
      isFree,
      rating: 5.0,
      reviewCount: 1,
      downloadCount: 0,
      thumbnail: thumbnailUrl,
      previewImages: [
        thumbnailUrl,
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
      ],
      creatorId: currentUser?.uid || 'ibrahim-samrat',
      creatorName: currentUser?.displayName || 'Ibrahim Samrat',
      creatorAvatar:
        currentUser?.photoURL ||
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      shortDescription: shortDescription.trim(),
      description: description.trim() || shortDescription.trim(),
      fileFormats: selectedFormats.length > 0 ? selectedFormats : ['PSD', 'AI', 'EPS'],
      software: ['Adobe Photoshop', 'Adobe Illustrator'],
      fileCount: selectedFormats.length || 4,
      salesCount: 0,
      status: 'published',
      whatsIncluded: [
        'Organized Layered Master Files',
        'Vector Artworks & High-Res PNGs',
        'Commercial License Certificate',
        'Font & Documentation Guide',
      ],
      features: [
        '100% Fully Editable Layered Files',
        'Organized in logical groups',
        'Free Google Fonts included',
        'Ready for commercial print and digital deployment',
      ],
      tags: tags.split(',').map((t) => t.trim()),
      isTrending: true,
      fileSize: '135 MB',
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddProduct(newProd);
    setIsSubmitting(false);
    showToast('Product Published!', `"${newProd.title}" is now live in the marketplace.`, 'success');

    // Reset form
    setTitle('');
    setShortDescription('');
    setDescription('');
    setActiveTab('products');
  };

  const handlePayoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRequestingPayout(true);
    setTimeout(() => {
      setIsRequestingPayout(false);
      showToast('Payout Requested', `$${payoutAmount} will be transferred within 24-48 hours.`, 'success');
    }, 600);
  };

  return (
    <div id="seller-dashboard-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Seller Header */}
      <div className="bg-[#111827] text-white rounded-3xl p-6 sm:p-8 mb-8 border border-gray-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#6C3BFF] flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-purple-500/30 shrink-0">
            IS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white tracking-tight">
                {currentUser?.displayName || 'Ibrahim Samrat Studio'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[11px] font-bold border border-purple-500/30">
                Verified Elite Seller
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              coo.masconsultancy@gmail.com • +8801722604376 • Dhaka, Bangladesh
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('upload')}
            className="px-5 py-2.5 bg-[#6C3BFF] hover:bg-purple-600 text-white font-bold text-xs rounded-xl shadow transition-transform active:scale-95 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Asset</span>
          </button>
          <button
            onClick={() => onNavigate('seller-profile')}
            className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold text-xs rounded-xl border border-gray-700 flex items-center gap-2"
          >
            <Store className="w-4 h-4" />
            <span>Public Storefront</span>
          </button>
        </div>
      </div>

      {/* Navigation and Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl p-3 border border-gray-200/80 shadow-xs space-y-1 text-xs font-bold">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: TrendingUp },
              { id: 'upload', label: 'Upload Product', icon: UploadCloud },
              { id: 'products', label: `My Products (${sellerProducts.length})`, icon: Package },
              { id: 'earnings', label: 'Earnings & Payouts', icon: DollarSign },
              { id: 'store', label: 'Store Profile', icon: Store },
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

        {/* Tab View (9 Cols) */}
        <div className="lg:col-span-9">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-white rounded-3xl border border-gray-200/80 shadow-xs">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    Total Revenue
                  </span>
                  <div className="text-2xl font-black text-gray-900 mt-2">$4,850.00</div>
                  <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
                    +18.4% this month
                  </span>
                </div>

                <div className="p-5 bg-white rounded-3xl border border-gray-200/80 shadow-xs">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    Available Balance
                  </span>
                  <div className="text-2xl font-black text-[#6C3BFF] mt-2">$1,420.00</div>
                  <span className="text-[11px] text-gray-500 mt-1 block">Ready for payout</span>
                </div>

                <div className="p-5 bg-white rounded-3xl border border-gray-200/80 shadow-xs">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    Total Sales
                  </span>
                  <div className="text-2xl font-black text-gray-900 mt-2">1,248</div>
                  <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
                    Global buyers
                  </span>
                </div>

                <div className="p-5 bg-white rounded-3xl border border-gray-200/80 shadow-xs">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    Catalog Assets
                  </span>
                  <div className="text-2xl font-black text-gray-900 mt-2">
                    {sellerProducts.length}
                  </div>
                  <span className="text-[11px] text-purple-600 font-bold mt-1 block">
                    100% active
                  </span>
                </div>
              </div>

              {/* Quick Action Upload Prompt Banner */}
              <div className="p-6 bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black tracking-tight">
                    Submit New Creative Resource
                  </h3>
                  <p className="text-xs text-purple-200 mt-0.5">
                    Expand your catalog with vectors, templates, mockups or fonts.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="px-5 py-2.5 bg-white hover:bg-gray-100 text-gray-900 font-extrabold text-xs rounded-xl shadow shrink-0"
                >
                  Upload Product
                </button>
              </div>

              {/* Recent Products Snapshot */}
              <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="font-extrabold text-base text-gray-900">Your Live Products</h3>
                  <button
                    onClick={() => setActiveTab('products')}
                    className="text-xs font-bold text-[#6C3BFF] hover:underline"
                  >
                    View All ({sellerProducts.length}) →
                  </button>
                </div>

                <div className="space-y-3">
                  {sellerProducts.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      className="p-3 bg-gray-50 rounded-2xl flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={p.thumbnail}
                          alt={p.title}
                          className="w-12 h-12 rounded-xl object-cover bg-gray-200 shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 line-clamp-1">{p.title}</h4>
                          <span className="text-[11px] text-gray-500">
                            {p.category} • ${p.price} • {p.downloadCount} sales
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectProduct(p.id)}
                        className="px-3 py-1.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-bold rounded-lg text-xs"
                      >
                        View Live
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: UPLOAD PRODUCT FORM */}
          {activeTab === 'upload' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
              <div className="pb-4 border-b border-gray-100">
                <h3 className="font-extrabold text-lg text-gray-900">Upload Creative Resource</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Publish high-resolution templates, mockups, or vectors directly to the marketplace.
                </p>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-5 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-gray-700 block">Product Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Modern Luxury Brand Identity Kit"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none font-semibold text-gray-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Primary Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none font-semibold text-gray-900"
                    >
                      <option value="Graphics">Graphics</option>
                      <option value="Templates">Templates</option>
                      <option value="Mockups">Mockups</option>
                      <option value="Fonts">Fonts</option>
                      <option value="Logos">Logos</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Print">Print Templates</option>
                      <option value="Illustrations">Illustrations</option>
                      <option value="Patterns">Patterns & Textures</option>
                      <option value="Icons">Icons</option>
                      <option value="Branding">Branding</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Subcategory</label>
                    <input
                      type="text"
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      placeholder="e.g. Identity Systems, Flyers"
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none font-semibold text-gray-900"
                    />
                  </div>
                </div>

                {/* Price and Freebie toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Selling Price ($)</label>
                    <input
                      type="number"
                      disabled={isFree}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none font-bold text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 block mb-1">Compare Price ($)</label>
                    <input
                      type="number"
                      disabled={isFree}
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none text-gray-900"
                    />
                  </div>

                  <div className="pb-1">
                    <label className="flex items-center gap-2 p-2.5 bg-purple-50 rounded-xl cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isFree}
                        onChange={(e) => setIsFree(e.target.checked)}
                        className="accent-[#6C3BFF]"
                      />
                      <span className="font-bold text-[#6C3BFF]">Offer as Free Resource</span>
                    </label>
                  </div>
                </div>

                {/* File formats */}
                <div>
                  <label className="font-bold text-gray-700 block mb-2">
                    Included File Formats
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(['PSD', 'AI', 'EPS', 'SVG', 'PNG', 'PDF', 'OTF', 'TTF'] as FileFormat[]).map(
                      (fmt) => {
                        const isSelected = selectedFormats.includes(fmt);
                        return (
                          <button
                            key={fmt}
                            type="button"
                            onClick={() => toggleFormat(fmt)}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                              isSelected
                                ? 'bg-[#6C3BFF] text-white border-[#6C3BFF]'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {fmt}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Summary / Lead</label>
                  <input
                    type="text"
                    required
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="Crisp 1-2 sentence overview of what is included."
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none"
                  />
                </div>

                {/* Detailed Description */}
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Detailed Product Information
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="List dimensions, layer structure, required software, and usage recommendations."
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none"
                  />
                </div>

                {/* Thumbnail Image URL */}
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Preview Image URL
                  </label>
                  <input
                    type="url"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none font-mono text-[11px]"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="font-bold text-gray-700 block mb-1">
                    Search Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="mockup, luxury, gold, branding"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 bg-[#6C3BFF] hover:bg-purple-700 text-white font-black text-xs rounded-xl shadow-lg shadow-purple-500/25 transition-transform active:scale-95 flex items-center gap-2"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>{isSubmitting ? 'Publishing...' : 'Publish Product to Marketplace'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: MY PRODUCTS LIST */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-extrabold text-lg text-gray-900">Your Published Catalog</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Manage prices, preview live assets, or remove discontinued items.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="px-3.5 py-1.5 bg-[#6C3BFF] text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="space-y-3">
                {sellerProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="w-16 h-16 rounded-xl object-cover bg-gray-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4
                          onClick={() => onSelectProduct(p.id)}
                          className="font-bold text-sm text-gray-900 truncate hover:text-[#6C3BFF] cursor-pointer"
                        >
                          {p.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          <span className="font-semibold text-[#6C3BFF]">{p.category}</span>
                          <span>•</span>
                          <span>Formats: {p.fileFormats.join(', ')}</span>
                          <span>•</span>
                          <span>{p.downloadCount} Sales</span>
                        </div>
                        <span className="font-black text-sm text-gray-900 block mt-1">
                          {p.isFree ? 'FREE' : `$${p.price}`}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => onSelectProduct(p.id)}
                        className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-black hover:border-gray-300"
                        title="View Live Listing"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          onDeleteProduct(p.id);
                          showToast('Product Removed', `Asset was removed from marketplace.`, 'info');
                        }}
                        className="p-2 bg-white border border-gray-200 rounded-lg text-red-500 hover:bg-red-50"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EARNINGS & PAYOUTS */}
          {activeTab === 'earnings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 bg-white rounded-3xl border border-gray-200/80 shadow-xs space-y-2">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    Available for Payout
                  </span>
                  <div className="text-3xl font-black text-[#6C3BFF]">$1,420.00</div>
                  <span className="text-xs text-gray-500 block">
                    Weekly payout cycle processed every Tuesday.
                  </span>
                </div>

                <div className="p-6 bg-white rounded-3xl border border-gray-200/80 shadow-xs space-y-2">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    Total Paid to Date
                  </span>
                  <div className="text-3xl font-black text-gray-900">$3,430.00</div>
                  <span className="text-xs text-emerald-600 font-bold block">
                    Zero commission fees on current creator tier.
                  </span>
                </div>
              </div>

              {/* Request Payout Form */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-4">
                <h3 className="font-extrabold text-base text-gray-900">Request Withdrawal</h3>
                <form onSubmit={handlePayoutSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-gray-700 block mb-1">
                        Amount to Withdraw ($)
                      </label>
                      <input
                        type="number"
                        max={1420}
                        min={50}
                        value={payoutAmount}
                        onChange={(e) => setPayoutAmount(e.target.value)}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none font-bold text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-gray-700 block mb-1">
                        Transfer Destination
                      </label>
                      <select
                        value={payoutMethod}
                        onChange={(e) => setPayoutMethod(e.target.value as any)}
                        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#6C3BFF] outline-none font-semibold text-gray-900"
                      >
                        <option value="paypal">PayPal (coo.masconsultancy@gmail.com)</option>
                        <option value="bank">Direct Bank Wire (City Bank Ltd)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isRequestingPayout}
                    className="px-6 py-3 bg-[#6C3BFF] hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow transition-transform active:scale-95"
                  >
                    {isRequestingPayout ? 'Submitting Request...' : `Withdraw $${payoutAmount}`}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 5: STORE PROFILE */}
          {activeTab === 'store' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-4">
              <div className="pb-4 border-b border-gray-100">
                <h3 className="font-extrabold text-lg text-gray-900">Storefront Identity</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Customize the banner, headline, and bio visible on your public seller profile.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Brand Name</label>
                  <input
                    type="text"
                    defaultValue="Ibrahim Samrat Studio"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Tagline</label>
                  <input
                    type="text"
                    defaultValue="Premium Creative Assets for Design Professionals"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Creator Bio</label>
                  <textarea
                    rows={3}
                    defaultValue="Founder & Creative Director. Specializing in high-end vector graphics, Photoshop smart mockups, editorial templates, and brand identity systems."
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => showToast('Store Updated', 'Public creator profile updated.', 'success')}
                  className="px-6 py-2.5 bg-[#6C3BFF] text-white font-bold rounded-xl shadow"
                >
                  Save Store Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
