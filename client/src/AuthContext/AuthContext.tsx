import { createContext } from 'react';

type AuthContextType = {
  token: string | undefined;
  user?: string;
  userId?: string;
  setAuthState: (token: string, username: string, userId: string) => void;
  clearToken: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: undefined,
  setAuthState: () => {},
  clearToken: () => {},
  user: undefined,
  userId: undefined,
});
