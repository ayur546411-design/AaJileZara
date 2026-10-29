import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: 'CLIENT' | 'ADVISOR' | 'ADMIN';
  clientCategory: string;
  isVerifiedStudent: boolean;
  avatarUrl?: string;
  advisorProfile?: {
    title: string;
  };
}

interface AuthContextType {
  currentUser: UserAccount | null;
  role: 'VISITOR' | 'CLIENT' | 'ADVISOR' | 'ADMIN';
  demoAccounts: UserAccount[];
  switchUser: (user: UserAccount | null) => void;
  isLoading: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  role: 'VISITOR',
  demoAccounts: [],
  switchUser: () => {},
  isLoading: true,
  token: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [demoAccounts, setDemoAccounts] = useState<UserAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load demo accounts from API
  useEffect(() => {
    fetch('/api/auth/demo-accounts')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.accounts) {
          setDemoAccounts(data.accounts);
          // Default to Visitor, or load saved preference
          const savedId = localStorage.getItem('jilezara_user_id');
          if (savedId) {
            const found = data.accounts.find((a: UserAccount) => a.id === savedId);
            if (found) setCurrentUser(found);
          }
        }
      })
      .catch((err) => console.warn('Could not load accounts:', err))
      .finally(() => setIsLoading(false));
  }, []);

  const switchUser = (user: UserAccount | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem('jilezara_user_id', user.id);
    } else {
      localStorage.removeItem('jilezara_user_id');
    }
  };

  const role = currentUser ? currentUser.role : 'VISITOR';
  const token = currentUser ? `mock_${currentUser.role.toLowerCase()}` : null;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        demoAccounts,
        switchUser,
        isLoading,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
