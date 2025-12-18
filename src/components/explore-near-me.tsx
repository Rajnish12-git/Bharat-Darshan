'use client';

import React, { useState, useTransition } from 'react';
import { Button } from './ui/button';
import { Loader2, MapPin } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Monument } from '@/lib/types';
import { APIProvider, AdvancedMarker, InfoWindow, Map } from '@vis.gl/react-google-maps';

export default function ExploreNearMe() {
  const [isPending, startTransition] = useTransition();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null);

  const firestore = useFirestore();
  const monumentsCollection = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'monuments');
  }, [firestore]);

  const { data: allMonuments, isLoading: isLoadingMonuments } = useCollection<Monument>(monumentsCollection);

  const handleFindNearby = () => {
    setError(null);
    setUserLocation(null);
    setIsSearching(true);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setIsSearching(false);
      return;
    }

    startTransition(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setIsSearching(false);
        },
        () => {
          setError('Unable to retrieve your location. Please enable location permissions.');
          setIsSearching(false);
        }
      );
    });
  };

  const isButtonDisabled = isPending || isLoadingMonuments || isSearching;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="text-center text-destructive p-8 border-2 border-dashed rounded-lg">
        <p>Google Maps API key is missing. Please add it to your .env file to enable map features.</p>
        <p className="text-sm text-muted-foreground">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col items-center justify-center gap-4 mb-8">
        <Button size="lg" onClick={handleFindNearby} disabled={isButtonDisabled} className="shadow-lg">
          {isButtonDisabled ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <MapPin className="mr-2 h-5 w-5" />}
          Find Monuments Near Me
        </Button>
      </div>

      {error && (
        <div className="text-center text-destructive p-8 border-2 border-dashed rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {!userLocation && !error && !isSearching && (
        <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
          <p>Click the button to discover heritage sites on the map.</p>
        </div>
      )}
      
      {isSearching && (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">Getting your location...</p>
        </div>
      )}

      {userLocation && (
        <div className="aspect-[16/9] w-full rounded-lg overflow-hidden border shadow-lg">
          <APIProvider apiKey={apiKey}>
            <Map
              defaultCenter={userLocation}
              defaultZoom={11}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              mapId={apiKey ? 'bf545ce13a92b834' : undefined}
            >
              <AdvancedMarker position={userLocation} title={'Your Location'}>
                 <div className="w-4 h-4 rounded-full bg-primary border-2 border-white shadow-md"></div>
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
                    <p className="text-sm text-muted-foreground">{selectedMonument.location}</p>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        </div>
      )}
    </div>
  );
}
