"use client";
import Link from "next/link";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();
  return (
    <nav className="w-full bg-black/90 backdrop-blur border-b border-zinc-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="font-dancing text-3xl font-bold tracking-tight text-purple drop-shadow-sm"
          style={{ letterSpacing: "0.04em" }}
        >
          Savvy's Candles
        </Link>
        {/* Nav Links */}
        <div className="hidden md:flex gap-8 text-base font-medium">
          <Link href="/" className="hover:text-purple transition text-white">
            Home
          </Link>
          <a
            href="/#products"
            className="hover:text-purple transition text-white cursor-pointer"
          >
            Products
          </a>
          <Link
            href="/about"
            className="hover:text-purple transition text-white"
          >
            About
          </Link>
        </div>
        {/* Icons */}
        <div className="flex items-center gap-6">
          <Link
            href="/cart"
            className="relative text-xl hover:text-purple transition text-white"
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
            className="text-xl hover:text-purple transition text-white"
            aria-label="Profile"
          >
            <FaUser />
          </Link>
        </div>
      </div>
    </nav>
  );
}
