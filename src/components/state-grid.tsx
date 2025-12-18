
'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { indianStates } from '@/lib/states-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

export default function StateGrid() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  if (isLoading) {
    return (
      <div className="relative mt-12">
        <Carousel opts={{ align: 'center', loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {[...Array(3)].map((_, index) => (
              <CarouselItem
                key={index}
                className="basis-full md:basis-1/2 lg:basis-1/3 pl-4"
              >
                <div className="p-1">
                  <Card className="overflow-hidden border-none">
                    <Skeleton className="h-64 w-full" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <Skeleton className="h-8 w-32 mb-2" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    );
  }

  return (
    <div className="relative mt-12">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'center',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {indianStates.map((state, index) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === state.imageId
            );
            const isSelected = index === current;

            return (
              <CarouselItem
                key={state.slug}
                className="basis-full md:basis-1/2 lg:basis-1/3 pl-4"
              >
                <div
                  className={cn(
                    'p-1 transition-all duration-300 ease-in-out',
                    isSelected ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
                  )}
                >
                  <Link
                    href={`/states/${state.slug}`}
                    className="group block"
                    aria-disabled={!isSelected}
                    tabIndex={isSelected ? 0 : -1}
                  >
                    <Card className="overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-2 border-none">
                      <div className="relative h-64 w-full">
                        {image && (
                          <Image
                            src={image.imageUrl}
                            alt={state.name}
                            fill
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            data-ai-hint={image.imageHint}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        )}
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      </div>
                      <div className="absolute bottom-0 left-0 p-6">
                        <CardHeader className="p-0">
                          <CardTitle className="font-headline text-2xl text-white">
                            {state.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 mt-2">
                          <p className="text-white/80 text-sm line-clamp-2">
                            {state.description}
                          </p>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[-1.5rem] md:left-[-2.5rem] top-1/2 -translate-y-1/2 z-10 h-12 w-12 bg-background/50 backdrop-blur-sm hover:bg-background/80" />
        <CarouselNext className="absolute right-[-1.5rem] md:right-[-2.5rem] top-1/2 -translate-y-1/2 z-10 h-12 w-12 bg-background/50 backdrop-blur-sm hover:bg-background/80" />
      </Carousel>
    </div>
  );
}
