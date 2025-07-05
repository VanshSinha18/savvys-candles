"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCart } from "../context/CartContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Candle {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isBestSeller?: boolean;
}

interface CandleCardProps {
  candle: Candle;
  index: number;
}

function CandleCard({ candle, index }: CandleCardProps) {
  const [added, setAdded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
        }
      );
    }
  }, [index]);

  const handleAddToCart = () => {
    addToCart({
      id: candle.id,
      name: candle.name,
      price: candle.price,
      imageUrl: candle.imageUrl,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-800/50 hover:border-purple/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple/10"
    >
      {/* Best Seller Badge */}
      {candle.isBestSeller && (
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple to-purple/80 text-white shadow-lg">
            Best Seller
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={candle.imageUrl}
          alt={candle.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Name */}
        <h3 className="font-sans font-bold text-xl text-white mb-2 group-hover:text-purple transition-colors duration-300">
          {candle.name}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 text-sm mb-4 h-10 overflow-hidden leading-relaxed">
          {candle.description}
        </p>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <span className="font-sans font-bold text-2xl text-purple">
            ${(candle.price / 100).toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={added}
            className="px-6 py-2.5 bg-purple text-white font-semibold rounded-full hover:bg-purple/90 hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-purple/25"
          >
            {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple/0 via-purple/5 to-purple/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}

export default function CandleGrid() {
  const [products, setProducts] = useState<Candle[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        // Add best seller badge to first two products
        const productsWithBadges = data.map(
          (product: Candle, index: number) => ({
            ...product,
            isBestSeller: index < 2,
          })
        );
        setProducts(productsWithBadges);
      })
      .finally(() => setLoading(false));
  }, []);

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

  if (loading) {
    return (
      <div className="w-full py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white font-sans mb-12">
            Our Candles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-zinc-900/50 rounded-2xl h-96 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white font-sans mb-4">
            Our Candles
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Hand-poured with premium ingredients, each candle is crafted to
            bring warmth and comfort to your space.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((candle, index) => (
            <CandleCard key={candle.id} candle={candle} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-3 bg-purple text-white font-semibold rounded-full hover:bg-purple/90 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple/25">
            View All Candles
            <svg
              className="ml-2 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
