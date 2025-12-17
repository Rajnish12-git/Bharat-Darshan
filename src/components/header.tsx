'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Search, User } from 'lucide-react';
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


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser();
  const auth = getAuth();

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
              "font-bold text-3xl transition-colors",
              isScrolled ? "text-foreground" : "text-white"
            )}>Bharat Darshan</span>
          </Link>
        </div>
        <div className="flex items-center justify-end space-x-2">
           <nav className="items-center space-x-4 hidden md:flex">
                <Link href="/#states" className={cn("text-sm font-medium transition-colors hover:text-primary", isScrolled ? "text-muted-foreground" : "text-white")}>
                    Explore
                </Link>
                <Link href="/#timeline" className={cn("text-sm font-medium transition-colors hover:text-primary", isScrolled ? "text-muted-foreground" : "text-white")}>
                    Timeline
                </Link>
            </nav>
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

        </div>
      </div>
    </header>
  );
}
