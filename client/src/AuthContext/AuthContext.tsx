import { createContext, useState, ReactNode } from "react";

export type User = {
  id: string;
  username: string;
  email: string;
  posts: Post[];
  profilePicture: {
    name: string;
  }
};

export type Post = {
  id: string;
  description: string;
  file: {
    name: string;
    mimeType: string;
  };
  user: User;
  disableComments: boolean;
  disableLikes: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

type AuthContextType = {
  token: string | undefined;
  user: User | undefined;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
  clearToken: () => void;
};

export const AuthContext = createContext<AuthContextType>({ token: undefined, setToken: () => { }, clearToken: () => { }, user: undefined, setUser: () => { } });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | undefined>(localStorage.getItem('auth-token') ?? undefined);
  const [user, setUserState] = useState<User | undefined>(JSON.parse(localStorage.getItem('user') ?? '{}') ?? undefined);

  const setToken = (token: string) => {
    localStorage.setItem('auth-token', token);
    setTokenState(token);
  };

  const setUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUserState(user);
  };

  const clearToken = () => {
    localStorage.removeItem('auth-token');
    setTokenState(undefined);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, clearToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};