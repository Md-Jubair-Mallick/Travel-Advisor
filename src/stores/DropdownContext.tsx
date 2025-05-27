import { createContext, useContext, useState, type ReactNode } from 'react';

type DropdownContextType = {
  type: string;
  setType: (type: string) => void;
  rating: string;
  setRating: (rating: string) =>void;
};

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const DropdownProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('1');

  return (
    <DropdownContext.Provider value={{ type, setType, rating, setRating }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = (): DropdownContextType => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('useDropdown must be used within a DropdownProvider');
  }
  return context;
};
