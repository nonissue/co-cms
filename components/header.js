import { useRef } from 'react';
import Link from 'next/link';
import { signin, signout, useSession } from 'next-auth/client';
import styles from './header.module.css';

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default () => {
  const [session, loading] = useSession();
  const actionRef = useRef(null);
  const dropdownRef = useRef(null);

  const updateDropdownCoords = (button) => {
    if (!button.getBoundingClientRect()) {
      console.log('getBoundingRect called without button ref');
      console.log(button);
      return;
    }
    const rect = button.getBoundingClientRect();
    setCoords({
      left: rect.x + rect.width / 8, // add half the width of the button for centering
      top: rect.y + window.scrollY + rect.height, // add scrollY offset, as soon as getBountingClientRect takes on screen coords
    });
  };

  const [menuDropdown, toggleMenuDropdown] = useDropdown(
    dropdownRef,
    actionRef
  );

  // Move dropdown when window is resized
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
              <li
                className={styles.navItem}
                onClick={(e) => {
                  updateDropdownCoords(e.target);
                  toggleMenuDropdown();
                }}
                ref={actionRef}
              >
                Lates ✲
                <div
                  ref={dropdownRef}
                  hidden={!menuDropdown}
                  className={styles['dropdown-test']}
                  style={{
                    ...coords,
                    position: 'absolute',
                  }}
                >
                  <Link href='/lates'>
                    <a>All</a>
                  </Link>

                  <Link href='/late/1'>
                    <a>One</a>
                  </Link>

                  <Link href='/late/create'>
                    <a>Create +</a>
                  </Link>
                </div>
              </li>
              <Link href='/late/tags'>
                <li className={styles.navItem}>
                  <a>Tags</a>
                </li>
              </Link>
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
