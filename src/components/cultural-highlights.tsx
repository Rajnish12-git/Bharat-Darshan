import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import StateGrid from './state-grid';

export default function CulturalHighlights() {
  const highlight = {
    title: 'Architectural Marvels',
    subtitle: 'Monuments that tell tales of time',
    description:
      "From the ivory-white splendor of the Taj Mahal to the imposing red sandstone of Agra Fort, India's monuments are a testament to its rich history and architectural genius. These structures are not just stone and mortar; they are the chronicles of empires, the canvas of artisans, and the heart of a nation's identity.",
    imageId: 'hero-taj-mahal',
    slug: 'architectural-marvels',
  };

  const image = PlaceHolderImages.find((img) => img.id === highlight.imageId);

  return (
    <section id="glimpses" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-headline">
            Glimpses of Heritage
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Experience the rich and diverse cultural fabric of India, from its
            stunning architecture to its vibrant traditions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 items-center gap-12 md:gap-16">
          <div className="relative aspect-square rounded-xl overflow-hidden shadow-lg">
            {image && (
              <Image
                src={image.imageUrl}
                alt={highlight.title}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
              />
            )}
          </div>
          <div className="flex flex-col items-start text-left">
            <p className="text-primary font-semibold">{highlight.subtitle}</p>
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
      </div>
    </section>
  );
}
