import { Profiler } from 'react';

import styles from '../styles/components/Profile.module.css';

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src='https://github.com/jarlei3m.png' alt='Jarlei Rodrigues' />
      <div>
        <strong>Járlei Rodrigues</strong>
        <p>
          <img src='icons/level.svg' alt='Level' />
          Level 1
        </p>
      </div>
    </div>
  );
}
