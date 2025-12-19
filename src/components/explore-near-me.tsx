
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { getDistance } from '@/lib/utils';
import architecturalMarvels from '@/lib/architectural-marvels.json';
import type { Monument } from '@/lib/types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { MapPin, AlertCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export default function ExploreNearMe() {
  const [userLocation, setUserLocation] = useState<
    google.maps.LatLngLiteral | undefined
  >();
  const [nearbyMonuments, setNearbyMonuments] = useState<Monument[]>([]);
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(
    null
  );
  const [locationState, setLocationState] = useState<
    'prompt' | 'loading' | 'granted' | 'denied'
  >('prompt');

  const handleLocationRequest = () => {
    setLocationState('loading');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationState('granted');
        },
        (error) => {
          console.error('Error getting user location:', error);
          // Fallback to a default location if permission is denied
          setUserLocation({ lat: 28.6139, lng: 77.209 });
          setLocationState('denied');
        }
      );
    } else {
        // Geolocation not supported
        setUserLocation({ lat: 28.6139, lng: 77.209 });
        setLocationState('denied');
    }
  };

  useEffect(() => {
    if (userLocation) {
      const allMonuments: Monument[] = architecturalMarvels as Monument[];
      const monumentsWithDistance = allMonuments
        .map((monument) => ({
          ...monument,
          distance: getDistance(
            userLocation.lat,
            userLocation.lng,
            monument.latitude,
            monument.longitude
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 10);

      setNearbyMonuments(monumentsWithDistance);
    }
  }, [userLocation]);

  const mapCenter = useMemo(() => {
    if (userLocation) {
      return { lat: userLocation.lat, lng: userLocation.lng };
    }
    return { lat: 28.6139, lng: 77.209 }; // Default to Delhi
  }, [userLocation]);

  return (
    <section id="explore-near-me" className="pb-16 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-headline">Explore Near You</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Discover historical marvels within a 1000km radius of your
            location.
          </p>
        </div>
        <div className="relative h-[60vh] w-full rounded-lg overflow-hidden shadow-lg">
          {locationState === 'prompt' && (
            <Card className="w-full h-full flex flex-col items-center justify-center bg-muted">
              <CardContent className="text-center">
                <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Discover Heritage Sites Near You
                </h3>
                <p className="text-muted-foreground mb-6">
                  Share your location to see historical monuments on the map.
                </p>
                <Button onClick={handleLocationRequest}>
                  Allow Location Access
                </Button>
              </CardContent>
            </Card>
          )}

          {locationState === 'loading' && (
             <div className="w-full h-full bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Loading map...</p>
            </div>
          )}

          {(locationState === 'granted' || locationState === 'denied') && userLocation && (
            <>
            {locationState === 'denied' && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-background/80 backdrop-blur-sm text-foreground p-3 rounded-lg shadow-lg flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    <p>Location access denied. Showing results near Delhi.</p>
                </div>
            )}
            <Map
              center={mapCenter}
              zoom={locationState === 'granted' ? 10 : 5}
              mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              className="w-full h-full"
            >
              {userLocation && locationState === 'granted' && (
                  <AdvancedMarker position={userLocation}>
                    <div className="h-4 w-4 rounded-full bg-blue-500 border-2 border-white" />
                  </AdvancedMarker>
              )}
              {nearbyMonuments.map((monument, index) => (
                <AdvancedMarker
                  key={index}
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
            </Map>
            </>
          )}
        </div>
      </div>

      <Sheet
        open={!!selectedMonument}
        onOpenChange={(open) => !open && setSelectedMonument(null)}
      >
        <SheetContent className="w-full sm:max-w-lg">
          {selectedMonument && (
            <ScrollArea className="h-full pr-6">
              <SheetHeader className="text-left">
                <SheetTitle className="text-3xl font-headline">
                  {selectedMonument.name}
                </SheetTitle>
                <SheetDescription className="text-md">
                  {selectedMonument.location}
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Era: {selectedMonument.era}</Badge>
                  <Badge variant="secondary">
                    Style: {selectedMonument.architecture}
                  </Badge>
                  {userLocation && selectedMonument.latitude && selectedMonument.longitude && (
                     <Badge variant="outline">~{Math.round(getDistance(userLocation.lat, userLocation.lng, selectedMonument.latitude, selectedMonument.longitude))} km away</Badge>
                  )}
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2 text-md">Description</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedMonument.description}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-md">
                    Cultural Significance
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedMonument.culturalSignificance}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-md">
                    Interesting Facts
                  </h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1.5 leading-relaxed">
                    {selectedMonument.interestingFacts.map((fact, index) => (
                      <li key={index}>{fact}</li>
                    ))}
                  </ul>
                </div>
                 <Button
                    asChild
                    className="w-full"
                  >
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${selectedMonument.latitude},${selectedMonument.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Google Maps
                    </a>
                  </Button>
              </div>
            </ScrollArea>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}
