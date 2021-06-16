/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';

export const userAuth = () => {
  const [user, setUser]  = useState({})
  
  const [auth, setAuth] = useState({});

  
  return {
    user,
    setUser,
    auth,
  };
};
