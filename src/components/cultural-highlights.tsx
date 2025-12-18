
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { highlights } from '@/lib/highlights-data';

const HighlightItem = ({
  item,
  index,
}: {
  item: (typeof highlights)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isOdd = index % 2 === 1;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const image = PlaceHolderImages.find((img) => img.id === item.imageId);
  
  const linkHref = `/highlights/${item.slug}`;

  return (
    <div
      ref={ref}
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 max-w-5xl mx-auto'
      )}
    >
      <div
        className={cn(
          'relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl transition-all duration-1000 ease-out',
          isOdd && 'md:order-last',
          isVisible
            ? 'opacity-100 translate-x-0'
            : isOdd
              ? 'opacity-0 translate-x-16'
              : 'opacity-0 -translate-x-16'
        )}
      >
        {image && (
          <Image
            src={image.imageUrl}
            alt={item.title}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </div>
      <div
        className={cn(
          'flex flex-col items-start text-center md:text-left transition-all duration-1000 ease-out',
          isVisible
            ? 'opacity-100 translate-x-0'
            : isOdd
              ? 'opacity-0 -translate-x-16'
              : 'opacity-0 translate-x-16'
        )}
      >
        <p className="text-primary font-semibold">{item.subtitle}</p>
        <h3 className="font-headline text-3xl font-bold mt-2">{item.title}</h3>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {item.description}
        </p>
        <Button variant="outline" className="mt-6" asChild>
          <Link href={linkHref}>Learn More</Link>
        </Button>
      </div>
    </div>
  );
};

export default function CulturalHighlights() {
  return (
    <section className="bg-background py-12 md:py-24">
      <div className="container">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mb-12 md:mb-20">
          <h2 className="font-headline text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Glimpses of Heritage
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Experience the rich and diverse cultural fabric of India, from its stunning architecture to its vibrant traditions.
          </p>
        </div>
        <div className="space-y-20 md:space-y-24">
          {highlights.map((item, index) => (
            <HighlightItem item={item} index={index} key={item.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
