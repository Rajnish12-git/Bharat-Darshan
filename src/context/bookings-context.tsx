
'use client';

import React, { createContext, useState, useCallback, ReactNode, useContext } from 'react';
import { collection, addDoc, serverTimestamp, Firestore, getFirestore } from 'firebase/firestore';
import { useFirestore, useUser } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { getAuth } from 'firebase/auth';

// Define the shape of a single booking
export interface Booking {
  id: string;
  userId: string;
  userName: string;
  email: string;
  phone: string;
  state: string;
  monumentName: string;
  visitDate: string;
  visitors: number;
  visitType: 'Self Visit' | 'Guided Tour';
  notes?: string;
  status: 'pending' | 'approved';
  createdAt: any;
}

// Define the shape of the data for adding a new booking
export type NewBookingData = Omit<Booking, 'id' | 'status' | 'createdAt' | 'userId'>;
