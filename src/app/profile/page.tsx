'use client';

import { useUser } from '@/firebase';
import { useFavorites } from '@/context/favorites-context';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Loader2 } from 'lucide-react';
import InfoCard from '@/components/info-card';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const { favorites } = useFavorites();

  const groupedFavorites = favorites.reduce((acc, item) => {
    const { category } = item;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof favorites>);


  if (isUserLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  const getCategoryTitle = (category: string) => {
    switch(category) {
        case 'monuments': return 'Favorite Monuments';
        case 'cuisine': return 'Favorite Cuisine';
        case 'festivals': return 'Favorite Festivals';
        case 'art': return 'Favorite Art Forms';
        default: return 'My Favorites';
    }
  }

  return (
    <>
      <Header />
      <div className="container pt-24 md:pt-32 min-h-screen">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">
            Welcome, {user?.displayName || 'Explorer'}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">This is your personal collection of discoveries.</p>
        </header>

        {Object.keys(groupedFavorites).length > 0 ? (
          <div className="space-y-16">
            {Object.entries(groupedFavorites).map(([category, items]) => (
              <section key={category}>
                <h2 className="text-2xl font-bold font-headline mb-6">{getCategoryTitle(category)}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {items.map((item) => (
                        <InfoCard item={item} category={category} key={item.imageId} />
                    ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">You haven&apos;t saved any favorites yet.</p>
            <p className="text-sm text-muted-foreground/80 mt-2">Click the heart icon on any item to add it to your collection.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
