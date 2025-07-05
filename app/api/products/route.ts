// app/api/products/route.ts
// Provides API endpoints to get all products (GET) and create a new product (POST).
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  return NextResponse.json([
    {
      id: "1",
      name: "Vanilla Bean",
      description: "Warm and sweet vanilla scent with hints of caramel.",
      price: 1499, // $14.99
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
      stock: 10,
    },
    {
      id: "2",
      name: "Lavender Calm",
      description: "Relaxing floral aroma perfect for meditation.",
      price: 1699, // $16.99
      imageUrl:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80",
      stock: 8,
    },
    {
      id: "3",
      name: "Citrus Burst",
      description: "Bright and energizing citrus blend with lemon and orange.",
      price: 1399, // $13.99
      imageUrl:
        "https://images.unsplash.com/photo-1603006905008-e3b6c2b5c1c5?auto=format&fit=crop&w=600&q=80",
      stock: 12,
    },
    {
      id: "4",
      name: "Cinnamon Spice",
      description: "Cozy spicy cinnamon scent with warm undertones.",
      price: 1599, // $15.99
      imageUrl:
        "https://images.unsplash.com/photo-1603006905008-e3b6c2b5c1c5?auto=format&fit=crop&w=600&q=80",
      stock: 7,
    },
    {
      id: "5",
      name: "Ocean Breeze",
      description: "Fresh marine-inspired aroma with sea salt notes.",
      price: 1799, // $17.99
      imageUrl:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80",
      stock: 9,
    },
    {
      id: "6",
      name: "Sage & Cedar",
      description: "Earthy and grounding blend of sage and cedarwood.",
      price: 1899, // $18.99
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
      stock: 6,
    },
    {
      id: "7",
      name: "Rose Garden",
      description: "Romantic floral scent with fresh rose petals.",
      price: 1999, // $19.99
      imageUrl:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80",
      stock: 11,
    },
    {
      id: "8",
      name: "Amber & Musk",
      description: "Luxurious warm amber with sensual musk undertones.",
      price: 2199, // $21.99
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
      stock: 5,
    },
  ]);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { name, description, price, imageUrl, stock } = data;
  if (!name || !description || !price || !imageUrl || stock == null) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const product = await prisma.product.create({
    data: { name, description, price, imageUrl, stock },
  });
  return NextResponse.json(product, { status: 201 });
}
