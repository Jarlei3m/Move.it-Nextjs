import { useSession } from 'next-auth/client';
import { createContext, ReactNode } from 'react';
import { SideBar } from '../components/SideBar';

interface LeaderboardContextData {}

interface LeaderboardProviderProps {
  children: ReactNode;
}

export const LeaderboardContext = createContext({} as LeaderboardContextData);

export function LeaderboardProvider({ children }: LeaderboardProviderProps) {
  const [session] = useSession();

  return (
    <LeaderboardContext.Provider value={{}}>
      {children}
      {session && <SideBar />}
    </LeaderboardContext.Provider>
  );
}
