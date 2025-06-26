import React from "react";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Providers from "./Providers";
import dynamic from "next/dynamic";

const ScrollProgressBar = dynamic(
  () => import("../components/ScrollProgressBar"),
  { ssr: false }
);

export const metadata = {
  title: "CandleCommerce",
  description: "Premium candles for your home.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black">
      <body className="min-h-screen flex flex-col bg-black">
        <ScrollProgressBar />
        <Providers>
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 mb-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
