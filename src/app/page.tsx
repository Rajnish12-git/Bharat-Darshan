import Header from '@/components/header';
import HeroCarousel from '@/components/hero-carousel';
import HistoricalTimeline from '@/components/historical-timeline';
import Footer from '@/components/footer';
import CulturalHighlights from '@/components/cultural-highlights';
import ExploreNearMe from '@/components/explore-near-me';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCarousel />
        <CulturalHighlights />
        <ExploreNearMe />
        <HistoricalTimeline />
      </main>
      <Footer />
    </>
  );
}
