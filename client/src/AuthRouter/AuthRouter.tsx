import React, { FC, ReactElement, useContext } from 'react';
import { Login } from '../Login/Login';
import { AuthContext } from '../AuthContext/AuthContext';

const AuthRouter: FC<{ children: ReactElement }> = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token?.length) {
    return <Login />;
  }

  return children;
};

export { AuthRouter };
