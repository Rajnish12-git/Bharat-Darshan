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
        "sticky top-0 z-50 w-full border-b border-transparent transition-colors duration-300",
        isScrolled ? "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/40 border-border/40" : "bg-transparent"
      )}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex flex-1">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className={cn(
              "font-bold text-3xl transition-colors",
              isScrolled ? "text-foreground" : "text-white"
            )}>Bharat Darshan</span>
          </Link>
        </div>
        <div className="flex items-center justify-end space-x-6">
           <nav className="items-center space-x-4 hidden md:flex">
                <Link href="/#states" className={cn("text-sm font-medium transition-colors hover:text-primary", isScrolled ? "text-muted-foreground" : "text-white/80 hover:text-white")}>
                    Explore
                </Link>
                <Link href="/#timeline" className={cn("text-sm font-medium transition-colors hover:text-primary", isScrolled ? "text-muted-foreground" : "text-white/80 hover:text-white")}>
                    Timeline
                </Link>
            </nav>
          <Button variant="ghost" size="icon" asChild className={cn("transition-colors", !isScrolled && "text-white/80 hover:text-white hover:bg-white/10")}>
            <Link href="/search" aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
