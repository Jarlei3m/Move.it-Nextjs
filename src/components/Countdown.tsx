import { useContext } from 'react';
import { AiFillCaretRight } from 'react-icons/ai';
import { CountdownContext } from '../context/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const {
    hasFinished,
    isActive,
    minutes,
    seconds,
    percentToTimeout,
    resetCountdown,
    startCountdown,
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={`${styles.countdownButton}`}>
          Ciclo encerrado
          <img src='icons/check.svg' alt='checked' />
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type='button'
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
              <img src='icons/close.svg' alt='close' />
              <div className={styles.timeBar}>
                <div
                  className={styles.percentToTimeoutBar}
                  style={{ width: `${percentToTimeout}%` }}
                ></div>
              </div>
            </button>
          ) : (
            <button
              type='button'
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo <AiFillCaretRight />
            </button>
          )}
        </>
      )}
    </div>
  );
}
