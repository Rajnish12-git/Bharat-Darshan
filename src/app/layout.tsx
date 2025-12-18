import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Literata } from 'next/font/google';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: 'Bharat Darshan',
  description: 'Explore the rich cultural, historical, and architectural heritage of India.',
};

const literata = Literata({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-body',
});

const literataHeadline = Literata({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-headline',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          literata.variable,
          literataHeadline.variable
        )}
      >
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
