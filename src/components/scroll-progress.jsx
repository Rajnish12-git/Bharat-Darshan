"use client";

import { useState, useEffect } from "react";

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  const handleScroll = () => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) {
      setWidth(0);
      return;
    }
    const progress = (window.scrollY / totalHeight) * 100;
    setWidth(progress);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-1">
      <div
        className="h-full bg-primary transition-all duration-150 ease-out"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}
