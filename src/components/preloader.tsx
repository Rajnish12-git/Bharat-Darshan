'use client';

import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Preloader() {
  const loaderImages = [
    'hero-taj-mahal',
    'hero-hampi',
    'hero-golden-temple',
    'hero-konark-sun-temple',
    'state-rajasthan',
    'hero-qutub-minar',
  ].map(id => PlaceHolderImages.find(img => img.id === id)?.imageUrl);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500">
      <div className="scene h-[120px] w-[120px]">
        <div className="cube">
          <div
            className="cube-face cube-face-front"
            style={{ backgroundImage: `url(${loaderImages[0]})` }}
          />
          <div
            className="cube-face cube-face-back"
            style={{ backgroundImage: `url(${loaderImages[1]})` }}
          />
          <div
            className="cube-face cube-face-right"
            style={{ backgroundImage: `url(${loaderImages[2]})` }}
          />
          <div
            className="cube-face cube-face-left"
            style={{ backgroundImage: `url(${loaderImages[3]})` }}
          />
          <div
            className="cube-face cube-face-top"
            style={{ backgroundImage: `url(${loaderImages[4]})` }}
          />
          <div
            className="cube-face cube-face-bottom"
            style={{ backgroundImage: `url(${loaderImages[5]})` }}
          />
        </div>
      </div>
      <p className="mt-8 text-lg text-primary font-semibold animate-pulse">
        Unveiling the Heritage of India...
      </p>
    </div>
  );
}
