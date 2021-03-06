import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import Layout from '../../components/layout';
import Date from '../../components/date';
import styles from './lates.module.css';

function Lates({ lates }) {
  if (!lates) {
    return <Layout>Loading...</Layout>;
  }

  const latesRes = JSON.parse(lates);

  return (
    <Layout>
      <div className={styles['lates-list']}>
        <h1> Lates</h1>
        {latesRes.map((late) => {
          return (
            <div className={styles['lates-item']} key={late.id}>
              <div>
                <h1>
                  <Link href={`/lates/${late.id}`}>
                    <a>{late.title}</a>
                  </Link>
                </h1>
                <p>
                  — by {late.owner.name} on <Date dateString={late.createdAt} />
                </p>
                {late.tags.length != [] && (
                  <div className={styles.tags}>
                    <ul>
                      {late.tags.map((tag) => {
                        return (
                          <li key={tag.id}>
                            <Link href={`/tags/${tag.title}`}>
                              <a>{tag.title}</a>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <code>
                  <a href={late.url}> {late.url}</a>
                </code>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

// Unless we initialize prisma client here, the request fails?
// Module not found: Can't resolve 'async_hooks'
// Weird because this isn't the case in lates/[id].js component
// export const getStaticProps = async () => {
//   const prisma = new PrismaClient(); // @BUG
//   const res = await fetch(`${process.env.SITE}/api/lates`);
//   const data = await res.json();
//   return {
//     props: {
//       lates: data,
//       loading: false,
//       error: null,
//     },
//   };
// };
export const getStaticProps = async () => {
  const prisma = new PrismaClient();

  const latesResponse = await prisma.late.findMany({
    include: { owner: true, tags: true },
    orderBy: { createdAt: 'desc' },
  });

  const json = await JSON.stringify(latesResponse);

  return {
    props: { lates: json },
  };
};

export default Lates;
