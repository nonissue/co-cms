import { useRef } from 'react';
import Link from 'next/link';
import { signin, signout, useSession } from 'next-auth/client';
import styles from './header.module.css';
import Dropdown from './dropdown';

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
const AdminHeader = () => {
  const [session, loading] = useSession();

  return (
    <header className={styles.header}>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={`nojs-show ${styles['nav-bar-wrapper']} `}>
        <nav
        // className={`nojs-show
        // ${
        //   // !session && loading ? styles.loading : styles.loaded
        //   'test'
        // }
        // }`}
        >
          <div className={styles['nav-bar-left']}>
            <ul className={`${styles.navItems}`}>
              <Link href='/'>
                <li className={styles.navItem}>
                  <a>Home</a>
                </li>
              </Link>
              <li className={styles.navItem}>
                <Dropdown
                  content={
                    <>
                      <Link href='/lates'>
                        <a>All Lates</a>
                      </Link>

                      <Link href='/lates/1'>
                        <a>One</a>
                      </Link>

                      <Link href='/admin/lates/create'>
                        <a>Create +</a>
                      </Link>
                    </>
                  }
                  // position='bottom'
                >
                  <a>Lates</a>
                </Dropdown>
              </li>
              <li className={styles.navItem}>
                <Dropdown
                  content={
                    <>
                      <Link href='/tags'>
                        <a>All Tags</a>
                      </Link>

                      <Link href='/tags/firsttag'>
                        <a>One</a>
                      </Link>

                      <Link href='/tags/create'>
                        <a>Create +</a>
                      </Link>
                    </>
                  }
                  // position='bottom'
                >
                  <a>Tags</a>
                </Dropdown>
              </li>
            </ul>
          </div>
          <div className={styles['nav-bar-right']}>
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
            ) : loading ? (
              ''
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
            {session ? (
              <span
                style={{ backgroundImage: `url(${session.user.image})` }}
                className={`${styles.avatar}`}
              />
            ) : (
              ''
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
