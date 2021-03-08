import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengesContext';
import { LoginContext } from '../context/LoginContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext);
  const { name, image } = useContext(LoginContext);

  return (
    <div className={styles.profileContainer}>
      <img src={image} alt={name} />
      <div>
        <strong>{name}</strong>
        <p>
          <img src='icons/level.svg' alt='Level' />
          Level {level}
        </p>
      </div>
    </div>
  );
}
