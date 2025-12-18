import Header from '@/components/header';
import HeroCarousel from '@/components/hero-carousel';
import HistoricalTimeline from '@/components/historical-timeline';
import Footer from '@/components/footer';
import CulturalHighlights from '@/components/cultural-highlights';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroCarousel />
        <CulturalHighlights />
        <HistoricalTimeline />
      </main>
      <Footer />
    </>
  );
}
