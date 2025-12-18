
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
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
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

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
 
    const onSelect = (api: CarouselApi) => {
      setCurrent(api.selectedScrollSnap())
    }
    
    api.on("select", onSelect)
    onSelect(api); // Set initial state
 
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
                      "object-cover transition-transform duration-1000 ease-in-out",
                      isActive ? "scale-105" : "scale-100"
                    )}
                    data-ai-hint={imageHint}
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                    <div className={cn("transition-all duration-700 delay-200", isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                      <p className="font-semibold text-primary tracking-widest uppercase">{subtitle}</p>
                      <h1 className="text-4xl md:text-7xl font-bold font-headline drop-shadow-lg mt-2">
                        {title}
                      </h1>
                      <p className="mt-4 text-lg md:text-xl font-light drop-shadow-md max-w-2xl mx-auto text-white/90">
                        {description}
                      </p>
                    </div>
                     <div className={cn("flex flex-col sm:flex-row gap-4 mt-8 transition-all duration-700 delay-500", isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>
                        <Button size="lg" asChild>
                          <Link href="#states">Start the Journey <ArrowRight className="ml-2"/></Link>
                        </Button>
                        <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black" asChild>
                          <Link href="/highlights/architectural-marvels">Explore Heritage</Link>
                        </Button>
                      </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 bg-white/20 text-white border-white/40 hover:bg-white/40"/>
        <CarouselNext className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 bg-white/20 text-white border-white/40 hover:bg-white/40"/>
      </Carousel>
    </section>
  );
}
