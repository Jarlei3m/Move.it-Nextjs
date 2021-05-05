import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// Ranking components
import { RankingHeader } from '../components/RankingHeader';
import { RankingTable } from '../components/RankingTable';
import { ChallengesProvider } from '../context/ChallengesContext';
import { LeaderboardProvider } from '../context/LeaderboardContext';
// Styles
import styles from '../styles/pages/Leaderboard.module.css';
// Datbase
import { connectToDatabase } from './api/profiles';

interface userProps {
  challengesCompleted: number;
  currentExperience: number;
  level: number;
  image: string;
  name: string;
}

interface HomeProps {
  usersData: userProps[];
  accessDenied: boolean;
}

function Redirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}

export default function Home({ usersData, accessDenied }: HomeProps) {
  const router = useRouter();

  if (accessDenied) {
    return <Redirect to='/' />;
  }

  console.log('router:', router);

  return (
    <div className={styles.container}>
      <Head>
        <title>Ranking | move.it</title>
      </Head>

      {/* RANKING */}
      <RankingHeader />

      <LeaderboardProvider>
        <section>
          <RankingTable usersData={usersData} />
        </section>
      </LeaderboardProvider>
    </div>
  );
}

// When declared inside a Next page, allows me to choose which datas will be send from Next.js server (Node.js) to the front-end(react)
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      props: {
        accessDenied: Boolean(true),
      },
    };
  }

  // database connection
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('profiles');

  // get all users
  let users = await collection.find().sort({ level: 1 }).limit(10).toArray();

  // sort then by the highest level
  users = [...users].sort((a, b) => b.status.level - a.status.level);

  // console.log('all users:', users);
  // get the properties from each user
  const usersData = users.map((user) => {
    const { name, image, status } = user;
    const { level, currentExperience, challengesCompleted } = status;
    // console.log('level:', level)
    return {
      name,
      image,
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    };
  });

  // console.log('usersData:', usersData);

  return {
    props: {
      usersData,
    },
  };
};
