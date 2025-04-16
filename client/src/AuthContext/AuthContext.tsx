import { createContext, ReactNode, useState } from "react";

type AuthContextType = {
  token: string | undefined;
  user?: string;
  setToken: (token: string) => void;
  clearToken: () => void;
  setUserState: (user: string) => void;
};

export const AuthContext = createContext<AuthContextType>({ token: undefined, setToken: () => { }, clearToken: () => { }, user: undefined, setUserState: () => { } });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | undefined>(localStorage.getItem('auth-token') ?? undefined);
  const [user, setUserState] = useState<string | undefined>();

  const setToken = (token: string) => {
    localStorage.removeItem('auth-token');
    localStorage.setItem('auth-token', token);
    setTokenState(token);
  };

  const clearToken = () => {
    localStorage.removeItem('auth-token');
    setUserState(undefined);
    setTokenState(undefined);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, clearToken, user, setUserState }}>
      {children}
    </AuthContext.Provider>
  );
};