import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class ConductTransaction extends Component {
  state = {
    recipient: "",
    amount: 0
  };

  updateRecipient = event => {
    this.setState({ recipient: event.target.value });
  };

  updateAmount = event => {
    this.setState({ amount: Number(event.target.value) });
  };

  conductTransaction = () => {
    const { recipient, amount } = this.state;

    fetch("http://localhost:3000/api/transact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipient, amount })
    })
      .then(response => response.json())
      .then(json => {
        // message would be undefined in case of seccuss, then type is success
        alert(json.message || json.type);
      });
  };

  render() {
    return (
      <div className="ConductTransaction">
        <Link to="/">Home</Link>
        <h3>Conduct a Transaction</h3>
        <Form.Group>
          <Form.Control
            input="text"
            placeholder="recipient"
            value={this.state.recipient}
            onChange={this.updateRecipient}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
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
