"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Autoplay from "embla-carousel-autoplay";

const heroImages = [
  {
    id: "hero-taj-mahal",
    title: "Taj Mahal",
    subtitle: "Agra, Uttar Pradesh",
  },
  {
    id: "hero-qutub-minar",
    title: "Qutub Minar",
    subtitle: "Delhi",
  },
  {
    id: "hero-hampi",
    title: "Hampi",
    subtitle: "Karnataka",
  },
  {
    id: "hero-konark-sun-temple",
    title: "Konark Sun Temple",
    subtitle: "Odisha",
  },
  {
    id: "hero-kerala-backwaters",
    title: "Kerala Backwaters",
    subtitle: "Alleppey, Kerala",
  },
  {
    id: "hero-golden-temple",
    title: "Golden Temple",
    subtitle: "Amritsar, Punjab",
  },
  {
    id: "hero-goa-beach",
    title: "Goa Beaches",
    subtitle: "Goa",
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
    <section className="relative w-full h-screen overflow-hidden">
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
                    priority={id === 'hero-taj-mahal'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white">
                    <h1 className="text-4xl md:text-7xl font-bold font-headline drop-shadow-lg">
                      {title}
                    </h1>
                    <p className="mt-2 text-lg md:text-2xl font-light drop-shadow-md">
                      {subtitle}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="absolute bottom-8 right-8 hidden md:flex gap-2">
            <CarouselPrevious className="static translate-y-0 bg-white/30 text-white border-white/50 hover:bg-white/50"/>
            <CarouselNext className="static translate-y-0 bg-white/30 text-white border-white/50 hover:bg-white/50"/>
        </div>
      </Carousel>
    </section>
  );
}
