/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  ITssRewardContract,
  ITssRewardContractInterface,
} from "../../../contracts/iTssRewardContract.sol/ITssRewardContract";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "blockStartHeight",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "tssMembers",
        type: "address[]",
      },
    ],
    name: "DistributeTssReward",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_blockStartHeight",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "_length",
        type: "uint32",
      },
      {
        internalType: "address[]",
        name: "_tssMembers",
        type: "address[]",
      },
    ],
    name: "claimReward",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "queryReward",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_blockID",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "updateReward",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawDust",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class ITssRewardContract__factory {
  static readonly abi = _abi;
  static createInterface(): ITssRewardContractInterface {
    return new utils.Interface(_abi) as ITssRewardContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ITssRewardContract {
    return new Contract(address, _abi, signerOrProvider) as ITssRewardContract;
  }
}