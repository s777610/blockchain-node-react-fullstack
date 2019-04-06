const express = require("express");
const request = require("request");
const path = require("path");

const bodyParser = require("body-parser");
const Blockchain = require("./models/blockchain");
const PubSub = require("./app/pubsub");
const TransactionPool = require("./models/wallet/transaction-pool");
const Wallet = require("./models/wallet");
const TransactionMiner = require("./app/transaction-miner");

const isDevelopment = process.env.ENV === "development";

const REDIS_URL = isDevelopment
  ? "redis://127.0.0.1:6379"
  : "redis://h:p39a592a03185795c8d675c530ed190424e4393da481cf6e3dc1a1f21aca78212@ec2-18-232-45-80.compute-1.amazonaws.com:15649";
const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

const app = express();
const blockchain = new Blockchain();
const transactionPool = new TransactionPool();
const wallet = new Wallet();
const pubsub = new PubSub({ blockchain, transactionPool, redisUrl: REDIS_URL });
const transactionMiner = new TransactionMiner({
  blockchain,
  transactionPool,
  wallet,
  pubsub
});

setTimeout(() => pubsub.broadcastChain(), 1500);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/dist")));

require("./routes/blockchain")(app, blockchain, pubsub);
require("./routes/wallet")(
  app,
  blockchain,
  transactionPool,
  wallet,
  transactionMiner,
  pubsub
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

const syncWithRootState = () => {
  request(
    { url: `${ROOT_NODE_ADDRESS}/api/blocks` },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const rootChain = JSON.parse(body);

        console.log("replace chain on a sync with", rootChain);
        blockchain.replaceChain(rootChain);
      }
    }
  );

  request(
    { url: `${ROOT_NODE_ADDRESS}/api/transaction-pool-map` },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const rootTransactionPoolMap = JSON.parse(body);

        console.log(
          "replace transaction pool map on a sync with",
          rootTransactionPoolMap
        );
        transactionPool.setMap(rootTransactionPoolMap);
      }
    }
  );
};

if (isDevelopment) {
  const walletFoo = new Wallet();
  const walletBar = new Wallet();

  const generateWalletTransaction = ({ wallet, recipient, amount }) => {
    const transaction = wallet.createTransaction({
      recipient,
      amount,
      chain: blockchain.chain
    });

    transactionPool.setTransaction(transaction);
  };

  const walletAction = () => {
    generateWalletTransaction({
      wallet,
      recipient: walletFoo.publicKey,
      amount: 5
    });
  };

  const walletFooAction = () => {
    generateWalletTransaction({
      wallet: walletFoo,
      recipient: walletBar.publicKey,
      amount: 10
    });
  };

  const walletBarAction = () => {
    generateWalletTransaction({
      wallet: walletBar,
      recipient: wallet.publicKey,
      amount: 15
    });
  };

  for (let i = 0; i < 10; i++) {
    if (i % 3 === 0) {
      walletAction();
      walletFooAction();
    } else if (i % 3 === 1) {
      walletAction();
      walletBarAction();
    } else {
      walletFooAction();
      walletBarAction();
    }

    transactionMiner.mineTransactions();
  }
}

let PEER_PORT;
if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = process.env.PORT || PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);

  if (PORT !== DEFAULT_PORT) {
    syncWithRootState();
  }
});
