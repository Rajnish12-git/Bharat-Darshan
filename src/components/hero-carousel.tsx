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
import { Card, CardContent } from "./ui/card";

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
];

export default function HeroCarousel() {
  const carouselRef = React.useRef<any>(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollNext();
      }
    }, 5000); // Autoplay every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
      <Carousel
        ref={carouselRef}
        className="w-full h-full"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {heroImages.map(({ id, title, subtitle }) => {
            const image = PlaceHolderImages.find((img) => img.id === id);
            if (!image) return null;

            return (
              <CarouselItem key={id}>
                <div className="relative w-full h-[60vh] md:h-[80vh]">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
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
