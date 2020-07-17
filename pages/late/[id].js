import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';

const Late = ({ late, loading = true, error }) => {
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
  console.log(late);

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
      ) : loading ? (
        <>'Loading...'</>
      ) : (
        <>Error: Late not found / Loading: {loading}</>
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
    // return { props: { late: null, loading: false } };
    throw new Error('Error: Error fetching late: ' + context.params.id);
  }

  let json;

  console.log(lateResponse);

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
