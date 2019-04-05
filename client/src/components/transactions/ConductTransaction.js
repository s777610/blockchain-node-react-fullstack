import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

import history from "../../history";

class ConductTransaction extends Component {
  state = {
    recipient: "",
    amount: 0,
    knownAddresses: []
  };

  componentDidMount() {
    fetch(`${document.location.origin}/api/known-addresses`)
      .then(response => response.json())
      .then(json => this.setState({ knownAddresses: json }));
  }

  updateRecipient = event => {
    this.setState({ recipient: event.target.value });
  };

  updateAmount = event => {
    this.setState({ amount: Number(event.target.value) });
  };

  conductTransaction = () => {
    const { recipient, amount } = this.state;

    fetch(`${document.location.origin}/api/transact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipient, amount })
    })
      .then(response => response.json())
      .then(json => {
        // message would be undefined in case of seccuss, then type is success
        alert(json.message || json.type);
        history.push("/transaction-pool");
      });
  };

  render() {
    return (
      <div className="ConductTransaction">
        <h3 className="pageTitle">Conduct a Transaction</h3>
        <br />
        <h4 className="highline">Known Addresses</h4>
        {this.state.knownAddresses.map(knownAddress => {
          return (
            <div key={knownAddress}>
              <div>{knownAddress}</div>
              <br />
            </div>
          );
        })}
        <br />
        <Form.Group>
          <Form.Control
            className="inputField"
            input="text"
            placeholder="recipient"
            value={this.state.recipient}
            onChange={this.updateRecipient}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            className="inputField"
            input="number"
            placeholder="amount"
            value={this.state.amount}
            onChange={this.updateAmount}
          />
        </Form.Group>
        <div>
          <Button variant="danger" onClick={this.conductTransaction}>
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default ConductTransaction;
