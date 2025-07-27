import { ReactNode, useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | undefined>(
    localStorage.getItem('auth-token') ?? undefined
  );
  const [user, setUserState] = useState<string | undefined>(
    localStorage.getItem('username') ?? undefined
  );
  const [userId, setUserIdState] = useState<string | undefined>(
    localStorage.getItem('userId') ?? undefined
  );

  const setAuthState = (token: string, user: string, userId: string) => {
    localStorage.removeItem('auth-token');
    localStorage.setItem('auth-token', token);
    localStorage.setItem('username', user);
    localStorage.setItem('userId', userId);
    setTokenState(token);
    setUserState(user);
    setUserIdState(userId);
  };

  const clearToken = () => {
    localStorage.removeItem('auth-token');
    setUserState(undefined);
    setTokenState(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ token, setAuthState, clearToken, user, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
