import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "./ui/separator";

const MonumentCard = ({ item }) => {
  const image = PlaceHolderImages.find((img) => img.id === item.imageId);
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg h-full flex flex-col min-h-0">
      <div className="relative h-40 w-full">
        {image ? (
          <Image
            src={image.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            data-ai-hint={image.imageHint}
          />
        ) : (
          <div className="bg-muted h-full w-full" />
        )}
      </div>
      <CardContent className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold font-headline truncate">{item.name}</h3>
        {item.location && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {item.location}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

const StateCard = ({ item }) => {
  const image = PlaceHolderImages.find((img) => img.id === item.imageId);
  return (
    <Link href={`/states/${item.slug}`} className="group">
      <Card className="overflow-hidden transition-shadow hover:shadow-lg h-full flex flex-col min-h-0">
        <div className="relative h-40 w-full">
          {image ? (
            <Image
              src={image.imageUrl}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={image.imageHint}
            />
          ) : (
            <div className="bg-muted h-full w-full" />
          )}
        </div>
        <CardContent className="p-4 flex-grow flex flex-col">
          <h3 className="font-bold font-headline truncate">{item.name}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {item.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default function SearchResults({ results }) {
  if (
    !results ||
    (results.states.length === 0 && results.monuments.length === 0)
  ) {
    return (
      <div className="text-center text-muted-foreground py-16">
        <p>No results found.</p>
        <p className="text-sm">Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {results.monuments.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold font-headline mb-6">Monuments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.monuments.map((item) => (
              <MonumentCard key={item.imageId} item={item} />
            ))}
          </div>
        </section>
      )}

      {results.states.length > 0 && results.monuments.length > 0 && (
        <Separator />
      )}

      {results.states.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold font-headline mb-6">States</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.states.map((item) => (
              <StateCard key={item.slug} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
