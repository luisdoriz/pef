import React, { useContext } from 'react';
import {
  Route,
  Redirect,
} from "react-router-dom";

import Context from '../../../contexts/mainContext';

const PrivateRoute = ({ component, ...props }) => {
  const {
    mainData,
  } = useContext(Context.Consumer);
  const { auth } = mainData
  return (
    <Route
      {...props}
      render={({ location }) =>
      auth ? component() : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
