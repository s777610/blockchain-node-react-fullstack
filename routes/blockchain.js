module.exports = (app, blockchain, pubsub) => {
  app.get("/api/blocks", (req, res) => {
    res.json(blockchain.chain);
  });

  app.get("/api/blocks/length", (req, res) => {
    res.json(blockchain.chain.length);
  });

  app.get("/api/blocks/:id", (req, res) => {
    const { id } = req.params;
    const { length } = blockchain.chain;

    // slice make a copy of array
    const blocksReversed = blockchain.chain.slice().reverse();

    let startIndex = (id - 1) * 5;
    let endIndex = id * 5;

    startIndex = startIndex < length ? startIndex : length;
    endIndex = endIndex < length ? endIndex : length;

    res.json(blocksReversed.slice(startIndex, endIndex));
  });

  app.post("/api/mine", (req, res) => {
    const { data } = req.body;
    blockchain.addBlock({ data });
    pubsub.broadcastChain();
    res.redirect("/api/blocks");
  });
};
