import styles from '../styles/components/SideBar.module.css';

export function SideBar() {
  return (
    <aside className={styles.sideBarContainer}>
      <div className={styles.sideBarHeader}>
        <img src='/sidebar-logo.png' alt='logo' />
      </div>
      <div className={styles.sideBarLinks}>
        <button className={styles.linkActive}>
          <img src='/icons/button-home.svg' alt='home' />
        </button>
        <button>
          <img src='/icons/button-ranking.svg' alt='ranking' />
        </button>
      </div>
    </aside>
  );
}
