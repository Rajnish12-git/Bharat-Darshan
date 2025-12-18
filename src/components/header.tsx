import Link from 'next/link';
import { Button } from './ui/button';
import { Search, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="absolute top-0 z-50 w-full">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-white text-2xl">Bharat Darshan</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/explore"
              className="text-white/80 transition-colors hover:text-white"
            >
              Explore
            </Link>
            <Link
              href="/#timeline"
              className="text-white/80 transition-colors hover:text-white"
            >
              Timeline
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/search" aria-label="Search">
              <Search className="h-5 w-5 text-white/80" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/login" aria-label="User Profile">
              <User className="h-5 w-5 text-white/80" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
