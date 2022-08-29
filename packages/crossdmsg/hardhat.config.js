require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: "0.8.4",
  networks: {
     "local": {
        url: 'http://localhost:9545',
        accounts: { mnemonic: process.env.MNEMONIC }
      },
      "bitnetwork": {
        url: 'http://localhost:8545',
        accounts: { mnemonic: process.env.MNEMONIC }
      }
  }
};
