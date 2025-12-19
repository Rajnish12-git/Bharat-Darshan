
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
  
  // The link is currently disabled but can be enabled later.
  const linkHref = `#`; 

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl shadow-md border border-stone-200/80 bg-card transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute top-3 right-3 z-20">
        <FavoriteButton item={item} category={category} />
      </div>
      <Link href={linkHref} className="block cursor-pointer">
        <div className="relative aspect-[4/3] w-full">
          {image ? (
            <Image
              src={image.imageUrl}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={image.imageHint}
            />
          ) : (
            <div className="bg-muted h-full w-full" />
          )}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
             <h3 className="font-bold font-headline text-lg text-white drop-shadow-sm">{item.name}</h3>
             {item.location && <p className="text-sm text-white/90 drop-shadow-sm mt-1">{item.location}</p>}
          </div>
        </div>
      </Link>
    </div>
  );
}
