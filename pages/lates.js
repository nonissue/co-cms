import { PrismaClient } from '@prisma/client';
import { useSession, getSession } from 'next-auth/client';
import Layout from '../components/layout';
import styles from './lates.module.css';

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
              <div className={styles['lates-item']} key={late.id}>
                <div>
                  <h1>{late.title}</h1>
                  <p>&nbsp;&nbsp;— by {late.owner.name}</p>
                </div>
                <div>
                  <code>{late.url}</code>
                </div>
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
// Also, doesn't get rerendered on change online
// export const getStaticProps = async () => {
//   const prisma = new PrismaClient();
//   const res = await prisma.late.findMany({ include: { owner: true } });
//   const json = await JSON.stringify(res);

//   return {
//     props: { lates: json },
//   };
// };xres

export const getStaticProps = async (context) => {
  // const test = await getSession(context);

  // console.log(context);

  const prisma = new PrismaClient();

  const latesResponse = await prisma.late.findMany({
    include: { owner: true },
  });

  const json = await JSON.stringify(latesResponse);

  return {
    props: { lates: json },
  };
};

export default Lates;
