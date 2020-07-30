import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lateId = Number(req.query.id);

  if (req.method === 'GET') {
    handleGET(lateId, res);
  } else if (req.method === 'DELETE') {
    handleDELETE(lateId, res);
  } else if (req.method === 'PUT') {
    handlePUT(lateId, req.body.data, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// GET /api/late/:id
async function handleGET(lateId: number, res: NextApiResponse) {
  const late = await prisma.late.findOne({
    where: { id: Number(lateId) },
    include: { owner: true },
  });
  res.json(late);
}

// PUT? /api/late/:id
// Need to define a type which can be composed of any valid fields of late object
async function handlePUT(lateId: number, data: any, res: NextApiResponse) {
  const late = await prisma.late.update({
    where: { id: Number(lateId) },
    data: { ...data },
  });
  res.json(late);
}

// DELETE /api/late/:id
async function handleDELETE(lateId: number, res: NextApiResponse) {
  const late = await prisma.late.delete({
    where: { id: Number(lateId) },
  });
  res.json(late);
}
