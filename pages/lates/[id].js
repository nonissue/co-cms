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

  const lateResult = JSON.parse(late);

  return (
    <Layout>
      {lateResult?.url ? (
        <>
          <h1>Late</h1>
          <p>Title: {lateResult?.title}</p>
          <p>URL: {lateResult.url}</p>
          <p>User email: {lateResult.owner.email}</p>
        </>
      ) : (
        <div>Loading...</div>
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

// // use SWR here?
// export const getStaticProps = async (context) => {
//   // const res = await fetch(`${process.env.SITE}/api/lates/${context.params.id}`);
//   // const data = await res.json();

//   const late = await prisma.late.findOne({
//     where: { id: context.params.id - 0 },
//     include: { owner: true },
//   });
//   const lateJSON = await JSON.stringify(late);
//   return { props: { late: lateJSON, loading: false, error: null } };
// };
export const getStaticProps = async (context) => {
  const lateId = context.params.id - 0;
  let lateResponse;

  try {
    lateResponse = await prisma.late.findOne({
      where: {
        id: lateId,
      },
      include: { owner: true },
    });
  } catch (err) {
    throw new Error('Error: Error fetching late: ' + context.params.id);
  }

  let json;

  if (lateResponse) {
    json = await JSON.stringify(lateResponse);
  } else {
    return {
      props: { late: null, loading: false, error: context.params.id },
    };
  }

  return {
    props: { late: json, loading: false, error: false },
  };
};

export default Late;
