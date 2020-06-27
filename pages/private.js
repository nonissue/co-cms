import Link from 'next/link';
import { signin, signout, useSession } from 'next-auth/client';
import Layout from '../components/layout';
import styles from './private.module.css';

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default () => {
  const [session, loading] = useSession();

  return (
    <Layout>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault();
                  signin();
                }}
              >
                Sign in or go back to the home page
              </a>
            </>
          )}
          {session && (
            <>
              <span
                style={{ backgroundImage: `url(${session.user.image})` }}
                className={styles.avatar}
              />
              <h3>Private Page!</h3>
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email || session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault();
                  signout();
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
    </Layout>
  );
};
