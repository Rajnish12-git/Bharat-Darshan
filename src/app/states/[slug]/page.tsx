
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { indianStates } from '@/lib/states-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import InfoCard from '@/components/info-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Landmark, UtensilsCrossed, CalendarDays, Palette } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { cn } from '@/lib/utils';

export default function StatePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const state = indianStates.find((s) => s.slug === slug);

  if (!state) {
    notFound();
  }

  const stateImage = PlaceHolderImages.find((img) => img.id === state.imageId);

  return (
    <>
      <Header />
      <article>
        {/* 1. Hero Section */}
        <header className="relative w-full h-[80vh] flex items-center">
          {stateImage && (
            <Image
              src={stateImage.imageUrl}
              alt={state.name}
              fill
              className="object-cover object-center"
              data-ai-hint={stateImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative container max-w-screen-xl px-4 md:px-8 mx-auto">
            <div className="w-full max-w-[600px] text-white">
              <h1 className="text-5xl md:text-7xl font-bold font-headline drop-shadow-lg">
                {state.name}
              </h1>
              <p className="mt-4 text-lg text-white/90 drop-shadow-md max-w-prose">
                {state.description}
              </p>
            </div>
          </div>
        </header>

        <div className="bg-stone-50">
          {/* 2. Tabs Section */}
          <div className="border-b border-stone-200">
            <Tabs defaultValue="monuments" className="w-full">
              <div className="container max-w-[1200px] overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <TabsList className="bg-transparent p-0 h-16">
                  <TabsTrigger value="monuments" className="px-4 py-2 text-base rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--primary))]"><Landmark className="mr-2 h-4 w-4" />Monuments</TabsTrigger>
                  <TabsTrigger value="cuisine" className="px-4 py-2 text-base rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--primary))]"><UtensilsCrossed className="mr-2 h-4 w-4" />Cuisine</TabsTrigger>
                  <TabsTrigger value="festivals" className="px-4 py-2 text-base rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--primary))]"><CalendarDays className="mr-2 h-4 w-4" />Festivals</TabsTrigger>
                  <TabsTrigger value="art" className="px-4 py-2 text-base rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--primary))]"><Palette className="mr-2 h-4 w-4" />Art & Culture</TabsTrigger>
                </TabsList>
              </div>

              {/* 3. & 4. Content Area & Cards Grid */}
              <div className="container max-w-[1200px] mx-auto py-12 px-4 md:px-8">
                <TabsContent value="monuments">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {state.monuments.map((item) => <InfoCard item={item} key={item.name} />)}
                  </div>
                </TabsContent>
                <TabsContent value="cuisine">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {state.cuisine.map((item) => <InfoCard item={item} key={item.name} />)}
                  </div>
                </TabsContent>
                <TabsContent value="festivals">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {state.festivals.map((item) => <InfoCard item={item} key={item.name} />)}
                  </div>
                </TabsContent>
                <TabsContent value="art">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {state.artForms.map((item) => <InfoCard item={item} key={item.name} />)}
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
