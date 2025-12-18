import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { DetailItem } from '@/lib/heritage-data';
import Link from 'next/link';

interface InfoCardProps {
  item: DetailItem;
  category: string;
}

export default function InfoCard({ item, category }: InfoCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === item.imageId);
  const linkHref = `/states/${category}/${item.name.toLowerCase().replace(/ /g, '-')}`;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg shadow-lg">
      <Link href={linkHref} className="absolute inset-0 z-10">
        <span className="sr-only">View {item.name}</span>
      </Link>
      <div className="relative h-56 w-full">
        {image ? (
          <Image
            src={image.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
          />
        ) : (
          <div className="bg-muted h-full w-full" />
        )}
      </div>
      <div className="p-4 bg-card">
        <h3 className="font-bold font-headline">{item.name}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {item.description}
        </p>
      </div>
    </div>
  );
}
