
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { indianStates } from '@/lib/heritage-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

export default function StateGrid() {
  return (
    <div className="relative mt-12">
      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {indianStates.map((state) => {
            const image = PlaceHolderImages.find((img) => img.id === state.imageId);
            return (
              <Link href={`/states/${state.slug}`} key={state.slug} className="group block">
                <Card className="w-80 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1">
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
                      <CardTitle className="font-headline text-xl">{state.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-2">
                      <p className="text-muted-foreground text-sm line-clamp-2">{state.description}</p>
                    </CardContent>
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
