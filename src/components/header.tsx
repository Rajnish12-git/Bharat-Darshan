
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState, useRef } from 'react';
import { useUser } from '@/firebase';
import LoginModal from './login-modal';
import { usePathname } from 'next/navigation';

function HeaderActions() {
  const { user } = useUser();
  const pathname = usePathname();

  const UserButton = () => {
    if (user && !user.isAnonymous) {
      return (
        <Button variant="ghost" size="icon" asChild>
          <Link href="/cultural-passport" aria-label="User Profile">
            <User className="h-5 w-5" />
          </Link>
        </Button>
      );
    }
    return (
      <LoginModal>
        <Button variant="ghost" size="icon" aria-label="Login">
          <User className="h-5 w-5" />
        </Button>
      </LoginModal>
    );
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#explore-states', label: 'Explore' },
    { href: '/#glimpses', label: 'Glimpses' },
    { href: '/#timeline', label: 'Timeline' },
  ];

  const MobileMenu = () => (
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
          {user && !user.isAnonymous ? (
            <Link href="/cultural-passport" className="text-muted-foreground hover:text-foreground">
              My Space
            </Link>
          ) : (
            <LoginModal>
              <button className="text-lg text-left text-muted-foreground hover:text-foreground">
                My Space
              </button>
            </LoginModal>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );

  if (useIsMobile()) {
    return (
      <div className="flex flex-1 items-center justify-end space-x-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/search" aria-label="Search">
            <Search className="h-5 w-5" />
          </Link>
        </Button>
        <UserButton />
        <MobileMenu />
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-end space-x-4">
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition-colors hover:text-foreground/80"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/search" aria-label="Search">
            <Search className="h-5 w-5" />
          </Link>
        </Button>
        <UserButton />
      </div>
    </div>
  );
}

export default function Header() {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const isLandingPage = pathname === '/';

  useEffect(() => {
    setIsClient(true);
    
    if (!headerRef.current) return;

    const headerEl = headerRef.current;
    
    if (isLandingPage) {
        const handleScroll = () => {
          const isScrolled = window.scrollY > 10;
          headerEl.setAttribute('data-scrolled', isScrolled.toString());
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    } else {
        headerEl.setAttribute('data-scrolled', 'true');
    }
  }, [isLandingPage, pathname]);

  return (
    <header
      ref={headerRef}
      data-landing={isLandingPage}
      className={cn(
        'fixed top-0 z-50 w-full transition-colors duration-300',
        !isLandingPage && 'border-b border-border/40 bg-background/95 text-foreground backdrop-blur supports-[backdrop-filter]:bg-background/60'
      )}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold font-headline text-xl">Bharat Darshan</span>
        </Link>
        {isClient && <HeaderActions />}
      </div>
    </header>
  );
}
