'use client';

import { FavoritesProvider } from '@/context/favorites-context';
import { APIProvider } from '@vis.gl/react-google-maps';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <FavoritesProvider>{children}</FavoritesProvider>
    </APIProvider>
  );
}
