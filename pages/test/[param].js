import Layout from '../../components/layout';
import { useRouter } from 'next/router';

const Test = () => {
  const router = useRouter();
  const { param } = router.query;

  return (
    <Layout>
      <h1>Test</h1>
      <h3>{param}</h3>
    </Layout>
  );
};

export default Test;
