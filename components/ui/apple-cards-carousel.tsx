"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCart } from "../../context/CartContext";
gsap.registerPlugin(ScrollTrigger);

export function Carousel({ items }: { items: React.ReactNode[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const localRefs = useRef([]) as React.MutableRefObject<
    (HTMLDivElement | null)[]
  >;
  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    localRefs.current[i] = el;
  };

  useEffect(() => {
    if (localRefs.current.length > 0) {
      gsap.fromTo(
        localRefs.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: scrollRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, [items]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.8; // Scroll by 80% of visible area
    if (direction === "left") {
      scrollRef.current.scrollTo({
        left: scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    } else {
      scrollRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full">
      <div
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto py-8 px-2 scroll-smooth hide-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {React.Children.map(items, (child, i) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<any>, {
                cardRef: setCardRef(i),
              })
            : child
        )}
      </div>
      {/* Arrow controls */}
      <div className="absolute right-8 -bottom-8 flex gap-3 z-20">
        <button
          aria-label="Scroll left"
          onClick={() => scroll("left")}
          className="rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white w-10 h-10 flex items-center justify-center shadow-lg border border-zinc-700 transition-colors"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          aria-label="Scroll right"
          onClick={() => scroll("right")}
          className="rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-white w-10 h-10 flex items-center justify-center shadow-lg border border-zinc-700 transition-colors"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function Card({
  card,
  index,
  cardRef,
}: {
  card: any;
  index: number;
  cardRef?: (el: HTMLDivElement | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const cardDivRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const el = cardDivRef.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = ((x - centerX) / centerX) * 10;
      const rotateX = -((y - centerY) / centerY) * 10;
      gsap.to(el, {
        rotateY,
        rotateX,
        scale: 1.04,
        duration: 0.3,
        ease: "power2.out",
      });
    };
    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (cardRef) cardRef(cardDivRef.current);
  }, [cardRef]);

  return (
    <>
      <div
        ref={cardDivRef}
        className="relative min-w-[370px] max-w-[370px] aspect-[9/16] bg-zinc-900 rounded-[2rem] shadow-lg hover:shadow-xl transition-shadow duration-300 border border-zinc-800 flex flex-col overflow-hidden cursor-pointer group"
        onClick={() => setOpen(true)}
        style={{ height: "600px" }}
      >
        {/* Image with overlay */}
        <img
          src={card.src}
          alt={card.title}
          className="w-full h-full object-cover rounded-[2rem] absolute inset-0"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-[2rem]" />
        {/* Text overlay (top-left) */}
        <div className="absolute top-0 left-0 p-6 z-10 w-full">
          <span className="block text-xs md:text-sm uppercase tracking-wider text-purple font-semibold mb-2 font-sans drop-shadow">
            {card.category}
          </span>
          <h3 className="font-sans font-extrabold text-white text-2xl md:text-3xl leading-tight drop-shadow mb-0">
            {card.title}
          </h3>
        </div>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative bg-zinc-900 rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-4 flex flex-col items-center">
            <button
              className="absolute top-4 right-4 text-2xl text-zinc-400 hover:text-white"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="w-full flex flex-col items-center">
              <h3 className="font-heading text-2xl font-bold text-white mb-4 text-center">
                {card.title}
              </h3>
              <div className="text-zinc-300 text-lg mb-6 text-center w-full">
                {card.content}
              </div>
              <img
                src={card.src}
                alt={card.title}
                className="w-full max-w-md object-contain rounded-xl mb-6"
              />
              <button
                className="mt-4 px-8 py-3 rounded-full bg-purple text-white font-bold text-lg shadow hover:bg-purple/90 transition disabled:opacity-60"
                onClick={() => {
                  addToCart({
                    id: card.id,
                    name: card.title,
                    price: card.price,
                    imageUrl: card.src,
                    quantity: 1,
                  });
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1500);
                }}
                disabled={added}
              >
                {added ? "Added!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DummyContent() {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => (
        <div
          key={"dummy-content" + index}
          className="bg-transparent p-0 md:p-0 rounded-3xl mb-0"
        >
          <p className="text-zinc-100 text-lg md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-white">
              The first rule of Apple club is that you boast about Apple club.
            </span>{" "}
            Keep a journal, quickly jot down a grocery list, and take amazing
            class notes. Want to convert those notes to text? No problem.
            Langotiya jeetu ka mara hua yaar is ready to capture every thought.
          </p>
        </div>
      ))}
    </>
  );
}

export function AppleCardsCarouselDemo() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  const cards = products.map((product, index) => (
    <Card
      key={product.id}
      card={{
        id: product.id,
        category: "Candle",
        title: product.name,
        src: product.imageUrl,
        price: product.price,
        content: (
          <div className="text-zinc-100 text-lg md:text-2xl font-sans max-w-3xl mx-auto text-center">
            <span className="font-bold text-white block mb-2">
              {product.name}
            </span>
            <span className="block mb-2">{product.description}</span>
            <span className="text-purple font-semibold text-xl">
              ${(product.price / 100).toFixed(2)}
            </span>
          </div>
        ),
      }}
      index={index}
    />
  ));

  const data = [
    {
      category: "Candle",
      title: "Vanilla Bean",
      src: "/candles/candle1.jpg",
      content: <DummyContent />,
    },
    {
      category: "Candle",
      title: "Lavender Calm",
      src: "/candles/candle2.jpg",
      content: <DummyContent />,
    },
    {
      category: "Candle",
      title: "Citrus Burst",
      src: "/candles/candle3.jpg",
      content: <DummyContent />,
    },
  ];

  return (
    <div className="w-full h-full py-20 mt-12">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-white font-sans">
        Our Candles
      </h2>
      {loading ? (
        <div className="text-center text-white/80 py-12 text-xl">
          Loading...
        </div>
      ) : (
        <Carousel items={cards} />
      )}
    </div>
  );
}
