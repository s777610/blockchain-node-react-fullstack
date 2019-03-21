const { STARTING_BALANCE } = require("../config");
const { ec } = require("../util");
const cryptoHash = require("../util/crypto-hash");

class Wallet {
  constructor() {
    this.balance = STARTING_BALANCE;
    this.keyPair = ec.genKeyPair();

    // use encode("hex") to convert to hexadecimal value
    this.publicKey = this.keyPair.getPublic().encode("hex");
  }

  // return a Signature
  sign(data) {
    return this.keyPair.sign(cryptoHash(data));
  }
}

module.exports = Wallet;
