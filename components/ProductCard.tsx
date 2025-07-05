import React from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  imageUrl,
}: ProductCardProps) {
  const { addToCart } = useCart();
  return (
    <div className="bg-zinc-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-0 flex flex-col overflow-hidden border border-zinc-800">
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 flex flex-col px-6 py-5">
        <h2 className="font-heading text-xl font-bold text-white mb-1 group-hover:text-purple transition-colors">
          {name}
        </h2>
        <p className="text-zinc-400 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-bold text-purple text-lg">
            ${(price / 100).toFixed(2)}
          </span>
          <button
            className="bg-purple text-white font-medium px-4 py-2 rounded-full shadow hover:bg-black hover:text-purple transition-colors duration-200"
            onClick={() =>
              addToCart({ id, name, price, imageUrl, quantity: 1 })
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
