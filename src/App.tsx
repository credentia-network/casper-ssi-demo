import React from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.scss';
import Header from './components/header/header';
import { CreateDidDocument } from './pages/create-did-document/create-did-document';
import { DidManagement } from './pages/did-management/did-management';
import Home from './pages/home/home';
import { Issuer } from './pages/issuer/issuer';

function App() {
  return (
    <>
      <Header></Header>
      <Router>
        <div className="app-wrapper w-100">
          <div className="container">
            <Switch>
              <Route path="/did-management">
                <DidManagement />
              </Route>
              <Route path="/issuer">
                <Issuer />
              </Route>
              <Route path="/create-did-document">
                <CreateDidDocument />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;