import React from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.scss';
import Header from './components/header/header';
import { CreateDidDocument } from './pages/create-did-document/create-did-document';
import { DidManagement } from './pages/did-management/did-management';
import { Holder } from './pages/holder/holder';
import Home from './pages/home/home';
import { Issuer } from './pages/issuer/issuer';
import { Verifier } from "./pages/verifier/verifier";
import {CreateVerifierRequest} from "./components/create-verifier-request/create-verifier-request";
import {SaveVerifierRequest} from "./components/save-verifier-request/save-verifier-request";

function App() {
  return (
    <>
      <Router>
        <Header></Header>

        <Switch>

          <Route path="/did-management">
            <div className="page-bg-blue">
              <div className="container">
                <DidManagement />
              </div>
            </div>
          </Route>

          <Route path="/issuer">
            <div className="page-bg-blue">
              <div className="container">
                <Issuer />
              </div>
            </div>
          </Route>

          <Route path="/create-did-document">
            <div className="page-bg-blue">
              <div className="container">
                <CreateDidDocument />
              </div>
            </div>
          </Route>

          <Route path="/holder">
            <div className="page-bg-pink">
              <div className="container">
                <Holder />
              </div>
            </div>
          </Route>

          <Route path="/verifier">
            <div className="page-bg-blue">
              <div className="container">
                <Verifier />
              </div>
            </div>
          </Route>
          <Route path="/create-verifier">
            <div className="page-bg-blue">
              <div className="container">
                <CreateVerifierRequest />
              </div>
            </div>
          </Route>
          <Route path="/save-verifier">
            <div className="page-bg-blue">
              <div className="container">
                <SaveVerifierRequest/>
              </div>
            </div>
          </Route>

          <Route path="/">
            <div className="page-bg-blue">
              <div className="container">
                <Home />
              </div>
            </div>
          </Route>

        </Switch>
      </Router>
    </>
  );
}

export default App;
