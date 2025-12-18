
'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { indianStates } from '@/lib/states-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import InfoCard from '@/components/info-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Landmark, UtensilsCrossed, CalendarDays, Palette } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useEffect, useState } from 'react';

export default function StatePage({ params: { slug } }: { params: { slug: string } }) {
  const [isIntroVisible, setIntroVisible] = useState(false);
  const state = indianStates.find((s) => s.slug === slug);

  useEffect(() => {
    const timer = setTimeout(() => setIntroVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!state) {
    notFound();
  }

  const stateImage = PlaceHolderImages.find((img) => img.id === state.imageId);

  const getIntroText = (tab: string) => {
    switch (tab) {
      case 'monuments':
        return `The architectural legacy of ${state.name} is a testament to its glorious past. Explore the majestic forts, ancient temples, and historic sites that define its landscape.`;
      case 'cuisine':
        return `Embark on a culinary journey through ${state.name}. Discover a rich tapestry of flavors, from traditional spices to beloved local dishes that tell the story of the land.`;
      case 'festivals':
        return `Experience the vibrant spirit of ${state.name} through its colorful festivals. Each celebration is a unique spectacle of music, dance, and centuries-old traditions.`;
      case 'art':
        return `Delve into the artistic soul of ${state.name}. From intricate textiles to timeless paintings and graceful dance forms, witness the creativity that flows through the state.`;
      default:
        return '';
    }
  };

  return (
    <>
      <Header />
      <article className="bg-background">
        <header className="relative h-[60vh] w-full overflow-hidden">
          {stateImage && (
            <Image
              src={stateImage.imageUrl}
              alt={state.name}
              fill
              className="object-cover"
              data-ai-hint={stateImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 md:p-8 lg:p-16 text-white">
            <h1 className="text-4xl md:text-7xl font-bold font-headline drop-shadow-lg">
              {state.name}
            </h1>
            <p className="mt-2 max-w-3xl text-md md:text-lg text-white/90 drop-shadow-md">
              {state.description}
            </p>
          </div>
          <div className="absolute bottom-[-1px] left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
        </header>
        
        <Tabs defaultValue="monuments" className="w-full">
          <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-lg border-b">
            <div className="container">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto bg-transparent p-0">
                <TabsTrigger value="monuments" className="py-4 text-xs md:text-sm rounded-none data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--primary))]"><Landmark className="mr-1 md:mr-2 h-4 w-4" />Monuments</TabsTrigger>
                <TabsTrigger value="cuisine" className="py-4 text-xs md:text-sm rounded-none data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--primary))]"><UtensilsCrossed className="mr-1 md:mr-2 h-4 w-4" />Cuisine</TabsTrigger>
                <TabsTrigger value="festivals" className="py-4 text-xs md:text-sm rounded-none data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--primary))]"><CalendarDays className="mr-1 md:mr-2 h-4 w-4" />Festivals</TabsTrigger>
                <TabsTrigger value="art" className="py-4 text-xs md:text-sm rounded-none data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--primary))]"><Palette className="mr-1 md:mr-2 h-4 w-4" />Art & Culture</TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <div className="container py-12 md:py-16">
            <TabsContent value="monuments">
               <p className={`max-w-2xl mx-auto text-center text-muted-foreground mb-12 transition-opacity duration-500 ${isIntroVisible ? 'opacity-100' : 'opacity-0'}`}>{getIntroText('monuments')}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {state.monuments.map((item) => <InfoCard item={item} category="monuments" key={item.name} />)}
              </div>
            </TabsContent>
            <TabsContent value="cuisine">
              <p className={`max-w-2xl mx-auto text-center text-muted-foreground mb-12 transition-opacity duration-500 ${isIntroVisible ? 'opacity-100' : 'opacity-0'}`}>{getIntroText('cuisine')}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {state.cuisine.map((item) => <InfoCard item={item} category="cuisine" key={item.name} />)}
              </div>
            </TabsContent>
            <TabsContent value="festivals">
              <p className={`max-w-2xl mx-auto text-center text-muted-foreground mb-12 transition-opacity duration-500 ${isIntroVisible ? 'opacity-100' : 'opacity-0'}`}>{getIntroText('festivals')}</p>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {state.festivals.map((item) => <InfoCard item={item} category="festivals" key={item.name} />)}
              </div>
            </TabsContent>
            <TabsContent value="art">
              <p className={`max-w-2xl mx-auto text-center text-muted-foreground mb-12 transition-opacity duration-500 ${isIntroVisible ? 'opacity-100' : 'opacity-0'}`}>{getIntroText('art')}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {state.artForms.map((item) => <InfoCard item={item} category="art" key={item.name} />)}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </article>
      <Footer />
    </>
  );
}
