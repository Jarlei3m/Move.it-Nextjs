import { useContext, useState } from 'react';
import {
  AiFillGoogleCircle,
  AiFillTwitterCircle,
  AiOutlineLogin,
  AiFillGithub,
} from 'react-icons/ai';
import { RiFacebookCircleFill } from 'react-icons/ri';
import { LoginContext } from '../context/LoginContext';
import styles from '../styles/components/LoginPage.module.css';

export function LoginPage() {
  const { handleSignIn } = useContext(LoginContext);

  const [provider, setProvider] = useState('github');

  function handleSignInProvider(provider: string) {
    console.log('escolha:', provider);
    setProvider(provider);
  }

  return (
    <div className={styles.loginPage}>
      <h2>Bem-vindo</h2>

      <div className={`${styles.msgContainer}`}>
        <p>
          Entre com a sua plataforma <br /> preferida
        </p>
        <div className={styles.socialMediaIcons}>
          <AiFillGithub
            className={provider === 'github' ? `${styles.active}` : ''}
            onClick={() => handleSignInProvider('github')}
          />
          <AiFillTwitterCircle
            className={provider === 'twitter' ? `${styles.active}` : ''}
            onClick={() => handleSignInProvider('twitter')}
          />
          <RiFacebookCircleFill
            className={provider === 'facebook' ? `${styles.active}` : ''}
            onClick={() => handleSignInProvider('facebook')}
          />
          <AiFillGoogleCircle
            className={provider === 'google' ? `${styles.active}` : ''}
            onClick={() => handleSignInProvider('google')}
          />
        </div>
        <div
          className={styles.loginContainer}
          onClick={() => handleSignIn(provider)}
        >
          <button type='button'>Sign in</button>
          <span>
            <AiOutlineLogin />
          </span>
        </div>
      </div>
    </div>
  );
}
