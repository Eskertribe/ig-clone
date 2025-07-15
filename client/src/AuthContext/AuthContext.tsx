import { createContext } from 'react';

type AuthContextType = {
  token: string | undefined;
  user?: string;
  setAuthState: (token: string, username: string) => void;
  clearToken: () => void;
  setUserState: (user: string) => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: undefined,
  setAuthState: () => {},
  clearToken: () => {},
  user: undefined,
  setUserState: () => {},
});
