import { PrismaClient } from '@prisma/client';
import { useSession } from 'next-auth/client';
import Layout from '../components/layout';

// async function getLates() {
//   const allLates = await prisma.late.findMany({ include: { lates: true } });

//   console.dir(allLates, { depth: null });
// }

// Receives prisma users with lates
// parse them from json
// Map over the resulting users
function Lates({ lates }) {
  const [session, loading] = useSession();
  const latesList = JSON.parse(lates);

  return (
    <Layout>
      {!session && !loading ? (
        <h1>Please sign in!</h1>
      ) : (
        <>
          <h1> Lates</h1>
          {latesList.map((late) => {
            return (
              <div key={late.id}>
                <h3>{late.title}</h3>
                <h5>by {late.owner.name}</h5>
                <code>{late.url}</code>
                {console.log(late.lates)}
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
  const prisma = new PrismaClient();
  const res = await prisma.late.findMany({ include: { owner: true } });
  const json = await JSON.stringify(res);

  return {
    props: { lates: json },
  };
};

export default Lates;
