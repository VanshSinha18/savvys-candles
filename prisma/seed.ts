import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Delete all existing products to prevent duplicates
  await prisma.product.deleteMany();

  const candles = [
    {
      name: "Vanilla Bean",
      description: "Warm and sweet vanilla scent.",
      price: 1499, // $14.99
      imageUrl:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      stock: 10,
    },
    {
      name: "Lavender Calm",
      description: "Relaxing floral aroma.",
      price: 1699, // $16.99
      imageUrl:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
      stock: 8,
    },
    {
      name: "Citrus Burst",
      description: "Bright and energizing citrus blend.",
      price: 1399, // $13.99
      imageUrl:
        "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      stock: 12,
    },
    {
      name: "Cinnamon Spice",
      description: "Cozy spicy cinnamon scent.",
      price: 1599, // $15.99
      imageUrl:
        "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80",
      stock: 7,
    },
    {
      name: "Ocean Breeze",
      description: "Fresh marine-inspired aroma.",
      price: 1799, // $17.99
      imageUrl:
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80",
      stock: 9,
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
