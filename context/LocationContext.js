// LocationContext.js

import React from 'react';

const LocationContext = React.createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = React.useState(null);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => React.useContext(LocationContext);

