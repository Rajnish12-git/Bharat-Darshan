'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { getDistance } from '@/lib/utils';
import { Loader2, MapPin } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import architecturalMarvels from '@/lib/architectural-marvels.json';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface Monument {
  name: string;
  imageId: string;
  location: string;
  latitude: number;
  longitude: number;
}

interface NearbyMonument extends Monument {
  distance: number;
}

export default function ExploreNearMe() {
  const [isPending, startTransition] = useTransition();
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [nearbyMonuments, setNearbyMonuments] = useState<NearbyMonument[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [radius, setRadius] = useState<number>(100);

  const handleFindNearby = () => {
    setError(null);
    setNearbyMonuments([]);
    startTransition(() => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          findAndSortMonuments(latitude, longitude, radius);
        },
        () => {
          setError('Unable to retrieve your location. Please enable location permissions.');
        }
      );
    });
  };

  const findAndSortMonuments = (
    userLat: number,
    userLon: number,
    searchRadius: number
  ) => {
    const monumentsWithDistance = architecturalMarvels
      .map((monument) => {
        const distance = getDistance(
          userLat,
          userLon,
          monument.latitude,
          monument.longitude
        );
        return { ...monument, distance };
      })
      .filter((monument) => monument.distance <= searchRadius);

    monumentsWithDistance.sort((a, b) => a.distance - b.distance);
    setNearbyMonuments(monumentsWithDistance);
    if(monumentsWithDistance.length === 0) {
        setError(`No monuments found within ${searchRadius} km. Try a larger radius.`)
    }
  };

  const handleRadiusChange = (value: string) => {
    const newRadius = parseInt(value, 10);
    setRadius(newRadius);
    if (userLocation) {
      setError(null);
      startTransition(() => {
        findAndSortMonuments(
          userLocation.latitude,
          userLocation.longitude,
          newRadius
        );
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
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
          Explore Near Me
        </Button>
        <div className="flex items-center gap-2">
            <label htmlFor="radius-select" className="text-sm text-muted-foreground">Radius:</label>
            <Select
                onValueChange={handleRadiusChange}
                defaultValue={radius.toString()}
                disabled={isPending}
            >
                <SelectTrigger className="w-[120px]" id="radius-select">
                <SelectValue placeholder="Radius" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="50">50 km</SelectItem>
                <SelectItem value="100">100 km</SelectItem>
                <SelectItem value="200">200 km</SelectItem>
                <SelectItem value="500">500 km</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}

      {nearbyMonuments.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyMonuments.map((monument) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === monument.imageId
            );
            return (
              <Card key={monument.name} className="overflow-hidden group">
                <div className="relative h-48 w-full">
                  {image ? (
                    <Image
                      src={image.imageUrl}
                      alt={monument.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      data-ai-hint={image.imageHint}
                    />
                  ) : (
                    <div className="bg-muted h-full w-full" />
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-lg font-headline">{monument.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{monument.location}</p>
                  <p className="text-sm font-semibold text-primary mt-1">
                    {monument.distance.toFixed(1)} km away
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
