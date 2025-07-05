import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // Delete all existing products to prevent duplicates
  await prisma.product.deleteMany();

  const candles = [
    {
      name: "Vanilla Bean",
      description: "Warm and sweet vanilla scent with hints of caramel.",
      price: 1499, // $14.99
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
      stock: 10,
    },
    {
      name: "Lavender Calm",
      description: "Relaxing floral aroma perfect for meditation.",
      price: 1699, // $16.99
      imageUrl:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80",
      stock: 8,
    },
    {
      name: "Citrus Burst",
      description: "Bright and energizing citrus blend with lemon and orange.",
      price: 1399, // $13.99
      imageUrl:
        "https://images.unsplash.com/photo-1603006905008-e3b6c2b5c1c5?auto=format&fit=crop&w=600&q=80",
      stock: 12,
    },
    {
      name: "Cinnamon Spice",
      description: "Cozy spicy cinnamon scent with warm undertones.",
      price: 1599, // $15.99
      imageUrl:
        "https://images.unsplash.com/photo-1603006905008-e3b6c2b5c1c5?auto=format&fit=crop&w=600&q=80",
      stock: 7,
    },
    {
      name: "Ocean Breeze",
      description: "Fresh marine-inspired aroma with sea salt notes.",
      price: 1799, // $17.99
      imageUrl:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80",
      stock: 9,
    },
    {
      name: "Sage & Cedar",
      description: "Earthy and grounding blend of sage and cedarwood.",
      price: 1899, // $18.99
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
      stock: 6,
    },
    {
      name: "Rose Garden",
      description: "Romantic floral scent with fresh rose petals.",
      price: 1999, // $19.99
      imageUrl:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=600&q=80",
      stock: 11,
    },
    {
      name: "Amber & Musk",
      description: "Luxurious warm amber with sensual musk undertones.",
      price: 2199, // $21.99
      imageUrl:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
      stock: 5,
    },
  ];

  for (const candle of candles) {
    await prisma.product.create({ data: candle });
  }

  console.log("✅ Candle products seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
