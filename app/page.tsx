"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import ProductCard from "../components/ProductCard";
// Make sure to install framer-motion: npm install framer-motion
import { motion } from "framer-motion";
import GridBackground from "../components/GridBackground";
import { AppleCardsCarouselDemo } from "../components/ui/apple-cards-carousel";
import gsap from "gsap";
import AboutUsSection from "../components/AboutUsSection";
import FAQSection from "../components/FAQSection";
import { Spotlight } from "../components/Spotlight";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
    if (carouselRef.current) {
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, []);

  return (
    <GridBackground>
      {/* Spotlight background, covers hero and top of products */}
      <div className="pointer-events-none absolute left-0 top-0 w-full h-[900px] z-0">
        <Spotlight
          className="left-[35vw] top-0 -translate-y-[20%] w-[400vw] h-[220vh]"
          fill="#A259F7"
        />
      </div>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen w-full items-center justify-start bg-transparent overflow-hidden z-10 pt-0"
      >
        {/* Hero Content */}
        <div className="relative z-20 max-w-3xl text-left mx-auto md:ml-0 md:mr-auto pb-24">
          <h1 className="font-extrabold text-4xl md:text-6xl leading-tight mb-4 font-sans text-white">
            Discover <span className="text-purple">Premium Candles</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8">
            Hand-poured, eco-friendly, and designed to elevate your space.
          </p>
          <a
            href="#products"
            className="inline-block bg-purple text-white font-semibold px-8 py-3 rounded-full shadow hover:bg-charcoal hover:text-purple transition"
            onClick={(e) => {
              e.preventDefault();
              const section = document.getElementById("products");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Shop Now
          </a>
        </div>
      </section>
      {/* Product Grid Section */}
      <section
        ref={carouselRef}
        id="products"
        className="pt-4 pb-8 bg-transparent z-20 relative"
      >
        <AppleCardsCarouselDemo />

        <FAQSection />
      </section>
    </GridBackground>
  );
}
