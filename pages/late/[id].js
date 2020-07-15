import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';

const Late = ({ late, loading = true }) => {
  // const router = useRouter();
  // const { id } = router.query;

  // if (!late?.url || !loading) {
  //   return (
  //     <Layout>
  //       <h1>Error: Late not found</h1>
  //     </Layout>
  //   );
  // }

  // console.log('late from [id].js');
  // console.log(late);

  if (late === {}) {
    return <Layout>'Error: Late not found'</Layout>;
  }

  const lateResult = JSON.parse(late);

  // console.log(lateResult);

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
        'Error: Late not found'
      )}
    </Layout>
  );
};

export async function getStaticPaths() {
  return {
    // Only `/late/1` and `/late/2` are generated at build time
    paths: [{ params: { id: '1' } }],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: false,
  };
}

// move this to api call that fetches late
// then use SWR to call api?
export const getStaticProps = async (context) => {
  // const test = await getSession(context);
  const prisma = new PrismaClient();
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
    console.log(err);
    console.log("can't find that late");
    throw new Error('Error: Error fetching late: ' + context.query.id);
  }

  let json;

  console.log(lateResponse);

  if (lateResponse) {
    json = await JSON.stringify(lateResponse);
  } else {
    json = {};
  }

  return {
    props: { late: json, loading: false },
  };
};

export default Late;
