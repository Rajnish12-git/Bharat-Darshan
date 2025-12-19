import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { highlights } from '@/lib/highlights-data';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export default function CulturalHighlights() {
  return (
    <section id="glimpses" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-headline">
            Glimpses of Heritage
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Experience the rich and diverse cultural fabric of India through its
            stunning architecture, vibrant traditions, and artistic expressions.
          </p>
        </div>

        <div className="space-y-24">
          {highlights.map((highlight, index) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === highlight.imageId
            );
            return (
              <div
                key={highlight.slug}
                className="grid md:grid-cols-2 items-center gap-12 md:gap-16"
              >
                <div
                  className={cn(
                    'relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg group',
                    index % 2 !== 0 && 'md:order-2'
                  )}
                >
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={highlight.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/highlights/${highlight.slug}`}>
                        <Button variant="secondary" size="lg">Explore {highlight.title} <ArrowRight className="ml-2 h-5 w-5"/></Button>
                      </Link>
                   </div>
                </div>
                <div
                  className={cn(
                    'flex flex-col items-start',
                    index % 2 !== 0 && 'md:order-1'
                  )}
                >
                  <p className="text-primary font-semibold">
                    {highlight.subtitle}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-bold font-headline mt-2">
                    {highlight.title}
                  </h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                  <Button variant="link" asChild className="mt-4 px-0">
                    <Link href={`/highlights/${highlight.slug}`}>
                      Learn More →
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
