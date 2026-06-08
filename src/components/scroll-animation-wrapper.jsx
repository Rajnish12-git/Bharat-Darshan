"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const animationStyles = {
  slideInFromLeft: {
    initial: "opacity-0 -translate-x-8",
    final: "opacity-100 translate-x-0",
  },
  slideInFromRight: {
    initial: "opacity-0 translate-x-8",
    final: "opacity-100 translate-x-0",
  },
  fadeInUp: {
    initial: "opacity-0 translate-y-8",
    final: "opacity-100 translate-y-0",
  },
};

export default function ScrollAnimationWrapper({
  children,
  className,
  animation = "fadeInUp",
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const styles = animationStyles[animation];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px",
        threshold: 0.1,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? styles.final : styles.initial,
        className,
      )}
    >
      {children}
    </div>
  );
}
