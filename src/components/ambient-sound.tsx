'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Automatically disable on mobile devices
    if (isMobile) {
      setIsPlaying(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          // Autoplay is often blocked by browsers, user interaction is required.
          console.error("Audio play failed:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);
  
  if (isMobile) {
      return null;
  }

  const togglePlay = () => {
    // On first user interaction, load the audio to prevent unnecessary initial load
    if (audioRef.current && !audioRef.current.src) {
        audioRef.current.src = '/sounds/tanpura-drone.mp3';
        audioRef.current.load();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <audio ref={audioRef} loop>
        <source src="/sounds/tanpura-drone.mp3" type="audio/mpeg" />
      </audio>
      <Button
        variant="ghost"
        size="icon"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause ambient sound' : 'Play ambient sound'}
        className="text-muted-foreground hover:text-foreground"
      >
        {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </Button>
    </div>
  );
}
