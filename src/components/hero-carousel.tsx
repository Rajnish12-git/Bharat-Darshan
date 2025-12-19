
"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Autoplay from "embla-carousel-autoplay";

const heroImages = [
  {
    id: 'hero-taj-mahal',
    title: 'Taj Mahal',
    subtitle: 'Agra, Uttar Pradesh',
  },
  {
    id: 'hero-qutub-minar',
    title: 'Qutub Minar',
    subtitle: 'Delhi',
  },
  {
    id: 'hero-hampi',
    title: 'Hampi',
    subtitle: 'Karnataka',
  },
  {
    id: 'hero-konark-sun-temple',
    title: 'Konark Sun Temple',
    subtitle: 'Odisha',
  },
  {
    id: 'hero-kerala-backwaters',
    title: 'Kerala Backwaters',
    subtitle: 'Alleppey, Kerala',
  },
  {
    id: 'hero-golden-temple',
    title: 'Golden Temple',
    subtitle: 'Amritsar, Punjab',
  },
  {
    id: 'hero-goa-beach',
    title: 'Goa Beaches',
    subtitle: 'Goa',
  },
];

export default function HeroCarousel() {
  const images = heroImages.map(heroImage => {
    const placeholder = PlaceHolderImages.find(p => p.id === heroImage.id);
    return {
      ...heroImage,
      ...placeholder
    }
  });

  return (
    <section className="relative w-full h-screen">
      <Carousel
        className="w-full h-full"
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
          }),
        ]}
      >
        <CarouselContent>
          {images.map(({ id, title, subtitle, imageUrl, description, imageHint }) => {
            if (!imageUrl) return null;
            return (
              <CarouselItem key={id}>
                <div className="relative w-full h-screen">
                  <Image
                    src={imageUrl}
                    alt={description || title}
                    fill
                    className="object-cover"
                    data-ai-hint={imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-end text-white p-16">
                    <div className="max-w-7xl w-full flex justify-between items-end gap-8">
                        <div>
                            <h1 className="text-7xl font-bold font-headline drop-shadow-lg">
                                {title}
                            </h1>
                            <p className="font-semibold text-primary mt-2">{subtitle}</p>
                        </div>
                        <p className="text-lg max-w-sm text-white/90 text-right">
                            {description}
                        </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-8 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/20 text-white border-white/40 hover:bg-white/40"/>
        <CarouselNext className="absolute right-8 top-1/2 -translate-y-1/2 h-12 w-12 bg-white/20 text-white border-white/40 hover:bg-white/40"/>
      </Carousel>
    </section>
  );
}
