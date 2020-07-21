import { PrismaClient } from '@prisma/client';
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

  const { title, lates } = JSON.parse(data);

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

// move this to api call that fetches late
// then use SWR to call api?
export const getStaticProps = async (context) => {
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
