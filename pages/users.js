import { PrismaClient } from '@prisma/client';
import { useSession, getSession } from 'next-auth/client';
import Layout from '../components/layout';

// Receives prisma users with lates
// parse them from json
// Map over the resulting users
function Users({ users }) {
  const [session, loading] = useSession();
  const userList = JSON.parse(users);

  return (
    <Layout>
      {!session && !loading ? (
        <h1>Please sign in!</h1>
      ) : (
        <>
          <h1> Users</h1>
          {userList.map((user) => {
            return (
              <div key={user.id}>
                <h3>{user.name}</h3>
                <h4>{user.email}</h4>
              </div>
            );
          })}
        </>
      )}
    </Layout>
  );
}

// Gets all users with static props
// Also fetches corresponding user posts
// Converts it to JSON before returning

// Does the returned array need to be json? Can we avoid converting it to JSON and then back?
export const getStaticProps = async () => {
  // const [session, loading] = useSession();
  // const user = await getSession(context);
  const prisma = new PrismaClient();
  const res = await prisma.user.findMany({ include: { lates: true } });
  const json = await JSON.stringify(res);

  return {
    props: { users: json },
  };
};

export default Users;
