"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ScrollProgressBar() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      gsap.to(progressRef.current, {
        width: `${progress * 100}%`,
        duration: 0.2,
        ease: "power2.out",
      });
    };
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[9999] bg-transparent">
      <div
        ref={progressRef}
        className="h-full bg-gold transition-all"
        style={{ width: 0 }}
      />
    </div>
  );
}
