
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
        <div className="relative wrap overflow-hidden p-10 h-full">
          <div className="absolute border-opacity-20 border-border h-full border" style={{left: '50%'}}></div>
          {timelineEvents.map((event, index) => (
            <div key={event.id} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse left-timeline' : 'right-timeline'}`}>
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto font-semibold text-lg text-primary-foreground">{index + 1}</h1>
              </div>
              <div className="order-1 bg-card rounded-lg shadow-xl w-5/12 px-6 py-4">
                <p className="text-sm font-semibold text-primary">{event.date}</p>
                <h3 className="font-bold text-foreground text-xl">{event.title}</h3>
                <p className="text-sm leading-snug tracking-wide text-muted-foreground text-opacity-100">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
