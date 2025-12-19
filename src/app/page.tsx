import Header from '@/components/header';
import HeroCarousel from '@/components/hero-carousel';
import HistoricalTimeline from '@/components/historical-timeline';
import Footer from '@/components/footer';
import CulturalHighlights from '@/components/cultural-highlights';
import ExploreStates from '@/components/explore-states';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCarousel />
        <ExploreStates />
        <CulturalHighlights />
        <HistoricalTimeline />
      </main>
      <Footer />
    </>
  );
}
