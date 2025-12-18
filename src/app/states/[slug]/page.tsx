
'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import InfoCard from '@/components/info-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Landmark, UtensilsCrossed, CalendarDays, Palette } from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import type { DetailItem } from '@/lib/heritage-data';
import { Skeleton } from '@/components/ui/skeleton';

interface StateData {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageId: string;
  monuments: DetailItem[];
  cuisine: DetailItem[];
  festivals: DetailItem[];
  artForms: DetailItem[];
}

async function getStateBySlug(db: any, slug: string) {
  const statesRef = collection(db, "states");
  const q = query(statesRef, where("slug", "==", slug));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return null;
  }
  const stateDoc = querySnapshot.docs[0];
  const stateData = { id: stateDoc.id, ...stateDoc.data() } as StateData;

  // For simplicity, we are fetching all items from other collections.
  // In a real-world large-scale app, you'd want to fetch only related items,
  // possibly using subcollections or array-contains queries if IDs were stored on the state document.
  
  const monumentsSnapshot = await getDocs(collection(db, "monuments"));
  stateData.monuments = monumentsSnapshot.docs.map(doc => ({ ...doc.data(), imageId: doc.id } as DetailItem));
  
  const cuisineSnapshot = await getDocs(collection(db, "cuisine"));
  stateData.cuisine = cuisineSnapshot.docs.map(doc => ({ ...doc.data(), imageId: doc.id } as DetailItem));

  const festivalsSnapshot = await getDocs(collection(db, "festivals"));
  stateData.festivals = festivalsSnapshot.docs.map(doc => ({ ...doc.data(), imageId: doc.id } as DetailItem));

  const artFormsSnapshot = await getDocs(collection(db, "art"));
  stateData.artForms = artFormsSnapshot.docs.map(doc => ({ ...doc.data(), imageId: doc.id } as DetailItem));

  return stateData;
}


export default function StatePage({ params }: { params: { slug: string } }) {
  const firestore = useFirestore();
  const [state, setState] = useState<StateData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (firestore) {
      getStateBySlug(firestore, params.slug)
        .then(data => {
          if (!data) {
            notFound();
          } else {
            setState(data);
          }
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [firestore, params.slug]);

  if (isLoading) {
    return (
      <>
        <Header />
        <article>
          <header className="relative h-[50vh] w-full">
            <Skeleton className="h-full w-full" />
            <div className="absolute bottom-0 left-0 p-4 md:p-8 lg:p-16">
              <Skeleton className="h-12 w-1/2 mb-4" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          </header>
          <div className="container py-12 md:py-16">
            <Skeleton className="h-12 w-full" />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-80 w-full" />)}
            </div>
          </div>
        </article>
        <Footer />
      </>
    );
  }

  if (!state) {
    return notFound();
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
