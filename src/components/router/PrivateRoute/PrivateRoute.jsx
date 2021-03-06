import React, { useEffect } from 'react';
import {
  Route,
  Redirect,
} from "react-router-dom";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import useAuth from '../../../hooks/Auth';

const PrivateRoute = ({ component, ...props }) => {
  const { loading, checkAuth, auth, user, facilities } = useAuth()
  useEffect(() => {
    const init = async () => checkAuth()
    if (loading) {
      init()
    }
  }, [loading, checkAuth, auth])
  if (loading) {
    const antIcon = (<LoadingOutlined style={{ fontSize: 24 }} spin />);
    return (
      <Spin style={{
        justifyContent: "center",
        width: "100%",
        height: "80%",
        marginTop: "20%",
      }}
      indicator={antIcon} />
    )
  }
  return (
    <Route
      {...props}
      render={({ location }) =>
        auth ? component({ user, facilities }) : (
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
