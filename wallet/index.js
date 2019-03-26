const { STARTING_BALANCE } = require("../config");
const { ec, cryptoHash } = require("../util");
const Transaction = require("./transaction");

// Private Key: can be used to sign a signature
// Public Key: can be used to verify a signature

// Balance of Wallet is output of their most recent transaction + all currency sent to them after that transaction

class Wallet {
  constructor() {
    this.balance = STARTING_BALANCE;
    this.keyPair = ec.genKeyPair();
    // use encode("hex") to convert to hexadecimal value
    this.publicKey = this.keyPair.getPublic().encode("hex");
  }

  // data obj contains:
  // recipient: amount,
  // senderWallet.publicKey: senderWallet.balance - amount
  sign(data) {
    // use private key to generate signature for every transaction
    return this.keyPair.sign(cryptoHash(data)); // return a Signature
  }

  createTransaction({ amount, recipient, chain }) {
    if (chain) {
      this.balance = Wallet.calculateBalance({
        chain,
        address: this.publicKey
      });
    }

    if (amount > this.balance) {
      throw new Error("Amount exceeds balance");
    }

    return new Transaction({
      senderWallet: this,
      recipient,
      amount
    });
  }

  static calculateBalance({ chain, address }) {
    let outputsTotal = 0;

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];

      for (let transaction of block.data) {
        const addressOutput = transaction.outputMap[address];

        if (addressOutput) {
          outputsTotal = outputsTotal + addressOutput;
        }
      }
    }

    return STARTING_BALANCE + outputsTotal;
  }
}

module.exports = Wallet;
