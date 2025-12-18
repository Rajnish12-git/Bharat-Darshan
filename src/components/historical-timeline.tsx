'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Skeleton } from './ui/skeleton';
import type { TimelineEvent } from '@/lib/types';

export default function HistoricalTimeline() {
  const firestore = useFirestore();
  const timelineEventsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'timeline_events') : null),
    [firestore]
  );
  const { data: timelineEvents, isLoading } = useCollection<TimelineEvent>(timelineEventsQuery);

  // Sort events by date. A more robust solution would handle different date formats and BCE/CE properly.
  const sortedEvents = timelineEvents?.sort((a, b) => {
    // This is a simplified sort, assuming consistent date formats.
    // A production app would need a more robust date parsing logic.
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

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
      {sortedEvents?.map((event, index) => (
        <div key={event.id} className="relative mb-8 flex w-full items-center justify-between md:justify-normal">
          {/* Content for mobile (single column) */}
          <div className="md:hidden w-full pl-8">
             <div className="z-10 absolute -left-1.5 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-8 ring-background"></div>
             <div className="p-4 rounded-lg bg-card shadow-md border">
                <p className="text-sm font-semibold text-primary">{new Date(event.date).getFullYear()}</p>
                <h3 className="font-headline text-lg font-bold mt-1">{event.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{event.description}</p>
              </div>
          </div>
          
          {/* Content for desktop (alternating columns) */}
          {index % 2 === 0 ? (
            <>
              <div className="hidden md:block w-[calc(50%-2rem)] pr-8 text-right">
                <div className="p-4 rounded-lg bg-card shadow-md border">
                  <p className="text-sm font-semibold text-primary">{new Date(event.date).getFullYear()}</p>
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
                  <p className="text-sm font-semibold text-primary">{new Date(event.date).getFullYear()}</p>
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
