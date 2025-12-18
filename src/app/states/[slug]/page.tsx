
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { indianStates } from '@/lib/states-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import InfoCard from '@/components/info-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Landmark, UtensilsCrossed, CalendarDays, Palette } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';

export async function generateStaticParams() {
  return indianStates.map((state) => ({
    slug: state.slug,
  }));
}

export default function StatePage({ params }: { params: { slug: string } }) {
  const state = indianStates.find((s) => s.slug === params.slug);

  if (!state) {
    notFound();
  }

  const stateImage = PlaceHolderImages.find((img) => img.id === state.imageId);

  return (
    <>
    <Header />
    <article>
      <header className="relative h-[50vh] w-full">
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
        <div className="absolute bottom-0 left-0 p-4 md:p-8 lg:p-16">
          <h1 className="text-4xl md:text-7xl font-bold font-headline text-white drop-shadow-lg">
            {state.name}
          </h1>
          <p className="mt-2 max-w-3xl text-md md:text-lg text-white/90 drop-shadow-md">
            {state.description}
          </p>
        </div>
      </header>
      
      <div className="container py-12 md:py-16">
        <Tabs defaultValue="monuments" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="monuments" className="py-2 text-xs md:text-sm"><Landmark className="mr-1 md:mr-2 h-4 w-4" />Monuments</TabsTrigger>
            <TabsTrigger value="cuisine" className="py-2 text-xs md:text-sm"><UtensilsCrossed className="mr-1 md:mr-2 h-4 w-4" />Cuisine</TabsTrigger>
            <TabsTrigger value="festivals" className="py-2 text-xs md:text-sm"><CalendarDays className="mr-1 md:mr-2 h-4 w-4" />Festivals</TabsTrigger>
            <TabsTrigger value="art" className="py-2 text-xs md:text-sm"><Palette className="mr-1 md:mr-2 h-4 w-4" />Art & Culture</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monuments" className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {state.monuments.map((item) => <InfoCard item={item} category="monuments" key={item.name} />)}
            </div>
          </TabsContent>
          <TabsContent value="cuisine" className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {state.cuisine.map((item) => <InfoCard item={item} category="cuisine" key={item.name} />)}
            </div>
          </TabsContent>
          <TabsContent value="festivals" className="mt-8">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {state.festivals.map((item) => <InfoCard item={item} category="festivals" key={item.name} />)}
            </div>
          </TabsContent>
          <TabsContent value="art" className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {state.artForms.map((item) => <InfoCard item={item} category="art" key={item.name} />)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </article>
    <Footer />
    </>
  );
}
