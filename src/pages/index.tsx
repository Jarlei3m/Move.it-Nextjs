import Head from 'next/head';
import { LoginHeader } from '../components/LoginHeader';
import { LoginLogo } from '../components/LoginLogo';
import { LoginPage } from '../components/LoginPage';
import { LoginProvider } from '../context/LoginContext';
import styles from '../styles/pages/Login.module.css';

interface UserLoginProps {
  name: string;
  image: string;
  email: string;
}

export default function Login(props: UserLoginProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>

      <LoginProvider
        isLoading
        image={props.image}
        name={props.name}
        email={props.email}
      >
        <section className={styles.loginSection}>
          <div>
            <LoginLogo />
          </div>
          <div>
            <LoginHeader />
            <LoginPage />
          </div>
        </section>
      </LoginProvider>
    </div>
  );
}
