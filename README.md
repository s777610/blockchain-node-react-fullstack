# blockchain-node-react-fullstack

## Back End
1. Using SHA-256, which is a one-way function, to hash the data

2. Using redis pub/sub to power the peer to peer network in this
blockchain application. The publisher and subscriber pattern allows multiple blockchains interact each other. By doing so, it makes sure all the blockchains are synchronized across the network.

3. When one blockchain adds a new block, we want that blockchain to publish the new version of the chain to the entire network. By doing so, all subscribed blockchain instances of application will get that new block data. After that, they can check if the new chain is valid or not and update their own chain or not. It Synchronizes chains when new peers connected to the network as well. In addition, it Optimizes the implementation to avoid redundant interaction.

4. Use elliptic to generate key pair. Use secp256k1 algorithm.

## Front End
1. Install parcel-bundler, and use it to bundler and transpiler JavaScript on Front End

2. `npm run build-client` for building front end