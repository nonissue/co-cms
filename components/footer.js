import styles from './footer.module.css';

export default () => (
  <footer className={styles.footer}>
    <hr />
    <ul className={styles.navItems}>
      <li className={styles.navItem}>
        <a href='https://next-auth.js.org'>© Collate Inc 2020</a>
      </li>
    </ul>
  </footer>
);
