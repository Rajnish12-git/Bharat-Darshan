import Header from '@/components/header';
import Footer from '@/components/footer';
import StateGrid from '@/components/state-grid';

export default function ExplorePage() {
  return (
    <>
      <Header />
      <main className="container py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold font-headline">Explore the States</h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Discover the unique cultural tapestry of each Indian state, a journey through diverse landscapes, rich traditions, and culinary delights.
          </p>
        </div>
        <StateGrid />
      </main>
      <Footer />
    </>
  );
}
