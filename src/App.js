import { BrowserRouter as Router, Switch } from "react-router-dom";
import "antd/dist/antd.css";

import Context from "./contexts/mainContext";
import Core from "./views/Core";
import Login from "./views/Login";
import PrivateRoute from "./components/router/PrivateRoute";
import PublicRoute from "./components/router/PublicRoute";

import "./styles/core.css";

const App = () => {
  return (
    <Router>
      <Context.Provider>
        <Switch>
          <PublicRoute path="/login">
            <Login />
          </PublicRoute>
          <PrivateRoute path="/" component={Core} />
        </Switch>
      </Context.Provider>
    </Router>
  );
};

export default App;
