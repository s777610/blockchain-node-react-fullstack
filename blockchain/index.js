const Block = require("./block");
const { cryptoHash } = require("../util");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, lastHash, data, hash, nonce, difficulty } = chain[i];
      const actualLastHash = chain[i - 1].hash;
      const lastDifficulty = chain[i - 1].difficulty;

      const validatedHash = cryptoHash(
        timestamp,
        lastHash,
        data,
        nonce,
        difficulty
      );

      if (lastHash !== actualLastHash) return false;
      if (validatedHash !== hash) return false;
      if (Math.abs(lastDifficulty - difficulty) > 1) {
        // prevent bad guys to decrease/increase difficulty
        return false;
      }
    }

    return true;
  }

  replaceChain(chain, onSuccess) {
    if (chain.length <= this.chain.length) {
      console.error("The incoming chain must be longer");
      return;
    }
    if (!Blockchain.isValidChain(chain)) {
      console.error("The incoming chain must be valid");
      return;
    }

    if (onSuccess) onSuccess();
    console.log("replacing chain with", chain);
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
