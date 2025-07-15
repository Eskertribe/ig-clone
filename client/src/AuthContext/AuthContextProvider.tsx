import { ReactNode, useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | undefined>(
    localStorage.getItem('auth-token') ?? undefined
  );
  const [user, setUserState] = useState<string | undefined>(
    localStorage.getItem('username') ?? undefined
  );

  const setAuthState = (token: string, user: string) => {
    localStorage.removeItem('auth-token');
    localStorage.setItem('auth-token', token);
    localStorage.setItem('username', user);
    setTokenState(token);
    setUserState(user);
  };

  const clearToken = () => {
    localStorage.removeItem('auth-token');
    setUserState(undefined);
    setTokenState(undefined);
  };

  return (
    <AuthContext.Provider
      value={{ token, setAuthState, clearToken, user, setUserState }}
    >
      {children}
    </AuthContext.Provider>
  );
};
