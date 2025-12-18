import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DetailItem } from '@/lib/heritage-data';
import FavoriteButton from './favorite-button';

interface InfoCardProps {
  item: DetailItem;
  category: string;
}

export default function InfoCard({ item, category }: InfoCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === item.imageId);

  return (
    <Card className="overflow-hidden h-full flex flex-col group">
      <div className="relative h-56 w-full">
        {image ? (
          <Image
            src={image.imageUrl}
            alt={item.name}
            width={600}
            height={400}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={image.imageHint}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="bg-muted h-full w-full" />
        )}
        <div className="absolute top-2 right-2 z-10">
           <FavoriteButton item={item} category={category} />
        </div>
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-lg">{item.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm">{item.description}</p>
      </CardContent>
    </Card>
  );
}
