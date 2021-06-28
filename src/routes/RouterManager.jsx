import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { ProtectedRoute } from './ProtectedRoute';
import { globalRoutes } from './globalRoutes';
import { useUserValues } from '../components/UserContext';

const RouterManager = () => {
  const {auth} = useUserValues()
  return (
    <>
    {!auth ?
      <>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      </>
      : <Redirect to="/"></Redirect> 
  }

      {globalRoutes.map(({ path, component: Component }) => (
        <ProtectedRoute key={path} exact path={path} component={(props) => <Component />} />
      ))}
    </>
  );
};

export default RouterManager;
