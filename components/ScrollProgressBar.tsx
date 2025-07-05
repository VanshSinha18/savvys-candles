"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ScrollProgressBar() {
  const progressRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const setIdle = () => {
      gsap.to(progressRef.current, {
        background: "#18181b", // match bg-zinc-900 or bg-black
        boxShadow: "none",
        duration: 0.5,
      });
    };
    const setActive = () => {
      gsap.to(progressRef.current, {
        background: "#A259F7",
        boxShadow: "0 0 16px 4px #A259F7, 0 0 32px 8px #A259F7AA",
        duration: 0.2,
      });
    };
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      gsap.to(progressRef.current, {
        height: `${progress * 100}%`,
        duration: 0.2,
        ease: "power2.out",
      });
      setActive();
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(setIdle, 600);
    };
    setIdle();
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed left-0 top-0 h-full w-0.5 z-[9999] bg-transparent pointer-events-none"
    >
      <div
        ref={progressRef}
        className="absolute left-0 top-0 w-full rounded-full"
        style={{ height: 0, background: "#18181b" }}
      />
    </div>
  );
}
