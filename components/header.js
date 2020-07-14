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
  const [menuDropdown, toggleMenuDropdown] = useDropdown(
    dropdownRef,
    actionRef
  );
  const [coords, setCoords] = useState({});
  const updateDropdownCoords = (button) => {
    const rect = button.getBoundingClientRect();
    setCoords({
      left: rect.x, // add half the width of the button for centering
      top: rect.y + window.scrollY + rect.height, // add scrollY offset, as soon as getBountingClientRect takes on screen coords
    });

    toggleMenuDropdown();
  };

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
              <li
                className={styles.navItem}
                onClick={(e) => {
                  updateDropdownCoords(e.target);
                  // setOpen(!open);
                  console.log(e.target);
                  console.log(e.target.getBoundingClientRect());
                }}
                // style={{ position: 'relative' }}
                ref={actionRef}
                style={{
                  border: `${
                    menuDropdown ? '1px solid #DDEBF7' : '1px solid transparent'
                  }`,
                  borderBottom: `${
                    menuDropdown ? '0px solid navy' : '0px solid white'
                  }`,
                  boxShadow: `${
                    menuDropdown && !menuDropdown
                      ? // ? '0 0.15rem 0.3rem rgba(0, 0, 0, 0.1)'
                        '0 0.15rem 0.3rem rgba(0, 0, 0, 0.1)'
                      : 'none'
                  }`,
                  width: '100px',
                }}
              >
                Dropdown ▼
                <div
                  ref={dropdownRef}
                  hidden={!menuDropdown}
                  className={styles['dropdown-test']}
                  style={{
                    left: `calc(${coords.left}px)`,
                    top: `calc(${coords.top}px)`,
                    position: 'absolute',
                    // top: 0,
                    // bottom: 0,
                    // left: 0,
                    // right: 0,
                    border: 'inherit',
                    borderTop: '0px',
                    borderBottom: '2px solid #084B8A',
                    lineHeight: '1.3rem',
                    // paddingLeft: '0.5em',
                    paddingBottom: '0.5em',
                  }}
                >
                  &nbsp;- Test
                  <br />
                  &nbsp;- Test 2 <br />
                  &nbsp;- Test 3
                </div>
                {/* <Modal ref={dropdownRef} /> */}
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
                <Link href='/modal'>
                  <a>Modal</a>
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

import { useState, useEffect, useCallback } from 'react';

function useDropdown(dropEl, actionEl) {
  dropEl = dropEl.current;
  actionEl = actionEl.current;

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
