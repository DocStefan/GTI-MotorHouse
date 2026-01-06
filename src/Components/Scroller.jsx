import React, { createContext, useContext } from 'react';

const ScrollContext = createContext();

export const useScroll = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }) => {
  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: "start" });
    }
  };

  return (
    <ScrollContext.Provider value={scrollToElement}>
      {children}
    </ScrollContext.Provider>
  );
};