import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const lates = await prisma.late.findMany({});
  res.json(lates);
}
