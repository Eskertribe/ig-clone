import { StrictMode, createContext, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';

import './index.css'
import App from './App.tsx'

type ContextType = {
  user?: { username: string, email: string } | null;
  setUser?: (user: any) => void;
};

const UserContext = createContext<ContextType>({});

import { ReactNode } from 'react';

const UserProvider: any = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ username: string, email: string } | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserProvider>
        <App />
      </UserProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);

export { UserContext };