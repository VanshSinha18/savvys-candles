"use client";
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "What makes Savvy's Candles special?",
    a: "Each candle is hand-poured with premium, natural ingredients and crafted for a long, clean burn. We focus on sustainability and unique, comforting scents.",
  },
  {
    q: "How long do your candles burn?",
    a: "Our candles typically burn for 40-60 hours, depending on the size and care.",
  },
  {
    q: "Do you offer international shipping?",
    a: "Yes! We ship worldwide. Shipping costs and times are calculated at checkout.",
  },
  {
    q: "How can I make my candle last longer?",
    a: "Trim the wick to 1/4 inch before each burn and let the wax melt to the edge of the jar on the first use.",
  },
  {
    q: "Are your candles vegan and cruelty-free?",
    a: "Absolutely! All our candles are vegan, cruelty-free, and made with ethically sourced ingredients.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <div ref={sectionRef} className="max-w-4xl my-20 px-4 w-full pl-4">
      <h2 className="text-3xl md:text-5xl font-bold font-sans text-white mb-8 text-left">
        FAQ
      </h2>
      <div className="space-y-4">
        {FAQS.map((item, i) => (
          <div
            key={i}
            className="bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 overflow-hidden w-full"
          >
            <button
              className="w-full text-left px-8 py-6 focus:outline-none flex justify-between items-center text-lg md:text-xl font-semibold text-white hover:text-gold transition-colors font-sans"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              {item.q}
              <span
                className={`ml-4 flex items-center justify-center w-7 h-7 rounded-full border border-gold text-gold bg-zinc-950 transition-transform duration-300 ${
                  open === i ? "rotate-45" : "rotate-0"
                }`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="8"
                    y="3"
                    width="2"
                    height="12"
                    rx="1"
                    fill="currentColor"
                  />
                  <rect
                    x="3"
                    y="8"
                    width="12"
                    height="2"
                    rx="1"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </button>
            <div
              className={`px-8 pb-6 text-zinc-300 text-base md:text-lg transition-all duration-300 ${
                open === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
              style={{ overflow: "hidden" }}
            >
              {item.a}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
