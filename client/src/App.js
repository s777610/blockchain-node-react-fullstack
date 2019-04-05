import { Router, Switch, Route } from "react-router-dom";
import history from "./history";
import Home from "./components/Home";
import Blocks from "./components/blocks/Blocks";
import ConductTransaction from "./components/transactions/ConductTransaction";
import TransactionPool from "./components/transactions/TransactionPool";
import AppNavbar from "./components/layout/Navbar";

import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <AppNavbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/blocks" component={Blocks} />
          <Route path="/conduct-transaction" component={ConductTransaction} />
          <Route path="/transaction-pool" component={TransactionPool} />
        </Switch>
      </Router>
    );
  }
}

export default App;
