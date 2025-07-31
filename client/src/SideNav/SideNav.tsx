import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';
import { SearchDrawer } from './SearchDrawer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDoorOpen,
  faHome,
  faMessage,
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
    navigate('/');
    clearToken();
  };

  const navigateToMessages = () => {
    navigate('/conversations');
  };

  const home = <FontAwesomeIcon size="xl" icon={faHome} />;
  const userIcon = <FontAwesomeIcon size="xl" icon={faUser} />;
  const addContentIcon = <FontAwesomeIcon size="xl" icon={faPlus} />;
  const searchIcon = <FontAwesomeIcon size="xl" icon={faSearch} />;
  const logOutIcon = <FontAwesomeIcon size="xl" icon={faDoorOpen} />;
  const messageIcon = <FontAwesomeIcon size="xl" icon={faMessage} />;

  return (
    <>
      <div className="w-1/6 min-w-[4em] border-r border-gray-300 flex flex-col items-start space-y-5 p-5">
        <button
          className="flex items-center gap-2 text-sm lg:text-base"
          onClick={navigateToHome}
        >
          <span className="sm:scale-75 md:scale-90 lg:scale-100">{home}</span>
          <span className="hidden sm:inline text-sm lg:text-base truncate max-w-[90px] md:max-w-[120px]">
            Home
          </span>
        </button>
        <button
          className="flex items-center gap-2 text-sm lg:text-base"
          onClick={navigateToUser}
        >
          <span className="sm:scale-75 md:scale-90 lg:scale-100">
            {userIcon}
          </span>
          <span className="hidden sm:inline text-sm lg:text-base truncate max-w-[90px] md:max-w-[120px]">
            Profile
          </span>
        </button>
        <button
          className="flex items-center gap-2 text-sm lg:text-base"
          onClick={navigateToMessages}
        >
          <span className="sm:scale-75 md:scale-90 lg:scale-100">
            {messageIcon}
          </span>
          <span className="hidden sm:inline text-sm lg:text-base truncate max-w-[90px] md:max-w-[120px]">
            Messages
          </span>
        </button>
        <button
          className="flex items-center gap-2 text-sm lg:text-base"
          onClick={toggleShowAddContent}
        >
          <span className="sm:scale-75 md:scale-90 lg:scale-100">
            {addContentIcon}
          </span>
          <span className="hidden sm:inline text-sm lg:text-base truncate max-w-[90px] md:max-w-[120px]">
            Add Content
          </span>
        </button>
        <button
          className="flex items-center gap-2 text-sm lg:text-base"
          onClick={toggleSideSearch}
        >
          <span className="sm:scale-75 md:scale-90 lg:scale-100">
            {searchIcon}
          </span>
          <span className="hidden sm:inline text-sm lg:text-base truncate max-w-[90px] md:max-w-[120px]">
            Search
          </span>
        </button>
        <button
          className="flex items-center gap-2 text-sm lg:text-base"
          onClick={logout}
        >
          <span className="sm:scale-75 md:scale-90 lg:scale-100">
            {logOutIcon}
          </span>
          <span className="hidden sm:inline text-sm lg:text-base truncate max-w-[90px] md:max-w-[120px]">
            Logout
          </span>
        </button>
      </div>
      {isSearchOpen && <SearchDrawer close={() => setIsSearchOpen(false)} />}
    </>
  );
};

export { SideNav };
