"use client";
import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-24 pb-16 px-4 bg-transparent">
      <div className="max-w-3xl w-full text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold font-dancing text-gold mb-4">
          About Savvy's Candles
        </h1>
        <p className="text-lg md:text-2xl text-zinc-200 mb-6">
          At{" "}
          <span className="font-dancing text-gold text-2xl">
            Savvy's Candles
          </span>
          , we believe in the magic of light and scent. Our journey began with a
          passion for creating warmth, comfort, and a touch of luxury in every
          home. Each candle is hand-poured with love, using only the finest
          natural ingredients and sustainable practices. We are dedicated to
          bringing you unique fragrances and a cozy glow, while caring for the
          earth and our community.
        </p>
      </div>
      <div className="w-full flex flex-col md:flex-row items-center gap-10 max-w-4xl mx-auto">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="Candle and cozy scene"
          className="rounded-3xl shadow-xl w-full md:w-1/2 h-[320px] object-cover"
        />
        <div className="flex-1 text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-gold mb-4 font-heading">
            Our Story
          </h2>
          <p className="text-zinc-200 text-lg md:text-xl leading-relaxed">
            What started as a small kitchen experiment has grown into a beloved
            brand, trusted by candle lovers everywhere. We are inspired by
            nature, memories, and the joy of sharing light. Thank you for
            letting us be a part of your story—one candle at a time.
          </p>
        </div>
      </div>
    </div>
  );
}
