'use client';

import { timelineEvents } from '@/lib/timeline-data';

interface TimelineEvent {
    id: string;
    title: string;
    date: string;
    description: string;
    era: 'BCE' | 'CE';
    year: number;
}


export default function HistoricalTimeline() {
  const events = timelineEvents.sort((a, b) => {
    const yearA = a.era === 'BCE' ? -a.year : a.year;
    const yearB = b.era === 'BCE' ? -b.year : b.year;
    return yearA - yearB;
  });

  return (
    <div className="relative mx-auto max-w-4xl px-4">
      <div className="absolute left-4 top-0 h-full w-0.5 -translate-x-1/2 bg-border md:left-1/2"></div>
      {events?.map((event, index) => (
        <div key={event.id} className="relative mb-8 flex w-full items-center justify-between md:justify-normal">
          {/* Content for mobile (single column) */}
          <div className="md:hidden w-full pl-8">
             <div className="z-10 absolute -left-1.5 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-8 ring-background"></div>
             <div className="p-4 rounded-lg bg-card shadow-md border">
                <p className="text-sm font-semibold text-primary">{event.date}</p>
                <h3 className="font-headline text-lg font-bold mt-1">{event.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{event.description}</p>
              </div>
          </div>
          
          {/* Content for desktop (alternating columns) */}
          {index % 2 === 0 ? (
            <>
              <div className="hidden md:block w-[calc(50%-2rem)] pr-8 text-right">
                <div className="p-4 rounded-lg bg-card shadow-md border">
                  <p className="text-sm font-semibold text-primary">{event.date}</p>
                  <h3 className="font-headline text-lg font-bold mt-1">{event.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">{event.description}</p>
                </div>
              </div>
              <div className="z-10 hidden md:flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-8 ring-background"></div>
              <div className="hidden md:block w-[calc(50%-2rem)]"></div>
            </>
          ) : (
            <>
              <div className="hidden md:block w-[calc(50%-2rem)]"></div>
              <div className="z-10 hidden md:flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-8 ring-background"></div>
              <div className="hidden md:block w-[calc(50%-2rem)] pl-8 text-left">
                <div className="p-4 rounded-lg bg-card shadow-md border">
                  <p className="text-sm font-semibold text-primary">{event.date}</p>
                  <h3 className="font-headline text-lg font-bold mt-1">{event.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">{event.description}</p>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
