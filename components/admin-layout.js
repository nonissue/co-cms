import { useSession, signin } from 'next-auth/client';
import { Provider } from 'next-auth/client';
import { Button } from '@zeit-ui/react';
import AdminHeader from '../components/admin-header';
import Footer from '../components/footer';

const AdminLayout = ({ children }) => {
  const [session, loading] = useSession();

  return (
    <>
      <AdminHeader />
      <Button>Click Me</Button>
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
    </>
  );
};

export default AdminLayout;
