// app/api/products/route.ts
// Provides API endpoints to get all products (GET) and create a new product (POST).
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
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
