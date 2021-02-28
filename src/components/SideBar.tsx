import styles from '../styles/components/SideBar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
export function SideBar() {
  // const [index, setIndex] = useState(0);
  const { route } = useRouter();

  return (
    <aside className={styles.sideBarContainer}>
      <div className={styles.sideBarHeader}>
        <img src='/sidebar-logo.png' alt='logo' />
      </div>
      <div className={styles.sideBarLinks}>
        <Link href='/'>
          <button className={route === '/' ? `${styles.linkActive}` : null}>
            <img src='/icons/button-home.svg' alt='home' />
          </button>
        </Link>
        <Link href='/leaderboard'>
          <button
            className={route === '/leaderboard' ? `${styles.linkActive}` : null}
          >
            <img src='/icons/button-ranking.svg' alt='ranking' />
          </button>
        </Link>
      </div>
    </aside>
  );
}
