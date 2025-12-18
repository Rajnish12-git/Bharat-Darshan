
import Image from 'next/image';
import { notFound } from 'next/navigation';
import musicalHeritage from '@/lib/musical-heritage.json';
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
import { Music, Landmark, History, Users } from 'lucide-react';

export default function SoundOfMusicPage() {
  const highlight = {
    title: 'The Sound of Music',
    subtitle: 'India’s Musical Heritage',
    description: "Indian music is an ancient, diverse, and spiritual tapestry of sound. From the complex improvisations of classical ragas to the heartfelt simplicity of folk songs and the thunderous power of temple drums, music is woven into the very fabric of life across the subcontinent. It is a language of devotion, a medium for storytelling, and a celebration of life itself.",
    imageId: 'art-sitar',
  };

  if (!musicalHeritage) {
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
              {musicalHeritage.map((item) => {
                const itemImageId = item.instrumentName ? `music-${item.instrumentName.toLowerCase().replace(/ /g, '-')}` : `music-${item.musicForm.toLowerCase().replace(/ /g, '-')}`;
                const itemImage = PlaceHolderImages.find((img) => img.id === itemImageId);
                const itemName = item.musicForm || item.instrumentName || "Unknown";

                return (
                  <AccordionItem value={itemName} key={itemName}>
                    <AccordionTrigger className="text-xl font-headline hover:no-underline">
                      <div className="flex items-center gap-4">
                         {itemImage && (
                          <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                            <Image src={itemImage.imageUrl} alt={itemName} fill className="object-cover" data-ai-hint={itemImage.imageHint}/>
                          </div>
                        )}
                        <div className="text-left">
                          {itemName}
                          <p className="text-sm font-normal text-muted-foreground">{item.region}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-secondary/30 rounded-md">
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2 items-center text-sm">
                           <Badge variant="secondary" className="flex items-center gap-1.5"><Music className="h-3.5 w-3.5" /> {item.category}</Badge>
                           <Badge variant="secondary" className="flex items-center gap-1.5"><Landmark className="h-3.5 w-3.5" /> {item.region}</Badge>
                           {item.occasions && <Badge variant="secondary" className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {item.occasions.join(', ')}</Badge>}
                        </div>
                        <Separator />
                        <div className="prose prose-sm max-w-none text-muted-foreground">
                            {item.performanceStyle && <p>{item.performanceStyle}</p>}
                            
                            <h4 className="font-semibold text-foreground mt-4 mb-2">Historical & Cultural Significance</h4>
                            <p>{item.history}</p>
                            <p>{item.culturalSignificance}</p>
                            
                            {item.interestingFacts && (
                                <>
                                <h4 className="font-semibold text-foreground mt-4 mb-2">Did You Know?</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    {item.interestingFacts.map((fact, index) => (
                                    <li key={index}>{fact}</li>
                                    ))}
                                </ul>
                                </>
                            )}
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

    