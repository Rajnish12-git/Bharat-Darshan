import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Poppins } from 'next/font/google';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: 'Bharat Darshan',
  description: 'Explore the rich cultural, historical, and architectural heritage of India.',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
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
          poppins.variable
        )}
      >
        <FirebaseClientProvider>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
