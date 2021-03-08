import { getSession, providers, signIn } from 'next-auth/client';
import Head from 'next/head';
import { LoginLogo } from '../../components/LoginLogo';
import styles from '../../styles/pages/auth/Signin.module.css';

interface infoProps {
  name: string;
  id: number;
}

interface providerProps {
  providers: infoProps;
}

export default function SignIn({ providers }: providerProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>SignIn | move.it</title>
      </Head>

      {/* <LoginProvider>
          <section className={styles.loginSection}>
            <div>
              <LoginLogo />
            </div>
            <div>
              <LoginHeader />
              <LoginPage />
            </div>
          </section>
        </LoginProvider> */}
      <section className={styles.signinSection}>
        <div>
          <LoginLogo />
        </div>
        <div className={styles.btnContainer}>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className={styles.signinBtn}
                onClick={() => signIn(provider.id)}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

SignIn.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: '/home',
    });
    res.end();
    return;
  }
  return {
    session: undefined,
    providers: await providers(),
  };
};
