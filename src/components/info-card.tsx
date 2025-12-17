import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DetailItem } from '@/lib/heritage-data';

interface InfoCardProps {
  item: DetailItem;
}

export default function InfoCard({ item }: InfoCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === item.imageId);

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-56 w-full">
        {image ? (
          <Image
            src={image.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="bg-muted h-full w-full" />
        )}
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
