import React from 'react';

import { Route } from 'react-router-dom';
import Login from '../pages/Login';

const RouterManager = () => {
  return (
    <>
      <Route exact path="/login" component={Login} />
    </>
  );
};

export default RouterManager;
