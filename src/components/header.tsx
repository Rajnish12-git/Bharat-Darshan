'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/explore', label: 'Explore' },
  { href: '/#glimpses', label: 'Glimpses' },
  { href: '/#timeline', label: 'Timeline' },
];

export default function Header() {
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
          : 'bg-transparent border-transparent'
      )}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link
          href="/"
          className={cn(
            'mr-6 flex items-center space-x-2',
            !scrolled && 'text-white'
          )}
        >
          <span className="font-bold font-headline text-xl">Bharat Darshan</span>
        </Link>

        {isMobile ? (
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/search" aria-label="Search">
                <Search
                  className={cn(
                    'h-5 w-5',
                    !scrolled && 'text-white hover:text-white/80'
                  )}
                />
              </Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className={cn(!scrolled && 'text-white hover:bg-white/20 hover:text-white')}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link href="/login" className="text-muted-foreground hover:text-foreground">
                    Profile
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors',
                    scrolled
                      ? 'text-foreground/60 hover:text-foreground/80'
                      : 'text-white/80 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/search" aria-label="Search">
                  <Search
                    className={cn(
                      'h-5 w-5',
                      scrolled ? 'text-foreground/60' : 'text-white/80'
                    )}
                  />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/login" aria-label="User Profile">
                  <User
                    className={cn(
                      'h-5 w-5',
                      scrolled ? 'text-foreground/60' : 'text-white/80'
                    )}
                  />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
