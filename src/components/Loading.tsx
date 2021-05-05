import styles from '../styles/components/Loading.module.css';

export function Loading() {
  return (
    <>
      <img className={styles.spinner} src='/spinner.gif' alt='loading' />
    </>
  );
}
