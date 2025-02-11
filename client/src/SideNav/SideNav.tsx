import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';

interface SideNavProps {
  toggleShowAddContent: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ toggleShowAddContent }) => {
  const { clearToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const navigateToUser = () => {
    navigate('/user');
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const logout = () => {
    clearToken();
  }

  return (
    <div className="w-1/6 border-r border-gray-300 flex flex-col items-start space-y-2 p-2">
      <button onClick={navigateToHome}>Go to Home Page</button>
      <button onClick={navigateToUser}>Go to User Page</button>
      <button onClick={toggleShowAddContent}>Add content</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export { SideNav };