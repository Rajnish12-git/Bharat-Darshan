'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import HeroCarousel from '@/components/hero-carousel';
import HistoricalTimeline from '@/components/historical-timeline';
import Footer from '@/components/footer';
import CulturalHighlights from '@/components/cultural-highlights';
import StateGrid from '@/components/state-grid';
import { cn } from '@/lib/utils';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col">
      <Header />
      <main className={cn('transition-opacity duration-1000 ease-in', isLoaded ? 'opacity-100' : 'opacity-0')}>
        <HeroCarousel />
        <section id="states" className="container py-16 md:py-28 scroll-mt-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center">
            <h2 className="font-headline text-4xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
              Explore the States
            </h2>
            <p className="max-w-prose leading-relaxed text-muted-foreground sm:text-lg">
              Discover the unique cultural tapestry of each Indian state, a journey through diverse landscapes and traditions.
            </p>
          </div>
          <div className="mt-16">
            <StateGrid />
          </div>
        </section>

        <CulturalHighlights />
        <section id="timeline" className="bg-secondary/50 scroll-mt-20">
          <div className="container py-16 md:py-28">
            <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center mb-16">
              <h2 className="font-headline text-4xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
                A Journey Through Time
              </h2>
              <p className="max-w-prose leading-relaxed text-muted-foreground sm:text-lg">
                Witness the evolution of Indian civilization through its major historical milestones, from ancient origins to the dawn of the modern era.
              </p>
            </div>
            <HistoricalTimeline />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
