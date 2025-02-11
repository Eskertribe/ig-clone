import { createContext, useState, ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
};

export const AuthContext = createContext<AuthContextType>({ token: null, setToken: () => { }, clearToken: () => { } });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(localStorage.getItem('auth-token'));

  const setToken = (token: string) => {
    localStorage.setItem('auth-token', token);
    setTokenState(token);
  };

  const clearToken = () => {
    localStorage.removeItem('auth-token');
    setTokenState(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};