import StateGrid from './state-grid';

export default function CulturalHighlights() {
  return (
    <section id="highlights" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-headline">Explore the States</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Discover the unique cultural tapestry of each Indian state, a journey through diverse landscapes, rich traditions, and culinary delights.
          </p>
        </div>
        <StateGrid />
      </div>
    </section>
  );
}
