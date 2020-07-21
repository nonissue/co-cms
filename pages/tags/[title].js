import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
const prisma = new PrismaClient();

const Tag = ({ data, loading = true, error }) => {
  if (!data) {
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

  console.log(data);

  const { title, lates } = JSON.parse(data);

  // console.log(lateResult);

  return (
    <Layout>
      <h3>{title}</h3>
      <ul>
        {lates.map((late) => {
          return <li key={late.id}>{late.url}</li>;
        })}
      </ul>
    </Layout>
  );
};

// export async function getStaticPaths() {
//   const allLates = await prisma.late.findMany({
//     include: { owner: true },
//   });

//   const paths = allLates.map((late) => `/late/${late.id}`);

//   return {
//     paths,
//     fallback: false,
//   };
// }

// move this to api call that fetches late
// then use SWR to call api?
export const getServerSideProps = async (context) => {
  // const test = await getSession(context);

  const tagTitle = context.params.title;
  let tagWithLates;

  try {
    tagWithLates = await prisma.tag.findOne({
      where: {
        title: tagTitle,
      },
      include: { lates: true },
    });
  } catch (err) {
    console.log(err);
    console.log("can't find that tag");
    throw new Error('Error: Error fetching late: ' + context.params.title);
  }

  let json;

  if (tagWithLates) {
    json = await JSON.stringify(tagWithLates);
  } else {
    return {
      props: { data: null, loading: false, error: context.params.title },
    };
  }

  return {
    props: { data: json, loading: false, error: false },
  };
};

export default Tag;
