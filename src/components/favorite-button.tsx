'use client';

import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/favorites-context';
import type { DetailItem } from '@/lib/heritage-data';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface FavoriteButtonProps {
  item: DetailItem;
  category: string;
}

export default function FavoriteButton({ item, category }: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { toast } = useToast();

  const isItemFavorite = isFavorite(item.imageId);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    if (isItemFavorite) {
      removeFavorite(item.imageId);
      toast({ title: `Removed "${item.name}" from your favorites.` });
    } else {
      addFavorite(item, category);
      toast({ title: `Added "${item.name}" to your favorites.` });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 hover:text-white"
      onClick={handleToggleFavorite}
      aria-label={isItemFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart className={cn('h-5 w-5', isItemFavorite && 'fill-red-500 text-red-500')} />
    </Button>
  );
}
