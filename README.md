# blockchain-node-react-fullstack
This full-stack application is about cryptocurrency. The back-end was built by Node/Express. The front-end was built by React, React-Bootstrap, and CSS3. This app allows users to conduct transactions, which is sending and receiving cryptocurrency. In addition, users can mine the new block in order to receive the reward. Feel free to clone it and play around with it.


## Installation
### Clone the repo
```
git clone https://github.com/s777610/blockchain-node-react-fullstack.git
```

### Install all packages
```
npm install
```

### Start the application
```
npm run dev
```
Go to http://localhost:3000/

### Run the test suite
```
npm run test
```

<br>
<br>

## Home Page
<img width="995" alt="Screen Shot 2019-04-06 at 12 24 46 AM" src="https://user-images.githubusercontent.com/35472776/55666357-a6047680-5802-11e9-9fc5-2f72c1c72ad5.png">

<br>
<br>

## Blockchain Page
<img width="990" alt="Screen Shot 2019-04-06 at 12 24 57 AM" src="https://user-images.githubusercontent.com/35472776/55666359-a866d080-5802-11e9-817a-c350da8be571.png">


<br>
<br>

## Conduct Transactions Page
<img width="981" alt="Screen Shot 2019-04-06 at 12 25 14 AM" src="https://user-images.githubusercontent.com/35472776/55666360-aac92a80-5802-11e9-9b3a-2bb76aa9cbd5.png">



## Proof of Work (Mining)
> The meaning of "Proof of work" is that users have to contribute the entire system by providing their computing power to find the solve the puzzle in order to help the system to record data securely. After that, users would receive the money in return.

<br>
<br>


## Sharing Resources: 
### Pub/Sub Pattern:
> Using Redis pub/sub to power the peer to peer network in this blockchain application. The publisher and subscriber pattern allows multiple blockchains to interact with each other. By doing so, it makes sure all the blockchains are synchronized across the network.

### Broadcast: 
> When one blockchain adds a new block, we want that blockchain to publish the new version of the chain to the entire network. By doing so, all subscribed blockchain instances of application will get that new block data. After that, they can check if the new chain is valid or not and update their own chain or not. It Synchronizes chains when new peers connected to the network as well. In addition, it Optimizes the implementation to avoid redundant interaction.


<br>
<br>

## Security:
### Chain Validation:
> Chain validation is the process of inspecting the blockchain and checking if each block has been constructed correctly. The block must have right properties such as timestamp, data, hash, last hash, nonce, and difficulty. In addition, the last hash of block must be the same as the previous block's hash. Moreover, the hash of the block must be valid. Using SHA-256, which is a one-way function, to hash the data in order to secure data in every block.

### Public/Private Keys:
> Every node in the system has a wallet. The wallet has a pair of keys, public key, and private key. The public is the address of the wallet. The private key allows users to generate unique digital signatures. Users have to use their private to sign the transaction to make the transaction valid. The public keys can be used for verifying and decrypting the signatures and read the original data behind it. Generate key pair with elliptic by the secp256k1 algorithm.
#### Note: Private + Transaction Data = Signature

### Balance Calculation
> Each node in the system has a wallet with its balance. The balance can be calculated by looking at the history of transactions in the blockchain. In short, the balance of the wallet is the output of their most recent transaction plus all the currency sent to them through all subsequent transactions after that.

<br>
<br>


## Architecture
```
├── README.md
├── app
│   ├── pubsub.js
│   └── transaction-miner.js
├── client
│   ├── dist
│   │   ├── index.html
│   │   ├── logo.e9a9c890.png
│   │   ├── src.e31bb0bc.css
│   │   ├── src.e31bb0bc.css.map
│   │   ├── src.e31bb0bc.js
│   │   └── src.e31bb0bc.js.map
│   └── src
│       ├── App.js
│       ├── assets
│       │   └── logo.png
│       ├── components
│       │   ├── Home.js
│       │   ├── blocks
│       │   │   ├── Block.js
│       │   │   └── Blocks.js
│       │   ├── layout
│       │   │   └── Navbar.js
│       │   └── transactions
│       │       ├── ConductTransaction.js
│       │       ├── Transaction.js
│       │       └── TransactionPool.js
│       ├── history.js
│       ├── index.css
│       ├── index.html
│       └── index.js
├── config.js
├── index.js
├── models
│   ├── blockchain
│   │   ├── block.js
│   │   ├── block.test.js
│   │   ├── index.js
│   │   └── index.test.js
│   └── wallet
│       ├── index.js
│       ├── index.test.js
│       ├── transaction-pool.js
│       ├── transaction-pool.test.js
│       ├── transaction.js
│       └── transaction.test.js
├── package-lock.json
├── package.json
├── routes
│   ├── blockchain.js
│   └── wallet.js
├── script
│   └── average-work.js
└── util
    ├── crypto-hash.js
    ├── crypto-hash.test.js
    └── index.js
```

