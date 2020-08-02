import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import AdminLayout from '../../components/admin-layout';
import Date from '../../components/date';
import styles from './feed.module.css';

function Lates({ lates }) {
  if (!lates) {
    return <Layout>Loading...</Layout>;
  }

  const latesRes = JSON.parse(lates);

  return (
    <AdminLayout>
      <div className={styles['lates-list']}>
        <h1> Lates</h1>
        {latesRes.map((late) => {
          {
            // console.log(late);
          }
          return (
            <div className={styles['lates-item']} key={late.id}>
              <div>
                <h1>
                  <Link href={`/admin/lates/${late.id}`}>
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
                            <Link href={`/admin/tags/${tag.title}`}>
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
    </AdminLayout>
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
export const getServerSideProps = async () => {
  const prisma = new PrismaClient();

  const latesResponse = await prisma.late.findMany({
    include: { owner: true, tags: true },
  });

  const json = await JSON.stringify(latesResponse);

  return {
    props: { lates: json },
  };
};

export default Lates;
