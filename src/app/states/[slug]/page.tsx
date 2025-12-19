import Image from 'next/image';
import { notFound } from 'next/navigation';
import { indianStates } from '@/lib/states-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import InfoCard from '@/components/info-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Landmark, UtensilsCrossed, CalendarDays, Palette } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

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
        <header className="relative h-[60vh] w-full">
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
          <div className="absolute bottom-0 left-0 p-8 md:p-16 text-white">
            <h1 className="text-5xl md:text-7xl font-bold font-headline drop-shadow-lg">
              {state.name}
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-white/90 drop-shadow-md">
              {state.description}
            </p>
          </div>
        </header>
        
        <Tabs defaultValue="monuments" className="w-full">
          <div className="bg-secondary/50 border-b sticky top-16 z-30 backdrop-blur-sm">
            <div className="container">
              <TabsList className="bg-transparent p-0 -mb-px">
                <TabsTrigger value="monuments" className="py-4 text-sm rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--primary))]"><Landmark className="mr-2 h-4 w-4" />Monuments</TabsTrigger>
                <TabsTrigger value="cuisine" className="py-4 text-sm rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--primary))]"><UtensilsCrossed className="mr-2 h-4 w-4" />Cuisine</TabsTrigger>
                <TabsTrigger value="festivals" className="py-4 text-sm rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--primary))]"><CalendarDays className="mr-2 h-4 w-4" />Festivals</TabsTrigger>
                <TabsTrigger value="art" className="py-4 text-sm rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--primary))]"><Palette className="mr-2 h-4 w-4" />Art & Culture</TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <div className="container py-12">
            <TabsContent value="monuments">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {state.monuments.map((item) => <InfoCard item={item} category={state.slug} key={item.name} />)}
              </div>
            </TabsContent>
            <TabsContent value="cuisine">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {state.cuisine.map((item) => <InfoCard item={item} category={state.slug} key={item.name} />)}
              </div>
            </TabsContent>
            <TabsContent value="festivals">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {state.festivals.map((item) => <InfoCard item={item} category={state.slug} key={item.name} />)}
              </div>
            </TabsContent>
            <TabsContent value="art">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {state.artForms.map((item) => <InfoCard item={item} category={state.slug} key={item.name} />)}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </article>
      <Footer />
    </>
  );
}
