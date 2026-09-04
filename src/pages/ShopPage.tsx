import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  Grid,
  List,
  ChevronDown,
  Sparkles,
  Check,
} from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Product, AssetCategory, FileFormat } from '../types';

interface ShopPageProps {
  products: Product[];
  initialCategory?: AssetCategory | null;
  initialSearch?: string;
  onSelectProduct: (id: string) => void;
  onNavigate: (view: string, param?: string) => void;
}

const CATEGORIES: { id: string; label: string; count: number }[] = [
  { id: 'All', label: 'All Categories', count: 12 },
  { id: 'Graphics', label: 'Graphics', count: 4 },
  { id: 'Templates', label: 'Templates', count: 5 },
  { id: 'Mockups', label: 'Mockups', count: 3 },
  { id: 'Logos', label: 'Logos & Identity', count: 2 },
  { id: 'Social Media', label: 'Social Media', count: 3 },
  { id: 'Print', label: 'Print Templates', count: 2 },
  { id: 'Illustrations', label: 'Illustrations', count: 2 },
  { id: 'Patterns', label: 'Patterns & Textures', count: 1 },
  { id: 'Icons', label: 'Icons', count: 1 },
  { id: 'Fonts', label: 'Typography & Fonts', count: 1 },
  { id: 'Branding', label: 'Branding Assets', count: 2 },
];

const FILE_FORMATS: FileFormat[] = ['PSD', 'AI', 'EPS', 'SVG', 'PNG', 'PDF', 'OTF', 'TTF'];

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  initialCategory,
  initialSearch = '',
  onSelectProduct,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || 'All'
  );
  const [selectedFormats, setSelectedFormats] = useState<FileFormat[]>([]);
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid' | 'under15' | '15to30' | 'over30'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'bestseller' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter products based on state
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesDesc = p.shortDescription.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        const matchesTags = p.tags?.some((t) => t.toLowerCase().includes(query));
        const matchesCreator = p.creatorName.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesCat && !matchesTags && !matchesCreator) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // File Formats
      if (selectedFormats.length > 0) {
        const hasFormat = selectedFormats.some((fmt) => p.fileFormats.includes(fmt));
        if (!hasFormat) return false;
      }

      // Price filter
      if (priceFilter === 'free' && !p.isFree) return false;
      if (priceFilter === 'paid' && p.isFree) return false;
      if (priceFilter === 'under15' && (p.isFree || p.price > 15)) return false;
      if (priceFilter === '15to30' && (p.price < 15 || p.price > 30)) return false;
      if (priceFilter === 'over30' && p.price < 30) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'bestseller') {
        return b.downloadCount - a.downloadCount;
      }
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0; // featured default
    });
  }, [products, searchQuery, selectedCategory, selectedFormats, priceFilter, sortBy]);

  const toggleFormat = (fmt: FileFormat) => {
    setSelectedFormats((prev) =>
      prev.includes(fmt) ? prev.filter((f) => f !== fmt) : [...prev, fmt]
    );
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedFormats([]);
    setPriceFilter('all');
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedCategory !== 'All' ||
    selectedFormats.length > 0 ||
    priceFilter !== 'all';

  return (
    <div id="shop-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Top Breadcrumb & Title */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:text-black">
            Home
          </button>
          <span>/</span>
          <span className="text-[#6C3BFF] font-semibold">Marketplace Catalog</span>
          {selectedCategory !== 'All' && (
            <>
              <span>/</span>
              <span className="text-gray-900 font-bold">{selectedCategory}</span>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-950 tracking-tight">
              {selectedCategory === 'All' ? 'Browse Digital Assets' : selectedCategory}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Showing {filteredProducts.length} premium design resources for your projects.
            </p>
          </div>

          {/* Search bar inside shop */}
          <div className="max-w-md w-full relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword (e.g. flyer, mockup, logo)..."
              className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm bg-white border border-gray-200 rounded-xl focus:border-[#6C3BFF] focus:ring-2 focus:ring-purple-500/10 outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Action Bar: Active Filters, Sort & View Mode */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs mb-8 flex flex-wrap items-center justify-between gap-4">
        {/* Active Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#6C3BFF]" />
            <span>Filters</span>
          </button>

          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-200 text-[#6C3BFF] text-xs font-semibold rounded-lg">
              <span>Category: {selectedCategory}</span>
              <button onClick={() => setSelectedCategory('All')}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {priceFilter !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-200 text-[#6C3BFF] text-xs font-semibold rounded-lg">
              <span>Price: {priceFilter}</span>
              <button onClick={() => setPriceFilter('all')}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedFormats.map((fmt) => (
            <span
              key={fmt}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-200 text-[#6C3BFF] text-xs font-semibold rounded-lg"
            >
              <span>{fmt}</span>
              <button onClick={() => toggleFormat(fmt)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {hasActiveFilters && (
            <button
              onClick={resetAllFilters}
              className="text-xs text-red-500 hover:underline font-semibold ml-1"
            >
              Reset All
            </button>
          )}
        </div>

        {/* Sort and View Mode */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="font-semibold text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-800 outline-none focus:border-[#6C3BFF]"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest Arrivals</option>
              <option value="bestseller">Best Selling</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <div className="hidden sm:flex items-center border border-gray-200 rounded-lg p-0.5 bg-gray-50">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md ${
                viewMode === 'grid' ? 'bg-white shadow-xs text-[#6C3BFF]' : 'text-gray-400'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md ${
                viewMode === 'list' ? 'bg-white shadow-xs text-[#6C3BFF]' : 'text-gray-400'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar Filter (Desktop) */}
        <div className="hidden lg:block space-y-6">
          {/* Categories Filter Box */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-900 mb-3 pb-2 border-b border-gray-100">
              Categories
            </h3>
            <div className="space-y-1 text-xs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl transition-colors text-left ${
                    selectedCategory === cat.id
                      ? 'bg-purple-50 text-[#6C3BFF] font-bold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="text-[11px] text-gray-400">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter Box */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-900 mb-3 pb-2 border-b border-gray-100">
              Price
            </h3>
            <div className="space-y-1.5 text-xs">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'free', label: 'Free Only' },
                { id: 'paid', label: 'Paid Assets' },
                { id: 'under15', label: 'Under $15' },
                { id: '15to30', label: '$15 - $30' },
                { id: 'over30', label: '$30 & Above' },
              ].map((p) => (
                <label
                  key={p.id}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer text-gray-700"
                >
                  <input
                    type="radio"
                    name="price-filter"
                    checked={priceFilter === p.id}
                    onChange={() => setPriceFilter(p.id as any)}
                    className="accent-[#6C3BFF]"
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* File Formats Filter Box */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
            <h3 className="font-bold text-xs uppercase tracking-wider text-gray-900 mb-3 pb-2 border-b border-gray-100">
              File Formats
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {FILE_FORMATS.map((fmt) => {
                const isSelected = selectedFormats.includes(fmt);
                return (
                  <button
                    key={fmt}
                    onClick={() => toggleFormat(fmt)}
                    className={`py-1.5 px-2 rounded-lg border text-center font-bold transition-all ${
                      isSelected
                        ? 'border-[#6C3BFF] bg-purple-50 text-[#6C3BFF]'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {fmt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Products Results */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-200/80 p-12 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-purple-50 text-[#6C3BFF] flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="font-extrabold text-lg text-gray-900">
                No matching creative assets found
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
                We couldn't find any resources matching your search criteria. Try modifying your filters or clear them to view all items.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-6 py-2.5 bg-[#6C3BFF] text-white text-xs font-bold rounded-xl shadow hover:bg-purple-700"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
