import { useRef } from 'react';
import Link from 'next/link';
import styles from './header.module.css';
import Dropdown from './dropdown';

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default () => {
  const actionRef = useRef(null);
  const dropdownRef = useRef(null);

  const updateDropdownCoords = (button) => {
    if (!button.getBoundingClientRect()) {
      return;
    }
    const rect = button.getBoundingClientRect();
    setCoords({
      left: rect.x,
      top: rect.y + window.scrollY + rect.height * 1.5, // * 1.5 to give us a bit of a margin
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
        <nav>
          <div className={styles['nav-bar-left']}>
            <ul className={`${styles.navItems}`}>
              <li className={styles.navItem}>
                <Link href='/'>
                  <a>Home</a>
                </Link>
              </li>

              <li
                className={`${styles['navItem']} ${styles['dropdown-action']}`}
              >
                <a
                  href='#'
                  ref={actionRef}
                  onClick={(e) => {
                    updateDropdownCoords(e.target);
                    toggleMenuDropdown();
                  }}
                >
                  Lates ✲
                </a>
              </li>
              <div
                ref={dropdownRef}
                hidden={!menuDropdown}
                className={`${styles['dropdown']}`}
                style={{
                  ...coords,
                  position: 'absolute',
                }}
              >
                <Link href='/lates'>
                  <a>All</a>
                </Link>

                <Link href='/lates/1'>
                  <a>One</a>
                </Link>

                <Link href='/lates/create'>
                  <a>Create +</a>
                </Link>
              </div>

              <li className={styles.navItem}>
                <Dropdown
                  content={
                    <>
                      {' '}
                      <Link href='/lates'>
                        <a>All</a>
                      </Link>
                      <Link href='/lates/1'>
                        <a>One</a>
                      </Link>
                      <Link href='/lates/create'>
                        <a>Create +</a>
                      </Link>
                    </>
                  }
                  // position='bottom'
                >
                  <a href='#'>Lates</a>
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
                  <a href='#'>Tags</a>
                </Dropdown>
              </li>
            </ul>
          </div>
          <div className={styles['nav-bar-right']}>
            <Link href='/admin'>
              <a>Admin</a>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

// move this to hook lib
// also somehow move updateCoords function here?
// https://github.com/alexkatz/react-tiny-popover#examples
// https://codesandbox.io/s/pmk54o1p9m?from-embed
// https://github.com/3tmaan/react-hooks-tooltip/blob/master/src/components/Tooltip/Tooltip.js +++
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
