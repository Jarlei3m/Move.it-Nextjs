import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { RankingBoard } from '../components/RankingBoard';
// Ranking components
import { RankingHeader } from '../components/RankingHeader';
import { RankingTitles } from '../components/RankingTitles';
import { LeaderboardProvider } from '../context/LeaderboardContext';
// Styles
import styles from '../styles/pages/Home.module.css';
// Datbase
import { connectToDatabase } from './api/profiles';

export default function Home({ properties }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ranking | move.it</title>
      </Head>

      {/* RANKING */}
      <RankingHeader />

      <LeaderboardProvider>
        <section>
          <RankingTitles />
          <RankingBoard properties={properties} />
        </section>
      </LeaderboardProvider>
    </div>
  );
}

// When declared inside a Next page, allows me to choose which datas will be send from Next.js server (Node.js) to the front-end(react)
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // database connection
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('profiles');

  // get all users
  let users = await collection.find().sort({ level: 1 }).limit(10).toArray();

  // sort then by the highest level
  users = [...users].sort((a, b) => b.status.level - a.status.level);

  // get the properties of each user
  const properties = users.map((property) => {
    const { name, image, status } = property;
    const { level, currentExperience, challengesCompleted } = status;
    return {
      name,
      image,
      level,
      currentExperience,
      challengesCompleted,
    };
  });

  return {
    props: {
      properties,
    },
  };
};
