import { PrismaClient } from '@prisma/client';

async function getUsers() {
  const allUsers = await prisma.user.findMany({});

  console.dir(allUsers, { depth: null });
}

function Users({ users }) {
  console.log(users);
  return <div>Users</div>;
}

// export async function getStaticProps() {
//   const res = await await prisma.user.findMany({});
//   const json = await res.json();

//   console.log(json);

//   return {
//     props: {
//       users: json,
//     },
//   };
// }

// export const getServerSideProps = async () => {
//   const prisma = new PrismaClient();
//   const res = await prisma.user.findMany({});
//   const json = JSON.stringify(res);
//   // const feed = await res.json();
//   return {
//     props: { users: json },
//   };
// };

export const getStaticProps = async () => {
  const prisma = new PrismaClient();
  const res = await prisma.user.findMany({});
  const json = JSON.stringify(res);
  // const feed = await res.json();
  return {
    props: { users: json },
  };
};

export default Users;
