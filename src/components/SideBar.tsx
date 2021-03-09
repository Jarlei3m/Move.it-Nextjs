import Cookies from 'js-cookie';
import { signOut } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengesContext';
import styles from '../styles/components/SideBar.module.css';
import { AiOutlineLogout } from 'react-icons/ai';
import { FiHome } from 'react-icons/fi';
import { GiRibbonMedal } from 'react-icons/gi';

export function SideBar(): JSX.Element {
  const { route } = useRouter();
  const { refreshData } = useContext(ChallengesContext);

  if (route === '/') {
    return null;
  }

  function handleSignOut() {
    refreshData();
    setInterval(() => {
      Cookies.remove('level');
      Cookies.remove('currentExperience');
      Cookies.remove('challengesCompleted');
      // appmoveit - five.vercel.app;
      // signOut({ callbackUrl: 'http://localhost:3000' });
      signOut({ callbackUrl: 'https://appmoveit-five.vercel.app' });
    }, 300);
  }

  return (
    <aside className={styles.sideBarContainer}>
      <div className={styles.sideBarHeader}>
        <img src='/sidebar-logo.png' alt='logo' />
      </div>
      <div className={styles.sideBarLinks}>
        <Link href='/home'>
          <button className={route === '/home' ? `${styles.linkActive}` : null}>
            <FiHome />
          </button>
        </Link>
        <Link href='/leaderboard'>
          <button
            className={route === '/leaderboard' ? `${styles.linkActive}` : null}
          >
            <GiRibbonMedal />
          </button>
        </Link>
      </div>
      <div className={styles.sideBarLogout}>
        <AiOutlineLogout onClick={() => handleSignOut()} />
      </div>
    </aside>
  );
}
