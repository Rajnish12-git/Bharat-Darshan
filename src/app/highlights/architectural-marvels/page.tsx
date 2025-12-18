import Image from 'next/image';
import { notFound } from 'next/navigation';
import architecturalMarvels from '@/lib/architectural-marvels.json';
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

export default function ArchitecturalMarvelsPage() {
  const highlight = {
    title: 'Architectural Marvels',
    subtitle: 'Monuments that tell tales of time',
    description: "From the ivory-white splendor of the Taj Mahal to the imposing red sandstone of Agra Fort, India's monuments are a testament to its rich history and architectural genius. These structures are not just stone and mortar; they are the chronicles of empires, the canvas of artisans, and the heart of a nation's identity.",
    imageId: 'hero-taj-mahal',
  };

  if (!architecturalMarvels) {
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
              {architecturalMarvels.map((marvel) => {
                const marvelImage = PlaceHolderImages.find((img) => img.id === marvel.imageId);
                return (
                  <AccordionItem value={marvel.name} key={marvel.name}>
                    <AccordionTrigger className="text-xl font-headline hover:no-underline">
                      <div className="flex items-center gap-4">
                        {marvelImage && (
                          <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                            <Image src={marvelImage.imageUrl} alt={marvel.name} fill className="object-cover" data-ai-hint={marvelImage.imageHint}/>
                          </div>
                        )}
                        <div className="text-left">
                          {marvel.name}
                          <p className="text-sm font-normal text-muted-foreground">{marvel.location}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-secondary/30 rounded-md">
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                           <Badge variant="secondary">Era: {marvel.era}</Badge>
                           <Badge variant="secondary">Style: {marvel.architecture}</Badge>
                        </div>
                        <Separator />
                        <div>
                          <h4 className="font-semibold mb-2">Historical Significance</h4>
                          <p className="text-sm text-muted-foreground">{marvel.description}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Cultural Importance</h4>
                          <p className="text-sm text-muted-foreground">{marvel.culturalSignificance}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Interesting Facts</h4>
                          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                            {marvel.interestingFacts.map((fact, index) => (
                              <li key={index}>{fact}</li>
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
