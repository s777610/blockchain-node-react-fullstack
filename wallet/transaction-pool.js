const Transaction = require("./transaction");

class TransactionPool {
  constructor() {
    this.transactionMap = {};
  }

  setTransaction(transaction) {
    this.transactionMap[transaction.id] = transaction;
  }

  setMap(transactionMap) {
    this.transactionMap = transactionMap;
  }

  // inputAddress is wallet.publicKey from sender
  existingTransaction({ inputAddress }) {
    // transactions is a list of transaction
    const transactions = Object.values(this.transactionMap);

    return transactions.find(transaction => {
      return transaction.input.address === inputAddress;
    });
  }

  validTransactions() {
    return Object.values(this.transactionMap).filter(transaction => {
      return Transaction.validTransaction(transaction);
    });
  }
}

module.exports = TransactionPool;
