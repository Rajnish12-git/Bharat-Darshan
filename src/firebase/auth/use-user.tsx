
'use client';

import { useState, useEffect } from 'react';
import { User, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { useAuth } from '@/firebase/provider';

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook for managing the authenticated user state.
 * Automatically handles anonymous sign-in for new users.
 */
export function useUser() {
  const auth = useAuth();
  const [userState, setUserState] = useState<UserState>({
    user: auth.currentUser,
    isLoading: !auth.currentUser,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          // User is signed in.
          setUserState({ user: firebaseUser, isLoading: false, error: null });
        } else {
          // User is signed out, attempt to sign in anonymously.
          signInAnonymously(auth).catch((error) => {
            console.error("Anonymous sign-in failed:", error);
            setUserState({ user: null, isLoading: false, error });
          });
        }
      },
      (error) => {
        console.error("Auth state change error:", error);
        setUserState({ user: null, isLoading: false, error });
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  return userState;
}
