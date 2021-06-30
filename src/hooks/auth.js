/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';

import { axios } from '../plugins/axios';
import { useCookies } from 'react-cookie';

export const userAuth = () => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  // eslint-disable-next-line
  const [cookies, setCokies] = useCookies(['actk', 'rftk']);

  const local_actk = cookies['actk'];
  const local_rftk = cookies['rftk'];

  if (local_actk && local_rftk && !auth) {
    setAuth(true);
  }

  useEffect(() => {
    if (auth) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${local_actk}`;
    }
  }, [local_actk, auth, local_rftk, setAuth]);

  return {
    user,
    setUser,
    auth,
    setAuth,
  };
};
