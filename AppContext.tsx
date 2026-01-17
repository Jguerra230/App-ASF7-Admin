import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Championship } from '../types';

interface AppContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  activeChampionship: Championship | null;
  setActiveChampionship: (champ: Championship | null) => void;
  allChampionships: Championship[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const MOCK_CHAMPIONSHIPS: Championship[] = [
  { 
    id: '1', 
    name: 'Liga Ouro 2024', 
    season: '2024', 
    status: 'active', 
    logo: 'https://picsum.photos/50/50',
    startDate: '2024-02-01',
    format: 'league',
    config: { totalTeams: 12 }
  },
  { 
    id: '2', 
    name: 'Copa ASF7 Verão', 
    season: '2024', 
    status: 'upcoming', 
    logo: 'https://picsum.photos/51/51',
    startDate: '2024-06-15',
    format: 'hybrid',
    config: { groups: 4, qualifiersPerGroup: 2 }
  },
  { 
    id: '3', 
    name: 'Liga Prata 2023', 
    season: '2023', 
    status: 'finished', 
    logo: 'https://picsum.photos/52/52',
    startDate: '2023-01-10',
    format: 'league'
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeChampionship, setActiveChampionship] = useState<Championship | null>(null);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setActiveChampionship(null);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        activeChampionship,
        setActiveChampionship,
        allChampionships: MOCK_CHAMPIONSHIPS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};