const crypto = require("crypto");

const cryptoHash = (...inputs) => {
  const hash = crypto.createHash("sha256");

  // update() will create a hash value within obj itself, which we can acces later
  hash.update(
    inputs
      .map(input => {
        return JSON.stringify(input);
      })
      .sort()
      .join(" ")
  );

  return hash.digest("hex");
};

module.exports = cryptoHash;
