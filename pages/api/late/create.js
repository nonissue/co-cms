import { PrismaClient } from '@prisma/client';

// I think if it's defined outside of scope of function, it can be cached?
const prisma = new PrismaClient();

export default async function create(req, res) {
  const { title, url, shared } = await req.body;

  // Add user auth verification

  let late;
  try {
    if (!url) {
      throw new Error('URL is required');
    }

    // if (!ref) {
    //   throw new Error("Error: Cannot create late. User isn't signed in.");
    // }

    try {
      late = await prisma.late.create({
        data: {
          title: title || 'untitled',
          url,
          owner: {
            connect: { email: 'andy@nonissue.org' },
          },
        },
      });
      console.log(late);
    } catch (error) {
      console.error('create-late error', error);
      throw new Error('¯_(ツ)_/¯');
    }

    // console.log(late);

    res.status(200).end();
  } catch (error) {
    console.log('error in outside try');
    console.log(error);
    res.status(400).send(error.message);
  }
}
