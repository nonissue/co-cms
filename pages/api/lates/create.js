import { PrismaClient } from '@prisma/client';
// import { getSession } from 'next-auth/client';

// I think if it's defined outside of scope of function, it can be cached?
const prisma = new PrismaClient();

/*
title: string
url: string
shared: boolean
user: object
tags: String[]
*/
export default async function create(req, res) {
  const { title, url, shared, user, tags } = await req.body;

  let late;
  try {
    if (!user || !user.email) {
      throw new Error('User is required');
    }
    if (!url) {
      throw new Error('URL is required');
    }

    // make sure tag isn't empty space before creating? As that breaks routing
    try {
      late = await prisma.late.create({
        data: {
          title: title || 'untitled',
          url,
          shared,
          tags: {
            connectOrCreate: tags.map((tag) => ({
              where: {
                title: tag,
              },
              create: {
                title: tag,
              },
            })),
          },
          owner: {
            connect: { email: user.email },
          },
        },
      });
      console.log(late);
    } catch (err) {
      console.err('create-late error', err);
      throw new Error('Other error');
    }

    // console.log(late);

    res.status(200).end();
  } catch (err) {
    res.status(400).send(err.message);
  }
}
