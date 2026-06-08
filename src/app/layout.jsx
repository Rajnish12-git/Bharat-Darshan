import { Literata } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";
import ScrollProgress from "@/components/scroll-progress";

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "Bharat Darshan",
  description:
    "Explore the rich cultural, historical, and architectural heritage of India.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          literata.variable,
        )}
      >
        <Providers>
          <ScrollProgress />
          <div className="relative flex min-h-dvh flex-col bg-background">
            {children}
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
