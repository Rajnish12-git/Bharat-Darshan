import Link from 'next/link';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  return (
    <header className="absolute top-0 z-50 w-full">
      <div className="container flex h-20 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-brand text-4xl font-bold text-white drop-shadow-md">Bharat Darshan</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button variant="ghost" size="icon" asChild className="text-white hover:bg-white/20 hover:text-white">
            <Link href="/search" aria-label="Search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
