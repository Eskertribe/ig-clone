import { createContext } from 'react';

type SearchContextType = {
  isSearchopen: boolean;
  toggleSearch: () => void;
};

export const SearchContext = createContext<SearchContextType>({
  isSearchopen: false,
  toggleSearch: () => {},
});
