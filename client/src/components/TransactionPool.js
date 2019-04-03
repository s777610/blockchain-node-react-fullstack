import React, { Component } from "react";
import Transaction from "./Transaction";
import { Link } from "react-router-dom";

class TransactionPool extends Component {
  state = { transactionPoolMap: {} };

  fetchTransactionPoolMap = () => {
    fetch("http://localhost:3000/api/transaction-pool-map")
      .then(response => response.json())
      .then(json => this.setState({ transactionPoolMap: json }));
  };

  componentDidMount() {
    this.fetchTransactionPoolMap();
  }

  render() {
    return (
      <div className="TransactionPool">
        <div>
          <Link to="/">Home</Link>
          <h3>Transaction Pool</h3>
          {Object.values(this.state.transactionPoolMap).map(transaction => {
            return (
              <div key={transaction.id}>
                <hr style={{ borderColor: "orange" }} />
                <Transaction transaction={transaction} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default TransactionPool;
