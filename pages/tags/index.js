import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import Layout from '../../components/layout';
import styles from './tags.module.css';

const Tags = ({ tags }) => {
  if (!tags) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <div className={styles['wrapper']}>
        <h1>Tags</h1>
        <ul>
          {tags.map((tag) => {
            return (
              <li key={tag.id}>
                <Link href={`tags/${tag.title}`}>
                  <a>{tag.title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

// Unless we initialize prisma client here, the request fails?
// Module not found: Can't resolve 'async_hooks'
// Weird because this isn't the case in lates/[id].js component
export const getStaticProps = async () => {
  const prisma = new PrismaClient(); // @BUG
  const res = await fetch(`http://localhost:3000/api/tags`);
  const data = await res.json();
  return {
    props: {
      tags: data,
      loading: false,
      error: null,
    },
  };
};

export default Tags;
