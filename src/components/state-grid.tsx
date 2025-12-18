'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { indianStates } from '@/lib/states-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

export default function StateGrid() {

  return (
    <div className="relative">
      <ScrollArea>
        <div className="flex space-x-6 pb-4">
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
                <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 border-none w-64 flex-shrink-0 rounded-2xl">
                  <div className="relative h-80 w-full">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={state.name}
                        fill
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        data-ai-hint={image.imageHint}
                        sizes="256px"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 p-4">
                      <CardTitle className="font-headline text-2xl text-white drop-shadow-md">
                        {state.name}
                      </CardTitle>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
