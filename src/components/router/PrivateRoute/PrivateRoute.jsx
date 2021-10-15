import React, { useEffect } from 'react';
import {
  Route,
  Redirect,
} from "react-router-dom";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import useAuth from '../../../hooks/Auth';

const PrivateRoute = ({ component, ...props }) => {
  const { loading, checkAuth, auth } = useAuth()
  useEffect(() => {
    const init = async () => checkAuth()
    if (loading) {
      init()
    }
  }, [loading, checkAuth, auth])
  console.log(loading, auth)
  if (loading) {
    const antIcon = (<LoadingOutlined style={{ fontSize: 24 }} spin />);
    return (
      <Spin indicator={antIcon} />
    )
  }
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
