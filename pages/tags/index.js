import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import Layout from '../../components/layout';

const Tags = ({ tags }) => {
  if (!tags) {
    return <Layout>Loading...</Layout>;
  }

  const tagsList = JSON.parse(tags);

  return (
    <Layout>
      <h1>Tags</h1>
      <ul>
        {tagsList.map((tag) => {
          return (
            <li key={tag.id}>
              <Link href={`tags/${tag.title}`}>
                <a>Tag: {tag.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const prisma = new PrismaClient();

  const tagsWithLates = await prisma.tag.findMany({
    include: { lates: true },
  });

  const json = await JSON.stringify(tagsWithLates);

  return {
    props: { tags: json },
  };
};

export default Tags;
