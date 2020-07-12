import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';

const Late = ({ late }) => {
  const router = useRouter();
  const { id } = router.query;

  const lateResult = JSON.parse(late);

  console.log(lateResult);

  return (
    <Layout>
      {late ? (
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

export const getServerSideProps = async (context) => {
  // const test = await getSession(context);
  const lateId = context.params.id - 0;

  const prisma = new PrismaClient();
  const lateResponse = await prisma.late.findOne({
    where: {
      id: lateId,
    },
    include: { owner: true },
  });

  const json = await JSON.stringify(lateResponse);

  return {
    props: { late: json },
  };
};

export default Late;
