"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import FavoriteButton from "./favorite-button";
import { Ticket, WandSparkles } from "lucide-react";
import BookingModal from "./booking-modal";
import { Button } from "./ui/button";
import { useUser } from "@/firebase";
import LoginModal from "./login-modal";
import CostEstimatorModal from "./cost-estimator-modal";

export default function InfoCard({ item, category }) {
  const image = PlaceHolderImages.find((img) => img.id === item.imageId);
  const { user } = useUser();

  const renderBookingButton = () => {
    if (!user || user.isAnonymous) {
      return (
        <LoginModal>
          <Button variant="outline" className="w-full mt-4 text-sm h-9">
            <Ticket className="mr-2 h-4 w-4" /> Book Visit
          </Button>
        </LoginModal>
      );
    }
    return (
      <BookingModal monumentName={item.name}>
        <Button variant="outline" className="w-full mt-4 text-sm h-9">
          <Ticket className="mr-2 h-4 w-4" /> Book Visit
        </Button>
      </BookingModal>
    );
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl shadow-md border bg-card transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <div className="absolute top-3 right-3 z-10">
        <FavoriteButton item={item} category={category} />
      </div>
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {image ? (
          <Image
            src={image.imageUrl}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={image.imageHint}
          />
        ) : (
          <div className="bg-muted h-full w-full" />
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold font-headline text-lg">{item.name}</h3>
        {item.location && (
          <p className="text-sm text-muted-foreground">{item.location}</p>
        )}
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-grow">
          {item.description}
        </p>
        {category === "monument" && (
          <div className="flex items-center gap-2">
            {renderBookingButton()}
            <CostEstimatorModal destination={item.name}>
              <Button
                variant="outline"
                className="w-full mt-4 text-sm h-9 bg-primary/10 border-primary/20 hover:bg-primary/20"
              >
                <WandSparkles className="mr-2 h-4 w-4" /> Estimate Cost
              </Button>
            </CostEstimatorModal>
          </div>
        )}
      </div>
    </div>
  );
}
