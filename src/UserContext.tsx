import React from 'react';
import { UserProfile, getCurrentUser, logoutUser as storageLogout, loginUser as storageLogin } from './lib/storage';

interface UserContextType {
  currentUser: UserProfile | null;
  login: (email: string, password?: string) => UserProfile | null;
  logout: () => void;
  refreshUser: () => void;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = React.useState<UserProfile | null>(getCurrentUser());

  const login = (email: string, password?: string) => {
    const user = storageLogin(email, password);
    if (user) {
      setCurrentUser(user);
    }
    return user;
  };

  const logout = () => {
    storageLogout();
    setCurrentUser(null);
  };

  const refreshUser = () => {
    setCurrentUser(getCurrentUser());
  };

  return (
    <UserContext.Provider value={{ currentUser, login, logout, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
