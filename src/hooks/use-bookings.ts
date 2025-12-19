
'use client';

import { useMemo } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase, getSdks } from '@/firebase';
import { collection, query, where, orderBy, addDoc, serverTimestamp, getFirestore } from 'firebase/firestore';
import { Booking, NewBookingData } from '@/lib/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { getAuth } from 'firebase/auth';


export function useBookings() {
  const { firestore } = getSdks(useFirebaseApp());
  const { user } = useUser();

  const bookingsQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return query(
      collection(firestore, 'bookings'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
  }, [firestore, user?.uid]);

  const { data: bookings, isLoading, error } = useCollection<Booking>(bookingsQuery);

  return { bookings, isLoading, error };
}

export async function addBooking(bookingData: NewBookingData) {
    const auth = getAuth();
    const firestore = getFirestore();
    const user = auth.currentUser;

    if (!firestore || !user) {
        throw new Error("Firestore is not available or user is not logged in.");
    }
    
    const bookingsCollection = collection(firestore, 'bookings');
    
    const newBooking = {
        ...bookingData,
        userId: user.uid,
        status: 'pending' as const,
        createdAt: serverTimestamp(),
    };

    try {
        await addDoc(bookingsCollection, newBooking);
    } catch (e: any) {
        console.error("Error adding document: ", e);
        const permissionError = new FirestorePermissionError({
            path: `bookings`,
            operation: 'create',
            requestResourceData: newBooking,
        });
        errorEmitter.emit('permission-error', permissionError);
        throw e; // Re-throw to be caught by the form handler
    }
}
