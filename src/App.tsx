import React from 'react';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.scss';
import { signedin } from './common/actions/signedin-action';
import { signoutAction } from './common/actions/signout-action';
import { store } from './common/store';
import CreateVerifierRequest from "./pages/create-verifier-request/create-verifier-request";
import Header from './components/header/header';
import { CreateDidDocument } from './pages/create-did-document/create-did-document';
import DidManagement from './pages/did-management/did-management';
import { Holder } from './pages/holder/holder';
import Home from './pages/home/home';
import { Issuer } from './pages/issuer/issuer';
import { Verifier } from "./pages/verifier/verifier";

export class App extends React.Component {

  componentDidMount() {
    window.addEventListener('signer:locked', () => this.onLogoutEvent());
    window.addEventListener('signer:activeKeyChanged', () => this.onLogoutEvent());

    window.addEventListener('signer:unlocked', (event: any) => {
      if (event.detail.activeKey) {
        store.dispatch(signedin(event.detail.activeKey));
      }
    });
  }

  onLogoutEvent() {
    store.dispatch(signoutAction());
    window.location.href = '/';
  }

  render() {
    return (
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

          <Route path="/">
            <div className="page-bg-blue">
              <div className="container">
                <Home />
              </div>
            </div>
          </Route>

        </Switch>
      </Router>
    );
  }
}

export default App;
