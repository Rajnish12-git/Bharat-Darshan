const timelineEvents = [
  {
    date: "c. 2500-1900 BCE",
    title: "Indus Valley Civilization",
    description: "One of the world's earliest urban civilizations, flourishing in the basins of the Indus River.",
  },
  {
    date: "c. 1500-500 BCE",
    title: "Vedic Period",
    description: "Composition of the Vedas. Foundation of Hinduism, Sanskrit language development.",
  },
  {
    date: "c. 322-185 BCE",
    title: "Mauryan Empire",
    description: "First pan-Indian empire, founded by Chandragupta Maurya. Emperor Ashoka promotes Buddhism.",
  },
  {
    date: "c. 320-550 CE",
    title: "Gupta Empire",
    description: "The 'Golden Age of India', marked by extensive inventions and discoveries in science, technology, art, and literature.",
  },
  {
    date: "1206-1526 CE",
    title: "Delhi Sultanate",
    description: "A series of five Muslim dynasties that ruled over large parts of the Indian subcontinent for 320 years.",
  },
  {
    date: "1526-1857 CE",
    title: "Mughal Empire",
    description: "An empire that ruled most of India and Pakistan. Known for its rich architecture like the Taj Mahal.",
  },
  {
    date: "1858-1947 CE",
    title: "British Raj",
    description: "The rule by the British Crown on the Indian subcontinent from 1858 to 1947.",
  },
  {
    date: "1947 CE",
    title: "Independence",
    description: "India gains independence from British rule, leading to the partition of the country.",
  },
];

export default function HistoricalTimeline() {
  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
      {timelineEvents.map((event, index) => (
        <div key={index} className="relative mb-8 flex w-full items-center justify-between">
          {/* Item on the left */}
          {index % 2 === 0 ? (
            <>
              <div className="w-[calc(50%-2rem)] pr-8 text-right">
                <div className="p-4 rounded-lg bg-card shadow-md border">
                  <p className="text-sm font-semibold text-primary">{event.date}</p>
                  <h3 className="font-headline text-lg font-bold mt-1">{event.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">{event.description}</p>
                </div>
              </div>
              <div className="z-10 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-8 ring-background"></div>
              <div className="w-[calc(50%-2rem)]"></div>
            </>
          ) : (
            /* Item on the right */
            <>
              <div className="w-[calc(50%-2rem)]"></div>
              <div className="z-10 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-8 ring-background"></div>
              <div className="w-[calc(50%-2rem)] pl-8 text-left">
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
