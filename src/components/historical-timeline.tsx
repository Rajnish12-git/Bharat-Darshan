
'use client';

import { timelineEvents } from '@/lib/timeline-data';
import { Skeleton } from './ui/skeleton';
import { useEffect, useState } from 'react';

// A mock version of the TimelineEvent from the original file
interface TimelineEvent {
    id: string;
    title: string;
    date: string;
    description: string;
    imageUrl: string;
}

export default function HistoricalTimeline() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      const sortedEvents = [...timelineEvents].sort((a, b) => {
        const dateA = parseInt(a.date.replace(' BCE', '').replace(' CE', ''));
        const dateB = parseInt(b.date.replace(' BCE', '').replace(' CE', ''));
        const eraA = a.date.includes('BCE') ? -1 : 1;
        const eraB = b.date.includes('BCE') ? -1 : 1;
        
        return (dateA * eraA) - (dateB * eraB);
      });
      setEvents(sortedEvents);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="relative mx-auto max-w-4xl px-4 space-y-8">
        <div className="absolute left-4 top-0 h-full w-0.5 -translate-x-1/2 bg-border md:left-1/2"></div>
        {[...Array(4)].map((_, index) => (
          <div key={index} className="relative flex w-full items-center justify-between md:justify-normal">
            <div className="md:hidden w-full pl-8">
              <Skeleton className="w-full h-28 rounded-lg" />
            </div>
            {index % 2 === 0 ? (
              <>
                <div className="hidden md:block w-[calc(50%-2rem)] pr-8 text-right">
                  <Skeleton className="w-full h-28 rounded-lg" />
                </div>
                <div className="z-10 hidden md:flex h-4 w-4 items-center justify-center rounded-full bg-muted ring-8 ring-background"></div>
                <div className="hidden md:block w-[calc(50%-2rem)]"></div>
              </>
            ) : (
              <>
                <div className="hidden md:block w-[calc(50%-2rem)]"></div>
                <div className="z-10 hidden md:flex h-4 w-4 items-center justify-center rounded-full bg-muted ring-8 ring-background"></div>
                <div className="hidden md:block w-[calc(50%-2rem)] pl-8 text-left">
                  <Skeleton className="w-full h-28 rounded-lg" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-4xl px-4">
      <div className="absolute left-4 top-0 h-full w-0.5 -translate-x-1/2 bg-border md:left-1/2"></div>
      {events.map((event, index) => (
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
