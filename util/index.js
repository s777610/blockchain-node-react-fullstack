const EC = require("elliptic").ec;
const cryptoHash = require("./crypto-hash");

const ec = new EC("secp256k1");

const verifySignature = ({ publicKey, data, signature }) => {
  // verify() only available within an instance of a key object
  // so that we can create temporary key object using publicKey
  const keyFromPublic = ec.keyFromPublic(publicKey, "hex");
  return keyFromPublic.verify(cryptoHash(data), signature);
};

module.exports = { ec, verifySignature, cryptoHash };
