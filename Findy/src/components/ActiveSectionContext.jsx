import { createContext, useState, useContext } from "react";

const ActiveSectionContext = createContext();

export const useActiveSection = () => useContext(ActiveSectionContext);

export const ActiveSectionProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState("photos"); // Valor predeterminado

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
};
