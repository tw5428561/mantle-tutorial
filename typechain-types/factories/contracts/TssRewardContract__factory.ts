/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  TssRewardContract,
  TssRewardContractInterface,
} from "../../contracts/TssRewardContract";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_deadAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
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
    inputs: [],
    name: "bestBlockID",
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
    name: "deadAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "dust",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "ledger",
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
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
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
    inputs: [],
    name: "totalAmount",
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

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620013fb380380620013fb83398181016040528101906200003791906200012b565b81600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505062000172565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620000f382620000c6565b9050919050565b6200010581620000e6565b81146200011157600080fd5b50565b6000815190506200012581620000fa565b92915050565b60008060408385031215620001455762000144620000c1565b5b6000620001558582860162000114565b9250506020620001688582860162000114565b9150509250929050565b61127980620001826000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80632c79db11116100715780632c79db11146101685780633ccfd60b146101865780638da5cb5b14610190578063cfb550f1146101ae578063e04f6e35146101b8578063fad9aba3146101d4576100a9565b80630b50cd3e146100ae57806310a7fd7b146100de57806319d509a11461010e5780631a39d8ef1461012c57806327c8f8351461014a575b600080fd5b6100c860048036038101906100c39190610a3e565b6101f2565b6040516100d59190610a99565b60405180910390f35b6100f860048036038101906100f39190610ab4565b61035c565b6040516101059190610af0565b60405180910390f35b610116610374565b6040516101239190610af0565b60405180910390f35b61013461037a565b6040516101419190610af0565b60405180910390f35b610152610380565b60405161015f9190610b4c565b60405180910390f35b6101706103a6565b60405161017d9190610af0565b60405180910390f35b61018e6103f3565b005b610198610545565b6040516101a59190610b4c565b60405180910390f35b6101b661056b565b005b6101d260048036038101906101cd9190610c08565b6106e4565b005b6101dc6109b6565b6040516101e99190610af0565b60405180910390f35b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610284576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161027b90610cff565b60405180910390fd5b6005544710156102c9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102c090610d91565b60405180910390fd5b60016003546102d89190610de0565b8314610319576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161031090610e82565b60405180910390fd5b82600381905550610335826005546109bc90919063ffffffff16565b60058190555081600080858152602001908152602001600020819055506001905092915050565b60006020528060005260406000206000915090505481565b60035481565b60055481565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006005544710156103ed576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103e490610d91565b60405180910390fd5b47905090565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610483576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161047a90610f14565b60405180910390fd5b6005544710156104c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104bf90610d91565b60405180910390fd5b6000600581905550600047111561054357600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc479081150290604051600060405180830381858888f19350505050158015610541573d6000803e3d6000fd5b505b565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146105fb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105f290610f14565b60405180910390fd5b600554471015610640576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161063790610d91565b60405180910390fd5b6000600454905061065e6004546005546109d290919063ffffffff16565b600581905550600060048190555060008111156106e157600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6004549081150290604051600060405180830381858888f193505050501580156106df573d6000803e3d6000fd5b505b50565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610774576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161076b90610cff565b60405180910390fd5b6005544710156107b9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107b090610d91565b60405180910390fd5b600080600086815260200190815260200160002054905060008060008790505b8663ffffffff1681101561096f576107fd86869050856109e890919063ffffffff16565b92506000808981526020019081526020016000206000905560005b868690508110156108da57600087878381811061083857610837610f34565b5b905060200201602081019061084d9190610f8f565b905061086285856109bc90919063ffffffff16565b9350610879856005546109d290919063ffffffff16565b6005819055508073ffffffffffffffffffffffffffffffffffffffff166108fc869081150290604051600060405180830381858888f193505050501580156108c5573d6000803e3d6000fd5b505080806108d290610fbc565b915050610818565b5060006108f083866109d290919063ffffffff16565b90506000811015610936576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161092d90611051565b60405180910390fd5b600081111561095b57610954816004546109bc90919063ffffffff16565b6004819055505b50808061096790610fbc565b9150506107d9565b507ff630cba6d450d736e85735388d4fe67a177b8a3685cdd7dee2bea7727b47860a878787876040516109a5949392919061116f565b60405180910390a150505050505050565b60045481565b600081836109ca9190610de0565b905092915050565b600081836109e091906111af565b905092915050565b600081836109f69190611212565b905092915050565b600080fd5b600080fd5b6000819050919050565b610a1b81610a08565b8114610a2657600080fd5b50565b600081359050610a3881610a12565b92915050565b60008060408385031215610a5557610a546109fe565b5b6000610a6385828601610a29565b9250506020610a7485828601610a29565b9150509250929050565b60008115159050919050565b610a9381610a7e565b82525050565b6000602082019050610aae6000830184610a8a565b92915050565b600060208284031215610aca57610ac96109fe565b5b6000610ad884828501610a29565b91505092915050565b610aea81610a08565b82525050565b6000602082019050610b056000830184610ae1565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610b3682610b0b565b9050919050565b610b4681610b2b565b82525050565b6000602082019050610b616000830184610b3d565b92915050565b600063ffffffff82169050919050565b610b8081610b67565b8114610b8b57600080fd5b50565b600081359050610b9d81610b77565b92915050565b600080fd5b600080fd5b600080fd5b60008083601f840112610bc857610bc7610ba3565b5b8235905067ffffffffffffffff811115610be557610be4610ba8565b5b602083019150836020820283011115610c0157610c00610bad565b5b9250929050565b60008060008060608587031215610c2257610c216109fe565b5b6000610c3087828801610a29565b9450506020610c4187828801610b8e565b935050604085013567ffffffffffffffff811115610c6257610c61610a03565b5b610c6e87828801610bb2565b925092505092959194509250565b600082825260208201905092915050565b7f747373207265776172642063616c6c206d65737361676520756e61757468656e60008201527f7469636174656400000000000000000000000000000000000000000000000000602082015250565b6000610ce9602783610c7c565b9150610cf482610c8d565b604082019050919050565b60006020820190508181036000830152610d1881610cdc565b9050919050565b7f62616c616e6365207265636f726420616e6420636f6e74726163742062616c6160008201527f6e636520617265206e6f7420657175616c000000000000000000000000000000602082015250565b6000610d7b603183610c7c565b9150610d8682610d1f565b604082019050919050565b60006020820190508181036000830152610daa81610d6e565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610deb82610a08565b9150610df683610a08565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610e2b57610e2a610db1565b5b828201905092915050565b7f626c6f636b2069642075706461746520696c6c6567616c000000000000000000600082015250565b6000610e6c601783610c7c565b9150610e7782610e36565b602082019050919050565b60006020820190508181036000830152610e9b81610e5f565b9050919050565b7f6f6e6c792062652063616c6c656420627920746865206f776e6572206f66207460008201527f68697320636f6e74726163740000000000000000000000000000000000000000602082015250565b6000610efe602c83610c7c565b9150610f0982610ea2565b604082019050919050565b60006020820190508181036000830152610f2d81610ef1565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b610f6c81610b2b565b8114610f7757600080fd5b50565b600081359050610f8981610f63565b92915050565b600060208284031215610fa557610fa46109fe565b5b6000610fb384828501610f7a565b91505092915050565b6000610fc782610a08565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415610ffa57610ff9610db1565b5b600182019050919050565b7f72656c6561736520616d6f756e74206774207265616c2062616c616e63650000600082015250565b600061103b601e83610c7c565b915061104682611005565b602082019050919050565b6000602082019050818103600083015261106a8161102e565b9050919050565b6000819050919050565b600061109661109161108c84610b67565b611071565b610a08565b9050919050565b6110a68161107b565b82525050565b600082825260208201905092915050565b6000819050919050565b6110d081610b2b565b82525050565b60006110e283836110c7565b60208301905092915050565b60006110fd6020840184610f7a565b905092915050565b6000602082019050919050565b600061111e83856110ac565b9350611129826110bd565b8060005b858110156111625761113f82846110ee565b61114988826110d6565b975061115483611105565b92505060018101905061112d565b5085925050509392505050565b60006060820190506111846000830187610ae1565b611191602083018661109d565b81810360408301526111a4818486611112565b905095945050505050565b60006111ba82610a08565b91506111c583610a08565b9250828210156111d8576111d7610db1565b5b828203905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061121d82610a08565b915061122883610a08565b925082611238576112376111e3565b5b82820490509291505056fea26469706673582212205f0ea9b3ef4068320b4afa889e3831f07a6caac5336bad2799cd437386a808ff64736f6c634300080b0033";

type TssRewardContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TssRewardContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TssRewardContract__factory extends ContractFactory {
  constructor(...args: TssRewardContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _deadAddress: PromiseOrValue<string>,
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TssRewardContract> {
    return super.deploy(
      _deadAddress,
      _owner,
      overrides || {}
    ) as Promise<TssRewardContract>;
  }
  override getDeployTransaction(
    _deadAddress: PromiseOrValue<string>,
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_deadAddress, _owner, overrides || {});
  }
  override attach(address: string): TssRewardContract {
    return super.attach(address) as TssRewardContract;
  }
  override connect(signer: Signer): TssRewardContract__factory {
    return super.connect(signer) as TssRewardContract__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TssRewardContractInterface {
    return new utils.Interface(_abi) as TssRewardContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TssRewardContract {
    return new Contract(address, _abi, signerOrProvider) as TssRewardContract;
  }
}