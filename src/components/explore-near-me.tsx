'use client';

import React, { useState, useMemo, useTransition } from 'react';
import { Button } from './ui/button';
import { Loader2, MapPin } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { getDistance } from '@/lib/utils';
import InfoCard from './info-card';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import type { Monument } from '@/lib/types';


export default function ExploreNearMe() {
  const [isPending, startTransition] = useTransition();
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [radius, setRadius] = useState('100');
  const [error, setError] = useState<string | null>(null);
  const [locationDenied, setLocationDenied] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const firestore = useFirestore();
  const monumentsCollection = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'monuments');
  }, [firestore]);

  const { data: allMonuments, isLoading: isLoadingMonuments } = useCollection<Monument>(monumentsCollection);
  
  const nearbyMonuments = useMemo(() => {
    if (!userLocation || !allMonuments) return [];

    const monumentsWithDistance = allMonuments.map((monument) => ({
      ...monument,
      distance: getDistance(
        userLocation.lat,
        userLocation.lng,
        monument.latitude,
        monument.longitude
      ),
    }));

    const filtered = monumentsWithDistance.filter(
      (monument) => monument.distance <= parseInt(radius)
    );

    return filtered.sort((a, b) => a.distance - b.distance);
  }, [userLocation, allMonuments, radius]);

  const handleFindNearby = () => {
    setError(null);
    setLocationDenied(false);
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
          setError('Unable to retrieve your location. Please enable location permissions in your browser settings.');
          setLocationDenied(true);
          setIsSearching(false);
        }
      );
    });
  };

  const handleManualStateSelection = () => {
    // In a real app, this would likely open a modal or navigate to a page
    // where the user can select a state from a dropdown.
    alert('Manual state selection feature coming soon!');
  };

  const monumentsToDisplay = useMemo(() => {
    return nearbyMonuments.map(monument => ({
        name: monument.name,
        imageId: monument.imageId,
        description: `${monument.location} - ${monument.distance?.toFixed(1)} km away`
    }));
  }, [nearbyMonuments]);

  const isButtonDisabled = isPending || isLoadingMonuments || isSearching;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <Button
          size="lg"
          onClick={handleFindNearby}
          disabled={isButtonDisabled}
          className="shadow-lg"
        >
          {isButtonDisabled ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <MapPin className="mr-2 h-5 w-5" />
          )}
          Find Monuments Near Me
        </Button>
        <RadioGroup
          defaultValue="100"
          onValueChange={setRadius}
          className="flex items-center gap-4"
          disabled={isButtonDisabled}
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
      </div>

      {error && (
        <div className="text-center text-destructive p-8 border-2 border-dashed rounded-lg">
            <p>{error}</p>
            {locationDenied && (
                <Button variant="link" onClick={handleManualStateSelection}>
                    Or select a state manually
                </Button>
            )}
        </div>
      )}

      {!userLocation && !error && !isSearching && (
        <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
          <p>Click the button to discover heritage sites near your location.</p>
        </div>
      )}
      
      {isSearching && (
         <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary"/>
            <p className="ml-4 text-muted-foreground">Getting your location...</p>
         </div>
      )}

      {!isSearching && userLocation && nearbyMonuments.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {monumentsToDisplay.map(monument => (
                 <InfoCard 
                    key={monument.name}
                    item={monument} 
                    category="monuments"
                 />
            ))}
        </div>
      )}

      {!isSearching && userLocation && nearbyMonuments.length === 0 && !error && (
        <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
          <p>No monuments found within {radius} km of your location. Try increasing the radius.</p>
        </div>
      )}
    </div>
  );
}
