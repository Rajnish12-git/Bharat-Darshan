
import { timelineEvents } from '@/lib/timeline-data';

export default function HistoricalTimeline() {
  return (
    <section id="timeline" className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-headline">A Journey Through Time</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Major milestones in the history of Indian civilization
          </p>
        </div>
        <div className="relative">
          {/* The vertical line */}
          <div className="absolute left-4 md:left-1/2 h-full w-0.5 -translate-x-1/2 bg-border"></div>
          
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div
                key={event.id}
                className="relative flex items-center md:w-full md:justify-normal"
              >
                {/* Desktop: Alternating layout */}
                <div className="hidden md:flex md:w-1/2 md:pr-8" style={{justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start'}}>
                   <div className={`w-full max-w-md p-6 rounded-lg bg-card shadow-md ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <p className="text-sm font-semibold text-primary">{event.date}</p>
                    <h3 className="font-headline text-xl font-bold mt-1">{event.title}</h3>
                    <p className="text-muted-foreground mt-2">{event.description}</p>
                  </div>
                </div>
                
                {/* The circle on the timeline */}
                <div className="absolute left-4 top-1/2 md:left-1/2 z-10 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary ring-8 ring-background"></div>
                
                {/* Mobile: Single column layout */}
                <div className="w-full pl-12 md:hidden">
                   <div className="p-6 rounded-lg bg-card shadow-md">
                    <p className="text-sm font-semibold text-primary">{event.date}</p>
                    <h3 className="font-headline text-xl font-bold mt-1">{event.title}</h3>
                    <p className="text-muted-foreground mt-2">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
