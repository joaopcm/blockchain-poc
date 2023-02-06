const EC = require("elliptic").ec;

const { Blockchain, Transaction } = require("./blockchain");

const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
  "cc64810df48f4cd6157c7a22115043a313d107764798dd6e397ee9413dc6299e"
);
const myWalletAddress = myKey.getPublic("hex");

const myCoin = new Blockchain();

const transaction1 = new Transaction({
  fromAddress: myWalletAddress,
  toAddress: "public key goes here",
  amount: 10,
});
transaction1.sign(myKey);
myCoin.addTransaction(transaction1);

console.log("\n Starting the miner...");
myCoin.minePendingTransactions(myWalletAddress);

console.log(
  "\nBalance of João is",
  myCoin.getBalanceOfAddress(myWalletAddress)
);

console.log("Is chain valid?", myCoin.isChainValid() ? "Yes" : "No");
