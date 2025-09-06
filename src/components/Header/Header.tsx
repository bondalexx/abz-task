import styles from "./Header.module.scss";
import logo from "../../images/Logo.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img src={logo} alt="TESTTASK" className={styles.logo} />
        </div>
        <nav className={styles.nav}>
          <a href="#users" className={styles.pill}>
            Users
          </a>
          <a href="#register" className={styles.pillPrimary}>
            Sign up
          </a>
        </nav>
      </div>
    </header>
  );
}
