import Header from '@/components/header';
import HeroCarousel from '@/components/hero-carousel';
import HistoricalTimeline from '@/components/historical-timeline';
import Footer from '@/components/footer';
import CulturalHighlights from '@/components/cultural-highlights';
import ExploreStates from '@/components/explore-states';
import ExploreNearMe from '@/components/explore-near-me';
import BookingSection from '@/components/booking-section';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCarousel />
        <BookingSection />
        <ExploreStates />
        <ExploreNearMe />
        <CulturalHighlights />
        <HistoricalTimeline />
      </main>
      <Footer />
    </>
  );
}
