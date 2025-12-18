import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from './ui/button';
import { highlights } from '@/lib/highlights-data';

export default function CulturalHighlights() {
  return (
    <section id="highlights" className="bg-secondary/50 py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-headline">Cultural Highlights</h2>
          <p className="text-lg text-muted-foreground mt-2">
            A glimpse into the soul of India
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item) => {
            const image = PlaceHolderImages.find(
              (img) => img.id === item.imageId
            );
            return (
              <div
                key={item.title}
                className="group relative flex flex-col overflow-hidden rounded-lg shadow-lg"
              >
                <Link href={`/highlights/${item.slug}`} className="absolute inset-0 z-10">
                  <span className="sr-only">View {item.title}</span>
                </Link>
                <div className="relative h-64 w-full">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      data-ai-hint={image.imageHint}
                    />
                  )}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6 bg-card flex-1 flex flex-col">
                  <h3 className="text-xl font-bold font-headline">{item.title}</h3>
                  <p className="text-muted-foreground mt-2 flex-1">{item.description}</p>
                  <Button variant="link" className="p-0 h-auto self-start mt-4 text-primary">Learn More</Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
