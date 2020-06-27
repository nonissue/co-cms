import { PrismaClient } from '@prisma/client';
import Layout from '../components/layout';

async function getUsers() {
  const allUsers = await prisma.user.findMany({ include: { lates: true } });

  console.dir(allUsers, { depth: null });
}

// Receives prisma users with lates
// parse them from json
// Map over the resulting users
function Users({ users }) {
  const userList = JSON.parse(users);
  const test = console.log(userList);

  return (
    <Layout>
      <h1> Users</h1>
      {userList.map((user) => {
        return (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <h4>{user.email}</h4>
            {console.log(user.lates)}
          </div>
        );
      })}
    </Layout>
  );
}

// Gets all users with static props
// Also fetches corresponding user posts
// Converts it to JSON before returning

// Does the returned array need to be json? Can we avoid converting it to JSON and then back?
export const getStaticProps = async () => {
  const prisma = new PrismaClient();
  const res = await prisma.user.findMany({ include: { lates: true } });
  const json = await JSON.stringify(res);

  return {
    props: { users: json },
  };
};

export default Users;
