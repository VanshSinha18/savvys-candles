// app/api/products/route.ts
// Provides API endpoints to get all products (GET) and create a new product (POST).
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  return NextResponse.json([
    {
      id: "1",
      name: "Vanilla Bean",
      description: "Warm and sweet vanilla scent.",
      price: 1499, // $14.99
      imageUrl:
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1000&q=80",
      stock: 10,
    },
    {
      id: "2",
      name: "Lavender Calm",
      description: "Relaxing floral aroma.",
      price: 1699, // $16.99
      imageUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
      stock: 8,
    },
    {
      id: "3",
      name: "Citrus Burst",
      description: "Bright and energizing citrus blend.",
      price: 1399, // $13.99
      imageUrl:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1000&q=80",
      stock: 12,
    },
    {
      id: "4",
      name: "Cinnamon Spice",
      description: "Cozy spicy cinnamon scent.",
      price: 1599, // $15.99
      imageUrl:
        "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1000&q=80",
      stock: 7,
    },
    {
      id: "5",
      name: "Ocean Breeze",
      description: "Fresh marine-inspired aroma.",
      price: 1799, // $17.99
      imageUrl:
        "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=1000&q=80",
      stock: 9,
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
