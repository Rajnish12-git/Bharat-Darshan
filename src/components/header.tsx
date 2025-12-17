'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled state if user has scrolled down more than 10px
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/40 transition-colors duration-300"
      )}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex flex-1">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-headline text-3xl font-bold text-foreground">Bharat Darshan</span>
          </Link>
        </div>
        <div className="flex items-center justify-end space-x-6">
           <nav className="items-center space-x-4 hidden md:flex">
                <Link href="/#states" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                    Explore
                </Link>
                <Link href="/#timeline" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                    Timeline
                </Link>
            </nav>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/search" aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
