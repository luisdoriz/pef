import React from 'react'
import {
  Switch,
  Route,
} from "react-router-dom";
import { Layout } from 'antd';

import getRoutes from '../../constants/privateViews';
import Sidebar from '../../components/core/Sidebar';

const { Content } = Layout;


const CoreView = ({ user }) => {
  const { idRole } = user;
  const views = getRoutes(idRole)
  return (
    <Layout>
      <Sidebar user={user} />
      <Layout>
        <Content style={{ marginLeft: 200, padding: 24, overflow: "auto"}}>
          <Switch>
            {views.map(({ path, component }) => (
              <Route path={path} component={() => component({ user })} />
            ))}
            <Route exact path={"/"}>
              <h3>Please select a topic.</h3>
            </Route>
            <Route path="*">
              <h1>404 NOT FOUND</h1>
            </Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

export default CoreView
