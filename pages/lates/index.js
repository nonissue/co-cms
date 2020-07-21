import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import Layout from '../../components/layout';
import styles from './lates.module.css';

function Lates({ lates }) {
  if (!lates) {
    return <Layout>Loading...</Layout>;
  }

  const latesList = JSON.parse(lates);

  return (
    <Layout>
      <>
        <h1> Lates</h1>
        {latesList.map((late) => {
          return (
            <div className={styles['lates-item']} key={late.id}>
              <div>
                <h1>
                  <Link href={`/late/${late.id}`}>
                    <a>{late.title}</a>
                  </Link>
                </h1>
                <p>
                  — by {late.owner.name} on {late.createdAt}
                </p>
              </div>
              <div>
                <code>{late.url}</code>
              </div>
            </div>
          );
        })}
      </>
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

export const getStaticProps = async () => {
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
