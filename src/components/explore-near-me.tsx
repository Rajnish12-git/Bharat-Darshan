'use client';

import React, { useState, useTransition, useMemo } from 'react';
import { Button } from './ui/button';
import { Loader2, MapPin, X } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Monument } from '@/lib/types';
import { getDistance } from '@/lib/utils';
import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';

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
    setSelectedMonument(null);

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

  const nearbyMonuments = useMemo(() => {
    if (!userLocation || !allMonuments) {
      return [];
    }
    // For the map, we show all monuments and let the user explore
    return allMonuments.map(m => ({...m, position: {lat: m.latitude, lng: m.longitude}}));
  }, [userLocation, allMonuments]);

  const isButtonDisabled = isPending || isLoadingMonuments || isSearching;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="text-center text-destructive p-8 border-2 border-dashed rounded-lg">
        <p>Google Maps API key is missing. Please add it to your .env file.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <Button size="lg" onClick={handleFindNearby} disabled={isButtonDisabled} className="shadow-lg w-full sm:w-auto">
          {isButtonDisabled ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <MapPin className="mr-2 h-5 w-5" />}
          Find Monuments Near Me
        </Button>
      </div>

      {error && (
        <div className="text-center text-destructive p-8 border-2 border-dashed rounded-lg">
          <p>{error}</p>
        </div>
      )}

      <div className="w-full h-[60vh] rounded-lg overflow-hidden border shadow-lg mt-4 relative">
        {(isSearching || isLoadingMonuments) && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-4 text-muted-foreground">{isLoadingMonuments ? 'Loading monuments...' : 'Getting your location...'}</p>
            </div>
        )}
        <APIProvider apiKey={apiKey}>
          <Map
            defaultCenter={{ lat: 20.5937, lng: 78.9629 }} // Default center of India
            defaultZoom={5}
            center={userLocation || undefined}
            zoom={userLocation ? 12 : 5}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            mapId="DEMO_MAP_ID"
          >
            {userLocation && <AdvancedMarker position={userLocation} title="Your Location" />}
            {nearbyMonuments.map((monument) => (
              <AdvancedMarker
                key={monument.id}
                position={monument.position}
                title={monument.name}
                onClick={() => setSelectedMonument(monument)}
              />
            ))}
             {selectedMonument && (
              <InfoWindow
                position={selectedMonument.position}
                onCloseClick={() => setSelectedMonument(null)}
              >
                <div className="p-2">
                  <h3 className="font-bold text-md">{selectedMonument.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedMonument.location}</p>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </div>
    </div>
  );
}
