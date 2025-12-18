
'use client';

import React, { useState, useMemo, useTransition } from 'react';
import { monuments as allMonuments } from '@/lib/monuments-data';
import type { DetailItem } from '@/lib/heritage-data';
import { getDistance } from '@/lib/utils';
import { Button } from './ui/button';
import { Loader2, MapPin } from 'lucide-react';
import InfoCard from './info-card';

// Define the structure of a monument with an added distance property
interface MonumentData {
    name: string;
    imageId: string;
    description: string;
    latitude: number;
    longitude: number;
}
type MonumentWithDistance = MonumentData & { distance: number };

export default function ExploreNearMe() {
  const [isPending, startTransition] = useTransition();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFindNearby = () => {
    setError(null);
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    startTransition(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        () => {
          setError('Unable to retrieve your location. Please enable location permissions.');
        }
      );
    });
  };

  const nearbyMonuments = useMemo(() => {
    if (!userLocation || !allMonuments) {
      return [];
    }

    // Calculate distance for each monument and sort them
    const monumentsWithDistance: MonumentWithDistance[] = allMonuments
      .map((monument) => {
        const distance = getDistance(
          userLocation.lat,
          userLocation.lng,
          monument.latitude,
          monument.longitude
        );
        return { ...monument, distance };
      })
      .sort((a, b) => a.distance - b.distance);
      
    return monumentsWithDistance;
  }, [userLocation]);

  const isLoading = isPending;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <Button size="lg" onClick={handleFindNearby} disabled={isLoading} className="shadow-lg w-full sm:w-auto">
          {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <MapPin className="mr-2 h-5 w-5" />}
          Find Monuments Near Me
        </Button>
      </div>

      {error && <p className="text-center text-destructive">{error}</p>}

      {userLocation && !isLoading && (
        <div className="mt-8">
          {nearbyMonuments.length > 0 ? (
            <>
              <h3 className="text-2xl font-bold font-headline mb-6 text-center">
                Monuments Near You
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {nearbyMonuments.map((monument) => {
                   const item: DetailItem = {
                    name: monument.name,
                    imageId: monument.imageId,
                    description: `${monument.description.substring(0, 100)}... (${monument.distance.toFixed(2)} km away)`,
                  };
                  return (
                    <InfoCard
                      item={item}
                      category="monuments"
                      key={monument.imageId}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <p className="text-center text-muted-foreground">No monuments found in the database.</p>
          )}
        </div>
      )}
    </div>
  );
}
