import { Profiler, useContext } from 'react';
import { ChallengesContext } from '../context/ChallengesContext';

import styles from '../styles/components/Profile.module.css';

interface levelProps {
  level: number;
}

export function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src='https://github.com/jarlei3m.png' alt='Jarlei Rodrigues' />
      <div>
        <strong>Járlei Rodrigues</strong>
        <p>
          <img src='icons/level.svg' alt='Level' />
          Level {level}
        </p>
      </div>
    </div>
  );
}
