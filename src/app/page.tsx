import Header from '@/components/header';
import HeroCarousel from '@/components/hero-carousel';
import HistoricalTimeline from '@/components/historical-timeline';
import Footer from '@/components/footer';
import CulturalHighlights from '@/components/cultural-highlights';
import StateGrid from '@/components/state-grid';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCarousel />
        <CulturalHighlights />
        <section className="py-20 md:py-32">
            <div className="container">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold font-headline">
                    Explore the States
                  </h2>
                  <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                    Discover the unique cultural tapestry of each Indian state, a journey through diverse landscapes, rich traditions, and culinary delights.
                  </p>
                </div>
                <StateGrid />
            </div>
        </section>
        <HistoricalTimeline />
      </main>
      <Footer />
    </>
  );
}
