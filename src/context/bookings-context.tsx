
'use client';

import React, { createContext, useState, useCallback, ReactNode, useContext } from 'react';
import { collection, addDoc, serverTimestamp, Firestore } from 'firebase/firestore';
import { useFirestore, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

// Define the shape of a single booking
export interface Booking {
  id: string;
  userName: string;
  email: string;
  phone: string;
  state: string;
  monumentName: string;
  visitDate: string | Date;
  visitors: number;
  visitType: 'Self Visit' | 'Guided Tour';
  notes?: string;
  status: 'pending' | 'approved';
  createdAt: any;
}

// Define the shape of the data for adding a new booking
export type NewBookingData = Omit<Booking, 'id' | 'status' | 'createdAt'>;

// Define the shape of the context
interface BookingsContextType {
  addBooking: (bookingData: NewBookingData) => Promise<void>;
  isWriting: boolean;
}

// Create the context
const BookingsContext = createContext<BookingsContextType | undefined>(undefined);


// Create the provider component
export function BookingsProvider({ children }: { children: ReactNode }) {
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();
  const [isWriting, setIsWriting] = useState(false);

  const addBooking = useCallback(async (bookingData: NewBookingData) => {
    if (!firestore || !user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Firestore is not available or user is not logged in.",
      });
      return;
    }

    setIsWriting(true);
    try {
      const bookingsCollection = collection(firestore, 'bookings');
      await addDoc(bookingsCollection, {
        ...bookingData,
        userId: user.uid,
        visitDate: bookingData.visitDate, // Already a Date object from the form
        status: 'pending',
        createdAt: serverTimestamp(),
      });
    } catch (e: any) {
      console.error("Error adding document: ", e);
      const permissionError = new FirestorePermissionError({
          path: `bookings`,
          operation: 'create',
          requestResourceData: bookingData,
      });
      errorEmitter.emit('permission-error', permissionError);
      // Let the FirebaseErrorListener handle the toast for permission errors
      if (e.name !== 'FirebaseError') {
         toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Could not save your booking request. Please try again.",
          });
      }
      throw e; // Re-throw to be caught by the form handler
    } finally {
      setIsWriting(false);
    }
  }, [firestore, user, toast]);

  return (
    <BookingsContext.Provider value={{ addBooking, isWriting }}>
      {children}
    </BookingsContext.Provider>
  );
}

// Create a custom hook to use the bookings context
export function useBookingsContext() {
  const context = useContext(BookingsContext);
  if (context === undefined) {
    throw new Error('useBookingsContext must be used within a BookingsProvider');
  }
  return context;
}
