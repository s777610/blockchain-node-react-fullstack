const uuid = require("uuid/v1");
const { verifySignature } = require("../../util");
const { REWARD_INPUT, MINING_REWARD } = require("../../config");

// Transaction has two properties:
// Input:
// - timestamp
// - amount: sender.balance
// - address: sender.publicKey
// - signature <-- Output data

// Output:
// - recipient address: amount
// - sender wallet address: sender.balance - amount

class Transaction {
  // recipient is recipient's public key
  constructor({ senderWallet, recipient, amount, outputMap, input }) {
    this.id = uuid();
    this.outputMap =
      outputMap || this.createOutputMap({ senderWallet, recipient, amount });
    this.input =
      input || this.createInput({ senderWallet, outputMap: this.outputMap });
  }

  // create Transaction's data
  createOutputMap({ senderWallet, recipient, amount }) {
    const outputMap = {};

    outputMap[recipient] = amount;
    outputMap[senderWallet.publicKey] = senderWallet.balance - amount;
    return outputMap;
  }

  createInput({ senderWallet, outputMap }) {
    return {
      timestamp: Date.now(),
      amount: senderWallet.balance, // before sending amount
      address: senderWallet.publicKey,
      // wallet can use its private key to sign a signature
      signature: senderWallet.sign(outputMap)
    };
  }

  update({ senderWallet, recipient, amount }) {
    if (amount > this.outputMap[senderWallet.publicKey]) {
      throw new Error("Amount exceeds balance");
    }

    if (!this.outputMap[recipient]) {
      this.outputMap[recipient] = amount;
    } else {
      this.outputMap[recipient] += amount;
    }

    this.outputMap[senderWallet.publicKey] -= amount;
    // createInput() will sign new signature
    this.input = this.createInput({ senderWallet, outputMap: this.outputMap });
  }

  static validTransaction(transaction) {
    const { input, outputMap } = transaction;
    const { address, amount, signature } = input;

    // outputTotal is senderWallet.balance before sending money
    const outputTotal = Object.values(outputMap).reduce(
      (total, outputAmount) => {
        return total + outputAmount;
      }
    );

    if (amount !== outputTotal) {
      console.error(`Invalid transaction from ${address}`);
      return false;
    }

    if (!verifySignature({ publicKey: address, data: outputMap, signature })) {
      console.error(`Invalid signature from ${address}`);
      return false;
    }
    return true;
  }

  static rewardTransaction({ minerWallet }) {
    return new this({
      input: REWARD_INPUT,
      outputMap: { [minerWallet.publicKey]: MINING_REWARD }
    });
  }
}

module.exports = Transaction;
