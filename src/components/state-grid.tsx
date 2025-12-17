
'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { indianStates } from '@/lib/heritage-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

export default function StateGrid() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

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
        <CarouselContent>
          {indianStates.map((state, index) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === state.imageId
            );
            const isSelected = index === current;

            return (
              <CarouselItem
                key={state.slug}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div
                  className={cn(
                    'p-1 transition-all duration-300 ease-in-out',
                    isSelected ? 'opacity-100' : 'opacity-50 scale-95'
                  )}
                >
                  <Link
                    href={`/states/${state.slug}`}
                    className="group block"
                    aria-disabled={!isSelected}
                    tabIndex={isSelected ? 0 : -1}
                  >
                    <Card className="w-80 overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:shadow-primary/20 group-hover:-translate-y-1">
                      <div className="relative h-48 w-full">
                        {image && (
                          <Image
                            src={image.imageUrl}
                            alt={state.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={image.imageHint}
                            sizes="320px"
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <CardHeader className="p-0">
                          <CardTitle className="font-headline text-xl">
                            {state.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 mt-2">
                          <p className="text-muted-foreground text-sm line-clamp-2">
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
      </Carousel>
    </div>
  );
}
