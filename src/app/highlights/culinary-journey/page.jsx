import Image from "next/image";
import { notFound } from "next/navigation";
import culinaryJourney from "@/lib/culinary-journey.json";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Utensils, Leaf, Fish } from "lucide-react";

const getTypeIcon = (type) => {
  if (type.toLowerCase() === "vegetarian") {
    return <Leaf className="h-4 w-4 text-green-600" />;
  }
  if (type.toLowerCase() === "non-vegetarian") {
    return <Fish className="h-4 w-4 text-red-600" />;
  }
  return <Utensils className="h-4 w-4 text-muted-foreground" />;
};

export default function CulinaryJourneyPage() {
  const highlight = {
    title: "A Culinary Journey",
    subtitle: "Taste the Diversity of India",
    description:
      "Indian cuisine is a vibrant, ancient, and profound mosaic of flavors, shaped by millennia of history, diverse geography, and cultural exchanges. From the robust, tandoori-fired dishes of the North to the subtle, coconut-infused curries of the South, and from the delicate sweets of the East to the hearty millets of the West, the culinary landscape is a sensory explosion. Each dish tells a story of its region's climate, agriculture, and traditions, creating an experience that tantalizes the senses and nourishes the soul.",
    imageId: "cuisine-spices",
  };

  if (!culinaryJourney) {
    notFound();
  }

  const highlightImage = PlaceHolderImages.find(
    (img) => img.id === highlight.imageId,
  );

  return (
    <>
      <Header />
      <article>
        <header className="relative h-[60vh] w-full">
          {highlightImage && (
            <Image
              src={highlightImage.imageUrl}
              alt={highlight.title}
              fill
              className="object-cover"
              data-ai-hint={highlightImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 md:p-8 lg:p-16">
            <p className="text-primary font-semibold">{highlight.subtitle}</p>
            <h1 className="text-4xl md:text-7xl font-bold font-headline text-white drop-shadow-lg">
              {highlight.title}
            </h1>
          </div>
        </header>

        <div className="container py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              {highlight.description}
            </p>
            <Accordion type="single" collapsible className="w-full">
              {culinaryJourney.map((dish) => {
                const dishImage = PlaceHolderImages.find(
                  (img) => img.id === dish.imageId,
                );
                return (
                  <AccordionItem value={dish.dishName} key={dish.dishName}>
                    <AccordionTrigger className="text-xl font-headline hover:no-underline">
                      <div className="flex items-center gap-4">
                        {dishImage && (
                          <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={dishImage.imageUrl}
                              alt={dish.dishName}
                              fill
                              className="object-cover"
                              data-ai-hint={dishImage.imageHint}
                            />
                          </div>
                        )}
                        <div className="text-left">
                          {dish.dishName}
                          <p className="text-sm font-normal text-muted-foreground">
                            {dish.region}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-secondary/30 rounded-md">
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2 items-center">
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {getTypeIcon(dish.type)} {dish.type}
                          </Badge>
                          <Badge variant="secondary">
                            Style: {dish.cookingStyle}
                          </Badge>
                          {dish.occasions && (
                            <Badge variant="secondary">
                              Occasions: {dish.occasions}
                            </Badge>
                          )}
                        </div>
                        <Separator />
                        <div>
                          <h4 className="font-semibold mb-2">About the Dish</h4>
                          <p className="text-sm text-muted-foreground">
                            {dish.description}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">
                            Cultural Significance
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {dish.culturalSignificance}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">
                            Interesting Facts
                          </h4>
                          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                            {dish.interestingFacts.map((fact, index) => (
                              <li key={index}>{fact}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
