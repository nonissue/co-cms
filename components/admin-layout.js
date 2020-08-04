import { useSession, signin } from 'next-auth/client';
import { Provider } from 'next-auth/client';

import { ThemeProvider, CSSReset, Spinner } from '@chakra-ui/core';
import AdminHeader from '../components/admin-header';
import Footer from '../components/footer';

const AdminLayout = ({ children }) => {
  const [session, loading] = useSession();

  return (
    <ThemeProvider>
      {/* <CSSReset /> */}
      <AdminHeader />
      <Spinner />
      <div>
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
        <AdminHeader />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;
