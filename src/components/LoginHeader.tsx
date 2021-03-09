import styles from '../styles/components/LoginHeader.module.css';

export function LoginHeader() {
  return (
    <header className={styles.LoginHeader}>
      <img src='../moveit.png' alt='logo moveit' />
    </header>
  );
}
