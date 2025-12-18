'use client';

import { FavoritesProvider } from '@/context/favorites-context';
import { FirebaseClientProvider } from '@/firebase';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <FirebaseClientProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </FirebaseClientProvider>
  );
}
