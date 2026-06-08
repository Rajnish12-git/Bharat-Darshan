import Image from "next/image";
import { notFound } from "next/navigation";
import { indianStates } from "@/lib/states-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import InfoCard from "@/components/info-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Landmark, UtensilsCrossed, CalendarDays, Palette } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function StatePage({ params }) {
  const { slug } = params;
  const state = indianStates.find((s) => s.slug === slug);

  if (!state) {
    notFound();
  }

  const stateImage = PlaceHolderImages.find((img) => img.id === state.imageId);

  const introText = `Explore the heritage, flavors, festivals, and traditions that define ${state.name}.`;

  return (
    <>
      <Header />
      <article className="bg-background">
        <header className="relative w-full h-[70vh] flex items-center">
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
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative container max-w-7xl px-4 md:px-8 mx-auto">
            <div className="w-full max-w-[650px] text-white">
              <h1 className="text-5xl md:text-7xl font-bold font-headline drop-shadow-lg leading-tight">
                {state.name}
              </h1>
              <p className="mt-4 text-lg text-white/90 drop-shadow-md max-w-prose leading-relaxed">
                {state.description}
              </p>
            </div>
          </div>
        </header>

        <div className="bg-background">
          <Tabs defaultValue="monuments" className="w-full">
            <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
              <div className="container max-w-7xl">
                <div className="border-b border-border">
                  <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <TabsList className="bg-transparent p-0 h-16 whitespace-nowrap">
                      <TabsTrigger
                        value="monuments"
                        className="px-4 py-2 text-base rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--primary))]"
                      >
                        <Landmark className="mr-2 h-4 w-4" />
                        Monuments
                      </TabsTrigger>
                      <TabsTrigger
                        value="cuisine"
                        className="px-4 py-2 text-base rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--primary))]"
                      >
                        <UtensilsCrossed className="mr-2 h-4 w-4" />
                        Cuisine
                      </TabsTrigger>
                      <TabsTrigger
                        value="festivals"
                        className="px-4 py-2 text-base rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--primary))]"
                      >
                        <CalendarDays className="mr-2 h-4 w-4" />
                        Festivals
                      </TabsTrigger>
                      <TabsTrigger
                        value="art"
                        className="px-4 py-2 text-base rounded-none data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--primary))]"
                      >
                        <Palette className="mr-2 h-4 w-4" />
                        Art & Culture
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </div>
              </div>
            </div>

            <div className="container max-w-7xl mx-auto py-12 px-4 md:px-8">
              <p className="text-center text-muted-foreground text-lg mb-12">
                {introText}
              </p>

              <TabsContent value="monuments">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {state.monuments.map((item) => (
                    <InfoCard item={item} key={item.name} category="monument" />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="cuisine">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {state.cuisine.map((item) => (
                    <InfoCard item={item} key={item.name} category="cuisine" />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="festivals">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {state.festivals.map((item) => (
                    <InfoCard item={item} key={item.name} category="festival" />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="art">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {state.artForms.map((item) => (
                    <InfoCard item={item} key={item.name} category="art" />
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </article>
      <Footer />
    </>
  );
}
