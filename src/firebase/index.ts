'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { useMemo, useState, useEffect, DependencyList } from 'react';

let firebaseApp: FirebaseApp;
let auth: Auth;
let firestore: Firestore;

if (typeof window !== 'undefined' && !getApps().length) {
    try {
      firebaseApp = initializeApp(firebaseConfig);
      auth = getAuth(firebaseApp);
      firestore = getFirestore(firebaseApp);
    } catch (e) {
      console.error("Firebase initialization failed", e);
    }
} else if (typeof window !== 'undefined') {
    firebaseApp = getApp();
    auth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);
}

export const useUser = () => {
  const [user, setUser] = useState(auth?.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!auth) {
        setIsLoading(false);
        return;
    }
    const unsubscribe = onAuthStateChanged(auth,
      (user) => {
        setUser(user);
        setIsLoading(false);
      },
      (error) => {
        setError(error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { user, isLoading, error };
}


export const ensureGuestUser = async () => {
  if (auth && !auth.currentUser) {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error("Anonymous sign-in failed", error);
    }
  }
  return auth?.currentUser;
};


export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './errors';
export * from './error-emitter';

// Helper hooks
export const useAuth = (): Auth => auth;
export const useFirestore = (): Firestore => firestore;
export const useFirebaseApp = (): FirebaseApp => firebaseApp;


export function useMemoFirebase<T>(factory: () => T, deps: DependencyList): T | undefined {
    const memoizedValue = useMemo(() => {
        const value = factory();
        if (value && typeof value === 'object') {
            (value as any).__memo = true;
        }
        return value;
    }, deps);
    return memoizedValue;
}
