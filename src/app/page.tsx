'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/header';
import HeroCarousel from '@/components/hero-carousel';
import HistoricalTimeline from '@/components/historical-timeline';
import Footer from '@/components/footer';
import CulturalHighlights from '@/components/cultural-highlights';
import StateGrid from '@/components/state-grid';
import Preloader from '@/components/preloader';
import { cn } from '@/lib/utils';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Simulate a loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col">
      {loading && <Preloader />}
      <div className={cn('transition-opacity duration-1000', loading ? 'opacity-0' : 'opacity-100')}>
        <Header />
        <HeroCarousel />
        <section id="states" className="container py-16 md:py-28 scroll-mt-20">
          <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center">
            <h2 className="font-headline text-4xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
              Explore the States
            </h2>
            <p className="max-w-prose leading-relaxed text-muted-foreground sm:text-lg">
              Discover the unique cultural tapestry of each Indian state.
            </p>
          </div>
          <div className="mt-16">
            <StateGrid />
          </div>
        </section>

        <CulturalHighlights />
        <section id="timeline" className="bg-secondary/50 scroll-mt-20">
           <div className="container py-16 md:py-28">
              <div className="mx-auto flex max-w-2xl flex-col items-center space-y-4 text-center mb-16">
                <h2 className="font-headline text-4xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
                  A Journey Through Time
                </h2>
                <p className="max-w-prose leading-relaxed text-muted-foreground sm:text-lg">
                  Witness the evolution of Indian civilization through its major historical milestones.
                </p>
              </div>
              <HistoricalTimeline />
            </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
