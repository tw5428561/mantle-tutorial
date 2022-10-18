import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();
// import * as dotenv from "dotenv";
// dotenv.config();

import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";


import "./tasks/d&w.task"
import "./tasks/ERC20.task"
import "./tasks/deployAll.task"
import "./tasks/ERC721.task"
import "./tasks/ERC1155.task"
import "./tasks/op_erc721.task"
import "./tasks/cross-messages.task"
import "./tasks/TssReward-verification"


import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity:{
  compilers: [
    {
      version: "0.7.6",
    },
    {
      version: "0.8.11",
    }]
    },
  networks: {
    // hardhat: {
    //   forking: {
    //     url: 'https://bitnetwork-l2geth.qa.davionlabs.com'
    //   },
    //   gasPrice: 1000000000,
    //   chainId: 1705004,
    //   gas: 4100000,
    //   from:'0xD6f15EAC1Cb3B4131Ab4899a52E711e19DEeA73f'
    // },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    teleport: {
      url: 'https://teleport-localvalidator.qa.davionlabs.com/',
      gasPrice: 5000000000,
      chainId: 7001,
      gas: 4100000,
      accounts:['7eefd641410560e690736ee331bd32512c9b58419a877eff2189facbef33cd1e']
    },
    bitnetwork: {
      url: 'https://bitnetwork-l2geth.qa.davionlabs.com',
      gasPrice: 1,
      chainId: 1705003,
      gas: 4100000,
      accounts:['7eefd641410560e690736ee331bd32512c9b58419a877eff2189facbef33cd1e']
    },
    opl2: { // Optimism Goerli
      url: "https://goerli.optimism.io",
      // accounts: {
      //   mnemonic:'enforce image nasty ahead clutch muscle foil broom thought shoot bless critic'
      // },
      accounts:['0x7eefd641410560e690736ee331bd32512c9b58419a877eff2189facbef33cd1e'],
      chainId: 420,
      gas: 10000000,
      gasPrice: 1,
      //explorer: https://blockscout.com/optimism/goerli/
    },
    opl1: { // Optimism Goerli
      url: "https://rpc.ankr.com/eth_goerli",
      // accounts: {
      //   mnemonic:'enforce image nasty ahead clutch muscle foil broom thought shoot bless critic'
      // },
      accounts:['0x7eefd641410560e690736ee331bd32512c9b58419a877eff2189facbef33cd1e'],
      chainId: 5,
      gas: 10000000,
      gasPrice: 5000000,
      //explorer: https://blockscout.com/optimism/goerli/
    },
    btl2: {
      url: "http://localhost:8545",
      // accounts: {
      //   mnemonic:'enforce image nasty ahead clutch muscle foil broom thought shoot bless critic'
      // },
      // accounts:['0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'],
      accounts:['0x8f14df1da1a318bec99800b72c5031e4fdc4ec017f00ab9659339ecb0193120e'],
      chainId: 17,
      gas: 10000000,
      gasPrice: 1,
    },
    btl1: {
      url: "http://localhost:9545",
      // accounts: {
      //   mnemonic:'enforce image nasty ahead clutch muscle foil broom thought shoot bless critic'
      // },
      // accounts:['0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'],
      accounts:['0x8f14df1da1a318bec99800b72c5031e4fdc4ec017f00ab9659339ecb0193120e'],
      chainId: 31337,
      gas: 10000000,
      gasPrice: 5000000,
    },
  },

  // const l1RpcProvider = new ethers.providers.JsonRpcProvider('http://localhost:9545')
  // const l2RpcProvider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
