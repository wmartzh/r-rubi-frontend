import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUserValues } from '../components/UserContext';

export const ProtectedRoute = ({ component: Component, ...args }) => {
  const { auth } = useUserValues();

  return (
    <Route
      {...args}
      render={(props) =>
        auth ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};
