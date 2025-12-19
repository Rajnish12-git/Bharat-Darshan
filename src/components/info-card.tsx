import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { DetailItem } from '@/lib/heritage-data';
import Link from 'next/link';
import FavoriteButton from './favorite-button';

interface InfoCardProps {
  item: DetailItem;
  category: string;
}

export default function InfoCard({ item, category }: InfoCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === item.imageId);
  const linkHref = `/states/${category}/${item.name.toLowerCase().replace(/ /g, '-')}`;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      <Link href={linkHref} className="absolute inset-0 z-10">
        <span className="sr-only">View {item.name}</span>
      </Link>
      <div className="relative h-64 w-full">
        {image ? (
          <Image
            src={image.imageUrl}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={image.imageHint}
          />
        ) : (
          <div className="bg-muted h-full w-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="font-bold font-headline text-lg">{item.name}</h3>
            {item.location && <p className="text-sm text-white/80">{item.location}</p>}
        </div>
        <div className="absolute top-2 right-2 z-20">
          <FavoriteButton item={item} category={category} />
        </div>
      </div>
      <div className="p-4 bg-card">
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2 min-h-[2.5rem]">
          {item.description}
        </p>
      </div>
    </div>
  );
}
