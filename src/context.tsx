import React, { useState, createContext, useContext } from "react";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [cartItemList, setCartItemList] = useState([]);

  console.log({ cartItemList });

  return (
    <AppContext.Provider value={{ cartItemList, setCartItemList }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
