import Link from 'next/link';
import { signin, signout, useSession } from 'next-auth/client';
import styles from './header.module.css';

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default () => {
  const [session, loading] = useSession();

  return (
    <header className={styles.header}>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      {/* <div className={styles.signedInStatus}>
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
                Sign in
              </a>
            </>
          )}
          {session && (
            <div className={styles.user}>
              <span
                style={{ backgroundImage: `url(${session.user.image})` }}
                className={styles.avatar}
              />
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
            </div>
          )}
        </p>
      </div> */}

      <div className={`${styles['nav-bar-wrapper']} nojs-show`}>
        <nav
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }
          }`}
        >
          <div className={styles['nav-bar-left']}>
            {session ? (
              <span
                style={{ backgroundImage: `url(${session.user.image})` }}
                className={`${styles.avatar}`}
              />
            ) : (
              <span></span>
            )}
            {/* {!session && ( */}

            <ul
              className={`${styles.navItems} ${
                !session && loading ? styles.loading : styles.loaded
              }`}
            >
              <li className={styles.navItem}>
                <Link href='/'>
                  <a>Home</a>
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href='/late/1'>
                  <a>Single late</a>
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href='/lates'>
                  <a>Lates</a>
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href='/late/create'>
                  <a>Create</a>
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href='/users'>
                  <a>Users Page</a>
                </Link>
              </li>
            </ul>
            {/* )} */}
          </div>
          {session ? (
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
          ) : (
            <a
              href={`/api/auth/signin`}
              className={styles.buttonPrimary}
              onClick={(e) => {
                e.preventDefault();
                signin();
              }}
            >
              Sign in
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};
