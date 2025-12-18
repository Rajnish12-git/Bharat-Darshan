
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { highlights } from '@/lib/highlights-data';
import { ArrowRight } from 'lucide-react';

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
        threshold: 0.1,
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
        'grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-16 max-w-6xl mx-auto'
      )}
    >
      <div
        className={cn(
          'relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transition-all duration-1000 ease-in-out group',
          isOdd && 'md:order-last',
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        )}
      >
        {image && (
          <Image
            src={image.imageUrl}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            data-ai-hint={image.imageHint}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      <div
        className={cn(
          'flex flex-col items-start text-center md:text-left transition-all duration-1000 ease-in-out',
           isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        )}
      >
        <p className="text-primary font-semibold tracking-wide">{item.subtitle}</p>
        <h3 className="font-headline text-4xl font-bold mt-2">{item.title}</h3>
        <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
          {item.description}
        </p>
        <Button variant="outline" size="lg" className="mt-8 group" asChild>
          <Link href={linkHref}>
            Learn More
            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default function CulturalHighlights() {
  return (
    <section className="bg-background py-16 md:py-28">
      <div className="container">
        <div className="mx-auto flex max-w-2xl flex-col items-center space-y-4 text-center mb-16 md:mb-24">
          <h2 className="font-headline text-4xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
            Glimpses of Heritage
          </h2>
          <p className="max-w-prose leading-relaxed text-muted-foreground sm:text-lg">
            Experience the rich and diverse cultural fabric of India, from its stunning architecture to its vibrant traditions.
          </p>
        </div>
        <div className="space-y-24 md:space-y-32">
          {highlights.map((item, index) => (
            <HighlightItem item={item} index={index} key={item.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
