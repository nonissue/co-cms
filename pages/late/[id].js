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

  const lateResult = JSON.parse(late);
  // console.log(lateResult);

  return (
    <Layout>
      {lateResult?.url ? (
        <>
          <h1>Late</h1>
          <p>Title: {lateResult.title}</p>
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
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true,
  };
}

// move this to api call that fetches late
// then use SWR to call api?
export const getStaticProps = async (context) => {
  // const test = await getSession(context);
  const lateId = parseInt(context.params.id);
  const prisma = new PrismaClient();
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
  }

  const json = await JSON.stringify(lateResponse);

  return {
    props: { late: json, loading: false },
  };
};

export default Late;
