import { useContext } from 'react';
import {
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiOutlineLogin,
} from 'react-icons/ai';
import { RiFacebookCircleFill } from 'react-icons/ri';
import { LoginContext } from '../context/LoginContext';
import styles from '../styles/components/LoginPage.module.css';

export function LoginPage() {
  const { handleSignIn } = useContext(LoginContext);

  return (
    <div className={styles.loginPage}>
      <h2>Bem-vindo</h2>

      <div className={`${styles.msgContainer}`}>
        <p>
          Entre com a sua plataforma <br /> preferida
        </p>
        <div className={styles.socialMediaIcons}>
          <img src='icons/github.svg' alt='' />
          <AiFillTwitterCircle />
          <RiFacebookCircleFill />
          <AiFillLinkedin />
        </div>
        <div className={styles.loginContainer} onClick={() => handleSignIn()}>
          <button type='button'>Sign in</button>
          <span>
            <AiOutlineLogin />
          </span>
        </div>
      </div>
    </div>
  );
}
