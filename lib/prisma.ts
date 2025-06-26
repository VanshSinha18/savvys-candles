// lib/prisma.ts
// Sets up and exports a singleton Prisma client for database access using Prisma ORM.
// Ensures only one PrismaClient instance is used across hot reloads in development.
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
