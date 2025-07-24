import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';
import { SearchDrawer } from './SearchDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDoorOpen,
  faHome,
  faPlus,
  faSearch,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

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

  const home = <FontAwesomeIcon size="xl" icon={faHome} />;
  const userIcon = <FontAwesomeIcon size="xl" icon={faUser} />;
  const addContentIcon = <FontAwesomeIcon size="xl" icon={faPlus} />;
  const searchIcon = <FontAwesomeIcon size="xl" icon={faSearch} />;
  const logOutIcon = <FontAwesomeIcon size="xl" icon={faDoorOpen} />;

  return (
    <>
      <div className="w-1/6 border-r border-gray-300 flex flex-col items-start space-y-5 p-5">
        <button onClick={navigateToHome}>{home} Home</button>
        <button onClick={navigateToUser}>{userIcon} Profile</button>
        <button onClick={toggleShowAddContent}>
          {addContentIcon} Add Content
        </button>
        <button onClick={toggleSideSearch}>{searchIcon} Search</button>
        <button onClick={logout}>{logOutIcon} Logout</button>
      </div>
      {isSearchOpen && <SearchDrawer close={() => setIsSearchOpen(false)} />}
    </>
  );
};

export { SideNav };
