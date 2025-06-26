"use client";
import React from "react";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
// Make sure to install framer-motion: npm install framer-motion
import { motion } from "framer-motion";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart.map((i) => ({
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        orderId: "demo-order-id", // Replace with real order logic
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.url) {
      clearCart();
      window.location.href = data.url;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-10">Your cart is empty.</div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {cart.map((item) => (
              <li key={item.id} className="flex items-center gap-4 py-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-zinc-500 text-sm">
                    ${(item.price / 100).toFixed(2)}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                      className="px-2 py-1 bg-zinc-200 dark:bg-zinc-700 rounded disabled:opacity-50"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-zinc-200 dark:bg-zinc-700 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 hover:underline text-xs"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-6">
            <div className="text-lg font-bold">Subtotal:</div>
            <div className="text-xl font-bold">
              ${(subtotal / 100).toFixed(2)}
            </div>
          </div>
          <button
            className="w-full mt-6 bg-primary text-white py-3 rounded text-lg font-semibold hover:bg-primary/80 transition disabled:opacity-50"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? "Redirecting..." : "Checkout"}
          </button>
        </div>
      )}
    </motion.div>
  );
}
