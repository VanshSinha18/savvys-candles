"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { FiSun, FiMoon } from "react-icons/fi";

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setMounted(true);
    // On mount, check localStorage or system preference
    const saved =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else {
      // Auto-detect system
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  };

  if (!mounted) return null;
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="text-xl text-purple hover:text-white transition-colors p-2 rounded-full border border-transparent hover:border-purple bg-transparent focus:outline-none"
    >
      {theme === "dark" ? <FiSun /> : <FiMoon />}
    </button>
  );
}

export default function Navbar() {
  const { cartCount } = useCart();
  return (
    <nav className="w-full bg-black/90 dark:bg-white/90 backdrop-blur border-b border-zinc-800 dark:border-zinc-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="font-michroma text-3xl font-bold tracking-tight text-purple drop-shadow-sm"
          style={{ letterSpacing: "0.04em" }}
        >
          Savvy's Candles
        </Link>
        {/* Nav Links */}
        <div className="hidden md:flex gap-8 text-base font-medium">
          <Link
            href="/"
            className="hover:text-purple transition text-black dark:text-white"
          >
            Home
          </Link>
          <a
            href="/#products"
            className="hover:text-purple transition text-black dark:text-white cursor-pointer"
          >
            Products
          </a>
          <Link
            href="/about"
            className="hover:text-purple transition text-black dark:text-white"
          >
            About
          </Link>
        </div>
        {/* Icons */}
        <div className="flex items-center gap-6">
          <ThemeToggle />
          <Link
            href="/cart"
            className="relative text-xl hover:text-purple transition text-black dark:text-white"
            aria-label="Cart"
          >
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple text-white text-xs rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            href="/profile"
            className="text-xl hover:text-purple transition text-black dark:text-white"
            aria-label="Profile"
          >
            <FaUser />
          </Link>
        </div>
      </div>
    </nav>
  );
}
