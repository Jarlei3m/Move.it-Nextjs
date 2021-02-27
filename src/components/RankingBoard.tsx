import styles from '../styles/components/RankingBoard.module.css';

export function RankingBoard() {
  return (
    <section className={styles.rankingContainer}>
      <article className={styles.rankingBoard}>
        <span>1</span>

        <div className={styles.rankingBoardPerfil}>
          <img src='https://github.com/jarlei3m.png' alt='Jarlei Rodrigues' />
          <div>
            <strong>Járlei Rodrigues</strong>
            <p>
              <img src='icons/level.svg' alt='Level' />
              Level 6
            </p>
          </div>
        </div>

        <p className={styles.rankingBoardDatas}>
          <span>127</span> completados
        </p>

        <p className={styles.rankingBoardDatas}>
          <span>157600</span> xp
        </p>
      </article>

      <article className={styles.rankingBoard}>
        <span>1</span>

        <div className={styles.rankingBoardPerfil}>
          <img src='https://github.com/jarlei3m.png' alt='Jarlei Rodrigues' />
          <div>
            <strong>Járlei Rodrigues</strong>
            <p>
              <img src='icons/level.svg' alt='Level' />
              Level 6
            </p>
          </div>
        </div>

        <p className={styles.rankingBoardDatas}>
          <span>127</span> completados
        </p>

        <p className={styles.rankingBoardDatas}>
          <span>154000</span> xp
        </p>
      </article>
    </section>
  );
}
