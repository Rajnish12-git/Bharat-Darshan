'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import type { DetailItem } from '@/lib/heritage-data';

interface FavoriteItem extends DetailItem {
  category: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (item: DetailItem, category: string) => void;
  removeFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('bharat-darshan-favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Could not load favorites from localStorage:", error);
      setFavorites([]);
    } finally {
        setIsLoaded(true);
    }
  }, []);

  const saveFavorites = (newFavorites: FavoriteItem[]) => {
    try {
      localStorage.setItem('bharat-darshan-favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error("Could not save favorites to localStorage:", error);
    }
  };

  const addFavorite = (item: DetailItem, category: string) => {
    const newFavorite: FavoriteItem = { ...item, category };
    const newFavorites = [...favorites, newFavorite];
    saveFavorites(newFavorites);
  };

  const removeFavorite = (itemId: string) => {
    const newFavorites = favorites.filter(fav => fav.imageId !== itemId);
    saveFavorites(newFavorites);
  };

  const isFavorite = useCallback((itemId: string) => {
    if(!isLoaded) return false;
    return favorites.some(fav => fav.imageId === itemId);
  }, [favorites, isLoaded]);
  

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
