'use client';

import { APIProvider } from '@vis.gl/react-google-maps';
import React from 'react';

export function MapProvider({ children, apiKey }: { children: React.ReactNode, apiKey?: string | null }) {
  return (
    <APIProvider apiKey={apiKey ?? undefined}>
      {children}
    </APIProvider>
  );
}
