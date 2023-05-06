import React, { useState, createContext, useContext } from "react";

const AppContext = createContext({});

const selectedFiltersInitialValue = {
  color: {
    Red: true,
    Green: false,
    Blue: false,
  },
  gender: {
    Men: false,
    Women: false,
  },
  price: {
    "0-Rs250": false,
    "Rs251-Rs450": false,
    Rs450: false,
  },
  type: {
    Polo: false,
    Hoodie: false,
    Basic: false,
  },
};

const AppProvider = ({ children }) => {
  const [cartItemList, setCartItemList] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState(
    selectedFiltersInitialValue
  );

  console.log({ cartItemList });

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
