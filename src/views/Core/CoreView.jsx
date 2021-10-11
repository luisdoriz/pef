import React from 'react'
import {
  Switch,
  Route,
} from "react-router-dom";
import { Layout } from 'antd';

import views from '../../constants/privateViews';
import Sidebar from '../../components/core/Sidebar';

const { Content } = Layout;


const CoreView = () => {
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Content style={{ marginLeft: 200, padding: 24}}>
          <Switch>
            <Route exact path={"/"}>
              <h3>Please select a topic.</h3>
            </Route>
            {views.map(({ path, component }) => (
              <Route path={path} component={component} />
            ))}
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

export default CoreView
