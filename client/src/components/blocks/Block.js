import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Transaction from "../transactions/Transaction";

class Block extends Component {
  state = {
    displayTransaction: false
  };

  toggleTransaction = () => {
    this.setState({ displayTransaction: !this.state.displayTransaction });
  };

  // This method becomes a property
  get displayTransaction() {
    const { data } = this.props.block;
    const stringifiedData = JSON.stringify(data);

    const dataDisplay =
      stringifiedData.length > 35
        ? `${stringifiedData.substring(0, 35)}...`
        : stringifiedData;

    if (this.state.displayTransaction) {
      return (
        <div>
          {data.map(transaction => {
            return (
              <div key={transaction.id}>
                <hr />
                <Transaction transaction={transaction} />
              </div>
            );
          })}
          <br />
          <Button variant="danger" size="sm" onClick={this.toggleTransaction}>
            Show Less
          </Button>
        </div>
      );
    }

    return (
      <div>
        Data: {dataDisplay}
        <Button variant="danger" size="sm" onClick={this.toggleTransaction}>
          Show More
        </Button>
      </div>
    );
  }

  render() {
    const { timestamp, hash } = this.props.block;
    const hashDisplay = `${hash.substring(0, 15)}...`;

    return (
      <div className className="Block">
        <div>Hash: {hashDisplay}</div>
        <div>Timestamp: {new Date(timestamp).toLocaleString()}</div>
        {this.displayTransaction}
      </div>
    );
  }
}

export default Block;
