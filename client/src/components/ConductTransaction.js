import React, { Component } from "react";
import { Form } from "react-bootstrap";
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

  render() {
    console.log("this.state", this.state);

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
      </div>
    );
  }
}

export default ConductTransaction;
