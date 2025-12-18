'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { indianStates } from '@/lib/states-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export default function StateGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      {indianStates.map((state) => {
        const image = PlaceHolderImages.find(
          (img) => img.id === state.imageId
        );

        return (
          <Link
            key={state.slug}
            href={`/states/${state.slug}`}
            className="group block"
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
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 p-4">
                <CardHeader className="p-0">
                  <CardTitle className="font-headline text-2xl text-white drop-shadow-md">
                    {state.name}
                  </CardTitle>
                </CardHeader>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
