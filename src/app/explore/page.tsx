'use client';
import Header from '@/components/header';
import Footer from '@/components/footer';
import StateGrid from '@/components/state-grid';

export default function ExplorePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-24 md:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center mb-12">
          <h1 className="font-headline text-4xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
            Explore All States
          </h1>
          <p className="max-w-prose leading-relaxed text-muted-foreground sm:text-lg">
            Browse through the rich heritage of every Indian state and discover majestic monuments, vibrant cultural traditions, and more.
          </p>
        </div>
        
        <div className="mt-16">
          <StateGrid />
        </div>

      </main>
      <Footer />
    </div>
  );
}
