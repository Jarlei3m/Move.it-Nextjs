import styles from '../styles/components/RankingBoard.module.css';

export function RankingBoard({ properties }) {
  return (
    <section className={styles.rankingContainer}>
      {properties.map((prop, index) => {
        return (
          <article className={styles.rankingBoard}>
            <span>{index + 1}</span>

            <div className={styles.rankingBoardPerfil}>
              <img src={prop.image} alt={prop.name} />
              <div>
                <strong>{prop.name}</strong>
                <p>
                  <img src='icons/level.svg' alt='Level' />
                  Level {prop.level}
                </p>
              </div>
            </div>

            <p className={styles.rankingBoardDatas}>
              <span>{prop.challengesCompleted}</span> completados
            </p>

            <p className={styles.rankingBoardDatas}>
              <span>{prop.currentExperience}</span> xp
            </p>
          </article>
        );
      })}
    </section>
  );
}
