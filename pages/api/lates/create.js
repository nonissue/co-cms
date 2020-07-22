import { PrismaClient } from '@prisma/client';
// import { getSession } from 'next-auth/client';

// I think if it's defined outside of scope of function, it can be cached?
const prisma = new PrismaClient();

export default async function create(req, res) {
  const { title, url, shared, user, tags } = await req.body;

  console.log(req.body);

  // const test = await getSession({ req });
  // const {sesh = await fetch('http://localhost:3000/api/auth/session');
  // console.log(sesh);
  // console.log(test);
  // console.log(req);

  // Add user auth verification

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
