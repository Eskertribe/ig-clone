import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SideNavProps {
  toggleShowAddContent: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ toggleShowAddContent }) => {
  const navigate = useNavigate();

  const navigateToUser = () => {
    navigate('/user');
  };

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <div className="w-1/6 border-r border-gray-300 flex flex-col items-start space-y-2 p-2">
      <button onClick={navigateToHome}>Go to Home Page</button>
      <button onClick={navigateToUser}>Go to User Page</button>
      <button onClick={toggleShowAddContent}>Add content</button>
    </div>
  );
};

export { SideNav };