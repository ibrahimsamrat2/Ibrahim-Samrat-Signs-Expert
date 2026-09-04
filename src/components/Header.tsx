import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Layers,
  Box,
  Type,
  Gift,
  ArrowRight,
  LogOut,
  Download,
  Receipt,
  Settings,
  LayoutDashboard,
  Store,
  CheckCircle,
} from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';
import { useAuth } from '../context/AuthContext';
import { AssetCategory } from '../types';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onOpenAuth }) => {
  const { cartItems, wishlistIds, setIsCartOpen } = useCartWishlist();
  const { currentUser, signOut, switchRole } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('shop', searchQuery.trim());
      setIsSearchFocused(false);
    }
  };

  const handleCategoryClick = (cat: AssetCategory) => {
    setIsMegaMenuOpen(false);
    setIsMobileMenuOpen(false);
    onNavigate('category', cat);
  };

  return (
    <header
      id="global-header"
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/80 py-2.5'
          : 'bg-white border-b border-gray-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              id="brand-logo-btn"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-8 h-8 bg-[#6C3BFF] rounded-lg flex items-center justify-center shadow-md shadow-[#6C3BFF33] group-hover:scale-105 transition-transform duration-200">
                <div className="w-4 h-4 bg-white rounded-xs rotate-45"></div>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-[#111827] group-hover:text-[#6C3BFF] transition-colors">
                Ibrahim Samrat
              </span>
            </button>
          </div>

          {/* Center Search Bar */}
          <div
            ref={searchContainerRef}
            className="hidden md:flex flex-1 max-w-lg relative items-center"
          >
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <div className="relative flex items-center">
                <input
                  id="global-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search vectors, templates, mockups, fonts..."
                  className="w-full pl-10 pr-24 py-2 text-sm bg-gray-50 hover:bg-gray-100/80 focus:bg-white border border-gray-200 focus:border-[#6C3BFF] rounded-full transition-all outline-none text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-purple-500/20"
                />
                <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-gray-400" />
                <button
                  id="search-submit-btn"
                  type="submit"
                  className="absolute right-1.5 px-3 py-1 bg-[#6C3BFF] text-white text-xs font-semibold rounded-full hover:bg-purple-700 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Search Suggestions Dropdown */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="mb-3">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Popular Searches
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Flyer', 'Mockup', 'PSD', 'Social Media', '3D Icons', 'Serif Font', 'Branding Kit'].map(
                      (tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            setSearchQuery(tag);
                            onNavigate('shop', tag);
                            setIsSearchFocused(false);
                          }}
                          className="px-2.5 py-1 text-xs bg-gray-100 hover:bg-purple-50 hover:text-[#6C3BFF] text-gray-700 rounded-lg transition-colors"
                        >
                          {tag}
                        </button>
                      )
                    )}
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-2 flex items-center justify-between text-xs text-gray-500">
                  <span>Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-[10px] font-mono border">Enter</kbd> to search</span>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('shop');
                      setIsSearchFocused(false);
                    }}
                    className="text-[#6C3BFF] font-medium hover:underline"
                  >
                    View all products →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center space-x-1">
            <button
              id="nav-home"
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'home'
                  ? 'text-[#6C3BFF] bg-purple-50/60'
                  : 'text-gray-700 hover:text-[#6C3BFF] hover:bg-gray-50'
              }`}
            >
              Home
            </button>
            <button
              id="nav-shop"
              onClick={() => onNavigate('shop')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'shop'
                  ? 'text-[#6C3BFF] bg-purple-50/60'
                  : 'text-gray-700 hover:text-[#6C3BFF] hover:bg-gray-50'
              }`}
            >
              Shop
            </button>

            {/* Categories with Mega Menu Toggle */}
            <div ref={megaMenuRef} className="relative">
              <button
                id="nav-categories-trigger"
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  isMegaMenuOpen ? 'text-[#6C3BFF] bg-purple-50/80' : 'text-gray-700 hover:text-[#6C3BFF] hover:bg-gray-50'
                }`}
              >
                Categories
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isMegaMenuOpen ? 'rotate-180 text-[#6C3BFF]' : 'text-gray-400'
                  }`}
                />
              </button>

              {/* Advanced Category Mega Menu */}
              {isMegaMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[740px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50 grid grid-cols-4 gap-6 animate-in fade-in duration-200">
                  <div>
                    <div className="flex items-center gap-2 font-bold text-gray-900 text-sm mb-3 pb-2 border-b border-gray-100">
                      <Sparkles className="w-4 h-4 text-[#6C3BFF]" />
                      Graphics
                    </div>
                    <ul className="space-y-2 text-xs text-gray-600">
                      <li>
                        <button onClick={() => handleCategoryClick('Graphics')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Vector Illustrations
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Icons')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          3D & Flat Icons
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Patterns')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Seamless Patterns
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Graphics')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Textures & Backgrounds
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Graphics')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Vector Elements & Badges
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 font-bold text-gray-900 text-sm mb-3 pb-2 border-b border-gray-100">
                      <Layers className="w-4 h-4 text-[#6C3BFF]" />
                      Templates
                    </div>
                    <ul className="space-y-2 text-xs text-gray-600">
                      <li>
                        <button onClick={() => handleCategoryClick('Templates')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Social Media Packs
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Templates')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Corporate Flyers
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Templates')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Brochures & Catalogs
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Templates')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Resumes & CVs
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Templates')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Pitch Deck Presentations
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 font-bold text-gray-900 text-sm mb-3 pb-2 border-b border-gray-100">
                      <Box className="w-4 h-4 text-[#6C3BFF]" />
                      Mockups
                    </div>
                    <ul className="space-y-2 text-xs text-gray-600">
                      <li>
                        <button onClick={() => handleCategoryClick('Mockups')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Packaging & Boxes
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Mockups')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Branding & Stationery
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Mockups')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Device (iPhone & Mac)
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Mockups')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Apparel & T-Shirts
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Mockups')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Posters & Frames
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 font-bold text-gray-900 text-sm mb-3 pb-2 border-b border-gray-100">
                      <Type className="w-4 h-4 text-[#6C3BFF]" />
                      Fonts & More
                    </div>
                    <ul className="space-y-2 text-xs text-gray-600 mb-4">
                      <li>
                        <button onClick={() => handleCategoryClick('Fonts')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Modern Serif Fonts
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Fonts')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Clean Sans-Serif
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleCategoryClick('Branding')} className="hover:text-[#6C3BFF] hover:translate-x-1 transition-all block text-left">
                          Branding Guidelines
                        </button>
                      </li>
                    </ul>

                    {/* Featured Freebie Banner */}
                    <div
                      onClick={() => {
                        setIsMegaMenuOpen(false);
                        onNavigate('freebies');
                      }}
                      className="bg-purple-50 hover:bg-purple-100/80 p-3 rounded-xl cursor-pointer border border-purple-100 transition-colors"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#6C3BFF] mb-1">
                        <Gift className="w-3.5 h-3.5" />
                        100% Free Resources
                      </div>
                      <p className="text-[11px] text-gray-600 line-clamp-2">
                        Grab verified free vectors, PSDs, and mockups.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              id="nav-freebies"
              onClick={() => onNavigate('freebies')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentView === 'freebies'
                  ? 'text-[#6C3BFF] bg-purple-50/60'
                  : 'text-gray-700 hover:text-[#6C3BFF] hover:bg-gray-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Freebies
            </button>
            <button
              id="nav-about"
              onClick={() => onNavigate('about')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'about'
                  ? 'text-[#6C3BFF] bg-purple-50/60'
                  : 'text-gray-700 hover:text-[#6C3BFF] hover:bg-gray-50'
              }`}
            >
              About
            </button>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Wishlist Button */}
            <button
              id="header-wishlist-btn"
              onClick={() => onNavigate('wishlist')}
              title="Saved Wishlist"
              className="relative p-2 rounded-full text-gray-600 hover:text-[#6C3BFF] hover:bg-purple-50/60 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-purple-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              title="Shopping Cart"
              className="relative p-2 rounded-full text-gray-600 hover:text-[#6C3BFF] hover:bg-purple-50/60 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#6C3BFF] text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Account / Auth */}
            {/* Border Divider & Auth Actions */}
            <div className="flex items-center gap-3 border-l pl-3 sm:pl-4 border-[#E5E7EB]">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate(currentUser.role === 'seller' ? 'seller-dashboard' : 'seller-dashboard')}
                    className="hidden sm:inline-flex bg-[#6C3BFF] text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg shadow-[#6C3BFF33] hover:bg-[#5A31D6] transition-colors"
                  >
                    {currentUser.role === 'seller' ? 'Seller Studio' : 'Start Selling'}
                  </button>

                  <div ref={userMenuRef} className="relative">
                    <button
                      id="user-profile-menu-trigger"
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <img
                        src={currentUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                        alt={currentUser.displayName}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-[#6C3BFF]/20"
                      />
                      <ChevronDown className="w-3.5 h-3.5 text-gray-500 hidden sm:block" />
                    </button>

                    {/* Profile Dropdown Menu */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in duration-150">
                        <div className="p-3 border-b border-gray-100">
                          <div className="font-bold text-gray-900 text-sm truncate">
                            {currentUser.displayName}
                          </div>
                          <div className="text-xs text-gray-500 truncate">{currentUser.email}</div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-[#6C3BFF]">
                              <CheckCircle className="w-3 h-3" />
                              {currentUser.role === 'seller' ? 'Seller Account' : 'Buyer Account'}
                            </span>
                            <button
                              onClick={() => {
                                switchRole(currentUser.role === 'seller' ? 'buyer' : 'seller');
                                setIsUserMenuOpen(false);
                              }}
                              className="text-[11px] text-gray-600 hover:text-[#6C3BFF] font-medium underline"
                            >
                              Switch to {currentUser.role === 'seller' ? 'Buyer' : 'Seller'}
                            </button>
                          </div>
                        </div>

                        <div className="py-1 text-xs text-gray-700">
                          {currentUser.role === 'seller' && (
                            <button
                              onClick={() => {
                                onNavigate('seller-dashboard');
                                setIsUserMenuOpen(false);
                              }}
                              className="w-full text-left px-3 py-2 rounded-lg hover:bg-purple-50 hover:text-[#6C3BFF] flex items-center gap-2.5 font-semibold text-[#6C3BFF]"
                            >
                              <Store className="w-4 h-4" />
                              Seller Dashboard
                            </button>
                          )}

                          <button
                            onClick={() => {
                              onNavigate('user-dashboard', 'overview');
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2.5"
                          >
                            <LayoutDashboard className="w-4 h-4 text-gray-400" />
                            My Dashboard
                          </button>

                          <button
                            onClick={() => {
                              onNavigate('user-dashboard', 'downloads');
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2.5"
                          >
                            <Download className="w-4 h-4 text-gray-400" />
                            My Downloads
                          </button>

                          <button
                            onClick={() => {
                              onNavigate('user-dashboard', 'orders');
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2.5"
                          >
                            <Receipt className="w-4 h-4 text-gray-400" />
                            My Orders
                          </button>

                          <button
                            onClick={() => {
                              onNavigate('user-dashboard', 'settings');
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 flex items-center gap-2.5"
                          >
                            <Settings className="w-4 h-4 text-gray-400" />
                            Account Settings
                          </button>
                        </div>

                        <div className="border-t border-gray-100 pt-1">
                          <button
                            onClick={() => {
                              signOut();
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 flex items-center gap-2.5 text-xs font-medium"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    id="header-login-btn"
                    onClick={onOpenAuth}
                    className="text-xs sm:text-sm font-semibold text-[#4B5563] hover:text-[#111827] px-1 py-1 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={onOpenAuth}
                    className="bg-[#6C3BFF] text-white px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg shadow-[#6C3BFF33] hover:bg-[#5A31D6] transition-colors"
                  >
                    Start Selling
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vectors, mockups, fonts..."
              className="w-full pl-9 pr-20 py-2 text-sm bg-gray-50 border border-gray-200 rounded-full focus:bg-white focus:border-[#6C3BFF] outline-none"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <button
              type="submit"
              className="absolute right-1.5 px-3 py-1 bg-[#6C3BFF] text-white text-xs font-medium rounded-full"
            >
              Go
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => {
                onNavigate('home');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-gray-50 text-left hover:bg-purple-50 hover:text-[#6C3BFF]"
            >
              🏠 Home
            </button>
            <button
              onClick={() => {
                onNavigate('shop');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-gray-50 text-left hover:bg-purple-50 hover:text-[#6C3BFF]"
            >
              🛍️ All Products
            </button>
            <button
              onClick={() => {
                onNavigate('freebies');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 text-left"
            >
              🎁 Free Resources
            </button>
            <button
              onClick={() => {
                onNavigate('seller-dashboard');
                setIsMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-xl bg-purple-50 text-[#6C3BFF] text-left"
            >
              💼 Seller Hub
            </button>
          </div>

          <div className="border-t border-gray-100 pt-3">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Browse Categories
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Graphics', 'Templates', 'Mockups', 'Fonts', 'Illustrations', 'Patterns', 'Branding'].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      onNavigate('category', cat);
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-[#6C3BFF] hover:text-white rounded-lg transition-colors"
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
