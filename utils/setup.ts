/* External Imports */
import { ethers } from "hardhat";
import { expect } from "chai";
import dotenv from "dotenv";
dotenv.config();

import chai from 'chai';
const should = chai.should()

const getSigners = async () => {
  const l1RpcProvider = new ethers.providers.JsonRpcProvider(process.env.L1_URL)
  const l2RpcProvider = new ethers.providers.JsonRpcProvider(process.env.L2_URL)

  const privateKey = process.env.PRIVATE_KEY;
  const l1Wallet = new ethers.Wallet(privateKey!, l1RpcProvider);
  const l2Wallet = new ethers.Wallet(privateKey!, l2RpcProvider);

  const DEPLOY_PRIVATE_KEY = process.env.DEPLOY_PRIVATE_KEY;
  const l1DW = new ethers.Wallet(DEPLOY_PRIVATE_KEY!, l1RpcProvider);
  const l2DW = new ethers.Wallet(DEPLOY_PRIVATE_KEY!, l2RpcProvider);
  return [l1Wallet, l2Wallet, l1DW, l2DW]
}

const getContracts =async () => {
  const accounts = await getSigners()
  let l2Signer = accounts[1]
  let l1Signer = accounts[0]

  const l1cdm = new ethers.Contract(process.env.L1_CROSS_DOMAIN_MESSENGER!, CROSS_DOMAIN_MESSENGER_ABI, l1Signer)
  const l2cdm = new ethers.Contract(process.env.L2_CROSS_DOMAIN_MESSENGER!, CROSS_DOMAIN_MESSENGER_ABI, l2Signer)
  const l1sb = new ethers.Contract(process.env.L1_Standard_Bridge!, Standard_Bridge_ABI, l1Signer)
  const l2sb = new ethers.Contract(process.env.L2_Standard_Bridge!, Standard_Bridge_ABI, l2Signer)

  return [l1cdm, l2cdm, l1sb, l2sb]
}

const CROSS_DOMAIN_MESSENGER_ABI = [
  {
    inputs: [],
    name: "greet",
    outputs: [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "target",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "message",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "messageNonce",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "gasLimit",
        "type": "uint256"
      }
    ],
    "name": "SentMessage",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "nonce",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
]

const Standard_Bridge_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "ETHDepositInitiated",
    "type": "event"
  },//ETHDepositInitiated
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_l1Token",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_l2Token",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "WithdrawalInitiated",
    "type": "event"
  },//WithdrawalInitiated
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "finalizeETHWithdrawal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },//finalizeETHWithdrawal
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "_l2Gas",
        "type": "uint32"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "depositETH",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },//depositETH
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint32",
        "name": "_l2Gas",
        "type": "uint32"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "depositETHTo",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },//depositETHTo
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_l1Token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_l2Token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint32",
        "name": "_l2Gas",
        "type": "uint32"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "depositERC20",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },//depositERC20
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_l1Token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_l2Token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint32",
        "name": "_l2Gas",
        "type": "uint32"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "depositERC20To",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },//depositERC20To
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_l1Token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_l2Token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "finalizeERC20Withdrawal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },//finalizeERC20Withdrawal
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_l2Token",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint32",
        "name": "_l1Gas",
        "type": "uint32"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },//withdraw
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_l2Token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint32",
        "name": "_l1Gas",
        "type": "uint32"
      },
      {
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "withdrawTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }//withdrawTo
]

const ERC20ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },//allowance
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },//approve
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }//balanceOf
]

export const get_L1_Standard_Bridge = async () =>{
  const accounts = await getSigners()
  let l1Signer = accounts[0]
  let l1sb = new ethers.Contract(process.env.L1_Standard_Bridge!, Standard_Bridge_ABI, l1Signer)

  return l1sb
}

export const get_L2_Standard_Bridge = async () =>{
  const accounts = await getSigners()
  let l2Signer = accounts[1]
  let l2sb = new ethers.Contract(process.env.L2_Standard_Bridge!, Standard_Bridge_ABI, l2Signer)

  return l2sb
}

export const get_L1_BIT_TOKEN = async () =>{
  const accounts = await getSigners()
  let l1Signer = accounts[0]
  let bit = new ethers.Contract(process.env.L1_Bit_Token!, ERC20ABI, l1Signer)

  return bit
}

export const get_L2_BIT_TOKEN = async () =>{
  const accounts = await getSigners()
  let l2Signer = accounts[1]
  let bit = new ethers.Contract(process.env.L2_Bit_Token!, ERC20ABI, l2Signer)

  return bit
}

export const get_L2_ETH_TOKEN = async () =>{
  const accounts = await getSigners()
  let l2Signer = accounts[1]
  let eth = new ethers.Contract(process.env.L2_ETH_Token!, ERC20ABI, l2Signer)

  return eth
}

export { expect, should, getSigners, getContracts }
