import { timelineEvents } from '@/lib/timeline-data';

export default function HistoricalTimeline() {
  return (
    <section id="timeline" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-headline">A Journey Through Time</h2>
          <p className="text-lg text-muted-foreground mt-2">
            Major milestones in the history of Indian civilization
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-border"></div>
          {timelineEvents.map((event, index) => (
            <div
              key={event.id}
              className={`relative mb-12 flex w-full items-center ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`w-1/2 ${
                  index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'
                }`}
              >
                <div className="p-6 rounded-lg bg-card shadow-md">
                  <p className="text-sm font-semibold text-primary">{event.date}</p>
                  <h3 className="font-headline text-xl font-bold mt-1">{event.title}</h3>
                  <p className="text-muted-foreground mt-2">{event.description}</p>
                </div>
              </div>
              <div className="absolute left-1/2 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full bg-primary ring-8 ring-background"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
