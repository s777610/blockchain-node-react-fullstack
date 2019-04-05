import React, { Component } from "react";
import logo from "../assets/logo.png";

class Home extends Component {
  state = { walletInfo: {} };

  componentDidMount() {
    fetch(`${document.location.origin}/api/wallet-info`)
      .then(response => response.json())
      .then(json => this.setState({ walletInfo: json }));
  }

  render() {
    const { address, balance } = this.state.walletInfo;

    return (
      <div className="App">
        <img className="logo" src={logo} />
        <br />
        <h3>Welcome to the blockchain...</h3>
        <br />
        <div className="WalletInfo">
          <div>
            <span className="highline">Address: </span>
            {address}
          </div>
          <br />
          <div>
            <span className="highline">Balance: </span>
            {balance}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
