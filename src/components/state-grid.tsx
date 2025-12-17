import Link from 'next/link';
import Image from 'next/image';
import { indianStates } from '@/lib/heritage-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StateGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
      {indianStates.map((state) => {
        const image = PlaceHolderImages.find((img) => img.id === state.imageId);
        return (
          <Link href={`/states/${state.slug}`} key={state.slug} className="group block">
            <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2">
              <div className="relative h-48 w-full">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={state.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={image.imageHint}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                )}
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl">{state.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">{state.description}</p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
