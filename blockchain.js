const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, lastHash, data, hash } = chain[i];
      const actualLastHash = chain[i - 1].hash;
      const validatedHash = cryptoHash(timestamp, lastHash, data);

      if (lastHash !== actualLastHash) return false;
      if (validatedHash !== hash) return false;
    }

    return true;
  }

  replaceChain(chain) {
    if (chain.length <= this.chain.length) {
      console.log("The incoming chain must be longer");
      return;
    }
    if (!Blockchain.isValidChain(chain)) {
      console.log("The incoming chain must be valid");
      return;
    }

    console.log(`replacing chain with ${chain}`);
    this.chain = chain;
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data
    });
    this.chain.push(newBlock);
  }
}

module.exports = Blockchain;
