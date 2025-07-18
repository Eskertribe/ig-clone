import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';
import { SearchDrawer } from './SearchDrawer';

interface SideNavProps {
  toggleShowAddContent: () => void;
}

const SideNav: React.FC<SideNavProps> = ({ toggleShowAddContent }) => {
  const { user, clearToken } = useContext(AuthContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const navigateToUser = () => {
    navigate(`/user/${user}`);
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const toggleSideSearch = () => {
    setIsSearchOpen((value) => !value);
  };

  const logout = () => {
    clearToken();
  };

  return (
    <>
      <div className="w-1/6 border-r border-gray-300 flex flex-col items-start space-y-2 p-2">
        <button onClick={navigateToHome}>Go to Home Page</button>
        <button onClick={navigateToUser}>Go to User Page</button>
        <button onClick={toggleShowAddContent}>Add content</button>
        <button onClick={toggleSideSearch}>Search</button>
        <button onClick={logout}>Logout</button>
      </div>
      {isSearchOpen && <SearchDrawer close={() => setIsSearchOpen(false)} />}
    </>
  );
};

export { SideNav };
