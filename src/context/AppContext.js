import React, { createContext, useState } from 'react';

// Create the context
const AppContext = createContext();

// Create the provider component
const AppProvider = ({ children }) => {
  // auth state — initially null or empty
  const [auth, setAuth] = useState({
    id: null,
    username: ''
  });

  return (
    <AppContext.Provider value={{ auth, setAuth }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
