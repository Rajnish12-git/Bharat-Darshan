'use client';

import React, { useState, useTransition, useMemo } from 'react';
import { Button } from './ui/button';
import { Loader2, MapPin } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Monument } from '@/lib/types';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';

export default function ExploreNearMe() {
  const [isPending, startTransition] = useTransition();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null);
  
  const firestore = useFirestore();

  const monumentsCollection = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'monuments');
  }, [firestore]);

  const { data: allMonuments, isLoading: isLoadingMonuments } = useCollection<Monument>(monumentsCollection);

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

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_MAP_ID;

  return (
    <APIProvider apiKey={apiKey || ''}>
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Button size="lg" onClick={handleFindNearby} disabled={isPending || isLoadingMonuments} className="shadow-lg w-full sm:w-auto">
            {isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <MapPin className="mr-2 h-5 w-5" />}
            Find Monuments Near Me
          </Button>
        </div>

        {error && <p className="text-center text-destructive">{error}</p>}

        {userLocation && (
          <div className="mt-8 aspect-[4/3] w-full rounded-lg overflow-hidden border shadow-lg">
            <Map
              defaultCenter={userLocation}
              defaultZoom={10}
              mapId={mapId}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
            >
              <AdvancedMarker position={userLocation} title={'Your Location'}>
                <Pin
                  background={'#FBBC04'}
                  glyphColor={'#000'}
                  borderColor={'#000'}
                />
              </AdvancedMarker>
              {allMonuments?.map((monument) => (
                <AdvancedMarker
                  key={monument.id}
                  position={{ lat: monument.latitude, lng: monument.longitude }}
                  title={monument.name}
                  onClick={() => setSelectedMonument(monument)}
                />
              ))}

              {selectedMonument && (
                <InfoWindow
                  position={{ lat: selectedMonument.latitude, lng: selectedMonument.longitude }}
                  onCloseClick={() => setSelectedMonument(null)}
                >
                  <div className="p-2">
                    <h3 className="font-bold">{selectedMonument.name}</h3>
                    <p>{selectedMonument.location}</p>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </div>
        )}
      </div>
    </APIProvider>
  );
}
