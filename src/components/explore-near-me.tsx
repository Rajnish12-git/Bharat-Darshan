
'use client';

import { useState } from 'react';
import { Loader2, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { getDistance } from '@/lib/utils';
import architecturalMarvels from '@/lib/architectural-marvels.json';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface Monument {
  name: string;
  imageId: string;
  location: string;
  latitude: number;
  longitude: number;
  description: string;
}

interface MonumentWithDistance extends Monument {
  distance: number;
}

export default function ExploreNearMe() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [nearbyMonuments, setNearbyMonuments] = useState<MonumentWithDistance[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [radius, setRadius] = useState('100');

  const findNearbyMonuments = (lat: number, lon: number, searchRadius: number) => {
    const monumentsWithDistance = architecturalMarvels
      .map((monument) => {
        const distance = getDistance(lat, lon, monument.latitude, monument.longitude);
        return { ...monument, distance };
      })
      .filter((monument) => monument.distance <= searchRadius)
      .sort((a, b) => a.distance - b.distance);

    setNearbyMonuments(monumentsWithDistance);
    if (monumentsWithDistance.length === 0) {
      setError(`No monuments found within ${searchRadius} km. Try a larger radius or explore the map below.`);
    }
  };

  const handleExplore = () => {
    setLoading(true);
    setError(null);
    setNearbyMonuments([]);
    setLocation(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lon: longitude });
        findNearbyMonuments(latitude, longitude, parseInt(radius, 10));
        setLoading(false);
      },
      (err) => {
        setError(
          'Could not get your location. Please allow location access and try again. Alternatively, explore using the map below.'
        );
        setLoading(false);
      }
    );
  };

  const handleRadiusChange = (newRadius: string) => {
    setRadius(newRadius);
    if (location) {
      findNearbyMonuments(location.lat, location.lon, parseInt(newRadius, 10));
    }
  };

  return (
    <div className="mx-auto max-w-4xl text-center">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
        <Button onClick={handleExplore} disabled={loading} size="lg" className="shadow-lg">
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="mr-2 h-4 w-4" />
          )}
          Explore Near Me
        </Button>
        <RadioGroup
          defaultValue={radius}
          onValueChange={handleRadiusChange}
          className="flex items-center space-x-4 rounded-full bg-secondary/80 p-2 border"
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

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-4 text-muted-foreground">Fetching your location...</p>
        </div>
      )}

      {error && <p className="text-destructive py-4">{error}</p>}

      {nearbyMonuments.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {nearbyMonuments.map((monument) => {
            const image = PlaceHolderImages.find((img) => img.id === monument.imageId);
            return (
              <Card key={monument.name} className="overflow-hidden h-full flex flex-col group">
                <div className="relative h-48 w-full">
                  {image ? (
                    <Image
                      src={image.imageUrl}
                      alt={monument.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="bg-muted h-full w-full" />
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-lg">{monument.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{monument.location}</p>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-primary">{monument.distance.toFixed(1)} km away</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
