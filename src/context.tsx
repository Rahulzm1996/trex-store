import React, { useState, createContext, useContext } from "react";

import { IAppProvider, ICartItem } from "./types";
import { selectedFiltersInitialValue } from "./constants";

const AppContext = createContext<IAppProvider>({
  cartItemList: [],
  selectedFilters: selectedFiltersInitialValue,
  setCartItemList: () => null,
  setSelectedFilters: () => null,
});

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItemList, setCartItemList] = useState<Array<ICartItem>>([]);
  const [selectedFilters, setSelectedFilters] = useState(
    selectedFiltersInitialValue
  );

  return (
    <AppContext.Provider
      value={{
        cartItemList,
        selectedFilters,
        setCartItemList,
        setSelectedFilters,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
