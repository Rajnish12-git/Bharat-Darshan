'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Search, User, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const NavLinks = ({ className, onLinkClick }: { className?: string, onLinkClick?: () => void }) => (
    <nav className={cn("items-center space-x-4 lg:space-x-6", className)}>
        <Link href="/#states" onClick={onLinkClick} className={cn("text-sm font-medium transition-colors hover:text-primary", isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white")}>
            States
        </Link>
        <Link href="/#timeline" onClick={onLinkClick} className={cn("text-sm font-medium transition-colors hover:text-primary", isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white")}>
            Timeline
        </Link>
    </nav>
  );

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-colors duration-300",
        isScrolled ? "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/40 border-b border-border/40" : "bg-transparent"
      )}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className={cn(
              "text-3xl font-bold transition-colors",
              isScrolled ? "text-foreground" : "text-white"
            )}>Bharat Darshan</span>
          </Link>
          <NavLinks />
        </div>
        
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("transition-colors", isScrolled ? "text-muted-foreground" : "text-white hover:bg-black/10")}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] p-0">
              <div className="p-6">
                 <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="font-bold text-2xl text-foreground">Bharat Darshan</span>
                  </Link>
                <NavLinks className="flex-col items-start space-x-0 space-y-4 mt-6" onLinkClick={() => setIsMobileMenuOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon" asChild className={cn("transition-colors", isScrolled ? "text-muted-foreground" : "text-white hover:bg-black/10")}>
            <Link href="/search" aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className={cn("transition-colors", isScrolled ? "text-muted-foreground" : "text-white hover:bg-black/10")}>
            <Link href="/login" aria-label="User Profile">
              <User className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
