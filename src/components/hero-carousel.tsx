
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
import { cn } from "@/lib/utils";

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
  
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
 
  React.useEffect(() => {
    if (!api) {
      return
    }
 
    setCurrent(api.selectedScrollSnap())
 
    const onSelect = (api: CarouselApi) => {
      setCurrent(api.selectedScrollSnap())
    }
 
    api.on("select", onSelect)
 
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <Carousel
        setApi={setApi}
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
          {images.map(({ id, title, subtitle, imageUrl, description, imageHint }, index) => {
            if (!imageUrl) return null;
            const isActive = index === current;

            return (
              <CarouselItem key={id}>
                <div className="relative w-full h-screen">
                  <Image
                    src={imageUrl}
                    alt={description || title}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-1000",
                      isActive ? "scale-110" : "scale-100"
                    )}
                    data-ai-hint={imageHint}
                    priority={id === 'hero-taj-mahal'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white w-full md:w-auto">
                    <h1 className="text-4xl md:text-7xl font-bold font-headline drop-shadow-lg">
                      {title}
                    </h1>
                    <p className="mt-2 text-lg md:text-2xl font-light drop-shadow-md">
                      {subtitle}
                    </p>
                  </div>
                  <div className="absolute bottom-0 right-0 p-8 md:p-16 text-white text-right max-w-md hidden md:block">
                     <p className="font-semibold text-lg drop-shadow-md opacity-90 max-w-lg">
                      {description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 md:left-8 h-10 w-10 md:h-12 md:w-12 bg-white/20 text-white border-white/40 hover:bg-white/40"/>
        <CarouselNext className="absolute right-4 md:right-8 h-10 w-10 md:h-12 md:w-12 bg-white/20 text-white border-white/40 hover:bg-white/40"/>
      </Carousel>
    </section>
  );
}
