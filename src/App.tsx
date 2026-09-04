import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartWishlistProvider, useCartWishlist } from './context/CartWishlistContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import { QuickViewModal } from './components/QuickViewModal';
import { ToastContainer } from './components/Toast';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { SellerDashboardPage } from './pages/SellerDashboardPage';
import { SellerProfilePage } from './pages/SellerProfilePage';
import { FreebiesPage } from './pages/FreebiesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { LicensePage } from './pages/LicensePage';
import { LegalPage } from './pages/LegalPage';

import { MOCK_PRODUCTS } from './data/mockProducts';
import { Product, OrderRecord, AssetCategory } from './types';

function MainMarketplaceApp() {
  const { currentUser } = useAuth();
  const { isCartDrawerOpen, setIsCartDrawerOpen } = useCartWishlist();

  // Navigation State
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParam, setViewParam] = useState<string | undefined>(undefined);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Products Catalog (with live addition/deletion by sellers)
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  // Modals
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalInitialMode, setAuthModalInitialMode] = useState<'login' | 'register'>('login');

  // Checkout order
  const [lastCompletedOrder, setLastCompletedOrder] = useState<OrderRecord | null>(null);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProductId, viewParam]);

  const handleNavigate = (view: string, param?: string) => {
    setCurrentView(view);
    setViewParam(param);
    if (view !== 'product') {
      setSelectedProductId(null);
    }
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProductId(id);
    setCurrentView('product');
  };

  const handleSearch = (query: string) => {
    setCurrentView('shop');
    setViewParam(`search:${query}`);
  };

  const handleCategorySelect = (category: string) => {
    setCurrentView('shop');
    setViewParam(`cat:${category}`);
  };

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthModalInitialMode(mode);
    setIsAuthModalOpen(true);
  };

  // Seller actions
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleOrderCompleted = (order: OrderRecord) => {
    setLastCompletedOrder(order);
    setCurrentView('order-success');
  };

  // Selected product resolution
  const currentProduct = selectedProductId
    ? products.find((p) => p.id === selectedProductId) || products[0]
    : products[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFC] text-gray-900 selection:bg-purple-200 selection:text-purple-900 font-sans">
      {/* Header */}
      <Header
        onNavigate={handleNavigate}
        onSearch={handleSearch}
        onCategorySelect={handleCategorySelect}
        onOpenAuthModal={handleOpenAuth}
        onOpenCartDrawer={() => setIsCartDrawerOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            products={products}
            onSelectProduct={handleSelectProduct}
            onCategorySelect={handleCategorySelect}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'shop' && (
          <ShopPage
            products={products}
            initialCategory={
              viewParam?.startsWith('cat:') ? (viewParam.replace('cat:', '') as AssetCategory) : undefined
            }
            initialQuery={
              viewParam?.startsWith('search:') ? viewParam.replace('search:', '') : undefined
            }
            onSelectProduct={handleSelectProduct}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        )}

        {currentView === 'product' && currentProduct && (
          <ProductDetailsPage
            product={currentProduct}
            allProducts={products}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
            onNavigateCheckout={() => setCurrentView('checkout')}
          />
        )}

        {currentView === 'cart' && (
          <CartPage
            onNavigate={handleNavigate}
            onNavigateCheckout={() => setCurrentView('checkout')}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            onNavigate={handleNavigate}
            onOrderCompleted={handleOrderCompleted}
          />
        )}

        {currentView === 'order-success' && lastCompletedOrder && (
          <OrderSuccessPage
            order={lastCompletedOrder}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'user-dashboard' && (
          <UserDashboardPage
            initialTab={viewParam || 'overview'}
            products={products}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'seller-dashboard' && (
          <SellerDashboardPage
            initialTab={viewParam || 'overview'}
            sellerProducts={products.filter((p) => p.creatorName === 'Ibrahim Samrat' || p.creatorId.includes('ibrahim'))}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === 'seller-profile' && (
          <SellerProfilePage
            products={products}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'freebies' && (
          <FreebiesPage
            products={products}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'about' && <AboutPage onNavigate={handleNavigate} />}

        {currentView === 'contact' && <ContactPage />}

        {currentView === 'faq' && <FAQPage onNavigate={handleNavigate} />}

        {currentView === 'license' && <LicensePage onNavigate={handleNavigate} />}

        {currentView === 'terms' && <LegalPage type="terms" />}

        {currentView === 'privacy' && <LegalPage type="privacy" />}

        {currentView === 'refund' && <LegalPage type="refund" />}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onCategorySelect={handleCategorySelect}
      />

      {/* Global Modals & Slide-overs */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        onNavigate={handleNavigate}
        onNavigateCheckout={() => {
          setIsCartDrawerOpen(false);
          setCurrentView('checkout');
        }}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalInitialMode}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onViewFullProduct={(id) => {
          setQuickViewProduct(null);
          handleSelectProduct(id);
        }}
      />

      {/* Toast Notification */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartWishlistProvider>
        <MainMarketplaceApp />
      </CartWishlistProvider>
    </AuthProvider>
  );
}
