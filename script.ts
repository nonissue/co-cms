import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// A `main` function so that you can use async/await
async function main() {
  // const tag = await prisma.tag.create({
  //   data: {
  //     title: 'First Late!',
  //     late: {
  //       connect: { email: 'sarah@prisma.io' },
  //     },
  //   },
  // });
  // console.log(post);

  await getTags();
  await getLates();
  await getUsers();
}

async function getTags() {
  const allTags = await prisma.tag.findMany({
    include: { lates: { include: { author: true } } },
  });

  console.dir(allTags, { depth: null });
}

async function getLates() {
  const allLates = await prisma.late.findMany({
    include: { author: true, tags: { select: { title: true } } },
  });

  console.dir(allLates, { depth: null });
}

async function getUsers() {
  const allUsers = await prisma.user.findMany({});

  console.dir(allUsers, { depth: null });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.disconnect();
  });
