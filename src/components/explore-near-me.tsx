'use client';

import React, { useState, useTransition } from 'react';
import { getDistance } from '@/lib/utils';
import { Button } from './ui/button';
import { Loader2, MapPin, Info } from 'lucide-react';
import { Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';

interface MonumentData {
    id: string;
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
  const [nearbyMonuments, setNearbyMonuments] = useState<MonumentWithDistance[]>([]);
  const [selectedMonument, setSelectedMonument] = useState<MonumentWithDistance | null>(null);

  const firestore = useFirestore();
  const monumentsCollection = useMemoFirebase(() => collection(firestore, 'monuments'), [firestore]);
  const { data: allMonuments } = useCollection<MonumentData>(monumentsCollection);

  const handleFindNearby = () => {
    setError(null);
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    if (!allMonuments) {
        setError('Monuments data is not loaded yet. Please try again in a moment.');
        return;
    }

    startTransition(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setUserLocation(location);

          const monumentsWithDistance: MonumentWithDistance[] = allMonuments
            .map((monument) => {
              const distance = getDistance(
                location.lat,
                location.lng,
                monument.latitude,
                monument.longitude
              );
              return { ...monument, distance };
            })
            .sort((a, b) => a.distance - b.distance);
          
          setNearbyMonuments(monumentsWithDistance);
        },
        () => {
          setError('Unable to retrieve your location. Please enable location permissions.');
        }
      );
    });
  };

  const isLoading = isPending;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <Button size="lg" onClick={handleFindNearby} disabled={isLoading || !allMonuments} className="shadow-lg w-full sm:w-auto">
          {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <MapPin className="mr-2 h-5 w-5" />}
          Find Monuments Near Me
        </Button>
      </div>

      {error && <p className="text-center text-destructive">{error}</p>}

      {userLocation && !isLoading && (
        <div className="mt-8 rounded-lg overflow-hidden shadow-2xl" style={{ height: '60vh' }}>
          <Map
            defaultCenter={userLocation}
            defaultZoom={11}
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
            gestureHandling={'greedy'}
          >
            {nearbyMonuments.map((monument) => (
              <AdvancedMarker
                key={monument.id}
                position={{ lat: monument.latitude, lng: monument.longitude }}
                onClick={() => setSelectedMonument(monument)}
              >
                <Pin
                  background={'#FB923C'}
                  borderColor={'#EA580C'}
                  glyphColor={'#fff'}
                />
              </AdvancedMarker>
            ))}

            {selectedMonument && (
              <InfoWindow
                position={{ lat: selectedMonument.latitude, lng: selectedMonument.longitude }}
                onCloseClick={() => setSelectedMonument(null)}
              >
                <div className="p-2">
                  <h3 className="font-bold font-headline">{selectedMonument.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedMonument.distance.toFixed(2)} km away</p>
                </div>
              </InfoWindow>
            )}
          </Map>
        </div>
      )}
    </div>
  );
}
