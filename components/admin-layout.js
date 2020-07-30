import { useSession, signin } from 'next-auth/client';
import { Provider } from 'next-auth/client';

import AdminHeader from '../components/admin-header';
import Footer from '../components/footer';

const AdminLayout = ({ children }) => {
  const [session, loading] = useSession();

  console.log(session);

  return (
    <>
      <AdminHeader />
      {session ? (
        <main>{children}</main>
      ) : (
        <>
          <h1>Please sign in</h1>{' '}
          <a
            href={`/api/auth/signin`}
            // className={styles.buttonPrimary}
            onClick={(e) => {
              e.preventDefault();
              signin();
            }}
          >
            Sign in
          </a>
        </>
      )}
      <Footer />
    </>
  );
};

export default AdminLayout;
