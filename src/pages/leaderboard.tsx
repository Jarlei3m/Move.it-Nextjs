import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { RankingBoard } from '../components/RankingBoard';
// Ranking components
import { RankingHeader } from '../components/RankingHeader';
import { RankingTitles } from '../components/RankingTitles';
//Sidebar Component
import { SideBar } from '../components/SideBar';
import { ChallengesProvider } from '../context/ChallengesContext';
import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>
        {/* <SideBar /> */}

        {/* RANKING */}
        <RankingHeader />

        <section>
          <RankingTitles />
          <RankingBoard />
        </section>
      </div>
    </ChallengesProvider>
  );
}

// When declared inside a Next page, allows me to choose which datas will be send from Next.js server (Node.js) to the front-end(react)
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0),
    },
  };
};
