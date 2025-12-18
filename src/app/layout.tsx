import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bharat Darshan',
  description: 'Explore the rich cultural, historical, and architectural heritage of India.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.className)}>
        <Providers>
          <div className="relative flex min-h-dvh flex-col bg-background">
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
