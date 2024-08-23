import { useState, useContext, createContext } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

//hook personalizado para acceder al contexto
const useSearch = () => useContext(SearchContext);

export { SearchProvider, useSearch };
