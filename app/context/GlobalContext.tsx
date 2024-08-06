import dynamic from "next/dynamic";
import React, { createContext, useState, ReactNode, useMemo } from "react";
import LoadingSpinner from "../components/Loader/Loader";

interface GlobalContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  setActiveItem: (activeItem: number) => void;
  route: string;
  setRoute: (route: string) => void;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}


export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<number>(1);
  const [route, setRoute] = useState<string>("Home");

  // Use useMemo to memoize context value, preventing unnecessary re-renders
  const value = useMemo(
    () => ({
      open,
      setOpen,
      activeItem,
      setActiveItem,
      route,
      setRoute,
    }),
    [open, activeItem, route]
  );

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};
