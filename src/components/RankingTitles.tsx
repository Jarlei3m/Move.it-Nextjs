import styles from '../styles/components/RankingTitles.module.css';

export function RankingTitles() {
  return (
    <div className={styles.rankingTitles}>
      <span>Posição</span>
      <span>Usuário</span>
      <span>Desafios</span>
      <span>Experiência</span>
    </div>
  );
}
