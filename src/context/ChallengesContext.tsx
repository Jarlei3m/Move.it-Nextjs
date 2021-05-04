import Cookies from 'js-cookie';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import { SideBar } from '../components/SideBar';

interface challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  finishedChallenge: () => void;
  closeModal: () => void;
  refreshData: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  refreshData: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  refreshData,
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience
  );
  const [challengesCompleted, setchallengesCompleted] = useState(
    rest.challengesCompleted
  );
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [session] = useSession();

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function closeModal() {
    setIsLevelUpModalOpen(false);
  }

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play;

    if (Notification.permission === 'granted' && window.innerWidth > 425) {
      new Notification('Novo desafio ☺', {
        body: `Valendo ${challenge.amount}xp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function finishedChallenge() {
    if (!activeChallenge) {
      return;
    }

    let finalXp = currentExperience + activeChallenge.amount;

    if (finalXp < experienceToNextLevel) {
      setCurrentExperience(finalXp);
    } else {
      levelUp();
      setCurrentExperience(finalXp - experienceToNextLevel);
    }
    setchallengesCompleted(challengesCompleted + 1);
    setActiveChallenge(null);
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        currentExperience,
        challengesCompleted,
        activeChallenge,
        experienceToNextLevel,
        closeModal,
        levelUp,
        startNewChallenge,
        resetChallenge,
        finishedChallenge,
        refreshData,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
      {session && <SideBar />}
    </ChallengesContext.Provider>
  );
}
