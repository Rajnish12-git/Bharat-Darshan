import Link from 'next/link';
import { Button } from './ui/button';
import { Search, Map, Milestone } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-brand text-3xl font-bold">Bharat Darshan</span>
          </Link>
        </div>
        <nav className="flex-1 items-center space-x-4 hidden md:flex">
            <Link href="/#states" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Explore
            </Link>
             <Link href="/#timeline" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Timeline
            </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
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
