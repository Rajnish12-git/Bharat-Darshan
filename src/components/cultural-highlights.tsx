'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const highlights = [
  {
    title: 'Architectural Marvels',
    subtitle: 'Monuments that tell tales of time',
    description:
      'From the ivory-white splendor of the Taj Mahal to the imposing red sandstone of Agra Fort, India\'s monuments are a testament to its rich history and architectural genius. These structures are not just stone and mortar; they are the chronicles of empires, the canvas of artisans, and the heart of a nation\'s identity.',
    imageId: 'monument-agra-fort',
    link: '#',
  },
  {
    title: 'A Culinary Journey',
    subtitle: 'Taste the diversity of India',
    description:
      'Indian cuisine is a vibrant mosaic of flavors, with each region offering its own unique specialties. From the spicy curries of the north to the coconut-infused dishes of the south, the culinary landscape is as diverse as its culture. It\'s an experience that tantalizes the senses and tells the story of the land.',
    imageId: 'cuisine-dal-baati-churma',
    link: '#',
  },
  {
    title: 'Vibrant Art Forms',
    subtitle: 'The soul of India in color and motion',
    description:
      "India's artistic traditions are a riot of color, rhythm, and expression. From the intricate hand-painting of Kalamkari textiles to the graceful storytelling of Bharatanatyam dance, these art forms are a living heritage, passed down through generations, each telling a story of devotion, celebration, and life itself.",
    imageId: 'art-kathakali',
    link: '#',
  },
  {
    title: 'Festivals of Light & Sound',
    subtitle: 'Celebrations that unite the nation',
    description:
      'Indian festivals are a spectacular display of devotion and joy. Diwali, the festival of lights, illuminates the country with millions of diyas, symbolizing the victory of good over evil. The air is filled with fireworks, feasts, and the warmth of community.',
    imageId: 'festival-diwali',
    link: '#',
  },
  {
    title: 'The Sound of Music',
    subtitle: 'Melodies that echo through centuries',
    description:
      "Indian classical music is a deep and spiritual tradition. The resonant strings of the Sitar, accompanied by the complex rhythms of the Tabla, create melodies that can be both meditative and exhilarating, carrying the weight of ancient ragas and improvisational brilliance.",
    imageId: 'art-sitar',
    link: '#',
  },
];

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
        <Button variant="outline" className="mt-6">
          Learn More
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
