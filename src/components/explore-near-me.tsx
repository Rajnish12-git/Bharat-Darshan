'use client';

import React, { useState, useTransition } from 'react';
import { Button } from './ui/button';
import { Loader2, MapPin } from 'lucide-react';
import architecturalMarvels from '@/lib/architectural-marvels.json';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from '@vis.gl/react-google-maps';

interface Monument {
  name: string;
  imageId: string;
  location: string;
  latitude: number;
  longitude: number;
}

export default function ExploreNearMe() {
  const [isPending, startTransition] = useTransition();
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null);

  const handleFindNearby = () => {
    setError(null);
    startTransition(() => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser.');
        return;
      }

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

  const monuments = architecturalMarvels as Monument[];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <Button
          size="lg"
          onClick={handleFindNearby}
          disabled={isPending}
          className="shadow-lg"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <MapPin className="mr-2 h-5 w-5" />
          )}
          Find Monuments Near Me
        </Button>
      </div>

      {error && <p className="text-center text-destructive">{error}</p>}
      
      {!userLocation && !error && (
        <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
            <p>Click the button to show nearby monuments on the map.</p>
        </div>
      )}

      {userLocation && (
        <div className="aspect-video w-full rounded-lg overflow-hidden border shadow-lg">
          <Map
            defaultCenter={userLocation}
            defaultZoom={9}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID || 'DEMO_MAP_ID'}
          >
            {/* User Location Marker */}
            <AdvancedMarker position={userLocation} title={'Your Location'}>
                <span className="text-3xl">📍</span>
            </AdvancedMarker>

            {/* Monument Markers */}
            {monuments.map((monument) => (
              <AdvancedMarker
                key={monument.name}
                position={{ lat: monument.latitude, lng: monument.longitude }}
                onClick={() => setSelectedMonument(monument)}
              >
                <Pin
                  background={'hsl(var(--primary))'}
                  borderColor={'hsl(var(--primary-foreground))'}
                  glyphColor={'hsl(var(--primary-foreground))'}
                />
              </AdvancedMarker>
            ))}

            {selectedMonument && (
              <InfoWindow
                position={{ lat: selectedMonument.latitude, lng: selectedMonument.longitude }}
                onCloseClick={() => setSelectedMonument(null)}
              >
                <div className='p-2'>
                    <h3 className='font-bold text-md font-headline'>{selectedMonument.name}</h3>
                    <p className='text-sm text-muted-foreground'>{selectedMonument.location}</p>
                </div>
              </InfoWindow>
            )}
          </Map>
        </div>
      )}
    </div>
  );
}
