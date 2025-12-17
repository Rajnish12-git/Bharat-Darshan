import Header from '@/components/header';
import HeroCarousel from '@/components/hero-carousel';
import StateGrid from '@/components/state-grid';
import HistoricalTimeline from '@/components/historical-timeline';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <HeroCarousel />
      <section id="states" className="container py-12 md:py-24 scroll-mt-20">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-headline text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
            Explore the States
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Discover the unique cultural tapestry of each Indian state. Click on a state to begin your journey.
          </p>
        </div>
        <StateGrid />
      </section>
      <section id="timeline" className="bg-secondary/50 scroll-mt-20">
         <div className="container py-12 md:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mb-12">
              <h2 className="font-headline text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                A Journey Through Time
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Witness the evolution of Indian civilization through its major historical milestones.
              </p>
            </div>
            <HistoricalTimeline />
          </div>
      </section>
    </div>
  );
}
