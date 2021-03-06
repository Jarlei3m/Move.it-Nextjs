import Cookies from 'js-cookie';
import { signOut } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { FiHome } from 'react-icons/fi';
import { GiRibbonMedal } from 'react-icons/gi';
import styles from '../styles/components/SideBar.module.css';

export function SideBar(): JSX.Element {
  const { route } = useRouter();
  const [openSidebar, setOpenSidebar] = useState(false);

  function handleOpenSideBar() {
    setOpenSidebar(!openSidebar);
  }

  if (route === '/') {
    return null;
  }

  function handleSignOut() {
    setTimeout(() => {
      Cookies.remove('level');
      Cookies.remove('currentExperience');
      Cookies.remove('challengesCompleted');
      // appmoveit - five.vercel.app;
      // signOut({ callbackUrl: 'http://localhost:3000' });
      signOut({ callbackUrl: 'https://appmoveit-five.vercel.app' });
    }, 0);
  }

  return (
    <>
      <aside
        className={
          openSidebar
            ? `${styles.sideBarContainer} ${styles.active}`
            : `${styles.sideBarContainer}`
        }
      >
        <div className={styles.sideBarHeader}>
          <img
            onClick={handleOpenSideBar}
            src='/sidebar-logo.png'
            alt='moveit-logo'
          />
        </div>
        <div className={styles.sideBarLinks}>
          <Link href='/home'>
            <button
              className={route === '/home' ? `${styles.linkActive}` : null}
            >
              <FiHome />
            </button>
          </Link>
          <Link href='/leaderboard'>
            <button
              className={
                route === '/leaderboard' ? `${styles.linkActive}` : null
              }
            >
              <GiRibbonMedal />
            </button>
          </Link>
        </div>
        <div className={styles.sideBarLogout}>
          <AiOutlinePoweroff onClick={() => handleSignOut()} />
        </div>
      </aside>
      <aside>
        <div
          className={
            openSidebar
              ? `${styles.openSidebarBtn}`
              : `${styles.openSidebarBtn} ${styles.show}`
          }
        >
          <img
            onClick={handleOpenSideBar}
            src='/sidebar-logo.png'
            alt='moveit-logo'
          />
        </div>
      </aside>
    </>
  );
}
