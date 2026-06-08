"use client";

import { firebaseConfig } from "@/firebase/config";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useMemo, useState, useEffect } from "react";

let firebaseApp;
let auth;
let firestore;

if (typeof window !== "undefined" && !getApps().length) {
  try {
    firebaseApp = initializeApp(firebaseConfig);
    auth = getAuth(firebaseApp);
    firestore = getFirestore(firebaseApp);
  } catch (e) {
    console.error("Firebase initialization failed", e);
  }
} else if (typeof window !== "undefined") {
  firebaseApp = getApp();
  auth = getAuth(firebaseApp);
  firestore = getFirestore(firebaseApp);
}

export const useUser = () => {
  const [user, setUser] = useState(auth?.currentUser);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!auth) {
      setIsLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        setIsLoading(false);
      },
      (error) => {
        setError(error);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return { user, isLoading, error };
};

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

export * from "./firestore/use-collection";
export * from "./firestore/use-doc";
export * from "./errors";
export * from "./error-emitter";

// Helper hooks
export const useAuth = () => auth;
export const useFirestore = () => firestore;
export const useFirebaseApp = () => firebaseApp;

export function useMemoFirebase(factory, deps) {
  const memoizedValue = useMemo(() => {
    const value = factory();
    if (value && typeof value === "object") {
      value.__memo = true;
    }
    return value;
  }, deps);
  return memoizedValue;
}
