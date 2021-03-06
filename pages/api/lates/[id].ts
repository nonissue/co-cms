import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

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
    include: { owner: true, tags: true },
  });
  res.json(late);
}

// PUT? /api/late/:id
// Need to define a type which can be composed of any valid fields of late object
async function handlePUT(lateId: number, data: any, res: NextApiResponse) {
  // doesn't handle updating tags
  // look here: https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/relation-queries/#update-an-existing-user-record-by-updating-two-post-records-its-connected-to
  // https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/relation-queries#update-an-existing-user-record-by-disconnecting-any-previous-post-records-and-connect-two-other-exiting-ones
  // use set?
  // another url: https://github.com/prisma/prisma-client-js/issues/764
  // ah okay, so set does replace whatever tags already
  // could also be an issue with prisma 2.3, broke my /api/lates/create function as well
  // const tags = ['newtag', 'hardcoded'];
  const tags = data.body.tags || [];
  const late = await prisma.late.update({
    where: {
      id: Number(lateId),
    },
    include: {
      tags: true,
      owner: true,
    },
    data: {
      ...data,
      // tags: {
      //   set: [
      //     {
      //       title: 'dev',
      //     },
      //   ],
      // },
      tags: {
        connectOrCreate: tags.map((tag: string) => ({
          where: {
            title: tag,
          },
          create: {
            title: tag,
          },
        })),
      },
    },
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

export const config = {
  api: {
    externalResolver: true,
  },
};
