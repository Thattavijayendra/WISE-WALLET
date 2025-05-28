// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string, name: string) => Promise<FirebaseUser>;
  login: (email: string, password: string) => Promise<FirebaseUser>;
  signOut: () => Promise<void>;
  updateUserOnboardingStatus: (status: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);

        try {
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            // Create the user document if it doesn't exist
            await setDoc(userDocRef, {
              email: user.email,
              displayName: user.displayName || null,
              isOnboarded: false,
              createdAt: serverTimestamp(),
            });
            console.log('New user document created.');
          }

          const userData = (await getDoc(userDocRef)).data();

          setCurrentUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || null,
            photoURL: user.photoURL || null,
            isOnboarded: userData?.isOnboarded ?? false,
            createdAt: userData?.createdAt?.toDate() || new Date(),
          });
        } catch (error) {
          console.error('Error fetching/creating user doc:', error);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: name });
    }

    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email,
      displayName: name,
      isOnboarded: false,
      createdAt: serverTimestamp(),
    });

    return userCredential.user;
  };

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password).then(res => res.user);

  const signOut = () => firebaseSignOut(auth);

  const updateUserOnboardingStatus = async (status: boolean) => {
    if (!currentUser) return Promise.reject(new Error('No user logged in'));

    const userDocRef = doc(db, 'users', currentUser.uid);
    await setDoc(userDocRef, { isOnboarded: status }, { merge: true });

    setCurrentUser(prev => prev ? { ...prev, isOnboarded: status } : null);
  };

  const value = useMemo(() => ({
    currentUser,
    loading,
    signup,
    login,
    signOut,
    updateUserOnboardingStatus
  }), [currentUser, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
