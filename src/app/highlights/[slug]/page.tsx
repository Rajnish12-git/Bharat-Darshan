
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { highlights } from '@/lib/highlights-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Header from '@/components/header';
import Footer from '@/components/footer';
import InfoCard from '@/components/info-card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
  // Filter out architectural-marvels as it has its own page
  return highlights.filter(h => h.slug !== 'architectural-marvels').map((highlight) => ({
    slug: highlight.slug,
  }));
}

export default function HighlightPage({ params }: { params: { slug: string } }) {

  if (params.slug === 'architectural-marvels') {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-3xl font-bold mb-4">Redirecting...</h1>
            <p className="text-lg text-muted-foreground mb-8">This special category has its own dedicated page.</p>
            <Button asChild>
                <Link href="/highlights/architectural-marvels">Go to Architectural Marvels</Link>
            </Button>
        </div>
    );
  }

  const highlight = highlights.find((h) => h.slug === params.slug);

  if (!highlight) {
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
            {highlight.details && highlight.details.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {highlight.details.map((item) => (
                  <InfoCard item={item} key={item.name} />
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
