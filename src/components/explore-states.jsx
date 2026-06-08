import StateGrid from "./state-grid";

export default function ExploreStates() {
  return (
    <section id="explore-states" className="py-16 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-headline">
            Explore the States
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Discover the unique cultural tapestry of each Indian state, a
            journey through diverse landscapes, rich traditions, and culinary
            delights.
          </p>
        </div>
        <StateGrid />
      </div>
    </section>
  );
}
