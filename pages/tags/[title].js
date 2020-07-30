import { PrismaClient } from '@prisma/client';
import Layout from '../../components/layout';
const prisma = new PrismaClient();

const Tag = ({ data, loading = true, error }) => {
  if (!data) {
    if (loading && !error) {
      return <Layout>Loading...</Layout>;
    }
    return (
      <Layout>
        <h1>Error: Late not found</h1>
        <br />
        <code>{error ? error : 'nope'}</code>
      </Layout>
    );
  }

  const { title, lates } = data;

  return (
    <Layout>
      <h3>Tag: {title}</h3>
      <ul>
        {lates.map((late) => {
          return <li key={late.id}>{late.url}</li>;
        })}
      </ul>
    </Layout>
  );
};

export async function getStaticPaths() {
  const allTags = await prisma.tag.findMany();

  const paths = allTags.map((tag) => `/tags/${tag.title}`);

  return {
    paths,
    fallback: false,
  };
}

// use SWR here?
export const getStaticProps = async (context) => {
  const res = await fetch(
    `${process.env.SITE}/api/tags/${context.params.title}`
  );
  const data = await res.json();
  return { props: { data, loading: false, error: null } };
};

export default Tag;
