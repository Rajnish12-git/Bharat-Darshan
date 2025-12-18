
'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { DetailItem } from '@/lib/heritage-data';
import FavoriteButton from './favorite-button';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface InfoCardProps {
  item: DetailItem;
  category: string;
}

export default function InfoCard({ item, category }: InfoCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === item.imageId);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl shadow-lg border border-border/10 transition-all duration-500 ease-in-out hover:shadow-primary/20 hover:-translate-y-2',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      <div className="absolute top-3 right-3 z-20">
        <FavoriteButton item={item} category={category} />
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {image ? (
          <Image
            src={image.imageUrl}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            data-ai-hint={image.imageHint}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="bg-muted h-full w-full" />
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-4 text-white flex flex-col justify-end h-full">
        <div className="transition-transform duration-300 ease-in-out group-hover:-translate-y-12">
            <h3 className="font-headline text-lg font-bold drop-shadow-md">{item.name}</h3>
            <p className="text-sm text-white/80 line-clamp-2 mt-1">
                {item.description}
            </p>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
            <Button
                variant="link"
                className="text-white p-0 h-auto self-start"
            >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
      </div>
    </div>
  );
}
