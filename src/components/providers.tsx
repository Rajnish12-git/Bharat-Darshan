'use client';

import { FavoritesProvider } from '@/context/favorites-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <FavoritesProvider>{children}</FavoritesProvider>
  );
}
