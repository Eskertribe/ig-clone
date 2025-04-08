import { FC, ReactElement, useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { Login } from '../Login/Login';
import { jwtDecode } from 'jwt-decode';

const AuthRouter: FC<{ children: ReactElement }> = ({ children }) => {
  const { token } = useContext(AuthContext);

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  if (!token?.length) {
    return <Login />;
  }

  if (isTokenExpired(token)) {
    return <Login />;
  }

  return children;
};

export { AuthRouter };
