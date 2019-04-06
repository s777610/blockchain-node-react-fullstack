const Wallet = require("../models/wallet");

module.exports = (
  app,
  blockchain,
  transactionPool,
  wallet,
  transactionMiner,
  pubsub
) => {
  app.post("/api/transact", (req, res) => {
    const { amount, recipient } = req.body;
    // check if transaction inside transactionPool
    let transaction = transactionPool.existingTransaction({
      inputAddress: wallet.publicKey
    });

    try {
      if (transaction) {
        transaction.update({ senderWallet: wallet, recipient, amount });
      } else {
        transaction = wallet.createTransaction({
          recipient,
          amount,
          chain: blockchain.chain
        });
      }
    } catch (error) {
      return res.status(400).json({ type: "error", message: error.message });
    }

    transactionPool.setTransaction(transaction);

    pubsub.broadcastTransaction(transaction);

    res.json({ type: "success", transaction });
  });

  app.get("/api/transaction-pool-map", (req, res) => {
    res.json(transactionPool.transactionMap);
  });

  app.get("/api/mine-transactions", (req, res) => {
    transactionMiner.mineTransactions();

    res.redirect("/api/blocks");
  });

  app.get("/api/wallet-info", (req, res) => {
    const address = wallet.publicKey;
    res.json({
      address,
      balance: Wallet.calculateBalance({
        chain: blockchain.chain,
        address
      })
    });
  });

  app.get("/api/known-addresses", (req, res) => {
    const addressMap = {};

    for (let block of blockchain.chain) {
      for (let transaction of block.data) {
        const recipients = Object.keys(transaction.outputMap);

        recipients.forEach(recipient => (addressMap[recipient] = recipient));
      }
    }

    res.json(Object.keys(addressMap));
  });
};
