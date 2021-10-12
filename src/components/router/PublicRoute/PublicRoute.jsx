import React, { useContext } from 'react';
import {
  Route,
  Redirect,
} from "react-router-dom";

import Context from '../../../contexts/mainContext';

const PublicRoute = ({ children, ...props }) => {
  const {
    mainData,
  } = useContext(Context.Consumer);
  const { auth } = mainData
  return (
    <Route
      {...props}
      render={({ location }) =>
        !auth ? children : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default PublicRoute
