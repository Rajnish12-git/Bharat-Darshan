import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { indianStates } from '@/lib/states-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

export default function StateGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
            <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-48 w-full">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={state.name}
                    fill
                    className="object-cover w-full h-full"
                    data-ai-hint={image.imageHint}
                  />
                )}
              </div>
              <div className="p-4">
                <CardTitle className="font-headline text-xl">
                  {state.name}
                </CardTitle>
                <CardDescription className="mt-1 line-clamp-2">
                  {state.description}
                </CardDescription>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
