import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut as fbSignOut, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db, testConnection, handleFirestoreError, OperationType } from '../firebase';
import { UserProfile } from '../types';

interface AuthContextType {
  currentUser: UserProfile | null;
  firebaseUser: User | null;
  loading: boolean;
  isFirebaseReady: boolean;
  signInWithGoogle: () => Promise<void>;
  signInAsDemo: (role?: 'buyer' | 'seller') => void;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  switchRole: (newRole: 'buyer' | 'seller') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_BUYER: UserProfile = {
  uid: 'demo-buyer-001',
  email: 'designer.alex@creativestudio.com',
  displayName: 'Alex Rivers',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  role: 'buyer',
  bio: 'Senior Art Director & Brand Designer based in London.',
  location: 'London, United Kingdom',
  phone: '+44 20 7946 0912',
  createdAt: '2026-01-15',
  marketingEmails: true,
  productUpdates: true,
};

const DEMO_SELLER: UserProfile = {
  uid: 'ibrahim-samrat',
  email: 'coo.masconsultancy@gmail.com',
  displayName: 'Ibrahim Samrat',
  photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  role: 'seller',
  bio: 'Creative Director & Founder of Ibrahim Samrat Studio with over 7 years of specialized experience in identity design and digital assets.',
  location: 'Dhaka, Bangladesh',
  phone: '+8801722604376',
  createdAt: '2025-01-01',
  marketingEmails: true,
  productUpdates: true,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('is_active_user');
    return saved ? JSON.parse(saved) : DEMO_BUYER;
  });
  const [loading, setLoading] = useState(true);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    testConnection().then((connected) => {
      if (mounted) setIsFirebaseReady(connected);
    });

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!mounted) return;
      setFirebaseUser(user);
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const data = userSnap.data() as UserProfile;
            setCurrentUser(data);
            localStorage.setItem('is_active_user', JSON.stringify(data));
          } else {
            const newProfile: UserProfile = {
              uid: user.uid,
              email: user.email || 'user@marketplace.com',
              displayName: user.displayName || 'Creative Designer',
              photoURL: user.photoURL || undefined,
              role: 'buyer',
              createdAt: new Date().toISOString(),
              marketingEmails: true,
              productUpdates: true,
            };
            await setDoc(userDocRef, newProfile);
            setCurrentUser(newProfile);
            localStorage.setItem('is_active_user', JSON.stringify(newProfile));
          }
        } catch (err) {
          console.warn('Could not read user profile from Firestore, using fallback:', err);
          const fallbackProfile: UserProfile = {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || 'Creative Designer',
            photoURL: user.photoURL || undefined,
            role: 'buyer',
          };
          setCurrentUser(fallbackProfile);
          localStorage.setItem('is_active_user', JSON.stringify(fallbackProfile));
        }
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: unknown) {
      console.error('Google Sign-in failed or blocked in iframe:', err);
      // If popup blocked or failed, seamlessly fall back to demo account
      setCurrentUser(DEMO_BUYER);
      localStorage.setItem('is_active_user', JSON.stringify(DEMO_BUYER));
    }
  };

  const signInAsDemo = (role: 'buyer' | 'seller' = 'buyer') => {
    const profile = role === 'seller' ? DEMO_SELLER : DEMO_BUYER;
    setCurrentUser(profile);
    localStorage.setItem('is_active_user', JSON.stringify(profile));
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
    } catch {
      // ignore
    }
    setCurrentUser(null);
    localStorage.removeItem('is_active_user');
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data, updatedAt: new Date().toISOString() };
    setCurrentUser(updated);
    localStorage.setItem('is_active_user', JSON.stringify(updated));

    if (firebaseUser) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid), updated, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `users/${currentUser.uid}`);
      }
    }
  };

  const switchRole = (newRole: 'buyer' | 'seller') => {
    if (!currentUser) return;
    updateProfile({ role: newRole });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        firebaseUser,
        loading,
        isFirebaseReady,
        signInWithGoogle,
        signInAsDemo,
        signOut,
        updateProfile,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
