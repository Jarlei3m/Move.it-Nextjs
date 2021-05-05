import Cookies from 'js-cookie';
import { signIn, useSession } from 'next-auth/client';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface LoginContextData {
  name: string;
  image: string;
  email: string;
  handleSignIn: (provider: string) => void;
  isLoading: boolean;
}

interface LoginProviderProps {
  children: ReactNode;
  name: string;
  image: string;
  email: string;
  isLoading: boolean;
}

export const LoginContext = createContext({} as LoginContextData);

export function LoginProvider({ children, ...rest }: LoginProviderProps) {
  const [session] = useSession();

  const [name, setName] = useState(rest.name);
  const [image, setImage] = useState(rest.image);
  const [email, setEmail] = useState(rest.email);

  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (provider: string) => {
    setIsLoading(true);
    try {
      if (provider) {
        // await signIn(provider, { callbackUrl: 'http://localhost:3000/home' });
        await signIn(provider, {
          callbackUrl: 'https://appmoveit-five.vercel.app/home',
        });
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        handleSignIn,
        name,
        image,
        email,
        isLoading,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
