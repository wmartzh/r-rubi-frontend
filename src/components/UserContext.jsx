import React, { createContext, useContext } from 'react';
import { userAuth } from '../hooks/auth';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, setUser, auth } = userAuth();

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        auth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserValues = () => useContext(UserContext);
