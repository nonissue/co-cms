import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Default method to return all lates with owner & tags
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lates = await prisma.late.findMany({
    include: { owner: true, tags: true },
  });
  res.json(lates);
}
