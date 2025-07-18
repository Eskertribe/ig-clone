import { ReactNode, useState } from 'react';
import { SearchContext } from './SearchContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isSearchopen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchopen);
  };

  return (
    <SearchContext.Provider value={{ isSearchopen, toggleSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
