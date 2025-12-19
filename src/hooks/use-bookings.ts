
'use client';

import { useMemoFirebase, useUser } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import type { Booking, NewBookingData } from '@/context/bookings-context';
import { useBookingsContext } from '@/context/bookings-context';


export function useBookings() {
  const firestore = useFirestore();
  const { user } = useUser();

  // Memoize the query to prevent re-renders
  const bookingsQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return query(
      collection(firestore, 'bookings'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
  }, [firestore, user?.uid]);

  // Use the useCollection hook to get real-time updates
  const { data: bookings, isLoading, error } = useCollection<Booking>(bookingsQuery);
  const { addBooking, isWriting } = useBookingsContext();

  return { bookings, isLoading, error, addBooking, isWriting };
}
