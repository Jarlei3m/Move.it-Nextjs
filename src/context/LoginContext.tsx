import Cookies from 'js-cookie';
import { signIn, useSession } from 'next-auth/client';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface LoginContextData {
  name: string;
  image: string;
  email: string;
  hasGithubProfile: boolean;
  changeLoginMethod: (action: boolean) => void;
  handleSignIn: (provider: string) => void;
}

interface LoginProviderProps {
  children: ReactNode;
  name: string;
  image: string;
  email: string;
}

export const LoginContext = createContext({} as LoginContextData);

export function LoginProvider({ children, ...rest }: LoginProviderProps) {
  const [session] = useSession();

  const [name, setName] = useState(rest.name);
  const [image, setImage] = useState(rest.image);
  const [email, setEmail] = useState(rest.email);
  const [hasGithubProfile, setHasGithubProfile] = useState(true);

  function changeLoginMethod(action: boolean) {
    setHasGithubProfile(action);
  }

  function handleSignIn(provider: string) {
    console.log('função signin:', provider);
    signIn(provider, { callbackUrl: 'http://localhost:3000/home' });
    // signIn('', { callbackUrl: 'https://appmoveit-five.vercel.app/home' });
  }

  useEffect(() => {
    if (session) {
      setName(session.user.name);
      setImage(session.user.image);
      setEmail(session.user.email);

      // set cookies
      Cookies.set('name', name);
      Cookies.set('image', image);
      Cookies.set('email', email);
    }
  }, [session]);

  return (
    <LoginContext.Provider
      value={{
        hasGithubProfile,
        changeLoginMethod,
        handleSignIn,
        name,
        image,
        email,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
