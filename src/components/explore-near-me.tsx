'use client';

import React, { useState, useTransition, useMemo } from 'react';
import { Button } from './ui/button';
import { Loader2, MapPin } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Monument } from '@/lib/types';
import { getDistance } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import InfoCard from './info-card';

export default function ExploreNearMe() {
  const [isPending, startTransition] = useTransition();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchRadius, setSearchRadius] = useState(100); // Default radius in km
  
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

  const nearbyMonuments = useMemo(() => {
    if (!userLocation || !allMonuments) {
      return [];
    }
    return allMonuments
      .map((monument) => ({
        ...monument,
        distance: getDistance(
          userLocation.lat,
          userLocation.lng,
          monument.latitude,
          monument.longitude
        ),
      }))
      .filter((monument) => monument.distance <= searchRadius)
      .sort((a, b) => a.distance - b.distance);
  }, [userLocation, allMonuments, searchRadius]);

  const isButtonDisabled = isPending || isLoadingMonuments;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <Button size="lg" onClick={handleFindNearby} disabled={isButtonDisabled} className="shadow-lg w-full sm:w-auto">
          {isButtonDisabled ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <MapPin className="mr-2 h-5 w-5" />}
          Find Monuments Near Me
        </Button>
        {userLocation && (
          <RadioGroup
            defaultValue="100"
            onValueChange={(value) => setSearchRadius(Number(value))}
            className="flex items-center space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="50" id="r1" />
              <Label htmlFor="r1">50 km</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="100" id="r2" />
              <Label htmlFor="r2">100 km</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="200" id="r3" />
              <Label htmlFor="r3">200 km</Label>
            </div>
          </RadioGroup>
        )}
      </div>

      {error && <p className="text-center text-destructive">{error}</p>}

      {userLocation && !isPending && (
        <div className="mt-8">
          {nearbyMonuments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {nearbyMonuments.map((monument) => {
                 const item = {
                  name: monument.name,
                  imageId: monument.id, // Using the document ID as the imageId
                  description: `${monument.description.substring(0, 100)}... (${monument.distance?.toFixed(2)} km away)`,
                };
                return <InfoCard item={item} category="monuments" key={monument.id} />;
              })}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
              <p className="text-muted-foreground">No monuments found within {searchRadius} km of your location.</p>
              <p className="text-sm text-muted-foreground/80 mt-2">Try increasing the search radius.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
