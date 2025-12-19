
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { DetailItem } from '@/lib/heritage-data';
import Link from 'next/link';
import { Heart } from 'lucide-react';

interface InfoCardProps {
  item: DetailItem;
}

export default function InfoCard({ item }: InfoCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === item.imageId);
  const linkHref = `/`; // Link is disabled for now as per instructions

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl shadow-md border border-stone-200 bg-card">
      {/* 5. Card - Image */}
      <div className="relative aspect-[4/3] w-full">
        {image ? (
          <Image
            src={image.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            data-ai-hint={image.imageHint}
          />
        ) : (
          <div className="bg-muted h-full w-full" />
        )}
        {/* 5. Card - Favorite Icon */}
        <div className="absolute top-3 right-3 z-20">
            <div className="h-9 w-9 rounded-full bg-black/30 text-white backdrop-blur-sm flex items-center justify-center">
                <Heart className="h-5 w-5" />
            </div>
        </div>
      </div>
      {/* 5. Card - Content */}
      <div className="p-4 flex-grow">
        <h3 className="font-bold font-headline text-lg text-foreground">{item.name}</h3>
        {item.location && <p className="text-sm text-muted-foreground mt-1">{item.location}</p>}
      </div>
    </div>
  );
}
