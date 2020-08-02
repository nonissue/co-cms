import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // workaround as query.title can be string or string[] but we only care about first item
  const tagTitle = req.query.title.toString();

  if (req.method === 'GET') {
    handleGET(tagTitle, res);
  } else if (req.method === 'DELETE') {
    handleDELETE(tagTitle, res);
  } else if (req.method === 'PUT') {
    handlePUT(tagTitle, req.body.data, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// GET /api/late/:id
async function handleGET(tagTitle: string, res: NextApiResponse) {
  const tag = await prisma.tag.findOne({
    where: { title: tagTitle },
    include: { lates: true },
  });

  res.status(200).json(tag);
}

// PUT? /api/late/:id
// Need to define a type which can be composed of any valid fields of late object
async function handlePUT(tagTitle: string, data: any, res: NextApiResponse) {
  const tag = await prisma.tag.update({
    where: { title: tagTitle },
    data: { ...data },
  });
  res.status(200).json(tag);
}

// DELETE /api/late/:id
async function handleDELETE(tagTitle: string, res: NextApiResponse) {
  const tag = await prisma.tag.delete({
    where: { title: tagTitle },
  });
  res.status(200).json(tag);
}

// Suppresses 'API resolved without sending a response' error
// https://github.com/vercel/next.js/issues/10439
export const config = {
  api: {
    externalResolver: true,
  },
};
