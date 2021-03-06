import Link from 'next/link';
import styles from './header.module.css';
import Dropdown from './dropdown';

const Header = () => {
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
              <li className={styles.navItem}>
                <Dropdown
                  content={
                    <>
                      <Link href='/lates'>
                        <a>All</a>
                      </Link>
                      <Link href='/lates/1'>
                        <a>One</a>
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
                    </>
                  }
                >
                  <a>Tags</a>
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

export default Header;
