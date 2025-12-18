import Header from '@/components/header';
import Footer from '@/components/footer';
import InteractiveMap from '@/components/interactive-map';
import ExploreNearMe from '@/components/explore-near-me';

export default function ExplorePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-24 md:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center mb-12">
          <h1 className="font-headline text-4xl font-bold leading-[1.1] sm:text-4xl md:text-5xl">
            Discover India's Heritage
          </h1>
          <p className="max-w-prose leading-relaxed text-muted-foreground sm:text-lg">
            Find monuments near you or click on a state to explore its rich history, from majestic monuments to vibrant cultural traditions.
          </p>
        </div>
        
        <ExploreNearMe />

        <div className="relative w-full aspect-[16/10] bg-secondary/30 rounded-2xl border overflow-hidden shadow-lg mt-16">
            <InteractiveMap />
        </div>
      </main>
      <Footer />
    </div>
  );
}
