
import Image from 'next/image';
import { notFound } from 'next/navigation';
import festivals from '@/lib/festivals-light-sound.json';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Header from '@/components/header';
import Footer from '@/components/footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Sparkles, Music, Users } from 'lucide-react';

export default function FestivalsPage() {
  const highlight = {
    title: 'Festivals of Light & Sound',
    subtitle: 'Where India Comes Alive',
    description: "India's festivals are a magnificent explosion of the senses, a vibrant tapestry woven with threads of light, sound, and devotion. From the million glowing lamps of Diwali to the thunderous drumbeats of Durga Puja, these celebrations are the heartbeat of the nation. They are a time when communities unite, ancient rituals are reborn, and the air itself crackles with energy, music, and a profound sense of joy.",
    imageId: 'festival-diwali',
  };

  if (!festivals) {
    notFound();
  }

  const highlightImage = PlaceHolderImages.find((img) => img.id === highlight.imageId);

  return (
    <>
      <Header />
      <article>
        <header className="relative h-[60vh] w-full">
          {highlightImage && (
            <Image
              src={highlightImage.imageUrl}
              alt={highlight.title}
              fill
              className="object-cover"
              data-ai-hint={highlightImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 md:p-8 lg:p-16">
            <p className="text-primary font-semibold">{highlight.subtitle}</p>
            <h1 className="text-4xl md:text-7xl font-bold font-headline text-white drop-shadow-lg">
              {highlight.title}
            </h1>
          </div>
        </header>
        
        <div className="container py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              {highlight.description}
            </p>
            <Accordion type="single" collapsible className="w-full">
              {festivals.map((festival) => {
                const festivalImage = PlaceHolderImages.find((img) => img.id === festival.imageId);
                return (
                  <AccordionItem value={festival.festivalName} key={festival.festivalName}>
                    <AccordionTrigger className="text-xl font-headline hover:no-underline">
                      <div className="flex items-center gap-4">
                        {festivalImage && (
                          <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                            <Image src={festivalImage.imageUrl} alt={festival.festivalName} fill className="object-cover" data-ai-hint={festivalImage.imageHint}/>
                          </div>
                        )}
                        <div className="text-left">
                          {festival.festivalName}
                          <p className="text-sm font-normal text-muted-foreground">{festival.region}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-secondary/30 rounded-md">
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2 items-center text-sm">
                           <Badge variant="secondary" className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {festival.region}</Badge>
                           <Badge variant="secondary" className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {festival.timeOfYear}</Badge>
                           {festival.community && <Badge variant="secondary" className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {festival.community}</Badge>}
                        </div>
                        <Separator />
                        <div className="prose prose-sm max-w-none text-muted-foreground">
                          <h4 className="font-semibold text-foreground mb-2">Significance & Rituals</h4>
                          <p>{festival.rituals}</p>
                          <p>{festival.culturalSignificance}</p>
                          
                          <h4 className="font-semibold text-foreground mt-4 mb-2">Key Elements</h4>
                          <div className="flex flex-wrap gap-2 items-center">
                            {festival.keyElements.map((element, index) => (
                              <Badge key={index} variant="outline" className="flex items-center gap-1.5">
                                {element.toLowerCase().includes('light') || element.toLowerCase().includes('lamp') || element.toLowerCase().includes('fire') ? <Sparkles className="h-3 w-3" /> : <Music className="h-3 w-3" />}
                                {element}
                              </Badge>
                            ))}
                          </div>

                          <h4 className="font-semibold text-foreground mt-4 mb-2">Unique Traditions</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {festival.uniqueTraditions.map((tradition, index) => (
                              <li key={index}>{tradition}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
