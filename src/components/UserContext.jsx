import React, { createContext, useContext, useEffect } from 'react';
import { userAuth } from '../hooks/auth';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, setUser, auth, setAuth } = userAuth();
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      localStorage.removeItem('actk');
      localStorage.removeItem('rftk');
      setUser({});
      setAuth(false);
    }
    return () => (mounted = false);
  }, [setAuth, setUser]);
  
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        auth,
        setAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserValues = () => useContext(UserContext);
