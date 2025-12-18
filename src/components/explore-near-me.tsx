'use client';

import React, { useState, useMemo, useTransition } from 'react';
import { Button } from './ui/button';
import { Loader2, MapPin } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { getDistance } from '@/lib/utils';
import architecturalMarvels from '@/lib/architectural-marvels.json';
import InfoCard from './info-card';

interface Monument {
  name: string;
  imageId: string;
  location: string;
  latitude: number;
  longitude: number;
  description: string;
}

export default function ExploreNearMe() {
  const [isPending, startTransition] = useTransition();
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [nearbyMonuments, setNearbyMonuments] = useState<Monument[]>([]);
  const [radius, setRadius] = useState('100');
  const [error, setError] = useState<string | null>(null);
  const [locationDenied, setLocationDenied] = useState(false);

  const monuments = useMemo(() => architecturalMarvels as Monument[], []);

  const handleFindNearby = () => {
    setError(null);
    setLocationDenied(false);
    startTransition(() => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLoc = { lat: latitude, lng: longitude };
          setUserLocation(userLoc);

          const monumentsWithDistance = monuments.map((monument) => ({
            ...monument,
            distance: getDistance(
              userLoc.lat,
              userLoc.lng,
              monument.latitude,
              monument.longitude
            ),
          }));

          const filteredMonuments = monumentsWithDistance.filter(
            (monument) => monument.distance <= parseInt(radius)
          );

          filteredMonuments.sort((a, b) => a.distance - b.distance);
          setNearbyMonuments(filteredMonuments as Monument[]);
        },
        () => {
          setError('Unable to retrieve your location. Please enable location permissions.');
          setLocationDenied(true);
        }
      );
    });
  };

  const handleManualStateSelection = () => {
    // In a real app, this would likely open a modal or navigate to a page
    // where the user can select a state from a dropdown.
    alert('Manual state selection feature coming soon!');
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
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
        <RadioGroup
          defaultValue="100"
          onValueChange={setRadius}
          className="flex items-center gap-4"
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

      {!userLocation && !error && !isPending && (
        <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
          <p>Click the button to discover heritage sites near your location.</p>
        </div>
      )}
      
      {isPending && (
         <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary"/>
         </div>
      )}

      {!isPending && userLocation && nearbyMonuments.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {nearbyMonuments.map(monument => (
                 <InfoCard 
                    key={monument.name}
                    item={monument} 
                    category="monuments"
                 />
            ))}
        </div>
      )}

      {!isPending && userLocation && nearbyMonuments.length === 0 && !error && (
        <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg">
          <p>No monuments found within {radius} km of your location. Try increasing the radius.</p>
        </div>
      )}
    </div>
  );
}
