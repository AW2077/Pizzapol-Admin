import { createContext, useContext, useState } from 'react';
import React from 'react';
const SharedDataContext = createContext();

export const useSharedData = () => {
  return useContext(SharedDataContext);
};

export const SharedDataProvider = ({ children }) => {
  const [storeName, setStoreName] = useState();

  const updateStoreName = (newValue) => {
    setStoreName(newValue);
  };

  return (
    <SharedDataContext.Provider value={{ storeName, updateStoreName }}>
      {children}
    </SharedDataContext.Provider>
  );
};
