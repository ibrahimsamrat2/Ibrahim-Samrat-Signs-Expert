import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Clock,
  Gift,
  DollarSign,
  ShieldCheck,
  DownloadCloud,
  CheckCircle2,
  Users,
  Layers,
  Box,
  Type,
  PenTool,
  Share2,
  FileText,
  Grid,
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES_DATA, FEATURED_COLLECTIONS } from '../data/mockProducts';
import { Product, AssetCategory } from '../types';
import { useCartWishlist } from '../context/CartWishlistContext';

interface HomePageProps {
  products: Product[];
  onSelectProduct: (id: string) => void;
  onNavigate: (view: string, param?: string) => void;
  onOpenSellerModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onSelectProduct,
  onNavigate,
  onOpenSellerModal,
}) => {
  const { showToast } = useCartWishlist();
  const [heroSearch, setHeroSearch] = useState('');
  const [newArrivalTab, setNewArrivalTab] = useState<string>('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      onNavigate('shop', heroSearch.trim());
    } else {
      onNavigate('shop');
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      showToast('Subscribed!', 'Thank you for subscribing to our design newsletter.', 'success');
      setNewsletterEmail('');
    }
  };

  // Sliced products for sections
  const trendingProducts = products.filter((p) => p.isTrending || p.isBestSeller).slice(0, 4);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const freebies = products.filter((p) => p.isFree).slice(0, 3);

  const filteredNewArrivals = products
    .filter((p) => {
      if (newArrivalTab === 'All') return true;
      if (newArrivalTab === 'Graphics') return p.category === 'Graphics' || p.category === 'Patterns';
      if (newArrivalTab === 'Templates') return p.category === 'Templates';
      if (newArrivalTab === 'Mockups') return p.category === 'Mockups';
      if (newArrivalTab === 'Fonts') return p.category === 'Fonts';
      return true;
    })
    .slice(0, 4);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'PenTool':
        return <PenTool className="w-5 h-5 text-[#6C3BFF]" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#6C3BFF]" />;
      case 'Box':
        return <Box className="w-5 h-5 text-[#6C3BFF]" />;
      case 'Share2':
        return <Share2 className="w-5 h-5 text-[#6C3BFF]" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-[#6C3BFF]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#6C3BFF]" />;
      case 'Type':
        return <Type className="w-5 h-5 text-[#6C3BFF]" />;
      default:
        return <Grid className="w-5 h-5 text-[#6C3BFF]" />;
    }
  };

  return (
    <div id="home-page" className="space-y-16 sm:space-y-24 pb-20">
      {/* SECTION 1: HERO - ARTISTIC FLAIR THEME */}
      <section
        id="hero-section"
        className="hero-gradient relative pt-8 sm:pt-14 pb-12 sm:pb-20 border-b border-[#E5E7EB] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12">
            {/* Left Content Column */}
            <div className="max-w-2xl text-left w-full">
              <span className="text-[#6C3BFF] font-extrabold text-xs sm:text-sm tracking-[0.2em] uppercase mb-4 block">
                Premium Creative Marketplace
              </span>

              <h1 className="text-4xl sm:text-6xl lg:text-[70px] leading-[1.08] font-extrabold text-[#111827] tracking-tight mb-6">
                Unlimited Creativity <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C3BFF] to-[#8B5CF6]">
                  Starts Here.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed mb-8 max-w-xl">
                Discover premium vectors, editable PSD files, mockups, and professional design resources curated for modern creatives.
              </p>

              {/* Central Search Bar */}
              <div className="mb-8">
                <form
                  onSubmit={handleHeroSearch}
                  className="p-1.5 bg-white rounded-full shadow-lg shadow-purple-900/5 border border-[#E5E7EB] flex items-center gap-2 max-w-lg"
                >
                  <div className="pl-4 text-gray-400">
                    <Search className="w-4 h-4 text-[#6C3BFF]" />
                  </div>
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Search vectors, templates, mockups, fonts..."
                    className="flex-1 text-xs sm:text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400 py-2"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#6C3BFF] hover:bg-[#5A31D6] text-white text-xs sm:text-sm font-semibold rounded-full shadow-md shadow-[#6C3BFF33] transition-all"
                  >
                    Search
                  </button>
                </form>

                {/* Popular Tags */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
                  <span className="font-semibold text-gray-400 mr-1 text-[11px]">Popular:</span>
                  {['Mockup', 'PSD', 'Social Media', 'Vector', 'Fonts', 'Branding'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => onNavigate('shop', tag)}
                      className="px-2.5 py-0.5 rounded-full bg-white hover:bg-purple-50 hover:text-[#6C3BFF] border border-[#E5E7EB] text-gray-600 transition-colors text-[11px]"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons & Creator Social Proof */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('shop')}
                  className="bg-[#111827] text-white px-7 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-black/10 text-sm"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 py-2">
                  <div className="flex -space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                      alt="Creator"
                      className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                      alt="Creator"
                      className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=100&q=80"
                      alt="Creator"
                      className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                  </div>
                  <span className="text-xs font-medium text-[#6B7280] ml-2">
                    Joined by <strong className="text-[#111827]">12k+</strong> creators
                  </span>
                </div>
              </div>
            </div>

            {/* Right Showcase Card with Artistic Flair 3D Tilt */}
            <div
              onClick={() => onNavigate('shop', 'Mockups')}
              className="w-full sm:w-[380px] lg:w-[390px] h-[320px] bg-white rounded-3xl shadow-2xl border border-[#F1F5F9] p-2.5 lg:rotate-3 hover:rotate-0 transition-transform duration-300 relative z-10 cursor-pointer shrink-0"
            >
              <div className="w-full h-full bg-[#F8FAFC] rounded-2xl overflow-hidden relative group">
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
                  alt="Featured Showcase"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="p-5 flex flex-col h-full justify-between relative z-10 text-white">
                  <div className="flex justify-between items-start">
                    <span className="bg-white/90 backdrop-blur-md text-gray-900 px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                      Featured PSD
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#6C3BFF] shadow-sm">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider block mb-1">
                      by Ibrahim Samrat
                    </span>
                    <div className="text-xl font-bold leading-tight drop-shadow-sm">
                      Ultra-Realistic <br />Branding Mockup v.2
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: POPULAR CATEGORIES */}
      <section id="popular-categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Explore Creative Categories
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Everything you need to bring your creative ideas to life.
            </p>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs sm:text-sm font-bold text-[#6C3BFF] hover:underline flex items-center gap-1 mt-2 sm:mt-0"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.title}
              onClick={() => onNavigate('category', cat.category)}
              className="group bg-white rounded-2xl border border-gray-200/80 overflow-hidden hover:border-[#6C3BFF]/40 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-2 text-white">
                  <div className="w-7 h-7 rounded-lg bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#6C3BFF] shadow">
                    {getCategoryIcon(cat.icon)}
                  </div>
                  <span className="text-[11px] font-semibold text-white/90 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {cat.count}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-gray-900 group-hover:text-[#6C3BFF] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-3 flex items-center text-xs font-bold text-[#6C3BFF]">
                  <span>Explore assets</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: TRENDING PRODUCTS - ARTISTIC FLAIR */}
      <section id="trending-products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#111827]">Trending Assets</h2>
          <button
            onClick={() => onNavigate('shop')}
            className="text-[#6C3BFF] font-semibold text-sm flex items-center gap-1 hover:underline"
          >
            <span>View all marketplace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}

          {/* Join the Community Upload & Sell Card */}
          <div
            onClick={() => onNavigate('seller-dashboard')}
            className="bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] rounded-2xl flex flex-col items-center justify-center p-6 text-center group cursor-pointer hover:bg-white hover:border-[#6C3BFF] transition-all min-h-[280px]"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-[#6C3BFF]" />
            </div>
            <p className="text-sm font-bold text-[#111827]">Join the Community</p>
            <p className="text-xs text-[#64748B] mt-1 max-w-[180px]">
              Upload and sell your first creative design today
            </p>
            <span className="mt-4 px-3 py-1 bg-purple-50 text-[#6C3BFF] rounded-full text-xs font-bold group-hover:bg-[#6C3BFF] group-hover:text-white transition-colors">
              Start Selling →
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED COLLECTIONS */}
      <section id="featured-collections-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#6C3BFF] px-3 py-1 bg-purple-50 rounded-full">
            Curated Bundles
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-2">
            Featured Creative Collections
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Handcrafted asset toolkits organized by design discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => onNavigate('shop', col.title.split(' ')[0])}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[3/4] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />

              <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-white">
                    {col.tag}
                  </span>
                  <span className="px-2.5 py-0.5 bg-[#6C3BFF] text-white rounded-md text-xs font-black">
                    {col.badge}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs text-purple-300 font-semibold">{col.itemCount}</span>
                  <h3 className="text-xl sm:text-2xl font-black leading-snug">{col.title}</h3>
                  <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                    {col.description}
                  </p>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-gray-900 font-bold text-xs rounded-xl group-hover:bg-[#6C3BFF] group-hover:text-white transition-colors">
                      <span>Explore Collection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: BEST SELLERS */}
      <section id="best-sellers-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6C3BFF] uppercase tracking-wider mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>Top Rated</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Best Selling Assets
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs sm:text-sm font-bold text-[#6C3BFF] hover:underline flex items-center gap-1"
          >
            <span>View All Bestsellers →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* SECTION 6: NEW ARRIVALS */}
      <section id="new-arrivals-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Just Added</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Freshly Added Resources
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 mt-4 sm:mt-0 bg-gray-100 p-1 rounded-xl">
            {['All', 'Graphics', 'Templates', 'Mockups', 'Fonts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setNewArrivalTab(tab)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  newArrivalTab === tab
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNewArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* SECTION 7: FREE RESOURCES */}
      <section
        id="free-resources-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-500/10 via-purple-500/10 to-indigo-500/10 rounded-3xl p-8 sm:p-12 border border-emerald-200/50"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
              <Gift className="w-4 h-4" />
              <span>Zero Cost Digital Assets</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Premium Quality. Free to Download.
            </h2>
            <p className="text-sm text-gray-600 mt-1 max-w-xl">
              Explore free design resources and start creating something amazing today. 100% free with commercial licenses.
            </p>
          </div>

          <button
            onClick={() => onNavigate('freebies')}
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2 self-start md:self-auto shrink-0"
          >
            <span>Explore All Freebies</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {freebies.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* SECTION 8: SELLER PROMOTION */}
      <section
        id="seller-promo-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#111827] text-white rounded-3xl p-8 sm:p-14 overflow-hidden relative"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Visual Illustration & Stats */}
          <div className="space-y-4">
            <div className="relative bg-gradient-to-br from-purple-900/50 to-gray-900 p-8 rounded-3xl border border-purple-500/30">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#6C3BFF] flex items-center justify-center text-white text-xl font-black">
                    IS
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Ibrahim Samrat Creator Program</div>
                    <div className="text-xs text-purple-300">Creator Earnings Dashboard</div>
                  </div>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-900/80 rounded-2xl border border-gray-800">
                  <span className="text-xs text-gray-400">Total Payouts</span>
                  <div className="text-2xl font-black text-white mt-1">$4,250.00</div>
                  <span className="text-[11px] text-emerald-400 font-semibold">+24% this month</span>
                </div>
                <div className="p-4 bg-gray-900/80 rounded-2xl border border-gray-800">
                  <span className="text-xs text-gray-400">Digital Assets Sold</span>
                  <div className="text-2xl font-black text-white mt-1">1,248</div>
                  <span className="text-[11px] text-purple-400 font-semibold">Worldwide buyers</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-purple-950/40 rounded-xl border border-purple-800/40 text-xs text-purple-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Zero listing fees. Instant weekly withdrawals to Bank or PayPal.</span>
              </div>
            </div>
          </div>

          {/* Right Copy & Benefits */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-900/60 border border-purple-700/50 rounded-full text-xs font-bold text-purple-300">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Monetize Your Craft</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Turn Your Creativity <br />
              <span className="text-[#8B5CF6]">Into Sustainable Income</span>
            </h2>

            <p className="text-sm text-gray-300 leading-relaxed">
              Join Ibrahim Samrat Marketplace and start selling your vectors, PSD mockups, templates, and digital assets to thousands of designers, agencies, and businesses across 140+ countries.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Sell digital products</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Reach global customers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Track real-time earnings</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Manage products easily</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('seller-dashboard')}
                className="px-8 py-3.5 bg-[#6C3BFF] hover:bg-purple-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-purple-600/30 transition-transform active:scale-95 flex items-center gap-2"
              >
                <span>Become a Seller</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: WHY CHOOSE US */}
      <section id="why-choose-us-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6C3BFF] px-3 py-1 bg-purple-50 rounded-full">
            The Ibrahim Samrat Standard
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-2">
            Why Creative Professionals Choose Us
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Engineered with strict design standards to accelerate your client projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:border-[#6C3BFF]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#6C3BFF] flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-gray-900">Premium Quality</h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Every asset is inspected for proper layer naming, color accuracy, and high resolution suitability.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:border-[#6C3BFF]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#6C3BFF] flex items-center justify-center mb-4">
              <DownloadCloud className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-gray-900">Instant Download</h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Access your purchased files immediately after checkout. Files are saved in your account library forever.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:border-[#6C3BFF]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#6C3BFF] flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-gray-900">Commercial Licensing</h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Transparent personal, commercial, and extended licenses with zero hidden royalty obligations.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:border-[#6C3BFF]/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#6C3BFF] flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-gray-900">Creative Community</h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Connect directly with verified graphic designers, typography artists, and 3D visualizers.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10: NEWSLETTER */}
      <section
        id="newsletter-section"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/80 shadow-xl shadow-purple-900/5"
      >
        <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#6C3BFF] flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Stay Inspired. Stay Creative.
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-md mx-auto leading-relaxed">
          Get free curated resources, weekly design inspiration, and exclusive discount drops delivered directly to your inbox.
        </p>

        <form onSubmit={handleNewsletterSubmit} className="mt-6 max-w-md mx-auto flex gap-2">
          <input
            type="email"
            required
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#6C3BFF] outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-[#6C3BFF] hover:bg-purple-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-transform active:scale-95 shrink-0"
          >
            Subscribe
          </button>
        </form>
        <span className="text-[11px] text-gray-400 block mt-2">
          No spam, ever. Unsubscribe with a single click anytime.
        </span>
      </section>
    </div>
  );
};
