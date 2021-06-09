import './App.css';
import React from 'react';


import Applications from './Applications';
import Inscription from './Inscription';
import Admin from './Admin';
import Login from './Login';
import NewApplication from './NewApplication';
import Resultat from './Resultat';
import Equipe from './Equipe';
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
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/newApplication">
              <NewApplication />
            </Route>
            <Route path="/resultat">
              <Resultat />
            </Route>
            <Route path="/equipe">
              <Equipe />
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
