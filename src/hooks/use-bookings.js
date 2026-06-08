"use client";

import {
  useUser,
  useFirestore,
  useCollection,
  useMemoFirebase,
  ensureGuestUser,
} from "@/firebase";
import {
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  getFirestore,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";
import { getAuth } from "firebase/auth";

export function useBookings() {
  const firestore = useFirestore();
  const { user } = useUser();

  const bookingsQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null;
    return query(
      collection(firestore, `users/${user.uid}/bookings`),
      orderBy("createdAt", "desc"),
    );
  }, [firestore, user?.uid]);

  const { data: bookings, isLoading, error } = useCollection(bookingsQuery);

  return { bookings, isLoading, error };
}

export async function addBooking(bookingData) {
  const auth = getAuth();
  const firestore = getFirestore();
  let user = auth.currentUser;
  if (!user) {
    user = await ensureGuestUser();
  }

  if (!firestore || !user) {
    throw new Error("Firestore or user is not available.");
  }
  const bookingsCollection = collection(
    firestore,
    `users/${user.uid}/bookings`,
  );
  const newBooking = {
    ...bookingData,
    userId: user.uid,
    status: "pending",
    createdAt: serverTimestamp(),
  };

  try {
    await addDoc(bookingsCollection, newBooking);
  } catch (e) {
    console.error("Error adding document: ", e);
    const permissionError = new FirestorePermissionError({
      path: `users/${user.uid}/bookings`,
      operation: "create",
      requestResourceData: newBooking,
    });
    errorEmitter.emit("permission-error", permissionError);
    throw e; // Re-throw to be caught by the form handler
  }
}

export async function updateBooking(bookingId, bookingData) {
  const auth = getAuth();
  const firestore = getFirestore();
  const user = auth.currentUser;

  if (!firestore || !user) {
    throw new Error("Firestore or user is not available.");
  }

  const bookingDocRef = doc(firestore, `users/${user.uid}/bookings`, bookingId);
  try {
    await updateDoc(bookingDocRef, bookingData);
  } catch (e) {
    console.error("Error updating document: ", e);
    const permissionError = new FirestorePermissionError({
      path: `users/${user.uid}/bookings/${bookingId}`,
      operation: "update",
      requestResourceData: bookingData,
    });
    errorEmitter.emit("permission-error", permissionError);
    throw e;
  }
}

export async function deleteBooking(bookingId) {
  const auth = getAuth();
  const firestore = getFirestore();
  const user = auth.currentUser;

  if (!firestore || !user) {
    throw new Error("Firestore or user is not available.");
  }

  const bookingDocRef = doc(firestore, `users/${user.uid}/bookings`, bookingId);

  try {
    await deleteDoc(bookingDocRef);
  } catch (e) {
    console.error("Error deleting document: ", e);
    const permissionError = new FirestorePermissionError({
      path: `users/${user.uid}/bookings/${bookingId}`,
      operation: "delete",
    });
    errorEmitter.emit("permission-error", permissionError);
    throw e;
  }
}
