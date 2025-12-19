'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Mountain, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const navLinks = [
  { href: '/explore', label: 'Explore' },
  { href: '/#glimpses', label: 'Glimpses' },
  { href: '/#timeline', label: 'Timeline' },
];

export default function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Mountain className="h-6 w-6" />
          <span className="font-bold font-headline text-xl">Bharat Darshan</span>
        </Link>

        {isMobile ? (
          <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/search" aria-label="Search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
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
                  className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/search" aria-label="Search">
                  <Search className="h-5 w-5 text-foreground/60" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/login" aria-label="User Profile">
                  <User className="h-5 w-5 text-foreground/60" />
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
