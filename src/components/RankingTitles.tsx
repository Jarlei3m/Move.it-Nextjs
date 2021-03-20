import styles from '../styles/components/RankingTitles.module.css';

export function RankingTitles() {
  return (
    <article className={styles.rankingTitles}>
      <div>
        <span>Posição</span>
      </div>
      <div className={styles.userInfo}>
        <span>Usuário</span>
        <span>Desafios</span>
        <span>Experiência</span>
      </div>
    </article>
  );
}
