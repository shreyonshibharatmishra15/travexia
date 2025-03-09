
import React, { createContext, useContext, useState, ReactNode } from 'react';

type LocationContextType = {
  currentLocation: string;
  setCurrentLocation: (location: string) => void;
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState('Kitchener-Waterloo');

  return (
    <LocationContext.Provider value={{ currentLocation, setCurrentLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
