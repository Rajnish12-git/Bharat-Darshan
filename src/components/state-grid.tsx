
"use client";

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { indianStates } from '@/lib/states-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';
import { Landmark, Utensils, Calendar, Palette } from 'lucide-react';

export default function StateGrid() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = (api: CarouselApi) => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    onSelect(api); // Set initial state

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: 'center',
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: true,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {indianStates.map((state, index) => {
          const image = PlaceHolderImages.find(
            (img) => img.id === state.imageId
          );
          const isActive = index === current;

          return (
            <CarouselItem
              key={state.slug}
              className="pl-4 md:basis-1/3"
            >
              <div
                className={cn(
                  'p-1 transition-all duration-300 ease-in-out',
                  isActive ? 'transform scale-105' : 'transform scale-95 opacity-80'
                )}
              >
                <Link href={`/states/${state.slug}`} className="group block">
                  <Card
                    className={cn(
                      'overflow-hidden relative h-64 transition-shadow',
                      isActive && 'shadow-2xl'
                    )}
                  >
                    <div className="relative w-full h-full">
                      {image && (
                        <Image
                          src={image.imageUrl}
                          alt={state.name}
                          fill
                          className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
                          data-ai-hint={image.imageHint}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                       <CardTitle className="font-headline text-2xl text-white drop-shadow-md">
                        {state.name}
                      </CardTitle>
                      <CardDescription className="mt-1 line-clamp-2 text-white/90 drop-shadow-sm">
                        {state.description}
                      </CardDescription>
                    </div>
                  </Card>
                </Link>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-background/80 text-foreground border-border hover:bg-background" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-background/80 text-foreground border-border hover:bg-background" />
    </Carousel>
  );
}
