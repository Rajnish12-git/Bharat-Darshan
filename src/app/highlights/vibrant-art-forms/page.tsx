
import Image from 'next/image';
import { notFound } from 'next/navigation';
import artForms from '@/lib/art-forms.json';
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
import { Paintbrush, Theater, Hand, Palette } from 'lucide-react';

const getCategoryIcon = (category: string) => {
  if (category.toLowerCase().includes('dance') || category.toLowerCase().includes('theatre')) {
    return <Theater className="h-4 w-4 text-accent" />;
  }
  if (category.toLowerCase().includes('craft') || category.toLowerCase().includes('textile')) {
    return <Hand className="h-4 w-4 text-accent" />;
  }
  if (category.toLowerCase().includes('painting')) {
    return <Paintbrush className="h-4 w-4 text-accent" />;
  }
  return <Palette className="h-4 w-4 text-accent" />;
}

export default function ArtFormsPage() {
  const highlight = {
    title: 'Vibrant Art Forms',
    subtitle: 'The Soul of India in Color and Motion',
    description: "India's artistic traditions are a breathtaking spectrum of color, rhythm, and profound expression. From the intricate brushstrokes of miniature paintings to the powerful storytelling of classical dance, and from the rustic charm of folk crafts to the spiritual depth of ritual arts, these forms are a living heritage. They are the threads that weave together the nation's diverse cultural, social, and spiritual identity, passed down through generations as a testament to unparalleled creativity and devotion.",
    imageId: 'art-kalamkari',
  };

  if (!artForms) {
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
              {artForms.map((art) => {
                const artImage = PlaceHolderImages.find((img) => img.id === art.imageId);
                return (
                  <AccordionItem value={art.artForm} key={art.artForm}>
                    <AccordionTrigger className="text-xl font-headline hover:no-underline">
                      <div className="flex items-center gap-4">
                        {artImage && (
                          <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                            <Image src={artImage.imageUrl} alt={art.artForm} fill className="object-cover" data-ai-hint={artImage.imageHint}/>
                          </div>
                        )}
                        <div className="text-left">
                          {art.artForm}
                          <p className="text-sm font-normal text-muted-foreground">{art.region}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-secondary/30 rounded-md">
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2 items-center">
                           <Badge variant="secondary" className="flex items-center gap-1.5">{getCategoryIcon(art.category)} {art.category}</Badge>
                           <Badge variant="secondary">Medium: {art.medium}</Badge>
                        </div>
                        <Separator />
                        <div>
                          <h4 className="font-semibold mb-2">Historical Background</h4>
                          <p className="text-sm text-muted-foreground">{art.history}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Cultural & Social Significance</h4>
                          <p className="text-sm text-muted-foreground">{art.culturalSignificance}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Interesting Facts</h4>
                          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                            {art.interestingFacts.map((fact, index) => (
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
