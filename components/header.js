import { useRef } from 'react';
import Link from 'next/link';
import { signin, signout, useSession } from 'next-auth/client';
// import Modal from '../components/modal';
import styles from './header.module.css';

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default () => {
  const [session, loading] = useSession();
  const actionRef = useRef(null);
  const dropdownRef = useRef(null);

  const updateDropdownCoords = (button) => {
    const rect = button.getBoundingClientRect();
    setCoords({
      left: rect.x, // add half the width of the button for centering
      top: rect.y + window.scrollY + rect.height, // add scrollY offset, as soon as getBountingClientRect takes on screen coords
    });
  };

  const [menuDropdown, toggleMenuDropdown] = useDropdown(
    dropdownRef,
    actionRef
  );

  useEffect(() => {
    window.addEventListener('resize', () =>
      updateDropdownCoords(actionRef.current)
    );

    return () => window.removeEventListener('resize', () => actionRef.current);
  }, []);

  const [coords, setCoords] = useState({});

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
            <ul
              className={`${styles.navItems} ${
                !session && loading ? styles.loading : styles.loaded
              }`}
            >
              <Link href='/'>
                <li className={styles.navItem}>
                  <a>Home</a>
                </li>
              </Link>
              {/* <li
                className={styles.navItem}
                onClick={(e) => {
                  updateDropdownCoords(e.target);
                  toggleMenuDropdown();
                }}
                ref={actionRef}
                style={{
                  border: `${
                    menuDropdown ? '1px solid #1070CA' : '1px solid transparent'
                  }`,
                  borderBottom: `${
                    menuDropdown ? '0px solid navy' : '0px solid white'
                  }`,
                  boxShadow: `${
                    menuDropdown && !menuDropdown
                      ? '0 0.15rem 0.3rem rgba(0, 0, 0, 0.1)'
                      : 'none'
                  }`,

                  width: '100px',
                }}
              >
                Dropdown ✲
                <div
                  ref={dropdownRef}
                  hidden={!menuDropdown}
                  className={styles['dropdown-test']}
                  style={{
                    left: `calc(${coords.left}px)`,
                    top: `calc(${coords.top}px)`,
                    position: 'absolute',
                    border: 'inherit',
                    borderTop: '0px',
                    borderBottom: '1px solid #084B8A',
                    lineHeight: '1.3rem',
                    paddingBottom: '0.5em',
                  }}
                >
                  &nbsp;- Test
                  <br />
                  &nbsp;- Test 2 <br />
                  &nbsp;- Test 3
                </div>
              </li> */}
              <li
                className={styles.navItem}
                onClick={(e) => {
                  updateDropdownCoords(e.target);
                  toggleMenuDropdown();
                }}
                ref={actionRef}
                style={{
                  border: `${
                    menuDropdown
                      ? '1px solid rgba(67, 90, 111, 0.3)'
                      : '1px solid transparent'
                  }`,
                  borderBottom: `${
                    menuDropdown ? '0px' : '1px solid transparent'
                  }`,
                  boxShadow: `${
                    menuDropdown && !menuDropdown
                      ? '0 0.15rem 0.3rem rgba(0, 0, 0, 0.1)'
                      : 'none'
                  }`,
                  // width: '75px',
                }}
              >
                Lates ✲
                <div
                  ref={dropdownRef}
                  hidden={!menuDropdown}
                  className={styles['dropdown-test']}
                  style={{
                    left: `calc(${coords.left}px)`,
                    top: `calc(${coords.top}px)`,
                    position: 'absolute',
                    border: 'inherit',
                    borderTop: '0px',
                    borderBottom: '1px solid rgba(67, 90, 111, 0.3)',
                    lineHeight: '1.4',
                    paddingTop: 0,
                    paddingBottom: '0.7rem',
                  }}
                >
                  &nbsp;-{' '}
                  <Link href='/lates'>
                    <a>All</a>
                  </Link>
                  <br />
                  &nbsp;-{' '}
                  <Link href='/late/1'>
                    <a>One</a>
                  </Link>
                  <br />
                  &nbsp;-{' '}
                  <Link href='/late/create'>
                    <a>Create</a>
                  </Link>
                </div>
              </li>
              {/* <li className={styles.navItem}>
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
              </li> */}
              <Link href='/modal'>
                <li className={styles.navItem}>
                  <a>Modal</a>
                </li>
              </Link>
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
        </nav>
      </div>
    </header>
  );
};

import { useState, useEffect, useCallback } from 'react';

function useDropdown(dropEl, actionEl) {
  dropEl = dropEl.current;
  actionEl = actionEl.current;

  const test = useRef(null);

  const [drop, setDrop] = useState(false);

  const toggleDrop = useCallback(
    (toggleState) => {
      setDrop(toggleState !== undefined ? Boolean(toggleState) : !drop);
    },
    [drop]
  );

  const onWindowClick = useCallback(
    (ev) => {
      const clickOnAction =
        actionEl && (ev.target === actionEl || actionEl.contains(ev.target));
      const clickOnDrop =
        dropEl && (ev.target === dropEl || dropEl.contains(ev.target));

      if (!clickOnAction && !clickOnDrop && drop === true) {
        toggleDrop(false);
      }
    },
    [drop]
  );

  const onEsc = useCallback(
    (ev) => {
      if (ev.keyCode === 27 && drop === true) {
        toggleDrop(false);
      }
    },
    [drop]
  );

  useEffect(() => {
    window.addEventListener('click', onWindowClick);
    return () => window.removeEventListener('click', onWindowClick);
  });

  useEffect(() => {
    window.addEventListener('keyup', onEsc);
    return () => window.removeEventListener('keyup', onEsc);
  });

  return [drop, toggleDrop];
}
