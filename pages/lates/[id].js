import { PrismaClient } from '@prisma/client';
import Layout from '../../components/layout';
const prisma = new PrismaClient();

const Late = ({ late, loading = true, error }) => {
  if (!late) {
    if (loading) {
      return <Layout>Loading...</Layout>;
    }
    return (
      <Layout>
        <h1>Error: Late not found</h1>
        <br />
        <code>Requested id: {error ? error : 'nope'}</code>
      </Layout>
    );
  }

  return (
    <Layout>
      {late?.url ? (
        <>
          <h1>Late</h1>
          <p>Title: {late?.title}</p>
          <p>URL: {late.url}</p>
          <p>User email: {late.owner.email}</p>
        </>
      ) : loading ? (
        <>'Loading...'</>
      ) : (
        <>Error: Late not found / Loading: {loading}</>
      )}
    </Layout>
  );
};

export async function getStaticPaths() {
  const allLates = await prisma.late.findMany({
    include: { owner: true },
  });

  const paths = allLates.map((late) => `/lates/${late.id}`);

  return {
    paths,
    fallback: false,
  };
}

// use SWR here?
export const getStaticProps = async (context) => {
  const res = await fetch(`${process.env.SITE}/api/lates/${context.params.id}`);
  const data = await res.json();
  return { props: { late: data, loading: false, error: null } };
};

export default Late;
