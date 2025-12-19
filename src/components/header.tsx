
'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';
import { useUser } from '@/firebase';
import LoginModal from './login-modal';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/#glimpses', label: 'Glimpses' },
  { href: '/#timeline', label: 'Timeline' },
];

function HeaderActions() {
  const isMobile = useIsMobile();
  const { user } = useUser();

  const UserIcon = () => (
    <User
      className={cn(
        'h-5 w-5 text-foreground/60 hover:text-foreground'
      )}
    />
  );

  const UserButton = () => {
    if (user && !user.isAnonymous) {
      return (
        <Button variant="ghost" size="icon" asChild>
          <Link href="/cultural-passport" aria-label="User Profile">
            <UserIcon />
          </Link>
        </Button>
      );
    }
    return (
      <LoginModal>
        <Button variant="ghost" size="icon" aria-label="Login">
          <UserIcon />
        </Button>
      </LoginModal>
    );
  };
  
    if (isMobile) {
      return (
        <div className="flex flex-1 items-center justify-end space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/search" aria-label="Search">
                <Search
                  className={cn(
                    'h-5 w-5'
                  )}
                />
              </Link>
            </Button>
             <LoginModal>
                <button className="text-lg text-left text-muted-foreground hover:text-foreground">
                    <UserIcon />
                </button>
            </LoginModal>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
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
                  {user && !user.isAnonymous ? (
                    <Link href="/cultural-passport" className="text-muted-foreground hover:text-foreground">
                      Cultural Passport
                    </Link>
                   ) : (
                    <LoginModal>
                        <button className="text-lg text-left text-muted-foreground hover:text-foreground">
                            Cultural Passport
                        </button>
                    </LoginModal>
                   )}
                </nav>
              </SheetContent>
            </Sheet>
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
              className={cn(
                'transition-colors text-foreground/60 hover:text-foreground/80'
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
                  'h-5 w-5 text-foreground/60 hover:text-foreground'
                )}
              />
            </Link>
          </Button>
          <UserButton />
        </div>
      </div>
  );

}

export default function Header() {
  const [isClient, setIsClient] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    setIsClient(true);
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check on initial render
    }

    return () => {
      if (isHomePage) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isHomePage]);
  
  const headerClasses = cn(
    'sticky top-0 z-50 w-full transition-colors duration-300',
    (isHomePage && !scrolled)
      ? 'bg-transparent border-b border-transparent'
      : 'border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
  );

  return (
    <header className={headerClasses}>
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link
          href="/"
          className={cn(
            'mr-6 flex items-center space-x-2 transition-colors',
             (isHomePage && !scrolled) ? 'text-white' : 'text-foreground'
          )}
        >
          <span className="font-bold font-headline text-xl">Bharat Darshan</span>
        </Link>
        {isClient && <HeaderActions />}
      </div>
    </header>
  );
}
