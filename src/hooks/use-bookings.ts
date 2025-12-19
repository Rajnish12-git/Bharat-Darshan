
'use client';

import { useMemo } from 'react';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import type { Booking, NewBookingData } from '@/context/bookings-context';
import { useBookingsContext } from '@/context/bookings-context';


export function useBookings(userId?: string) {
  const firestore = useFirestore();

  // Memoize the query to prevent re-renders
  const bookingsQuery = useMemo(() => {
    if (!firestore || !userId) return null;
    return query(
      collection(firestore, 'bookings'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
  }, [firestore, userId]);

  // Use the useCollection hook to get real-time updates
  const { data: bookings, isLoading, error } = useCollection<Booking>(bookingsQuery);
  const { addBooking, isWriting } = useBookingsContext();

  return { bookings, isLoading, error, addBooking, isWriting };
}
