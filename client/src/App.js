import './App.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap-grid.min.css";

import Applications from './Applications';
import Inscription from './Inscription';
import Login from './Login';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
          <Switch>
            <Route path="/applications">
              <Applications />
            </Route>
            <Route path="/inscription">
              <Inscription />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>

  );
}

export default App;
