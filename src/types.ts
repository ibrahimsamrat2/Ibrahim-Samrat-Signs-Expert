export type AssetCategory =
  | 'Graphics'
  | 'Templates'
  | 'Mockups'
  | 'Fonts'
  | 'Icons'
  | 'Illustrations'
  | 'Patterns'
  | 'Branding';

export type FileFormat = 'PSD' | 'AI' | 'EPS' | 'PNG' | 'JPG' | 'SVG' | 'PDF' | 'OTF' | 'TTF' | 'FIG';

export type SoftwareCompatibility = 'Adobe Photoshop' | 'Adobe Illustrator' | 'Figma' | 'Canva' | 'Affinity Designer';

export type LicenseType = 'personal' | 'commercial' | 'extended';

export interface Product {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: AssetCategory;
  subcategory: string;
  price: number;
  originalPrice: number;
  isFree?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  fileFormats: FileFormat[];
  software: SoftwareCompatibility[];
  dimensions?: string;
  resolution?: string;
  fileCount: number;
  fileSize?: string;
  thumbnail: string;
  previewImages: string[];
  tags: string[];
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  rating: number;
  reviewCount: number;
  downloadCount: number;
  salesCount: number;
  status: 'published' | 'draft' | 'pending' | 'rejected';
  createdAt: string;
  whatsIncluded: string[];
  features: string[];
}

export interface CartItem {
  product: Product;
  license: LicenseType;
  quantity: number;
  price: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'buyer' | 'seller' | 'admin';
  bio?: string;
  location?: string;
  phone?: string;
  createdAt?: string;
  marketingEmails?: boolean;
  productUpdates?: boolean;
}

export interface OrderRecord {
  orderId: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  country: string;
  items: {
    productId: string;
    productTitle: string;
    price: number;
    license: LicenseType;
    thumbnail: string;
    fileFormats: string[];
  }[];
  totalAmount: number;
  discountAmount: number;
  couponCode?: string;
  paymentMethod: 'card' | 'paypal' | 'stripe';
  status: 'completed' | 'pending' | 'refunded';
  createdAt: string;
}

export interface DownloadItem {
  id: string;
  userId: string;
  productId: string;
  productTitle: string;
  category: string;
  fileType: string;
  fileSize: string;
  downloadUrl: string;
  purchaseDate: string;
  thumbnail: string;
}

export interface ReviewItem {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
  verifiedPurchase?: boolean;
}

export type Review = ReviewItem;

export interface SellerStats {
  sellerId: string;
  totalEarnings: number;
  totalSales: number;
  totalProducts: number;
  profileViews: number;
  availableBalance: number;
  pendingBalance: number;
  totalWithdrawn: number;
}
