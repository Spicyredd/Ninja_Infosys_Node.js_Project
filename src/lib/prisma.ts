// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// This is a way to prevent creating multiple instances of PrismaClient in development
// due to hot-reloading. TypeScript requires us to declare the global variable.
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({
  log: ['query'],
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;