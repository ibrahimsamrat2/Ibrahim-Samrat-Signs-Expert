import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, DownloadItem, LicenseType, OrderRecord, Product } from '../types';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

interface CartWishlistContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, license?: LicenseType, quantity?: number) => void;
  removeFromCart: (productId: string, license: LicenseType) => void;
  updateQuantity: (productId: string, license: LicenseType, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  couponCode: string;
  discountRate: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  totalAmount: number;
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  orders: OrderRecord[];
  downloads: DownloadItem[];
  createOrder: (data: {
    customerName: string;
    customerEmail: string;
    country: string;
    paymentMethod: 'card' | 'paypal' | 'stripe';
  }) => Promise<OrderRecord>;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const CartWishlistContext = createContext<CartWishlistContextType | undefined>(undefined);

export const CartWishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, firebaseUser } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('is_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('is_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-3'];
  });

  const [couponCode, setCouponCode] = useState<string>('');
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    const saved = localStorage.getItem('is_orders');
    return saved ? JSON.parse(saved) : [
      {
        orderId: 'ord-initial-1',
        orderNumber: '#IS-2026-0891',
        userId: 'demo-buyer-001',
        customerName: 'Alex Rivers',
        customerEmail: 'designer.alex@creativestudio.com',
        country: 'United Kingdom',
        items: [
          {
            productId: 'prod-1',
            productTitle: 'Modern Corporate Business Flyer',
            price: 12,
            license: 'commercial',
            thumbnail: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=600&q=80',
            fileFormats: ['PSD', 'AI', 'EPS']
          }
        ],
        totalAmount: 12,
        discountAmount: 0,
        paymentMethod: 'card',
        status: 'completed',
        createdAt: '2026-02-22'
      }
    ];
  });

  const [downloads, setDownloads] = useState<DownloadItem[]>(() => {
    const saved = localStorage.getItem('is_downloads');
    return saved ? JSON.parse(saved) : [
      {
        id: 'dl-1',
        userId: 'demo-buyer-001',
        productId: 'prod-1',
        productTitle: 'Modern Corporate Business Flyer',
        category: 'Templates',
        fileType: 'PSD, AI, EPS Archive',
        fileSize: '142 MB',
        downloadUrl: '#download-corporate-flyer',
        purchaseDate: '2026-02-22',
        thumbnail: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=400&q=80'
      }
    ];
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('is_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('is_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem('is_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('is_downloads', JSON.stringify(downloads));
  }, [downloads]);

  // Load from firestore if user is logged in
  useEffect(() => {
    if (!firebaseUser) return;
    const fetchUserFirestoreData = async () => {
      try {
        const ordersQuery = query(collection(db, 'orders'), where('userId', '==', firebaseUser.uid));
        const ordersSnap = await getDocs(ordersQuery);
        if (!ordersSnap.empty) {
          const loadedOrders: OrderRecord[] = [];
          ordersSnap.forEach((d) => loadedOrders.push(d.data() as OrderRecord));
          setOrders(loadedOrders);
        }

        const dlQuery = query(collection(db, 'downloads'), where('userId', '==', firebaseUser.uid));
        const dlSnap = await getDocs(dlQuery);
        if (!dlSnap.empty) {
          const loadedDl: DownloadItem[] = [];
          dlSnap.forEach((d) => loadedDl.push(d.data() as DownloadItem));
          setDownloads(loadedDl);
        }
      } catch (err) {
        console.warn('Firestore initial data query info:', err);
      }
    };
    fetchUserFirestoreData();
  }, [firebaseUser]);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const calculateItemPrice = (product: Product, license: LicenseType) => {
    if (product.isFree) return 0;
    if (license === 'personal') return product.price;
    if (license === 'commercial') return Math.round(product.price * 1.5);
    if (license === 'extended') return Math.round(product.price * 3.2);
    return product.price;
  };

  const addToCart = (product: Product, license: LicenseType = 'commercial', quantity: number = 1) => {
    const unitPrice = calculateItemPrice(product, license);
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.license === license
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, license, quantity, price: unitPrice }];
      }
    });

    showToast(
      'Added to Cart',
      `"${product.title}" (${license} license) was added to your cart.`
    );
  };

  const removeFromCart = (productId: string, license: LicenseType) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.license === license))
    );
    showToast('Removed from Cart', 'Item was removed from your cart.', 'info');
  };

  const updateQuantity = (productId: string, license: LicenseType, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, license);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.license === license
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'CREATIVE20' || trimmed === 'IBRAHIM20') {
      setCouponCode(trimmed);
      setDiscountRate(0.2); // 20% discount
      showToast('Coupon Applied!', '20% discount has been applied to your order.', 'success');
      return { success: true, message: '20% off coupon applied successfully!' };
    }
    if (trimmed === 'WELCOME10' || trimmed === 'SAMRAT10') {
      setCouponCode(trimmed);
      setDiscountRate(0.1); // 10% discount
      showToast('Coupon Applied!', '10% discount has been applied to your order.', 'success');
      return { success: true, message: '10% off coupon applied successfully!' };
    }
    return { success: false, message: 'Invalid coupon code. Try CREATIVE20 or SAMRAT10' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountRate(0);
    showToast('Coupon Removed', 'Discount coupon was removed.', 'info');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * discountRate);
  const totalAmount = Math.max(0, subtotal - discountAmount);

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'Asset removed from your saved items.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist', 'Asset added to your favorites.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const createOrder = async (customerData: {
    customerName: string;
    customerEmail: string;
    country: string;
    paymentMethod: 'card' | 'paypal' | 'stripe';
  }): Promise<OrderRecord> => {
    const orderId = 'ord-' + Date.now();
    const orderNumber = `#IS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const userId = currentUser?.uid || 'guest-user';

    const newOrder: OrderRecord = {
      orderId,
      orderNumber,
      userId,
      customerName: customerData.customerName,
      customerEmail: customerData.customerEmail,
      country: customerData.country,
      items: cartItems.map((c) => ({
        productId: c.product.id,
        productTitle: c.product.title,
        price: c.price,
        license: c.license,
        thumbnail: c.product.thumbnail,
        fileFormats: c.product.fileFormats
      })),
      totalAmount,
      discountAmount,
      couponCode: couponCode || undefined,
      paymentMethod: customerData.paymentMethod,
      status: 'completed',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const newDownloads: DownloadItem[] = cartItems.map((c) => ({
      id: 'dl-' + Math.random().toString(36).substring(2, 9),
      userId,
      productId: c.product.id,
      productTitle: c.product.title,
      category: c.product.category,
      fileType: `${c.product.fileFormats.join(', ')} Archive`,
      fileSize: c.product.fileSize || '120 MB',
      downloadUrl: `#download-${c.product.id}`,
      purchaseDate: new Date().toISOString().split('T')[0],
      thumbnail: c.product.thumbnail
    }));

    setOrders((prev) => [newOrder, ...prev]);
    setDownloads((prev) => [...newDownloads, ...prev]);

    // Save in Firestore if user is authenticated
    if (firebaseUser) {
      try {
        await setDoc(doc(db, 'orders', orderId), newOrder);
        for (const dl of newDownloads) {
          await setDoc(doc(db, 'downloads', dl.id), dl);
        }
      } catch (err) {
        console.warn('Could not persist order to Firestore directly:', err);
      }
    }

    clearCart();
    return newOrder;
  };

  return (
    <CartWishlistContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        couponCode,
        discountRate,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        totalAmount,
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        orders,
        downloads,
        createOrder,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
};

export const useCartWishlist = () => {
  const context = useContext(CartWishlistContext);
  if (!context) {
    throw new Error('useCartWishlist must be used within a CartWishlistProvider');
  }
  return context;
};
