import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ChallengeBox } from '../components/ChallengeBox';
// Home components
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
// Context
import { ChallengesProvider } from '../context/ChallengesContext';
import { CountdownProvider } from '../context/CountdownContext';
import { LoginProvider } from '../context/LoginContext';
// styles
import styles from '../styles/pages/Home.module.css';
// database connection
import { connectToDatabase } from './api/profiles';

interface userProps {
  challengesCompleted: number;
  currentExperience: number;
  level: number;
  image: string;
  name: string;
  email: string;
}

interface HomeProps {
  userData: userProps;
  accessDenied: boolean;
}

function Redirect({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}

export default function Home({ userData, accessDenied }: HomeProps) {
  if (accessDenied) {
    return <Redirect to='/' />;
  }

  // refresh data
  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);

  return (
    <LoginProvider
      image={userData.image}
      name={userData.name}
      email={userData.email}
    >
      <ChallengesProvider
        refreshData={refreshData}
        level={userData.level}
        currentExperience={userData.currentExperience}
        challengesCompleted={userData.challengesCompleted}
      >
        <div className={styles.container}>
          <Head>
            <title>Início | move.it</title>
          </Head>

          {/* HOME */}
          <ExperienceBar />

          <CountdownProvider>
            <section className={styles.homeSection}>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
      </ChallengesProvider>
    </LoginProvider>
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

  const { user } = session;

  const { name, image, email } = user;

  // database connection
  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('profiles');

  // verify if user already exists (by email)
  const userExists = await collection.findOne({
    email: email,
  });

  // if not exists
  if (!userExists) {
    //initial status values
    let level = 1;
    let currentExperience = 0;
    let challengesCompleted = 0;

    // insert user into database
    await collection.insertOne({
      name,
      image,
      email,
      status: {
        level,
        currentExperience,
        challengesCompleted,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return {
      // insert new datas to cookies
      props: {
        name: String(name),
        image: String(image),
        email: String(email),
        level: Number(1),
        currentExperience: Number(0),
        challengesCompleted: Number(0),
      },
    };
  }

  // if user already have an acc

  // get updated cookies when in session
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  // when user already exists, on his first login update cookies with status from DB
  const { image: DBImage } = userExists;
  const { status } = userExists;
  const {
    level: DBLevel,
    currentExperience: DBCurrentExperience,
    challengesCompleted: DBChallengesCompleted,
  } = status;

  // after each completed challenge, get status data from connected user
  const { _id } = userExists;

  // status update
  if (level && currentExperience && challengesCompleted) {
    await collection.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          'status.level': level,
          'status.currentExperience': currentExperience,
          'status.challengesCompleted': challengesCompleted,
        },
      }
    );
  }

  const userData = {
    name: String(name),
    image: String(image ?? DBImage),
    email: String(email),
    level: Number(level ?? DBLevel),
    currentExperience: Number(currentExperience ?? DBCurrentExperience),
    challengesCompleted: Number(challengesCompleted ?? DBChallengesCompleted),
  };

  return {
    props: { userData },
  };
};
