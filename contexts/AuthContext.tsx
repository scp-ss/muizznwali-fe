'use client';
// THIS IS Auth ./contexts/AuthContext.tsx


import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { getUserProfile, UserProfile } from '../lib/authHelpers';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);



export const useAuth = () => {
  const context = useContext(AuthContext);

  // During SSR or if context is not available, return default values
  if (context === null) {
    return {
      user: null,
      userProfile: null,
      loading: true,
    };
  }

  return context;
{/*
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
   */}

};
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    // Check if Firebase auth is available
    if (!auth) {
      console.warn('Firebase Auth not initialized');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Get user profile from database
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const contextValue: AuthContextType = { user, userProfile, loading };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
