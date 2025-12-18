'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Search, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getAuth, signOut } from 'firebase/auth';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const auth = getAuth();
  const router = useRouter();

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

  const handleSignOut = () => {
    signOut(auth);
  };

  const NavLinks = ({ className, onLinkClick }: { className?: string, onLinkClick?: () => void }) => (
    <nav className={cn("items-center space-x-4 md:space-x-6", className)}>
        <Link href="/#states" onClick={onLinkClick} className={cn("text-sm font-medium transition-colors hover:text-primary", isScrolled || isMobileMenuOpen ? "text-muted-foreground hover:text-foreground" : "text-white")}>
            Explore
        </Link>
        <Link href="/#timeline" onClick={onLinkClick} className={cn("text-sm font-medium transition-colors hover:text-primary", isScrolled || isMobileMenuOpen ? "text-muted-foreground hover:text-foreground" : "text-white")}>
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
        <div className="mr-4 flex flex-1">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className={cn(
              "font-brand text-3xl transition-colors",
              isScrolled ? "text-foreground" : "text-white"
            )}>Bharat Darshan</span>
          </Link>
        </div>
        <div className="flex items-center justify-end space-x-2">
          <div className="hidden md:flex">
           <NavLinks />
          </div>
          <Button variant="ghost" size="icon" asChild className={cn("transition-colors", isScrolled ? "text-muted-foreground" : "text-white hover:bg-black/10")}>
            <Link href="/search" aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className={cn("transition-colors rounded-full", isScrolled ? "text-muted-foreground" : "text-white hover:bg-black/10")}>
                    <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" asChild className={cn("transition-colors", isScrolled ? "text-muted-foreground" : "text-white hover:bg-black/10")}>
              <Link href="/login" aria-label="User Profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          )}

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn("transition-colors", isScrolled ? "text-muted-foreground" : "text-white hover:bg-black/10")}>
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] p-0">
                <div className="p-6">
                   <Link href="/" className="mr-6 flex items-center space-x-2">
                      <span className="font-brand text-2xl text-foreground">Bharat Darshan</span>
                    </Link>
                  <NavLinks className="flex-col items-start space-x-0 space-y-4 mt-6" onLinkClick={() => setIsMobileMenuOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
