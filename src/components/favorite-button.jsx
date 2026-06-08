"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/context/favorites-context";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useState } from "react";

export default function FavoriteButton({ item, category }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();
  const [isClicked, setIsClicked] = useState(false);

  const isItemFavorite = isFavorite(item.imageId);

  const handleToggleFavorite = (e) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation(); // Prevent card click-through
    setIsClicked(true); // Trigger animation
    if (isItemFavorite) {
      removeFavorite(item.imageId);
      toast({ title: `Removed "${item.name}" from My Space.` });
    } else {
      addFavorite(item, category);
      toast({ title: `Added "${item.name}" to My Space.` });
    }
  };
  const handleAnimationEnd = () => {
    setIsClicked(false);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50 hover:text-white"
            onClick={handleToggleFavorite}
            aria-label={
              isItemFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-all",
                isItemFavorite ? "fill-red-500 text-red-500" : "text-white",
                isClicked && !isItemFavorite ? "animate-ping-once" : "",
              )}
              onAnimationEnd={handleAnimationEnd}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Save to My Space</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Add this animation to tailwind.config.ts if it doesn't exist
// keyframes: {
//   'ping-once': {
//     '0%': { transform: 'scale(1)', opacity: '1' },
//     '50%': { transform: 'scale(1.5)', opacity: '0.7' },
//     '100%': { transform: 'scale(1)', opacity: '1' },
//   },
// },
// animation: {
//   'ping-once': 'ping-once 0.5s ease-in-out',
// },
