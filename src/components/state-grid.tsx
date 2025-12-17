
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { indianStates } from '@/lib/heritage-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from './ui/scroll-area';

export default function StateGrid() {
  return (
    <ScrollArea className="h-[70vh] mt-12">
        <div className="flex flex-col gap-4 pr-4">
        {indianStates.map((state) => {
            const image = PlaceHolderImages.find((img) => img.id === state.imageId);
            return (
            <Link href={`/states/${state.slug}`} key={state.slug} className="group block">
                <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="relative h-48 w-full md:w-1/3 md:h-full shrink-0">
                            {image && (
                            <Image
                                src={image.imageUrl}
                                alt={state.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={image.imageHint}
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            )}
                        </div>
                        <div className="flex-1">
                            <CardHeader>
                                <CardTitle className="font-headline text-xl">{state.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground line-clamp-3">{state.description}</p>
                            </CardContent>
                        </div>
                    </div>
                </Card>
            </Link>
            );
        })}
        </div>
    </ScrollArea>
  );
}
