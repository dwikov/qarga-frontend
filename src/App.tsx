import * as React from "react";
import * as ReactDOM from "react-dom";
import { AuthProvider } from "./Services/Firebase/provider/AuthProvider";
import Login from "./Scenes/Login";
import Dashboard from "./Scenes/Dashboard";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function App() {
  
  return <AuthProvider>
      <Router>
        <Switch>
            <Route path="/dashboard">
              <Dashboard/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/">
              <Redirect to="/login"/>
            </Route>
        </Switch>
      </Router>
  </AuthProvider>
}

export default App;
